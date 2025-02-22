import { handleSubmit } from "@/actions/actions";
import { connectDB } from "@/util/database";

export default async function Write2() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" type="text" />
        <button type="submit">버튼</button>
      </form>
      {result ? result.map((a, i) => <p key={i}>글제목: {a.title}</p>) : ""}
    </div>
  );
}
