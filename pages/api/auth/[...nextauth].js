import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23liHHgfdZS8ptPl3E",
      clientSecret: "6c911d3ee546e6c50da33a82a369942fc91904bc",
    }),
  ],
  secret: "1234",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
