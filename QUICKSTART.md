# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Configure Firebase

1. Open `src/firebase.js`
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Where to get these values:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or select an existing one
- Click the gear icon ⚙️ > Project Settings
- Scroll down to "Your apps" section
- Click the web icon `</>` to create a web app (if you haven't already)
- Copy the configuration values

### Step 2: Enable Firebase Services

**Enable Authentication:**
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**

**Enable Firestore:**
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **test mode**
4. Add these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Step 3: Run the App

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 4: Test It Out

1. **Register** a new account
2. **Check your email** for verification link
3. **Click the verification link**
4. **Login** with your verified account
5. **Start adding todos!**

## 📋 Features

- ✅ Email/Password Authentication
- ✅ Email Verification Required
- ✅ Forgot Password / Password Reset
- ✅ Real-time Todo Sync
- ✅ User-specific Todos
- ✅ Add, Complete, Delete Todos

## 🔧 Troubleshooting

**Emails not arriving?**
- Check spam folder
- Verify Email/Password is enabled in Firebase Console

**Can't login?**
- Make sure you verified your email
- Check that Firebase config is correct

**"Permission denied" errors?**
- Verify Firestore security rules are set up correctly
- Make sure you're logged in with a verified email

## 📚 Full Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 🎨 Customization

All styles are in `src/App.css` - feel free to customize colors, fonts, and layouts!

## 🚢 Deployment

Ready to deploy? Consider:
- Firebase Hosting
- Vercel
- Netlify

Don't forget to update Firestore security rules for production!

