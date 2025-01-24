import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login'
  },
  session:{
    strategy: 'jwt',
    maxAge: 60*60*6,
    updateAge: 60,
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
          email: token.email || '',
          id: token.sub || '', // Add user ID if required
        };
      }
      // console.log('Session BE => ', session.user)
      return session;
    },
    /**
     * Adds user details to the JWT when logging in.
     */
    jwt: async ({ token, user}) => {
      // console.log('User name =>',user.name)
      
      if (user) {
        token.name = user?.name;
        token.email = user?.email;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.type = (user as any)?.user_type;
        if(token.type === 'manager'){
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          token.sub = (user as any)?.manager_id;
        }else{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          token.sub = (user as any)?.agent_id;
        }
        
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
