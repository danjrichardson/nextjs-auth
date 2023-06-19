import { AuthOptions, User } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"
import CredentialsProvider from "next-auth/providers/credentials"
import { Amplify, Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

// How to refresh Cognito tokens: https://github.com/aws-amplify/amplify-js/issues/446#issuecomment-389384338
// TODO: Add middleware to all api requests to do the above and refresh token if it needs to.

Amplify.configure({
  Auth: {
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
  },

});

const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER
    }),
    CredentialsProvider({
      name: "Sign in Cognito Credentials",
      credentials: {
        username: { 
          label: "Username", 
          type: "text", 
          placeholder:"Enter Your Username..." 
        },
        password: { 
          label: "Password", 
          type: "password", 
          placeholder:"Enter Your Password..." 
        }
      },
      async authorize(credentials) {
        const { username, password } = credentials as Record<string, string>;
        try {
          const user:CognitoUser = await Auth.signIn(username, password);
          console.log('Authorized', user);
          //user.authenticateUser()
          // TODO: Authenticated user? Get tokens?
          return {
            id: user.getUsername(),
            name: 'GET NAME',
            email: username,
            image: 'GET IMAGE FROM COGNITO?'
          } as User;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch {
          return null;
        }
      },
    })
],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('sign in', {user, account, profile})
      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('call backend for different token?')
      return token
    }
  }
}

export default authOptions;
