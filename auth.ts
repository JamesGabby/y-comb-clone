import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createAuthor, fetchAuthorByEmail, fetchLastAuthor } from "./lib/supabase";
import { generateRandomNumbers } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const { name, email, image } = user; // Destructuring user object
        const githubUsername = profile?.login || null; // GitHub username
        const username = githubUsername || profile?.given_name+generateRandomNumbers(); // Fallback username
        const biography = profile?.bio || ""; // Default bio to empty string

        // Fetch last author to get last id and increment for new id value
        const { id: idFromLastAuthor } = await fetchLastAuthor()
        const id = idFromLastAuthor+1

        // Fetch existing author by email (unique identifier)
        const existingUser = await fetchAuthorByEmail(email);

        // Create a new author if they do not exist
        if (!existingUser) {
          await createAuthor({ id, name, username, email, image, bio: biography });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in if an error occurs
      }
    },
  },
});
