import React from "react";
// import { Prompt } from 'next/font/google'
import Navbar from './Nav/Navbar'
import Footer from './Footer'
import BackToTopButton from './BackToTop'
import ShortcutSocial from './ShortcutSocial'
import Header from "./Header";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <div className="relative bg-fixed bg-center bg-cover bg-no-repeat bg-opacity-20" style={{ backgroundImage: "url('/images/bg-map.jpg')" }}>
            {/* <img className="w-full fixed -z-10" src='/images/bg-map.jpg' /> */}
            <Header />
            {children}
            <ShortcutSocial />
            <BackToTopButton />
            <Footer />
        </div>
    )
}