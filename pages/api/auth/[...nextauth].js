import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
import RedditProvider from 'next-auth/providers/reddit'

export const authOptions = {
 // Configure one or more authentication providers
 providers: [
  // AppleProvider({
  //  clientId: process.env.APPLE_ID,
  //  clientSecret: process.env.APPLE_SECRET,
  // }),
  // GithubProvider({
  //  clientId: process.env.GITHUB_ID,
  //  clientSecret: process.env.GITHUB_SECRET,
  // }),
  // GoogleProvider({
  //  clientId: process.env.GOOGLE_CLIENT_ID,
  //  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // }),
  RedditProvider({
   clientId: process.env.REDDIT_CLIENT_ID,
   clientSecret: process.env.REDDIT_CLIENT_SECRET,
  }),
  // ...add more providers here
 ],
}

export default NextAuth(authOptions)
