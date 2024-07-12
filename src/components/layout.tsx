import { Prompt } from 'next/font/google'
import Navbar from './Navbar'
import Footer from './Footer'

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
            </div>
            <Footer />
        </>
    )
}