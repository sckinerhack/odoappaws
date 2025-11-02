# AWS Amplify Todo App - Setup Instructions

## Prerequisites

- Node.js installed on your machine (v20.14+ recommended)
- An AWS account ([Create one here](https://aws.amazon.com/))
- Basic understanding of AWS services (optional but helpful)

## AWS Amplify Setup

There are two ways to set up AWS Amplify for this project:

### Option A: Manual Setup via AWS Console (Recommended for Beginners)

#### 1. Create a Cognito User Pool

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **Amazon Cognito**
3. Click **Create user pool**

#### 2. Configure Sign-in Experience

1. **Provider types**: Select **Cognito user pool**
2. **Cognito user pool sign-in options**: Check **Email**
3. Click **Next**

#### 3. Configure Security Requirements

1. **Password policy**: Choose your preferred policy (default is fine)
   - Minimum length: 6 characters (or more for better security)
2. **Multi-factor authentication**: Choose **No MFA** (or configure if desired)
3. **User account recovery**: Select **Email only**
4. Click **Next**

#### 4. Configure Sign-up Experience

1. **Self-service sign-up**: Enable
2. **Attribute verification and user account confirmation**:
   - Select **Send email message, verify email address**
3. **Required attributes**: Select **email**
4. Click **Next**

#### 5. Configure Message Delivery

1. **Email provider**: Choose **Send email with Cognito** (for testing)
   - For production, configure SES (Simple Email Service)
2. Click **Next**

#### 6. Integrate Your App

1. **User pool name**: Enter a name (e.g., `todo-app-users`)
2. **App client name**: Enter a name (e.g., `todo-web-client`)
3. **Client secret**: Select **Don't generate a client secret**
4. Click **Next**

#### 7. Review and Create

1. Review all settings
2. Click **Create user pool**
3. **IMPORTANT**: Copy the following values:
   - **User pool ID** (e.g., `us-east-1_XXXXXXXXX`)
   - **App client ID** (found under "App integration" tab)

### Option B: Using Amplify CLI (Advanced)

#### 1. Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

#### 2. Configure Amplify

```bash
amplify configure
```

Follow the prompts to set up your AWS credentials.

#### 3. Initialize Amplify in Your Project

```bash
cd your-project-directory
amplify init
```

#### 4. Add Authentication

```bash
amplify add auth
```

Choose the following options:

- **Default configuration with Social Provider**: No
- **How do you want users to sign in?**: Email
- **Do you want to configure advanced settings?**: No

#### 5. Push to AWS

```bash
amplify push
```

This will create the resources in your AWS account and generate the configuration file.

## Configure Your App

### Update Configuration File

1. Open `src/amplifyconfiguration.js` in your project
2. Replace the placeholder values with your Cognito configuration:

```javascript
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "YOUR_USER_POOL_ID", // e.g., 'us-east-1_XXXXXXXXX'
      userPoolClientId: "YOUR_USER_POOL_CLIENT_ID", // e.g., '1234567890abcdefghijklmnop'
      identityPoolId: "YOUR_IDENTITY_POOL_ID", // Optional
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 6,
        requireLowercase: false,
        requireUppercase: false,
        requireNumbers: false,
        requireSpecialCharacters: false,
      },
    },
  },
};
```

### Finding Your Configuration Values

**If you used AWS Console (Option A):**

- User Pool ID: Cognito > User pools > [Your pool] > User pool overview
- App Client ID: Cognito > User pools > [Your pool] > App integration tab > App clients

**If you used Amplify CLI (Option B):**

- The configuration is automatically generated in `src/aws-exports.js`
- You can import and use it directly

## Running the App

1. Install dependencies (if not already done):

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Testing the App

### 1. Register a New Account

- Click "Register" on the login page
- Enter an email and password (minimum 6 characters)
- Click "Register"
- Check your email for the **verification code**
- Enter the code on the verification page

### 2. Login

- Go to the login page
- Enter your verified email and password
- Click "Login"
- You should now see the Todo app

### 3. Test Forgot Password

- On the login page, click "Forgot Password?"
- Enter your email and click "Send Reset Code"
- Check your email for the **verification code**
- Enter the code and your new password
- Click "Reset Password"

## Important Notes

### Email Verification

- Users MUST verify their email with a code before they can access the app
- If a user tries to login without verifying, they'll be redirected to the verification page
- Users can resend the verification code if needed

### Email Delivery

- **Development**: Cognito sends emails directly (limited to 50 emails/day)
- **Production**: Configure Amazon SES for higher email limits and better deliverability
  1. Go to Amazon SES in AWS Console
  2. Verify your domain or email address
  3. In Cognito User Pool settings, switch from Cognito to SES

### Security Best Practices

- Never commit your AWS credentials or configuration with real values to public repositories
- Use environment variables for sensitive data in production
- Configure proper password policies in Cognito User Pool settings
- Enable MFA (Multi-Factor Authentication) for production apps
- Review and configure Cognito User Pool policies for your use case

### AWS Costs

- **Cognito**: Free tier includes 50,000 MAUs (Monthly Active Users)
- **SES**: Free tier includes 62,000 emails per month (when called from EC2)
- Monitor your usage in AWS Billing Dashboard

## Troubleshooting

### Emails not arriving

- Check your spam folder
- Verify that your Cognito User Pool is configured to send emails
- For production, set up Amazon SES and verify your domain
- Check AWS CloudWatch logs for email delivery issues

### "UserNotConfirmedException" error

- User hasn't verified their email yet
- Redirect them to the verification page
- They can resend the verification code

### "NotAuthorizedException" error

- Incorrect email or password
- User might not exist
- Check Cognito User Pool for user status

### Configuration errors

- Verify `userPoolId` and `userPoolClientId` are correct
- Ensure the User Pool is in the same region as specified
- Check that the App Client doesn't require a client secret

### App not loading

- Check browser console for errors
- Verify Amplify configuration is correct in `src/amplifyconfiguration.js`
- Ensure all dependencies are installed (`npm install`)
- Clear browser cache and try again

## Next Steps

- Customize the UI to match your brand
- Add more features (edit todos, categories, due dates, etc.)
- Set up Amazon SES for production email delivery
- Configure custom email templates in Cognito
- Add backend API with AWS AppSync or API Gateway
- Deploy to AWS Amplify Hosting
- Add more authentication methods (Google, Facebook, etc.)
- Enable MFA for enhanced security

## Support Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [AWS Amplify Discord Community](https://discord.gg/amplify)
- [AWS Support](https://aws.amazon.com/support/)

## Additional Configuration

### Custom Email Templates

1. Go to Cognito User Pool > Messaging > Email
2. Customize verification and password reset email templates
3. Add your branding and custom messages

### Password Policies

1. Go to Cognito User Pool > Sign-in experience > Password policy
2. Configure minimum length, character requirements
3. Set password expiration and history

### Advanced Security

1. Enable Advanced Security Features in Cognito
2. Configure risk-based adaptive authentication
3. Set up compromised credentials check
4. Enable account takeover protection
