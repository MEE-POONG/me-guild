import Layout from "@/components/layout";
import Link from "next/link";
import React from "react"

const CreateGuildPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="">
                <div className="w-full h-[350px] overflow-hidden">
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover "
                        alt=""
                    />
                </div>
                <div className="container mx-auto my-10 ">
                    <form className="mt-3 bg-white/60 p-5 rounded-lg md:w-[450px] mx-auto">
                        <p className="text-center mb-4 font-extrabold text-teal-500 text-4xl drop-shadow">Create Guild</p>
                        <p className="text-sm font-thin text-gray-600 mt-5">**กรุณากรอกข้อมูลจริง</p>
                        <div className="md:flex justify-between gap-4">
                            <div>
                                <label htmlFor="">Name</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Nickname</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                        </div>
                        <div className="md:flex justify-between gap-4">
                            <div>
                                <label htmlFor="">Age</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Gender</label>
                                <select name="" id=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                >
                                    <option value="">กรุณาเลือก</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">LGBTQ+</option>
                                    <option value="">Genderless</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Discord</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Career/อาชีพ</label>
                            <select name="" id=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            >
                                <option value="">กรุณาเลือก</option>
                                <option value="">นักเวทย์</option>
                                <option value="">แทงค์</option>
                                <option value="">ฮีลเลอร์</option>
                            </select>
                        </div>

                        <div className="text-center my-8">
                            <button className="loginbutt">
                                <Link href="/">ลงชื่อเข้าใช้</Link>
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </Layout>
    )
}
export default CreateGuildPage;