# 🚀 MERN Blog Setup Guide

This guide will help you set up and run the MERN Blog application on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local installation)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud database)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mern-stack-integration-Edgahkipkemoi
```

### 2. Install Dependencies

#### Option A: Install All at Once (Recommended)
```bash
npm install
npm run install-all
```

#### Option B: Install Manually
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment (.env)
Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
```

**For MongoDB Atlas:**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
```

#### Client Environment (.env)
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Seed the database with sample data:
   ```bash
   npm run seed
   ```

#### Option B: MongoDB Atlas
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update the `MONGODB_URI` in your server `.env` file
4. Seed the database:
   ```bash
   npm run seed
   ```

### 5. Run the Application

#### Option A: Run Both Server and Client Together
```bash
npm run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api (shows "MERN Blog API is running")

## 🧪 Test Accounts

After seeding the database, you can use these test accounts:

### Admin Account
- **Email**: admin@example.com
- **Password**: password123
- **Role**: Admin (can manage categories)

### Regular User Account
- **Email**: john@example.com
- **Password**: password123
- **Role**: User (can create posts and comments)

## 🔍 Verification Checklist

After setup, verify everything works:

- [ ] Server starts without errors (http://localhost:5000)
- [ ] Client starts without errors (http://localhost:3000)
- [ ] Database connection is successful
- [ ] You can register a new user
- [ ] You can login with test accounts
- [ ] You can view existing posts
- [ ] You can create a new post (when logged in)
- [ ] Search and filter functionality works
- [ ] Responsive design works on mobile

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check your Atlas connection string.

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port or change the PORT in your `.env` file.

#### 3. Module Not Found Errors
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` in the appropriate directory (server or client).

#### 4. CORS Errors
```
Access to fetch at 'http://localhost:5000/api/posts' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution**: Ensure the server is running and CORS is properly configured (already done in this project).

#### 5. JWT Secret Warning
```
Warning: JWT_SECRET is not set
```
**Solution**: Make sure your server `.env` file has a JWT_SECRET value.

### Getting Help

If you encounter issues:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB is running and accessible
5. Review the network tab in browser dev tools for API errors

## 📚 Next Steps

Once you have the application running:

1. **Explore the Features**: Try creating posts, commenting, and using search
2. **Customize the Design**: Modify Tailwind classes to change the appearance
3. **Add New Features**: Implement additional functionality like user profiles or post categories
4. **Deploy the Application**: Consider deploying to platforms like Heroku, Vercel, or DigitalOcean

## 🚀 Development Tips

- Use `npm run dev` to run both client and server with hot reloading
- Check the browser console and terminal for error messages
- Use MongoDB Compass to view and manage your database
- Install React Developer Tools and Redux DevTools for better debugging
- Use Postman or similar tools to test API endpoints

## 📞 Support

If you need help:
- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Create an issue in the repository with detailed error information

Happy coding! 🎉