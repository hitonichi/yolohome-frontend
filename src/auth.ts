import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';
import { z } from 'zod';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'credential',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          try {
            const headers: Record<string, any> = {
              'Content-Type': 'application/json',
            };
            const payload = {
              email,
              password,
            };

            const isMockMode = process.env.MOCK_MODE == 'true';

            let response;
            if (isMockMode) {
              response = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
              });
            } else {
              response = await fetch('https://cosmetic-backend.vercel.app/auth/logIn', {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
              });
            }

            if (!response.ok) return null;

            const userFromBe = await response.json();

            // return userFromBe;
            return {
              ...userFromBe.data,
              id: '001',
              name: userFromBe.data.userData.firstName + ' ' + userFromBe.data.userData.lastName,
              email: userFromBe.data.userData.email,
            };
          } catch (e) {}
        } else {
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider == 'google') {
        return true;
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user, trigger, session, account }) {
      if (token.exp && Date.now() > token.exp * 1000) {
        return null;
      }
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
