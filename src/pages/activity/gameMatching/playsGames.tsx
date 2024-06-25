import Layout from "@/components/layout";
import Link from "next/link";

const PlaysGames: React.FC = (props) => {
    return (
        <Layout>
            <div className="container mx-auto  p-5">
                <h2 className="text-gray-600">Game Name</h2>
                <div className="flex flex-wrap mt-5">
                    <div className="w-full lg:w-3/4 h-auto p-2 border-2 shadow-md">
                        monitor game
                    </div>
                    <div className="p-3 bg-gray-700 text-gray-50 w-full lg:w-1/4">
                        Top 10
                        <ul className="text-sm">
                            <li className="flex justify-between">1. Name <span>12345</span></li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>10</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-5 bg-gray-300 p-2">

                    วิธีการเล่น
                    <p className="ml-3 text-sm">ข้อ 1.</p>
                    <p className="ml-3 text-sm">ข้อ 2.</p>
                    <p className="ml-3 text-sm">ข้อ 3.</p>
                    <p className="ml-3 text-sm">ข้อ 4.</p>
                </div>

                <div className="mt-10">
                    เกมแนะนำ/เกมอื่นๆ
                </div>
            </div>
        </Layout>

    )
}
export default PlaysGames;