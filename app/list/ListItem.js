"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((post, i) => (
        <div className="list-item" key={post._id}>
          <Link href={`./detail/${post._id}`}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </Link>
          <Link href={`/edit/${post._id}`}>✏️</Link>
          <span
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: post._id,
              })
                .then((r) => {
                  if (r.status == 200) {
                    return r.json();
                  } else {
                    //서버가 에러코드전송시 실행할코드
                  }
                })
                .then((result) => {
                  //성공시 실행할코드
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                })
                .catch((error) => {
                  //인터넷문제 등으로 실패시 실행할코드
                  console.log(error);
                });
            }}
          >
            🗑️
          </span>
        </div>
      ))}
    </div>
  );
}
