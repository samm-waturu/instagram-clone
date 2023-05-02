import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    /*
    customizes login page basic mode://
    theme : {
    logo:'https://links.papareact.com/sq0,
    brandColor:'#f13287',
    colorSchema: 'auto'
    },
     */
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
      async session({session, token, user}) {
          session.user.username = session.user?.name?.split(" ").join("").toLocaleLowerCase();
          session.user.uid = token.sub
          return session
      },
    },
})