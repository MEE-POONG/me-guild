import React from "react";
// import { Prompt } from 'next/font/google'
import Navbar from './Navbar'
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
        <div>
            <Header />
            {/* <div className="h-[5000px]">

            </div> */}
            <div className="pt-16 md:pt-24 ">
                {children}
                <ShortcutSocial />
                <BackToTopButton />
            </div>
            <Footer />
        </div>
    )
}