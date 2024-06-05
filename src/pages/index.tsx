import Link from "next/link";
import React from "react"; 


export default function Home() {
  return (
    // <div className="stencil ">
    //   Welcome
    // </div>
    <div className="relative w-screen h-screen flex justify-center items-center bg-black/45">
      <img src="/images/bg04.webp"
        className="absolute w-full h-full object-cover lg:object-fill -z-10"
        alt=""
      />
      <div className="text-center">
        <h2 className="text-white font-bold text-5xl mb-24">Welcome to Me Guild</h2>
        <button className="text-white bg-black px-8 py-3 rounded-full shadow-lg hover:ring-2 ring-amber-400">
          <Link href="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}
