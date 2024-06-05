import { Prompt } from 'next/font/google'
import IndexNavbar from './IndexNavbar'

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
        <section className={promt.className}>
            <IndexNavbar/>
            <div className="py-12">
                {children}
            </div>
        </section>
    )
}