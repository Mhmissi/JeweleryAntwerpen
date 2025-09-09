# 🚀 Jewelry Antwerpen - Setup Guide

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Firebase Project** - [Create one here](https://console.firebase.google.com/)
3. **ImageKit Account** - [Sign up here](https://imagekit.io/)

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "jewelry-antwerpen" (or any name you prefer)
4. Enable Google Analytics (optional)

### 2. Enable Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)

### 3. Enable Storage
1. Go to "Storage" in Firebase Console
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore

### 4. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Copy the config object

Your Firebase config is already set in `src/config/firebase.ts` with these values:
- Project ID: `jeweleryantwerpen`
- Make sure this matches your actual Firebase project ID

## 📸 Image Upload Setup

### Image Storage Configuration
Images are stored as data URLs for immediate functionality:
- **Method**: Data URLs (base64 encoded images)
- **Benefits**: No CORS issues, works immediately
- **Note**: For production, consider Firebase Storage with proper CORS rules

No additional setup needed - images work out of the box!

## 🚀 Running the Application

### Start the Application
```bash
npm start
```
The application will run on http://localhost:3000

## 🎯 Testing the Setup

### Test Admin Dashboard
1. Go to http://localhost:3000/admin
2. Click "Add New Product"
3. Fill in product details
4. Upload images - they will be stored as data URLs (no CORS issues)
5. Click "Save Product"

## 🔧 Troubleshooting

### Firebase Errors
- Make sure Firestore is enabled
- Check if your project ID matches in `firebase.ts`
- Verify Firestore rules allow read/write

### Image Upload Errors
- Images are stored as data URLs (no external dependencies)
- If uploads fail, check browser console for errors
- Data URLs work immediately without CORS issues

### Port Issues
- Change port in `package.json` scripts if needed

## 📁 Project Structure

```
jewelry-antwerpen/
├── src/
│   ├── pages/Admin/          # Admin dashboard
│   ├── services/
│   │   ├── firebase.ts       # Firebase services
│   │   └── imagekit.ts       # ImageKit integration
│   └── config/
│       └── firebase.ts       # Firebase config
└── package.json              # Dependencies and scripts
```

## 🎉 You're Ready!

Once everything is set up:
1. ✅ Firebase Firestore will store your products, orders, users
2. ✅ Data URLs will handle image storage (no CORS issues)
3. ✅ Admin dashboard will let you manage your jewelry inventory
4. ✅ Single application - no separate backend needed!

Happy selling! 💎✨



