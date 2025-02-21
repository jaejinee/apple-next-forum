"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list?_id=${_id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      <hr />
      {data.length > 0
        ? data.map((item, i) => {
            return (
              <div key={item._id}>
                <p>{item.content}</p>
              </div>
            );
          })
        : ""}
      <input
        type="text"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(comment);
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment, _id }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
