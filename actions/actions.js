"use server";
import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache";

// 서버 API로 변함

export async function handleSubmit(formData, request) {
  //formData안에 유저가 보낸 데이터 내장
  const db = (await connectDB).db("forum");
  await db.collection("post_test").insertOne({ title: formData.get("title") });
  console.log(formData.get("title"));
  // revalidatePath("/write2"); // 캐시를 지우고 다시 렌더링 = 새로고침

  const referer = request.headers.get("referer");
  if (referer) {
    revalidatePath(new URL(referer).pathname);
  }
}
