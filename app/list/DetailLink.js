"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/");
      }}
    >
      페이지 이동
    </button>
  );
}
