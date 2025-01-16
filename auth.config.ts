import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    /**
     * Adds the user's name and other fields to the session object.
     */
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          name: token.name || '', // Add name to session.user
          email: token.email || '', // Ensure email is included
          id: token.sub || '', // Add user ID if required
        };
      }
      return session;
    },
    /**
     * Adds user details to the JWT when logging in.
     */
    jwt: async ({ token, user}) => {
      if (user) {
        token.name = user?.user_name;
        token.email = user?.user_email;
        token.sub = user.id;
      }
      // console.log('Toker from BE=> ', token)
      return token;
    },
    /**
     * Handle route authorization.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers here (e.g., Credentials, Google, etc.)
};
