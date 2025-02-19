import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
});


// async signIn({ user }) {
    //   if (allowedEmails.includes(user.email!)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },