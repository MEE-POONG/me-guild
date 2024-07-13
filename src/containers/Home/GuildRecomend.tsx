import Link from "next/link";

const GuildRecomend: React.FC = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto ">
                <p className="text-xl font-bold flex items-end justify-between text-gray-500 hover:text-gray-800">Guild Recomend
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href='' className="flex items-center border p-2 hover:bg-gray-100">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSd4apD1IYVtMN5rO2yPJLE6_1pvpehAJAag&s"
                        className="w-24 h-24"
                        alt="" />
                    <div>
                        <p className="text-lg font-bold">Guild Name</p>
                        <p className="text-sm font-thin text-gray-500">คำอธิบายเกี่ยวกับกิลด์ สั้นๆ เช่น ทำกิลด์เกี่ยวกับอะไร</p>
                        <p className="text-sm font-bold text-teal-600">ประเภทกิลด์ เช่น หางาน ทั่วไปฯ</p>
                    </div>
                </Link>
                <Link href='' className="flex items-center border p-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSd4apD1IYVtMN5rO2yPJLE6_1pvpehAJAag&s"
                        className="w-24 h-24"
                        alt="" />
                    <div>
                        <p className="text-lg font-bold">Guild Name</p>
                        <p className="text-sm font-thin text-gray-500">คำอธิบายเกี่ยวกับกิลด์ สั้นๆ เช่น ทำกิลด์เกี่ยวกับอะไร</p>
                        <p>ประเภทกิลด์ เช่น หางาน ทั่วไปฯ</p>
                    </div>
                </Link>
                <Link href='' className="flex items-center border p-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSd4apD1IYVtMN5rO2yPJLE6_1pvpehAJAag&s"
                        className="w-24 h-24"
                        alt="" />
                    <div>
                        <p className="text-lg font-bold">Guild Name</p>
                        <p className="text-sm font-thin text-gray-500">คำอธิบายเกี่ยวกับกิลด์ สั้นๆ เช่น ทำกิลด์เกี่ยวกับอะไร</p>
                        <p>ประเภทกิลด์ เช่น หางาน ทั่วไปฯ</p>
                    </div>
                </Link>
            </div>
            </div>
        </section>
    )
}
export default GuildRecomend;