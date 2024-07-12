import Link from "next/link";

const GameMatching: React.FC = (props) => {
    return (
        <div className="py-8 px-4">
            <div className="container mx-auto ">
                <h2 className="text-gray-600">Game Relax!</h2>
                <div className="flex flex-wrap justify-around md:justify-between gap-2 mt-3">
                    <Link href="/activity/gameMatching/playsGames"
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://images.crazygames.com/squid-game-online/20211109123635/squid-game-online-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-fit"
                        />
                    </Link>
                    <Link href=""
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://topbestbrand.com/wp-content/uploads/2020/01/%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B9%83%E0%B8%94%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%96%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99%E0%B8%9A%E0%B8%99%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%A8%E0%B8%B1%E0%B8%9E%E0%B8%97%E0%B9%8C%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%89%E0%B8%B1%E0%B8%99.jpg" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-cover"
                        />
                    </Link>
                    <Link href=""
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnH9Wqsq1gNCOX40KgemkG9CDlxDtGUNykuCalMY0htfDTdsuI.jpg" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-cover"
                        />
                    </Link>
                    <Link href=""
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://f.ptcdn.info/369/057/000/p825lhk5v4qTq6PWWSe-o.jpg" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-cover"
                        />
                    </Link>
                    <Link href=""
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://www.ofm.co.th/blog/wp-content/uploads/2021/07/minecraft_cover.jpg" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-cover"
                        />
                    </Link>
                    <Link href=""
                        className="hover:scale-y-105 hover:scale-x-105"
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHDMyJodrldF1mxMtbfW0mnaiUi_Dvx46dgg&s" alt=""
                            className="w-32 h-20 md:w-48 md:h-28 rounded-md shadow-white drop-shadow-lg object-cover"
                        />
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default GameMatching;