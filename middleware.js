import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // console.log("\nURL:::::::", request.nextUrl); // 유저가 요청 중인 URL
  // console.log("\n쿠키:::::::", request.cookies); // 유저의 쿠키
  // console.log("\n헤더:::::::", request.headers.get("user-agent")); // 유저의 헤더정보: 이전 방문페이지, 사용 중인 OS, 브라우저, 선호하는 언어, IP, 쿠키 등

  // NextResponse.next(); // 통과
  // NextResponse.redirect(); // 다른 페이지로 이동, 주소도 변경
  // NextResponse.rewritet(); // 다른 페이지로 이동, 주소는 그대로

  ////////////////////////////

  // write 페이지 접속 시 JWT 토큰 로그인 상태 확인 후 로그인 상태가 아니면 로그인 페이지로 리다이렉트
  const session = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith("/write")) {
    // if (session == null) {
    //   return NextResponse.redirect("http://localhost:3000/api/auth/signin");
    // }
  }

  // list로 시작하는 모든 경로 페이지에 적용
  if (request.nextUrl.pathname.startsWith("/list")) {
    // console.log(
    //   "\n::::::::::::::::",
    //   new Date(),
    //   request.headers.get("sec-ch-ua-platform")
    // );
    return NextResponse.next();
  }

  ///////////////////////
  //쿠키

  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제

  const response = NextResponse.next();
  response.cookies.set({
    name: "mode",
    value: "dark",
    maxAge: 3600,
    httpOnly: true, // 유저가 자바스크립트로 쿠키조작 방지 가능
  });
  return response; //쿠키생성
}
