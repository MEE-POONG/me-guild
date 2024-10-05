import { Prompt } from 'next/font/google'
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
        <>
            <Navbar />
            <div className="py-16 md:py-24 ">
                {children}
                <ShortcutSocial />
                <BackToTopButton />
            </div>
            <Footer />
        </>
    )
}