"use client";
import { useState } from "react";

export default function ImgInput() {
  let [src, setSrc] = useState("");

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files[0]; // 파일 정보
          let fileName = encodeURIComponent(file.name); //파일명 안전하게 인코딩(깨지지 않게)
          let res = await fetch(`/api/post/image?file=${fileName}`);
          res = await res.json();

          //S3 업로드
          const formData = new FormData();
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          let uploadedImg = await fetch(res.url, {
            method: "POST",
            body: formData,
          });

          if (uploadedImg.ok) {
            setSrc(uploadedImg.url + "/" + fileName);
          } else {
            console.log("실패");
          }
        }}
      />
      <img src={src || null} alt="" />
    </>
  );
}
