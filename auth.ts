import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    // async signIn({ account, profile }) {
    //   if (profile?.email && allowedEmails.includes(profile.email)) {
    //     return true;
    //   }
    //   return "/error"; // redirige a tu página de error
    // },
    async signIn({ user }) {
      const email = user.email!;

      if (allowedEmails.includes(email)) {
        return true;
      }

      // 🔒 Log de intento de acceso no autorizado
      console.warn(`Intento de acceso no autorizado con el email: ${email}`);

      return false;
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
