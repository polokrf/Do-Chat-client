import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            'https://do-chat-server.onrender.com/auth/login',
            credentials,
          );
         
          const user = res?.data?.userData;
          const token = res?.data?.token
         
          if (user?.email) {
            return {...user,accessToken:token};
          } else {
            return null;
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
      const res = await axios.post(
        'https://do-chat-server.onrender.com/auth/google',
        newUser,
      );
      
      user.role = res.data?.role;
      user.userId = res.data?.userId;
      user.accessToken = res.data?.token;
      
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
     
      if (session?.user) {
        session.user.role = token?.role;
        session.user.userId = token?.userId;
        session.accessToken = token.accessToken;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      
      if (user) {
        token.role = user?.role;
        token.userId = user?.userId
        token.accessToken = user.accessToken;
       
      }
      return token;
    },
  },
};
