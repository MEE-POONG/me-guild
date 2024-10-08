import Layout from "@/components/LLayout"

const MarketPlace: React.FC = (props) => {
    return (
        <Layout>
            <section>
                <h2 className="text-center font-bold text-4xl ">MARKET PLACE</h2>
                <div className="mt-10 container mx-auto">
                    <p className="text-2xl">Exchange Points</p>
                    <div className="bg-gray-100 p-5 rounded-md my-5">
                        การแลกเปลี่ยนพ้อยท์ (Point) หรือ แต้มสะสม
                        <ul>
                            <li>1. point</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 px-3">
                        <div className="h-72 rounded-md relative overflow-hidden bg-gray-100 shadow-lg">
                            <img src="https://i.ytimg.com/vi/Vkrso8pM8wY/maxresdefault.jpg" className="w-full h-36 object-cover" alt="" />
                            <div className="p-2">
                                <p className="text-cyan-700 font-bold">ดอกไม้</p>
                                <p className="text-xs line-clamp-2 text-gray-500">Kids can enjoy building a supercool tiger toy to display</p>
                                <p className="absolute bottom-2 right-2 text-amber-600 font-extrabold text-sm">65p</p>
                            </div>
                        </div>
                        <div className="h-72 rounded-md relative overflow-hidden bg-gray-100 shadow-lg">
                            <img src="https://inwfile.com/s-di/5zid7o.jpg" className="w-full h-36 object-cover" alt="" />
                            <div className="p-2">
                                <p className="text-cyan-700 font-bold">LEGO LEGO LEGO LEGO LEGO</p>
                                <p className="text-xs line-clamp-2 text-gray-500">Kids can enjoy building a supercool tiger toy to display</p>
                                <p className="absolute bottom-2 right-2 text-amber-600 font-extrabold text-sm">6500p</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default MarketPlace;