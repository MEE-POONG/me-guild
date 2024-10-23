import { GiCrenelCrown, GiCrown } from "react-icons/gi";

const GuildMember: React.FC = () => {
    return (
        <section className="my-10">
            <div className="flex items-center justify-center">
                <div className="w-10 border-t-4 border-gray-400"></div>
                <h2 className="mx-4 text-red-600 text-2xl font-bold whitespace-nowrap">
                    GUILD <span className="text-white">MEMBER</span>
                </h2>
                <div className="flex-grow border-t-4 border-gray-400"></div>
            </div>

            {/* Start Guild Member List */}
            <div className="bg-black/25 py-10">
                <div className="flex justify-center space-x-8">
                    {/* Guild Master */}
                    <div className="relative text-center">
                        {/* มงกุฎที่อยู่บนรูปภาพ */}
                        <div className="absolute -top-5 left-1/3 drop-shadow-md z-20">
                            {/* ใช้ไอคอนมงกุฎ */}
                            <GiCrenelCrown className="h-8 w-8 text-amber-400" />
                        </div>
                        {/* รูปภาพ */}
                        <img
                            className="w-16 h-16 rounded-full drop-shadow-md mx-auto"
                            src="https://via.placeholder.com/400"
                            alt="example"
                        />
                        <p className="text-amber-400 mt-1">Guild Master</p>
                    </div>

                    {/* Vice Guild Master */}
                    <div className="relative text-center">
                        {/* มงกุฎที่อยู่บนรูปภาพ */}
                        <div className="absolute -top-5 left-12 drop-shadow-md z-20">
                            {/* ใช้ไอคอนมงกุฎ */}
                            <GiCrenelCrown className="h-8 w-8 text-slate-500" />
                        </div>
                        {/* รูปภาพ */}
                        <img
                            className="w-16 h-16 rounded-full drop-shadow-md mx-auto"
                            src="https://via.placeholder.com/400"
                            alt="example"
                        />
                        <p className="text-slate-400 mt-1">Vice Guild Master</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 mt-6">
                    <div className="text-center">
                        <img
                            className="w-16 h-16 rounded-full drop-shadow-md mx-auto"
                            src="https://via.placeholder.com/400"
                            alt="example"
                        />
                        <p className="text-gray-200 mt-1">Guild Master</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default GuildMember;