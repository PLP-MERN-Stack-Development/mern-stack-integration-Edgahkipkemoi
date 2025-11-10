# 🚀 Quick Start Guide

## Option 1: Full Setup with MongoDB (Recommended)

### 1. Install MongoDB
**Windows:**
```bash
# Download and install MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Start MongoDB service
net start MongoDB
```

**macOS:**
```bash
# Install with Homebrew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Install MongoDB (Ubuntu/Debian)
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Start the Application
```bash
# Install dependencies
npm run install-all

# Seed the database
cd server && npm run seed

# Start both frontend and backend
npm run dev
```

### 3. Access the Application
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## Option 2: Quick Test (No MongoDB Required)

If you want to test the application without setting up MongoDB:

### 1. Start Test Server
```bash
# Install dependencies
npm run install-all

# Start test backend (mock data)
cd server && npm run test

# In another terminal, start frontend
cd client && npm run dev
```

### 2. Access Test Application
- **Frontend:** http://localhost:3000
- **Test Backend:** http://localhost:5000

**Note:** The test server provides mock responses. For full functionality, use Option 1.

## Option 3: Use MongoDB Atlas (Cloud Database)

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string

### 2. Update Environment
```bash
# Edit server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
```

### 3. Start Application
```bash
npm run install-all
cd server && npm run seed
npm run dev
```

## 🔐 Test Accounts (After Seeding)

- **Admin:** admin@example.com / password123
- **User:** john@example.com / password123

## 🐛 Troubleshooting

### Backend Not Starting?
1. Check if MongoDB is running: `mongod --version`
2. Try the test server: `cd server && npm run test`
3. Check the console for error messages

### Frontend Can't Connect?
1. Make sure backend is running on port 5000
2. Check browser console for errors
3. Verify proxy settings in `client/vite.config.js`

### Database Connection Issues?
1. Verify MongoDB is installed and running
2. Check MONGODB_URI in `server/.env`
3. Try using MongoDB Atlas (cloud option)

## 📞 Need Help?

1. Check the full SETUP.md guide
2. Run the verification script: `node verify-setup.js`
3. Look at error messages in the console
4. Make sure all dependencies are installed

---

**Choose the option that works best for your setup!** 🎯