// @ts-nocheck


import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    
  // Configure one or more authentication providers
  providers: [
        GithubProvider({
        
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackUrl: "http://localhost:3000/api/auth/callback/github",
    }),
    // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    
}

export default NextAuth(authOptions)