import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import ImgInput from "./ImgInput";

export default async function Write() {
  // let session = await getServerSession(authOptions);
  // if (!session) return <div>로그인 먼저</div>;

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" type="text" />
        <input name="content" placeholder="글내용" type="text" />
        <button type="submit">버튼</button>
      </form>
      <ImgInput />
    </div>
  );
}
