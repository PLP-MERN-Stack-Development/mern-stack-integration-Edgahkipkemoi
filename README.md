# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates modern web development practices with complete CRUD functionality, user authentication, and advanced features.

## 🚀 Features

### Core Features
- **User Authentication**: Registration, login, and protected routes
- **Blog Management**: Create, read, update, and delete blog posts
- **Category System**: Organize posts by categories
- **Comment System**: Users can comment on posts with nested replies
- **Search & Filter**: Search posts by title/content and filter by category
- **Pagination**: Efficient data loading with pagination
- **Responsive Design**: Mobile-first responsive UI

### Advanced Features
- **Image Uploads**: Featured images for blog posts
- **Rich Text Content**: Support for formatted blog content
- **User Dashboard**: Personal dashboard for managing posts
- **Real-time Updates**: Optimistic UI updates
- **Error Handling**: Comprehensive error handling and user feedback
- **Input Validation**: Both client and server-side validation

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
mern-stack-integration/
├── client/                     # React frontend
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── common/         # Common UI components
│   │   │   ├── layout/         # Layout components
│   │   │   └── posts/          # Post-related components
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express backend
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── uploads/                # File uploads directory
│   ├── server.js               # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-integration
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update the `MONGODB_URI` in your `.env` file

6. **Run the application**
   
   Start the server (from server directory):
   ```bash
   npm run dev
   ```

   Start the client (from client directory):
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Posts Endpoints
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/user/:userId` - Get posts by user

### Categories Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Comments Endpoints
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create comment (protected)
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)
- `POST /api/comments/:id/like` - Toggle comment like (protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid JWT token
- Tokens expire after 30 days (configurable)
- Automatic logout on token expiration

## 📱 Features Walkthrough

### User Registration & Login
- Users can register with name, email, and password
- Form validation on both client and server
- Automatic login after successful registration
- Remember me functionality

### Blog Post Management
- Rich text editor for post content
- Featured image upload
- Category assignment
- Tag system
- Draft/publish functionality
- SEO-friendly slugs

### Dashboard
- Personal dashboard for logged-in users
- View all user's posts
- Quick stats (total posts, views, etc.)
- Edit/delete post actions

### Search & Filter
- Real-time search by title and content
- Filter by category
- Sort by date, title, or popularity
- Pagination for large datasets

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Optimized for all screen sizes
- Touch-friendly interface

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Create, edit, and delete posts
- [ ] Image upload functionality
- [ ] Search and filter posts
- [ ] Comment system
- [ ] Responsive design
- [ ] Error handling

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Get posts
curl http://localhost:5000/api/posts
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Update CORS settings for production domain
3. Configure MongoDB Atlas for production database

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Update API URL for production
3. Configure redirects for client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB documentation and community
- Express.js team for the excellent framework
- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors who made this project possible

## 📸 Application Features

### 🏠 Home Page
- Blog post listing with pagination
- Search and filter functionality
- Category-based filtering
- Responsive card layout

### 📝 Post Management
- Create, edit, and delete blog posts
- Rich text content support
- Featured image uploads
- Category and tag assignment

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Protected routes and middleware
- User dashboard and profile

### 💬 Comment System
- Nested comment replies
- Comment likes and reactions
- Real-time comment updates
- Comment moderation

### 🎨 Responsive Design
- Mobile-first approach
- Modern UI with Tailwind CSS
- Intuitive navigation
- Loading states and error handling

## 🧪 Testing

### Manual Testing Checklist
- [x] User registration and login
- [x] Create, edit, and delete posts
- [x] Image upload functionality
- [x] Search and filter posts
- [x] Comment system with replies
- [x] Responsive design on mobile/tablet/desktop
- [x] Error handling and validation
- [x] Protected routes and authentication
- [x] Pagination functionality

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Test server status
curl http://localhost:5000

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get posts
curl http://localhost:5000/api/posts

# Get categories
curl http://localhost:5000/api/categories
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables in production
2. Update CORS settings for production domain
3. Configure MongoDB Atlas for production database
4. Set `NODE_ENV=production`

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Update `VITE_API_URL` for production API
3. Configure redirects for client-side routing

### Environment Variables for Production

**Server (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRE=30d
```

**Client (.env):**
```env
VITE_API_URL=https://your-api-domain.com/api
```

## 📊 Performance Optimizations

- **Database Indexing**: Indexes on frequently queried fields
- **Image Optimization**: Compressed images with proper sizing
- **Lazy Loading**: Components and images loaded on demand
- **Caching**: React Query for efficient data caching
- **Code Splitting**: Dynamic imports for route-based splitting
- **Bundle Optimization**: Vite's built-in optimizations

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Both client and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing
- **File Upload Security**: File type and size restrictions
- **Protected Routes**: Authentication required for sensitive operations

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the existing issues in the repository
2. Review the SETUP.md file for detailed instructions
3. Run `node verify-setup.js` to check your configuration
4. Create a new issue with detailed description and error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB documentation and community
- Express.js team for the excellent framework
- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast build tool
- All open-source contributors who made this project possible

---

**Happy Coding! 🚀**

*Built with ❤️ using the MERN Stack* 