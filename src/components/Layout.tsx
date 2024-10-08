import React from "react";
// import { Prompt } from 'next/font/google'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTopButton from './BackToTop'
import ShortcutSocial from './ShortcutSocial'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <div>
            <Navbar />
<<<<<<< HEAD:src/components/layout.tsx
            <div className="py-16">
=======
            <div className="pt-16 md:pt-24 ">
>>>>>>> 239a68b5b908a43b7494813bf2af4af7e921db28:src/components/Layout.tsx
                {children}
                <ShortcutSocial />
                <BackToTopButton />
            </div>
            <Footer />
        </div>
    )
}