import { Prompt } from 'next/font/google'
import IndexNavbar from './IndexNavbar'
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
            <IndexNavbar/>
            <div className="py-24">
                {children}
            </div>
            <Footer/>
        </div>
    )
}