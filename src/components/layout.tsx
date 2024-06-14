import { Prompt } from 'next/font/google'
import Navbar from './Navbar'
import Footer from './Footer'

const promt = Prompt({
    weight: '400',
    subsets: ['latin'],
})

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <div className={promt.className}>
            <Navbar/>
            <div className="py-16 md:py-24">
                {children}
            </div>
            <Footer/>
        </div>
    )
}