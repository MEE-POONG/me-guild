import React from "react";
// import { Prompt } from 'next/font/google'
import Navbar from './Nav/Navbar'
import Footer from './Footer'
import BackToTopButton from './BackToTop'
import ShortcutSocial from './ShortcutSocial'
import Header from "./Header";
import Image from "next/image";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <div className="relative bg-fixed bg-center bg-cover bg-no-repeat " >
            <Image className="w-full h-full fixed -z-10 opacity-20" src='/images/bg-map.jpg' alt="bg-layout" />
            <Header />
            {children}
            <ShortcutSocial />
            <BackToTopButton />
            <Footer />
        </div>
    )
}