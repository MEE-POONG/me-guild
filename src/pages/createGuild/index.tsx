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
                <div className="container mx-auto  my-10">
                    <h2 className="text-xl font-extrabold mb-3">Create Guild</h2>
                    <div>
                        Guil name
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default CreateGuildPage;