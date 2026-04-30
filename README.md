# AgroYouth 

AgroYouth is a comprehensive digital platform designed to empower young Liberian farmers through digital learning, market access, community collaboration, and investment opportunities. The platform bridges the gap between traditional agriculture and modern technology, providing farmers with the tools they need to succeed in today's agricultural landscape.

## 🚀 Features

### 🎓 Learning Management System
- **Interactive Courses**: Comprehensive agricultural courses across 6 categories
  - Cropping
  - Livestock
  - Agroforestry
  - Irrigation
  - Soil Health
  - Pest Management
- **Skill-Based Learning**: Beginner, Intermediate, and Advanced level courses
- **Certification System**: Digital certificates upon course completion
- **Progress Tracking**: Monitor learning progress and achievements

### 💰 Investment & Funding Platform
- **Donation Applications**: Apply for agricultural project funding
- **Investor Dashboard**: Connect farmers with potential investors
- **Project Review System**: Streamlined approval process for funding applications
- **Document Management**: Secure certificate and document upload system

### 🛒 Agricultural Marketplace
- **Product Listings**: List and sell agricultural products
- **Inventory Management**: Track crop quantities, pricing, and availability
- **Location-Based Trading**: Connect local buyers and sellers

### 👥 Community Features
- **Discussion Forums**: Course-specific discussion boards
- **Anonymous Posting**: Privacy-focused community interactions
- **Live Sessions**: Real-time agricultural workshops and seminars
- **Expert Network**: Connect with agricultural experts and mentors

### 📊 Analytics & Management
- **Role-Based Access**: Admin, Investor, and Farmer user types
- **Progress Analytics**: Track learning and business metrics
- **Certificate Generation**: Automated PDF certificate creation

## 🛠 Technology Stack

### Frontend
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Beautiful iconography

### Backend & Database
- **PostgreSQL** - Primary database (Neon serverless)
- **Drizzle ORM** - Type-safe database queries
- **NextAuth.js** - Authentication and session management
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security

### State Management & Data Fetching
- **TanStack React Query** - Server state management
- **React Hook Form** - Form validation and management
- **Zod** - Runtime type validation

### File Management & Storage
- **Cloudinary** - Image and file storage
- **Vercel Blob** - Additional file storage
- **Local File System** - Document uploads

### Additional Libraries
- **Axios** - HTTP client
- **html2canvas & jsPDF** - Certificate generation
- **Google APIs** - Calendar integration for live sessions
- **date-fns** - Date manipulation utilities

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   └── dashboard/         # Dashboard pages
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── constants/            # Application constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── server/              # Backend logic
│   ├── db/              # Database schema and config
│   └── seeds/           # Database seeders
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── validator/           # Input validation schemas
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **pnpm** (recommended) or npm - Install pnpm: `npm install -g pnpm`
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **PostgreSQL database** - We recommend [Neon](https://neon.tech/) for serverless PostgreSQL

### Step-by-Step Installation Guide

#### Step 1: Clone the Repository
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd Agro_Youth1

# Verify you're in the correct directory
ls -la
```

#### Step 2: Install Dependencies
```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install project dependencies
pnpm install

# Alternative: If you prefer npm
# npm install
```

#### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
# Create the environment file
touch .env.local

# Open it in your preferred editor
# nano .env.local
# or
# code .env.local
```

Add the following environment variables to `.env.local`:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"
# Example for Neon: postgresql://user:pass@ep-example.us-east-1.aws.neon.tech/neondb

# Authentication Secrets
NEXTAUTH_SECRET="your_super_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"

# JWT Configuration
JWT_SECRET="your_jwt_secret_key_here"
SECRET_KEY="your_fallback_secret_key_here"

# Google OAuth (Optional - for live sessions feature)
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"
ADMIN_GOOGLE_REFRESH_TOKEN="admin_refresh_token"

# Cloudinary (Optional - for advanced file uploads)
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_key"
CLOUDINARY_API_SECRET="your_cloudinary_secret"

# Production URL (Optional)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**🔒 Security Note**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

#### Step 4: Database Setup

Set up your PostgreSQL database and configure the schema:

```bash
# Generate database migrations
pnpm generate

# Push the schema to your database
pnpm push

# Seed the database with initial data (user roles)
pnpm seed
```

**If you encounter database errors:**
- Ensure your `DATABASE_URL` is correct
- Verify your database is running and accessible
- Check that the database exists

#### Step 5: Run the Development Server

```bash
# Start the development server
pnpm dev

# Alternative commands:
# npm run dev
# yarn dev
# bun dev
```

The server will start on `http://localhost:3000`

#### Step 6: Verify Installation

1. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)
2. **Check the homepage** loads correctly
3. **Try registering** a new account to test the database connection
4. **Access the dashboard** after login to verify all features work

### 🛠 Development Tools

#### Database Management
```bash
# Open Drizzle Studio (database GUI)
pnpm studio

# View database in browser at http://localhost:4983
```

#### Build Commands
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run database migrations
pnpm migrate
```

### 🚨 Troubleshooting

#### Common Issues and Solutions

**1. Database Connection Issues**
```bash
# Check if DATABASE_URL is correct
echo $DATABASE_URL

# Test database connection
pnpm drizzle-kit introspect
```

**2. Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 pnpm dev
```

**3. Node Version Issues**
```bash
# Check Node version
node --version

# Use Node Version Manager (if installed)
nvm use 18
# or
nvm install 18 && nvm use 18
```

**4. Permission Errors (macOS/Linux)**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use pnpm instead of npm
```

**5. Missing Dependencies**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Environment Setup Verification

Create a simple test to verify your environment:

```bash
# Test database connection
pnpm drizzle-kit introspect

# Test build process
pnpm build

# Check TypeScript compilation
npx tsc --noEmit
```

### 📱 Mobile Testing

To test on mobile devices:

```bash
# Find your local IP address
# macOS/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Update NEXTAUTH_URL in .env.local to your IP:
# NEXTAUTH_URL="http://192.168.1.100:3000"

# Restart the dev server
pnpm dev
```

### 🚀 Production Deployment

For production deployment, ensure you:

1. Set production environment variables
2. Use a production database
3. Configure proper security headers
4. Set up domain and SSL
5. Configure file upload limits

```bash
# Build for production
pnpm build

# Test production build locally
pnpm start
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm push` - Push database schema changes
- `pnpm generate` - Generate database migrations
- `pnpm migrate` - Run database migrations
- `pnpm seed` - Seed database with initial data
- `pnpm studio` - Open Drizzle Studio for database management

## 🎯 Key Features Deep Dive

### User Roles & Permissions
- **Farmers**: Access courses, apply for funding, sell products, participate in community
- **Investors**: Review funding applications, provide mentorship, access analytics
- **Admins**: Full platform management, user oversight, content moderation

### Course Management
- Multi-level course structure with modules
- Progress tracking and completion certificates
- Interactive discussions and Q&A
- File attachments and multimedia support

### Investment Platform
- Structured application process for funding
- Document verification system
- Investor dashboard for application review
- Status tracking and communication tools

### Marketplace Integration
- Product catalog with detailed descriptions
- Inventory and pricing management
- Location-based buyer-seller matching
- Order processing and communication

### Privacy & Security
- Anonymous posting options
- Secure authentication with JWT
- Role-based access control
- Data encryption and protection

## 🔧 Database Schema

The application uses PostgreSQL with the following main entities:
- `users` - User accounts and profiles
- `roles` - Role-based permissions
- `course` - Learning content
- `courseModules` - Course structure
- `enrollments` - User course enrollment
- `certificates` - Achievement certificates
- `donationApplications` - Funding applications
- `products` - Marketplace items
- `liveSessions` - Interactive workshops
- `Post`, `Comment`, `Replies` - Community discussions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🌍 Impact

AgroYouth aims to:
- Empower 2,500+ young farmers in Liberia
- Provide 500+ digital learning resources
- Create 1,000+ agri-market opportunities
- Impact 50+ local communities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the agricultural community in Liberia**