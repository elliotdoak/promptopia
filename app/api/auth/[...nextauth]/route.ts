import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

// next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface ProviderProfile extends Profile {
    picture: string;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            if(session?.user){
                const sessionUser = await User.findOne({email: session.user.email});
                session.user.id = sessionUser._id.toString();
                return session;
            }
            return {} as DefaultSession; // Return an empty DefaultSession object
        },
        async signIn({ profile }) {
            profile as ProviderProfile;
            console.log('profile', profile)
            try {
                await connectToDB();

                // check if user already exists
                const userExists = await User.findOne({ email: profile?.email ? profile.email : '' });
            

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
})

export { handler as GET, handler as POST};