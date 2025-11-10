import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Post from '../models/Post.js';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
            bio: 'Administrator of the MERN Blog platform',
        });

        // Create regular user
        const regularUser = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            bio: 'A passionate writer and developer',
        });

        console.log('Created users');

        // Create categories
        const categories = await Category.create([
            {
                name: 'Technology',
                description: 'Posts about technology, programming, and software development',
                color: '#3B82F6',
            },
            {
                name: 'Lifestyle',
                description: 'Posts about lifestyle, health, and personal development',
                color: '#10B981',
            },
            {
                name: 'Travel',
                description: 'Travel experiences, tips, and destination guides',
                color: '#F59E0B',
            },
            {
                name: 'Food',
                description: 'Recipes, restaurant reviews, and culinary adventures',
                color: '#EF4444',
            },
            {
                name: 'Business',
                description: 'Business insights, entrepreneurship, and career advice',
                color: '#8B5CF6',
            },
        ]);

        console.log('Created categories');

        // Create sample posts
        const posts = [
            {
                title: 'Getting Started with MERN Stack Development',
                content: `
          <p>The MERN stack has become one of the most popular choices for full-stack web development. In this comprehensive guide, we'll explore what makes MERN so powerful and how you can get started with it.</p>
          
          <h2>What is MERN?</h2>
          <p>MERN stands for MongoDB, Express.js, React, and Node.js. Each component serves a specific purpose:</p>
          <ul>
            <li><strong>MongoDB</strong>: A NoSQL database for storing application data</li>
            <li><strong>Express.js</strong>: A web framework for Node.js that handles server-side logic</li>
            <li><strong>React</strong>: A JavaScript library for building user interfaces</li>
            <li><strong>Node.js</strong>: A JavaScript runtime for server-side development</li>
          </ul>
          
          <h2>Why Choose MERN?</h2>
          <p>The MERN stack offers several advantages for modern web development:</p>
          <ul>
            <li>JavaScript everywhere - use one language for both frontend and backend</li>
            <li>Rich ecosystem with extensive libraries and tools</li>
            <li>Excellent performance and scalability</li>
            <li>Strong community support</li>
          </ul>
          
          <p>Ready to start your MERN journey? Let's dive in!</p>
        `,
                excerpt: 'Learn the fundamentals of MERN stack development and why it\'s become the go-to choice for modern web applications.',
                author: adminUser._id,
                category: categories[0]._id,
                tags: ['MERN', 'JavaScript', 'Web Development', 'Full Stack'],
                isPublished: true,
                viewCount: 156,
            },
            {
                title: 'Building Responsive UIs with React and Tailwind CSS',
                content: `
          <p>Creating responsive and beautiful user interfaces is crucial for modern web applications. In this post, we'll explore how to combine React with Tailwind CSS to build stunning UIs quickly and efficiently.</p>
          
          <h2>Why Tailwind CSS?</h2>
          <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs. Unlike traditional CSS frameworks, Tailwind doesn't impose design decisions on you.</p>
          
          <h2>Setting Up Tailwind with React</h2>
          <p>Getting started with Tailwind in a React project is straightforward. Here's how to set it up:</p>
          <ol>
            <li>Install Tailwind CSS via npm</li>
            <li>Configure your tailwind.config.js file</li>
            <li>Add Tailwind directives to your CSS</li>
            <li>Start building with utility classes</li>
          </ol>
          
          <p>The combination of React's component-based architecture and Tailwind's utility classes creates a powerful development experience.</p>
        `,
                excerpt: 'Discover how to create beautiful, responsive user interfaces using React and Tailwind CSS.',
                author: regularUser._id,
                category: categories[0]._id,
                tags: ['React', 'Tailwind CSS', 'UI/UX', 'Frontend'],
                isPublished: true,
                viewCount: 89,
            },
            {
                title: 'The Art of Work-Life Balance in Tech',
                content: `
          <p>Working in the tech industry can be incredibly rewarding, but it also comes with unique challenges when it comes to maintaining a healthy work-life balance. Let's explore strategies for thriving both professionally and personally.</p>
          
          <h2>Understanding the Challenge</h2>
          <p>The tech industry is known for its fast-paced environment, long hours, and constant learning requirements. While this can be exciting, it can also lead to burnout if not managed properly.</p>
          
          <h2>Strategies for Balance</h2>
          <ul>
            <li><strong>Set Clear Boundaries</strong>: Define when work starts and ends</li>
            <li><strong>Prioritize Self-Care</strong>: Regular exercise, proper sleep, and healthy eating</li>
            <li><strong>Continuous Learning</strong>: Stay updated but don't overwhelm yourself</li>
            <li><strong>Build Relationships</strong>: Maintain connections outside of work</li>
          </ul>
          
          <p>Remember, a sustainable career is a marathon, not a sprint. Taking care of yourself is not just beneficial for your personal life—it makes you a better professional too.</p>
        `,
                excerpt: 'Practical strategies for maintaining work-life balance while building a successful career in technology.',
                author: regularUser._id,
                category: categories[1]._id,
                tags: ['Work-Life Balance', 'Career', 'Wellness', 'Tech Industry'],
                isPublished: true,
                viewCount: 234,
            },
            {
                title: 'Exploring Japan: A Developer\'s Travel Guide',
                content: `
          <p>Japan offers a unique blend of ancient traditions and cutting-edge technology, making it a fascinating destination for developers and tech enthusiasts. Here's your guide to exploring Japan from a developer's perspective.</p>
          
          <h2>Tech Hubs to Visit</h2>
          <ul>
            <li><strong>Tokyo</strong>: Visit Akihabara for electronics and tech culture</li>
            <li><strong>Osaka</strong>: Explore the gaming industry roots</li>
            <li><strong>Kyoto</strong>: See how tradition meets innovation</li>
          </ul>
          
          <h2>Must-Visit Places for Tech Lovers</h2>
          <p>From robot restaurants to cutting-edge museums, Japan offers countless attractions for technology enthusiasts. Don't miss the TeamLab digital art museums or the Sony Building in Ginza.</p>
          
          <h2>Networking Opportunities</h2>
          <p>Japan has a vibrant tech community with numerous meetups, conferences, and networking events. Consider attending events like RubyKaigi or PyCon Japan if your timing aligns.</p>
          
          <p>Japan is not just a travel destination—it's an inspiration for anyone in the tech industry.</p>
        `,
                excerpt: 'A comprehensive travel guide to Japan tailored for developers and technology enthusiasts.',
                author: adminUser._id,
                category: categories[2]._id,
                tags: ['Travel', 'Japan', 'Technology', 'Culture'],
                isPublished: true,
                viewCount: 178,
            },
            {
                title: 'The Perfect Home Office Setup for Developers',
                content: `
          <p>With remote work becoming the norm, having an optimized home office setup is crucial for productivity and well-being. Let's explore how to create the perfect workspace for development work.</p>
          
          <h2>Essential Hardware</h2>
          <ul>
            <li><strong>Monitor Setup</strong>: Dual monitors or an ultrawide display</li>
            <li><strong>Ergonomic Chair</strong>: Invest in your posture and comfort</li>
            <li><strong>Mechanical Keyboard</strong>: Better typing experience and durability</li>
            <li><strong>Quality Mouse</strong>: Precision and comfort for long coding sessions</li>
          </ul>
          
          <h2>Software and Tools</h2>
          <p>Beyond hardware, the right software tools can significantly boost your productivity. Consider tools for code editing, version control, project management, and communication.</p>
          
          <h2>Environment Optimization</h2>
          <p>Lighting, temperature, and noise levels all impact your ability to focus and be productive. Natural light is ideal, but a good desk lamp is essential for evening work.</p>
          
          <p>Remember, the best setup is one that works for your specific needs and workflow.</p>
        `,
                excerpt: 'Everything you need to know about creating an optimal home office environment for software development.',
                author: regularUser._id,
                category: categories[1]._id,
                tags: ['Home Office', 'Productivity', 'Remote Work', 'Setup'],
                isPublished: true,
                viewCount: 145,
            },
        ];

        const createdPosts = await Post.create(posts);
        console.log('Created sample posts');

        // Update category post counts
        for (const category of categories) {
            const postCount = createdPosts.filter(post =>
                post.category.toString() === category._id.toString()
            ).length;

            await Category.findByIdAndUpdate(category._id, { postCount });
        }

        console.log('Updated category post counts');
        console.log('✅ Seed data created successfully!');
        console.log(`
📊 Summary:
- Users: ${await User.countDocuments()}
- Categories: ${await Category.countDocuments()}
- Posts: ${await Post.countDocuments()}

🔐 Test Accounts:
- Admin: admin@example.com / password123
- User: john@example.com / password123
    `);

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

seedData();