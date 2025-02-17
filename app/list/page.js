import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  let rawResult = await db.collection("post").find().toArray();
  let result = rawResult.map((post) => ({
    ...post,
    _id: post._id.toString(),
  }));

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
