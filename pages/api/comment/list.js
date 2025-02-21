import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent: new ObjectId(req.query._id) })
    .toArray(); //find() 안에 조건과 일치하는 데이터만 검색하는 가능
  res.status(200).json(result);
}
