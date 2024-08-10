import Layout from "@/components/layout";
import Link from "next/link";
import React from "react"

const CreateGuildPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="">
                <div className="w-full h-[250px] overflow-hidden">
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover "
                        alt=""
                    />
                </div>
                <div className="container mx-auto my-10 ">
                    <form className="mt-3 bg-white/60 p-5 rounded-lg md:w-[450px] mx-auto">
                        <p className="text-center mb-4 font-extrabold text-teal-600 text-4xl drop-shadow">Create Guild</p>
                        <hr className="mb-10" />
                        <div>
                            <label htmlFor="">ชื่อกิลด์</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">คำอธิบาย</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div className="md:flex justify-between gap-4">
                            <div>
                                <label htmlFor="">ช่วงอายุ(ปี)</label>
                                <select name="" id=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                >
                                    <option value="">กรุณาเลือก</option>
                                    <option value="">15 ปีขึ้นไป</option>
                                    <option value="">18 ปีขึ้นไป</option>
                                    <option value="">20 ปีขึ้นไป</option>
                                    <option value="">ไม่จำกัดอายุ</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">เพศ</label>
                                <select name="" id=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
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
                            <label htmlFor="">กฏ</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Discord Link</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-gray-200 border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Profile <span className="text-xs text-orange-500">**ขนาด X*Y</span></label>
                            <input type="file" name="" id="" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Backdrop <span className="text-xs text-orange-500">**ขนาด X*Y</span></label>
                            <input type="file" name="" id="" />
                        </div>

                        <div className="text-center my-8">
                            <button className="bg-cyan-500 py-1 px-4 rounded-full text-gray-100 hover:bg-cyan-600">
                                <Link href="/guild/guildProfile">Create</Link>
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </Layout>
    )
}
export default CreateGuildPage;