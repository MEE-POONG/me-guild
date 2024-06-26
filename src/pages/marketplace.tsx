import Layout from "@/components/layout"

const MarketPlace: React.FC = (props) => {
    return (
        <Layout>
            <section>
                <h2 className="text-center font-bold text-4xl ">MARKET PLACE</h2>
                <div className="mt-10 container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 px-3">
                        <div className="h-72 rounded-md relative overflow-hidden bg-gray-100 shadow-lg">
                            <img src="https://i.ytimg.com/vi/Vkrso8pM8wY/maxresdefault.jpg" className="w-full h-36 object-cover" alt="" />
                            <div className="p-2">
                                <p className="text-cyan-700 font-bold">ดอกไม้</p>
                                <p className="text-xs line-clamp-2 text-gray-500">Kids can enjoy building a supercool tiger toy to display</p>
                                <p className="absolute bottom-0 right-2 text-amber-600 font-extrabold text-xl">฿65</p>
                            </div>
                        </div>
                        <div className="h-72 rounded-md relative overflow-hidden bg-gray-100 shadow-lg">
                            <img src="https://inwfile.com/s-di/5zid7o.jpg" className="w-full h-36 object-cover" alt="" />
                            <div className="p-2">
                                <p className="text-cyan-700 font-bold">LEGO LEGO LEGO LEGO LEGO</p>
                                <p className="text-xs line-clamp-2 text-gray-500">Kids can enjoy building a supercool tiger toy to display</p>
                                <p className="absolute bottom-0 right-2 text-amber-600 font-extrabold text-xl">฿65</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default MarketPlace;