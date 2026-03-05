import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // On first sign-in, attach Google profile info to the token
            if (account && profile) {
                token.googleId = account.providerAccountId;
                token.name = profile.name;
                token.email = profile.email;
                token.picture = (profile as { picture?: string }).picture;
            }
            return token;
        },
        async session({ session, token }) {
            // Expose token fields on the session object
            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.picture as string;
            }
            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl + "/dashboard";
        },
    },
});

export { handler as GET, handler as POST };

