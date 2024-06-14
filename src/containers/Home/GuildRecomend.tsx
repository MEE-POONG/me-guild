import Link from "next/link";

const GuildRecomend: React.FC = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-10">
                <p className="text-xl font-bold flex items-end justify-between text-gray-500 hover:text-gray-800">Guild Recomend
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-5 gap-3">
                    <Link  href='' className="p-4 w-full bg-slate-200 shadow-lg rounded-lg hover:bg-gray-300/75 hover:scale-95 hover:border-emerald-600 hover:border-b-4">
                        <div className="flex gap-2 text-sm md:text-base" >
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/93/85/guild-vector-45849385.jpg"
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full"
                                alt="" />
                            <div>
                                <p>Name: <span className="font-bold text-teal-700 ">Guild Number One</span></p>
                                <p>Members: 100</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default GuildRecomend;