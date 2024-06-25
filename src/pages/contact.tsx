import Layout from "@/components/layout"
import Link from "next/link";
import { PiDiscordLogoBold } from "react-icons/pi";

const ContactPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl text-center underline font-bold">CONTACT</h2>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.4107882244025!2d102.09944187587877!3d14.96988496792744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31194d8e8317c351%3A0xd84c052ad6cf5c55!2sME%20PROMPT%20TECHNOLOGY!5e0!3m2!1sen!2sth!4v1719291738230!5m2!1sen!2sth"
                    className="w-full h-[450px] mt-5 shadow-md shadow-gray-300"
                    loading="lazy" >
                </iframe>
                <div className="mt-10 p-5 md:p-8 shadow-inner shadow-gray-300 rounded-md ">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <p className="font-bold text-lg">Contact us</p>
                            <p>Address: <span>Mueang Nakhon Ratchasima District, 30000</span></p>
                            <p>Phone: <span>044 895 7725</span></p>
                            <p>Email: <span>meguild@mail.com</span></p>
                            <button className="">
                                <Link href="" className="hover:text-purple-700 flex items-center gap-1">
                                    <PiDiscordLogoBold /> ME GUILE
                                </Link>
                            </button>

                        </div>
                        <div className="">
                            <p className="font-bold text-lg">Leave a Reply</p>
                            <form action="" className="w-full mt-3 space-y-3">
                                <div className="lg:flex justify-between gap-3">
                                    <input type="text" name="" id="" className="border p-2 w-full" placeholder="Name" />
                                    <input type="text" name="" id="" className="border p-2 w-full mt-3 lg:mt-0" placeholder="Email" />
                                </div>
                                <input type="text" name="" id="" className="border p-2 w-full" placeholder="Subject" />
                                <textarea className="border p-2 w-full"
                                    name="" id="" rows={8}
                                    placeholder="Messege">

                                </textarea>
                                <button className="rounded-full px-5 py-1 bg-amber-400 hover:bg-amber-500">
                                    Sent
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default ContactPage;