import Link from "next/link";

const GuildRecomend: React.FC = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-10">
                <p className="text-xl font-bold flex items-end justify-between text-white">Guild Recomend
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-5 gap-3">
                    <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg">
                        <Link href='' className="flex gap-2" >
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/93/85/guild-vector-45849385.jpg"
                                className="w-20 h-20 rounded-full"
                                alt="" />
                            <div>
                                <p>Name: Guild Number One</p>
                                <p>Members: 100</p>
                            </div>
                        </Link>
                    </div>
                    <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg">
                        <Link href='' className="flex gap-2" >
                            <img src="https://avatars.githubusercontent.com/u/42573040?s=200&v=4"
                                className="w-20 h-20 rounded-full"
                                alt="" />
                            <div>
                                <p>Name: Guild Number One</p>
                                <p>Members: 100</p>
                            </div>
                        </Link>
                    </div>
                    <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg">
                        <Link href='' className="flex gap-2" >
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzN3IG9IlZE4QVsBhtnGGEYOjFwIrbGJJyeLeNCn9sAfY75Y_Hm53MJOZoTkCQPB6cr5k&usqp=CAU"
                                className="w-20 h-20 rounded-full"
                                alt="" />
                            <div>
                                <p>Name: Guild Number One</p>
                                <p>Members: 100</p>
                            </div>
                        </Link>
                    </div>
                    <div className="p-4 w-full bg-slate-200 shadow-lg rounded-lg">
                        <Link href='' className="flex gap-2" >
                            <img src="https://img.tfd.com/wn/8E/6736A-guild.jpg"
                                className="w-20 h-20 rounded-full"
                                alt="" />
                            <div>
                                <p>Name: Guild Number One</p>
                                <p>Members: 100</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default GuildRecomend;