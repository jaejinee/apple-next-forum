import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  // await db.collection("post").updateOne({수정할 게시물 id 정보}, { $set: { title: "수정할 제목", content: "수정할 내용", } });

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} type="text" />
        <input name="content" defaultValue={result.content} type="text" />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result._id.toString()}
          type="text"
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
