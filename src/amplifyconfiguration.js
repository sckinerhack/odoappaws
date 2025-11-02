// AWS Amplify Configuration
// TODO: Replace these values with your actual AWS Amplify configuration
// You can get these from AWS Amplify Console or by running 'amplify pull'

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'YOUR_USER_POOL_ID', // e.g., 'us-east-1_XXXXXXXXX'
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID', // e.g., '1234567890abcdefghijklmnop'
      identityPoolId: 'YOUR_IDENTITY_POOL_ID', // Optional, e.g., 'us-east-1:12345678-1234-1234-1234-123456789012'
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code', // 'code' | 'link'
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

export default amplifyConfig;

