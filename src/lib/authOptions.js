import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            'http://localhost:5000/auth/login',
            credentials,
          );
          const user = res.data;
          if (user?.email) {
            return user;
          } else {
            
            return null;
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user) {
        return false;
      }
      const newUser = {
        email: user.email,
        name: user.name,
        image: user.image,
        authProvider: account.provider,
      };
      const res = await axios.post('http://localhost:5000/auth/google',newUser);
      

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.role = token?.role;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user?.role;
        // token.image=user?.userImage
      }
      return token;
    },
  },
};
