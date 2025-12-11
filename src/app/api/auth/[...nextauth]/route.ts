import NextAuth, { SessionStrategy ,Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

import { JWT } from "next-auth/jwt";
export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label:"Email",type:"email"},
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {

         if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");

     
        if (credentials.password !== user.password) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }:{
      token:JWT;
      // user?: { id?: string; name?: string; email?: string; role?: string } | undefined;
user:any;
    }) {
      if (user) {
      
        token.role = user.role;
        token.id = user.id;
        token.name = user.name
      }
      return token;
    },

    async session({ session, token }: {
      session:Session;
      token:JWT
    }):Promise<Session> {
      
      if(session.user){
   session.user ={

      id: token.id as string,
        name: token.name as string,
        role: token.role as string,
        email: session.user?.email ?? null,
      };
      }
       
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
