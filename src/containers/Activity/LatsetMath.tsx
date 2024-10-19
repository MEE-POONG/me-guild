import Link from "next/link";

const LatestMath: React.FC = () => {
    return (
        <section className="">
            {/* Satrt Content */}
            <div className="bg-black/25 p-5 md:flex items-center justify-between gap-2">
                {/* Team 1 */}
                <div className="flex items-center">
                    <img src="/team1-logo.png" alt="Team 1 Logo" className="w-16 h-16 mr-4 p-1" />
                    <div>
                        <Link href="" className="text-white hover:text-amber-400">SK</Link>
                    </div>
                </div>

                {/* VS and Date */}
                <div className="text-center">
                    <p className="text-white font-bold">VS</p>
                    <p className="text-gray-400 text-sm">Apr 28, 2018 8:00 pm</p>
                    <div className="bg-amber-400 text-white w-16 mx-auto py-0.5 rounded-md mt-2 flex justify-center gap-1">
                        <span>2</span>: <span>7</span>
                    </div>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-end">
                    <div className="text-right">
                        <Link href="" className="text-white hover:text-amber-400">CLOUD 9</Link>
                    </div>
                    <img src="/team2-logo.png" alt="Team 2 Logo" className="w-16 h-16 ml-4" />
                </div>
            </div>
        </section>
    )
}
export default LatestMath;