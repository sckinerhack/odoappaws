// AWS Amplify Configuration
// Configured for Cognito User Pool: us-east-2_6HWZrEoLU

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_6HWZrEoLU",
      userPoolClientId: "3h1i43cs6cd91dlg02o86m3j5j",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code", // 'code' | 'link'
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
