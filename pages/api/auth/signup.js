import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let hash = await bcrypt.hash(req.body.password, 10); // 비번 암호화
    req.body.password = hash; // 암호화된 비번으로 교체

    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(req.body); //user_cred 도큐먼트 생성 후 저장
    res.status(200).json({ message: "회원가입 성공" });
  }
}
