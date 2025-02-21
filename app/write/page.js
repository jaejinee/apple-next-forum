// "use client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  let session = await getServerSession(authOptions);

  if (!session) return <div>로그인 먼저</div>;

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" type="text" />
        <input name="content" placeholder="글내용" type="text" />

        <input
          type="file"
          accept="image/*"
          // onChange={() => {}}
          // onChange={async (e) => {
          //   let file = e.target.files[0]; // 파일 정보
          //   let fileName = encodeURIComponent(file.name); //파일명 안전하게 인코딩(깨지지 않게)
          //   let res = await fetch(`/api/post/image?file=${fileName}`);
          //   res = await res.json();
          //   console.log(res);
          // }}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
