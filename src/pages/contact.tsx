import Layout from "@/components/Layout"
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { PiDiscordLogoBold } from "react-icons/pi";

const ContactPage: React.FC = (props) => {
    const backgroundImageUrl = '/images/grandhall2.png';


    return (
        <Layout>
            <div
                className="bg-fixed h-[430px] w-full relative flex items-center justify-center"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="relative bg-black/50 h-full w-full flex items-center justify-center">
                    <h2 className="text-7xl font-bold text-white font-mg04">
                        Contact Us
                    </h2>
                </div>
            </div>
            <section className="container mx-auto px-4 py-5">
                {/* <h2 className="text-4xl text-center underline font-bold text-amber-600">CONTACT</h2> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.4107882244025!2d102.09944187587877!3d14.96988496792744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31194d8e8317c351%3A0xd84c052ad6cf5c55!2sME%20PROMPT%20TECHNOLOGY!5e0!3m2!1sen!2sth!4v1719291738230!5m2!1sen!2sth"
                    className="w-full h-[450px] mt-5 shadow-purple-700 rounded-lg"
                    loading="lazy" >
                </iframe>
                <div className="mt-10 p-5 md:p-8 shadow-inner rounded-md bg-slate-900/50">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="font-bold text-lg text-red-400 uppercase">Contact us</p>
                            <p className="text-sm md:text-base text-gray-50">Address: <span className="text">Mueang Nakhon Ratchasima District, 30000</span></p>
                            <p className="text-sm md:text-base text-gray-50">Phone: <span>044 895 7725</span></p>
                            <p className="text-sm md:text-base text-gray-50">Email: <span>meguild@mail.com</span></p>
                            <button className="text-sm md:text-base text-gray-50 ">
                                <Link href="https://thpsd.com/hZKV" className="hover:text-purple-400 flex items-center gap-1">
                                    <PiDiscordLogoBold /> : ME GUILE
                                </Link>
                            </button>
                            <button className="text-sm md:text-base text-gray-50 ml-5">
                                <Link href='' className="hover:text-blue-500 flex items-center gap-1">
                                    <FaFacebook />
                                    Me Guild
                                </Link>
                            </button>
                        </div>
                        <div className="text-sm md:text-base">
                            <p className="font-bold text-lg text-cyan-400 uppercase">Leave a Reply</p>
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