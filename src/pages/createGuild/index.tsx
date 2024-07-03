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
                    <h2 className="text-xl font-extrabold mb-3">Create Guild</h2>
                    <form className="border p-10 rounded-md bg-gray-950 shadow-xl border-white">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="" className="block font-semibold text-gray-100">Guild Name</label>
                                <input className="shadow-inner bg-gray-100 rounded-lg placeholder-black p-2 border-none block mt-1 w-full text-sm" type="text" name="" id="" />
                            </div>
                            <div>
                                <label htmlFor="" className="block font-semibold text-gray-100">link discord</label>
                                <input className="shadow-inner bg-gray-100 rounded-lg placeholder-black p-2 border-none block mt-1 w-full text-sm" type="text" name="" id="" />
                            </div>
                            <div>
                                <label htmlFor="" className="block font-semibold text-gray-100">Member received</label>
                                <input className="shadow-inner bg-gray-100 rounded-lg placeholder-black p-2 border-none block mt-1 w-full text-sm" type="text" name="" id="" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
export default CreateGuildPage;