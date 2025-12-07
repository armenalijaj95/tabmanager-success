/**
 * Vercel Serverless Function - License Validation API
 * 
 * Validates Tab Manager Pro license keys against Lemon Squeezy
 * 
 * Endpoint: POST /api/validate-license
 * Body: { "licenseKey": "XXXX-XXXX-XXXX-XXXX" }
 * Response: { "valid": true/false, "status": "active/inactive/invalid" }
 */

module.exports = async function handler(req, res) {
  // Enable CORS for Chrome extension
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { licenseKey } = req.body;

    // Validate input
    if (!licenseKey) {
      return res.status(400).json({ 
        valid: false, 
        error: 'License key is required' 
      });
    }

    // Basic UUID format validation
    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    if (!uuidRegex.test(licenseKey)) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Invalid license key format' 
      });
    }

    // Validate with Lemon Squeezy API
    const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;
    
    if (!lemonSqueezyApiKey) {
      console.error('LEMON_SQUEEZY_API_KEY not configured');
      return res.status(500).json({ 
        valid: false, 
        error: 'Server configuration error' 
      });
    }

    // Call Lemon Squeezy License API
    // https://docs.lemonsqueezy.com/api/license-keys#activate-a-license-key
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lemonSqueezyApiKey}`
      },
      body: JSON.stringify({
        license_key: licenseKey
      })
    });

    const data = await response.json();

    // Check if license is valid and active
    if (response.ok && data.valid) {
      return res.status(200).json({
        valid: true,
        status: data.meta?.status || 'active',
        customer: data.meta?.customer_email,
        expires: data.meta?.expires_at
      });
    } else {
      return res.status(200).json({
        valid: false,
        status: data.meta?.status || 'invalid',
        error: data.error || 'License validation failed'
      });
    }

  } catch (error) {
    console.error('License validation error:', error);
    return res.status(500).json({ 
      valid: false, 
      error: 'Internal server error' 
    });
  }
};
