"use client";

import { useEffect, useState } from "react";

export default function Comment({ _id }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  let [refresh, setRefresh] = useState(false); // ✅ 댓글 추가 후 갱신 트리거

  useEffect(() => {
    fetch(`/api/comment/list?_id=${_id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [refresh]);

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
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment, _id }),
          }).then(() => {
            setComment(" "); // ✅ 입력창 초기화
            setRefresh((prev) => !prev); // ✅ refresh 값 변경 → useEffect 실행 유도
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
