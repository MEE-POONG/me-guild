import Link from "next/link";
import Image from 'next/image';

const PoppularPerson: React.FC = () => {
    return (
        <section className="bg-gray-900 w-full mt-12">
            <div className="container mx-auto text-gray-100 px-10 py-24">
                <div className=" flex justify-between items-end mb-3 text-2xl">
                    Poppular
                    <Link href="" className="text-sm">All {'>>'}</Link>
                </div>
                <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-5 gap-3">
                        <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg text-gray-900">
                            <Link href='' className="flex gap-2" >
                                <img src="https://act-webstatic.hoyoverse.com/upload/contentweb/2022/06/28/4f598572016e3177da5d4256fe9c1f5e_8765525983470991811.png"
                                    className="w-20 h-20 rounded-full object-contain shadow-lg"
                                    alt="" />
                                <div>
                                    <p>Name: User1</p>
                                    <p>Guild: ---</p>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg text-gray-900">
                            <Link href='' className="flex gap-2" >
                                <img src="https://genshin.global/wp-content/uploads/2023/06/kirara-dendro-avatar-profile-genshin-impact.webp"
                                    className="w-20 h-20 rounded-full object-contain shadow-lg"
                                    alt="" />
                                <div>
                                    <p>Name: User1</p>
                                    <p>Guild: ---</p>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg text-gray-900">
                            <Link href='' className="flex gap-2" >
                                <img src="https://act-webstatic.hoyoverse.com/upload/contentweb/2022/06/29/80c603323013d50fba419fe48b049a85_1179446160895359895.png"
                                    className="w-20 h-20 rounded-full object-contain shadow-lg"
                                    alt="" />
                                <div>
                                    <p>Name: User1</p>
                                    <p>Guild: ---</p>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg text-gray-900">
                            <Link href='' className="flex gap-2" >
                                <img src="https://m.media-amazon.com/images/I/81qE67fZAdL.jpg"
                                    className="w-20 h-20 rounded-full object-contain shadow-lg"
                                    alt="" />
                                <div>
                                    <p>Name: User1</p>
                                    <p>Guild: ---</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PoppularPerson;