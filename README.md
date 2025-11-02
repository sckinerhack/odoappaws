# 📝 AWS Amplify Todo App with Authentication

A modern, full-featured todo application built with React and AWS Amplify, featuring complete authentication with email verification and password reset functionality.

![React](https://img.shields.io/badge/React-19.1-blue)
![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-6.13-orange)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)

## ✨ Features

### 🔐 Authentication

- **User Registration** - Create new accounts with email and password
- **Email Verification** - Users must verify their email with a code before accessing the app
- **Login/Logout** - Secure authentication flow with AWS Cognito
- **Forgot Password** - Password reset via verification code
- **Protected Routes** - Automatic redirection for unauthenticated users

### ✅ Todo Management

- **Add Todos** - Create new todo items
- **Mark Complete** - Toggle todo completion status
- **Delete Todos** - Remove unwanted todos
- **User-specific** - Each user only sees their own todos
- **Persistent Storage** - Todos are stored in browser localStorage
  - Note: For production, consider integrating AWS AppSync or DynamoDB for cloud storage

### 🎨 User Interface

- **Modern Design** - Clean, gradient-based UI
- **Responsive** - Works on desktop, tablet, and mobile
- **Intuitive** - Easy to use with clear visual feedback
- **Accessible** - Proper form labels and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.14+ recommended)
- An AWS account
- npm or yarn package manager
- AWS Amplify CLI (optional, for easier setup)

### Installation

1. **Clone or download this project**

2. **Install dependencies**

```bash
npm install
```

3. **Set up AWS Amplify** (see [SETUP.md](./SETUP.md) for detailed steps)

   **Option A: Using AWS Amplify Console (Recommended)**

   - Create an Amplify app in AWS Console
   - Set up Cognito User Pool with email authentication
   - Copy your configuration to `src/amplifyconfiguration.js`

   **Option B: Using Amplify CLI**

   ```bash
   npm install -g @aws-amplify/cli
   amplify init
   amplify add auth
   amplify push
   ```

4. **Configure the app**

   Update `src/amplifyconfiguration.js` with your AWS Cognito details:

   ```javascript
   userPoolId: 'YOUR_USER_POOL_ID',
   userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID',
   ```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Register a new account
   - Verify your email with the code sent to your inbox
   - Start using the app!

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get up and running in 5 minutes
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions and troubleshooting

## 🏗️ Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── ForgotPassword.jsx     # Password reset page (with code verification)
│   │   ├── VerifyEmail.jsx        # Email verification page (code-based)
│   │   ├── TodoApp.jsx            # Main todo application
│   │   └── PrivateRoute.jsx       # Route protection component
│   ├── contexts/
│   │   └── AuthContext.jsx        # Authentication context provider
│   ├── amplifyconfiguration.js    # AWS Amplify configuration
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # Application styles
│   └── main.jsx                   # App entry point
├── QUICKSTART.md                  # Quick start guide
├── SETUP.md                       # Detailed setup guide
└── package.json                   # Dependencies and scripts
```

## 🛠️ Technologies Used

- **React 19.1** - UI library
- **Vite 7.1** - Build tool and dev server
- **AWS Amplify 6.13** - Backend services
  - AWS Cognito - User authentication and management
  - Amplify Auth - Authentication library
- **React Router DOM 7.9** - Client-side routing

## 🔒 Security

- Email verification with code required before app access
- AWS Cognito handles secure user authentication
- Password requirements (minimum 6 characters, configurable in Cognito)
- Secure token-based authentication
- User pool policies can be configured in AWS Console

**Important:** Configure your Cognito User Pool policies for production use!

## 🎯 Usage

### Register a New Account

1. Click "Register" on the login page
2. Enter your email and password
3. Click "Register"
4. Check your email for the verification code
5. Enter the code on the verification page

### Login

1. Enter your verified email and password
2. Click "Login"
3. You'll be redirected to the todo app

### Manage Todos

- **Add:** Type in the input field and click "Add"
- **Complete:** Click the checkbox next to a todo
- **Delete:** Click the "Delete" button

### Reset Password

1. Click "Forgot Password?" on the login page
2. Enter your email and click "Send Reset Code"
3. Check your email for the verification code
4. Enter the code and your new password
5. Click "Reset Password"

## 🚢 Deployment

This app can be deployed to:

- **AWS Amplify Hosting** - Integrated with AWS Amplify
- **Vercel** - Zero-config deployment
- **Netlify** - Continuous deployment from Git

Before deploying:

1. Configure Cognito User Pool policies for production
2. Set up proper environment variables for Amplify config
3. Configure CORS and allowed callback URLs in Cognito
4. Test thoroughly with real users

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for educational purposes.

## 🆘 Support

Having issues? Check out:

- [SETUP.md](./SETUP.md) - Troubleshooting section
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [React Documentation](https://react.dev)

## 🎨 Customization Ideas

- Add todo categories or tags
- Implement due dates and reminders
- Add priority levels
- Enable todo editing
- Add dark mode
- Implement todo search/filter
- Add social authentication (Google, GitHub, etc.)
- Enable todo sharing between users

---

Built with ❤️ using React and AWS Amplify
