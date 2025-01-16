# Next.js Boilerplate with Authentication and Payments

A modern, feature-rich boilerplate for building scalable web applications using Next.js 15, NextAuth, MongoDB, and Razorpay integration.

## Features

- 🔐 **Authentication (NextAuth)**
  - Email Magic Link Authentication
  - Google OAuth Integration
  - MongoDB Adapter for session management
- 💳 **Payment Integration**
  - Razorpay Payment Gateway
  - Subscription Management
  - Payment History Tracking
- 🎨 **UI/UX**
  - Tailwind CSS for styling
  - Responsive Design
  - Dark Mode Support
- 🛠 **Development Tools**
  - ESLint Configuration
  - Turbopack for faster development
  - Path Aliases (@/)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 |
| Authentication | NextAuth.js |
| Database | MongoDB |
| Styling | Tailwind CSS |
| Email Service | Resend |
| Payment Gateway | Razorpay |
| Development | Turbopack |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/nextjs-boilerplate.git
cd nextjs-boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file with the following variables:

```bash
MongoDB
MONGODB_URI=your_mongodb_uri
NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
Google OAuth
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
Resend
RESEND_API_KEY=your_resend_api_key
Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

- `components/`: Reusable UI components.
- `lib/`: Utility functions and API services.
- `pages/`: Application routes.
- `public/`: Static assets.
- `styles/`: Global styles and theme.
- `types/`: TypeScript types.
- `utils/`: Helper functions.


## Features in Detail

### 🔐 Authentication
- **Email Magic Link Authentication**: Passwordless login via email
- **Google OAuth**: One-click social login
- **Session Management**: Secure session handling with MongoDB
- **Protected Routes**: Route protection for authenticated users

### 💳 Payment Integration
- **Razorpay Gateway**: Secure payment processing
- **Subscription Plans**: 
  - Basic Plan
  - Pro Plan
- **Payment History**: Detailed transaction tracking
- **Secure Verification**: Server-side payment verification

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System-preferred color scheme support
- **Loading States**: Smooth loading transitions
- **Notifications**: Toast notifications for user feedback
- **Dashboard**: User-friendly admin interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: [krupesh.app@gmail.com](mailto:krupesh.app@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/krupesh-app/nextjs-boilerplate/issues)
- 📖 Documentation: [Wiki](https://github.com/krupesh-app/nextjs-boilerplate/wiki)

---

<p align="center">Made with ❤️ by Krupesh</p>