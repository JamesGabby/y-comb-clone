import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { createAuthor, fetchAuthorById, fetchLastAuthor } from "./lib/supabase"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ 
      user: { name, email, image }, //name email image
      profile: { login: githubUsername, bio, given_name, family_name } //github(login, email, bio) google(given_name family_name name email)
    }) {
      const googleUsername = given_name+family_name
      const username = githubUsername ? githubUsername : googleUsername
      const biography = bio ? bio : ''
      const { id } = await fetchLastAuthor()
      const existingUser = await fetchAuthorById(id+1)

      if (existingUser?.length === 0) {
        await createAuthor(id+1, name, username, email, image, biography)
      }

      return true
    }
  } 
})


// callbacks: {
//   async signIn({ 
//     user: { name, email, image, id: googleId }, 
//     profile: { id: githubId } 
//   }) {
//     const id = githubId ? githubId : googleId
//     const existingUser = await fetchAuthorById(id)

//     if (existingUser?.length === 0) {
//       await createAuthor(id, name, email, image)
//     }

//     return true
//   }
// } 