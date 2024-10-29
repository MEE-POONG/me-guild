import Image from "next/image";
import Link from "next/link";

const MatchToday: React.FC = () => {
    return (
        <section>
            <div className="flex items-center justify-center drop-shadow">
                <div className="w-10 border-t-4 border-gray-700"></div>
                <h2 className="mx-4 text-red-600 text-xl font-bold whitespace-nowrap">
                    LATEST <span className="text-white">MATCHES</span>
                </h2>
                <div className="flex-grow border-t-4 border-gray-700"></div>
            </div>
            <div className="md:grid grid-cols-7 gap-5 mt-3">
                <div className="col-span-3">
                    <div className="uppercase px-4 py-2 bg-black/40 w-fit rounded-md text-white my-5 text-sm">now playing</div>
                    <div className="flex items-center gap-2">
                        <Image src="" className="w-10 h-10" alt="" />
                        VS
                        <Image src="" className="w-10 h-10" alt="" />
                    </div>
                    <p className="my-5 text-gray-300 text-xs">As she said this she looked down at her hands and was surprised to see.</p>
                    <Link href=""
                        className="uppercase px-4 py-2 bg-amber-500 hover:bg-amber-400 w-fit rounded-md text-white my-5 text-sm">
                        now playing
                    </Link>

                </div>
                <div className="col-span-4 mt-5 md:mt-0">
                    <iframe
                        src="https://www.youtube.com/embed/iYWGRGiYdHU?si=_1_1579Uk-QuYm80" title="YouTube video player"
                        className="w-full h-60 "
                    ></iframe>
                </div>

            </div>
        </section>
    )
}
export default MatchToday;