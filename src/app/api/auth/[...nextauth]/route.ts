import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers/oauth";

const InstagramProvider: OAuthConfig<any> = {
  id: "instagram",
  name: "Instagram",
  type: "oauth",

  authorization: {
    url: "https://www.facebook.com/v19.0/dialog/oauth",
    params: {
      scope: [
        "instagram_basic",
        "instagram_manage_insights",
        "pages_show_list",
        "pages_read_engagement",
      ].join(","),
    },
  },

  token: {
    url: "https://graph.facebook.com/v19.0/oauth/access_token",
  },

  clientId: process.env.META_APP_ID!,
  clientSecret: process.env.META_APP_SECRET!,

  profile() {
    return {
      id: "instagram-user",
      name: "Instagram Business",
      email: null,
      image: null,
    };
  },
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/yt-analytics.readonly",
            "https://www.googleapis.com/auth/youtube.readonly"
          ].join(" "),
        }},
    }),
    InstagramProvider,
  ],
  
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
}

};

const handler = NextAuth(authOptions);  
export { handler as GET, handler as POST };