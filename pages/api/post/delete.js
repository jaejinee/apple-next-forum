import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    let toBeDeleted = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body) });

    if (toBeDeleted.author == session.user.email) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body) });
      return res.status(200).json("삭제완료");
    } else {
      return res.status(500).json({ status: "Unauthorized" });
    }
  }
}
