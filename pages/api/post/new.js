import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Cors from "cors";

// CORS 설정: 모든 origin 허용 (일단 테스트용)
const cors = Cors({
  methods: ["POST", "GET"],
  origin: "*",
  optionsSuccessStatus: 200,
});

// 미들웨어 실행 함수
async function runMiddleware(req, res, fn) {
  await runMiddleware(req, res, cors);

  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (session) {
    req.body.author = session.user.email;
  }

  if (req.method == "POST") {
    if (req.body.title == "") {
      return res.status(500).json("내용을 입력해주세요");
    }
    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne(req.body);
    return res.redirect(302, "/list");
  }
}
