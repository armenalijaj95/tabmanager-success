# Tab Manager Pro - Success Page & License Validation API

This repository hosts:
1. **Post-purchase success page** - Where users land after buying Tab Manager Pro
2. **License validation API** - Serverless function to verify license keys with Lemon Squeezy

## 🌐 Live URLs

- **Success Page**: https://armenalijaj95.github.io/tabmanager-success/success.html
- **API Endpoint**: https://tabmanager-success.vercel.app/api/validate-license (after deployment)

---

## 📦 What's Inside

```
tabmanager-success/
├── success.html          # Post-purchase landing page
├── api/
│   └── validate-license.js  # Serverless API for license validation
├── vercel.json           # Vercel deployment config
└── README.md
```

---

## 🚀 Deploy to Vercel (Free)

### Prerequisites
- GitHub account (you have this ✅)
- Vercel account (free - sign up at vercel.com)
- Lemon Squeezy API key

### Step-by-Step Deployment

#### 1. Push This Repo to GitHub

```bash
git add .
git commit -m "Add license validation API"
git push origin main
```

#### 2. Deploy to Vercel

1. Go to: https://vercel.com/
2. Click **"Sign Up"** or **"Login with GitHub"**
3. Click **"Add New Project"**
4. **Import** `armenalijaj95/tabmanager-success` repository
5. Click **"Deploy"** (no configuration needed)
6. Wait ~30 seconds for deployment

#### 3. Add Lemon Squeezy API Key

After deployment:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add new variable:
   - **Name**: `LEMON_SQUEEZY_API_KEY`
   - **Value**: Your Lemon Squeezy API key (get from: https://app.lemonsqueezy.com/settings/api)
4. Click **"Save"**
5. Go to **"Deployments"** → Click **"⋯"** → **"Redeploy"**

#### 4. Get Your Lemon Squeezy API Key

1. Go to: https://app.lemonsqueezy.com/settings/api
2. Click **"Create API Key"**
3. Give it a name: "Tab Manager Pro Validation"
4. Copy the key (starts with `lmsk_...`)
5. Paste it into Vercel environment variable

---

## 🔌 API Usage

### Endpoint
```
POST https://tabmanager-success.vercel.app/api/validate-license
```

### Request Body
```json
{
  "licenseKey": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

### Response (Valid License)
```json
{
  "valid": true,
  "status": "active",
  "customer": "user@example.com",
  "expires": null
}
```

### Response (Invalid License)
```json
{
  "valid": false,
  "status": "invalid",
  "error": "License validation failed"
}
```

---

## 🔧 Testing the API

### From Command Line
```bash
curl -X POST https://tabmanager-success.vercel.app/api/validate-license \
  -H "Content-Type: application/json" \
  -d '{"licenseKey": "YOUR-LICENSE-KEY-HERE"}'
```

### From JavaScript (Chrome Extension)
```javascript
async function validateLicense(licenseKey) {
  const response = await fetch('https://tabmanager-success.vercel.app/api/validate-license', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ licenseKey })
  });
  
  const data = await response.json();
  return data.valid;
}
```

---

## 🔒 Security Features

- ✅ API key stored securely in Vercel environment variables
- ✅ Server-side validation (not exposed to client)
- ✅ CORS enabled for Chrome extension
- ✅ UUID format validation
- ✅ Direct Lemon Squeezy API verification

---

## 📝 How It Works

1. User purchases Tab Manager Pro on Lemon Squeezy
2. After payment, redirected to `success.html` with license key
3. User copies license key and pastes into Chrome extension
4. Extension calls `/api/validate-license` with the key
5. Vercel function validates against Lemon Squeezy API
6. Returns valid/invalid status to extension
7. Extension activates Pro features if valid

---

## 🆘 Support

Need help? Contact: armenalijaj2012@gmail.com

---

## 📄 License

© 2025 Armen Alijaj

<!-- Deployment trigger -->
