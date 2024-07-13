import Layout from "@/components/layout"
import { GiRank2 } from "react-icons/gi";

const ProfileGuild: React.FC = (props) => {
    return (
        <Layout>
            <div className="container mx-auto py-24 px-5">
                <div className="text-center bg-[url('/images/bg04.webp')] drop-shadow-lg bg-cover">
                    <div className="bg-black/35 p-16">
                        <img src="https://images.squarespace-cdn.com/content/v1/62433e77b588d830595115cc/a16ad5a5-792d-4554-986d-528b786d361e/Color+Logo+Transparent+%283%29.png"
                            className="w-40 h-full mx-auto rounded-full"
                            alt="" />
                        <p className="text-xl font-bold text-cyan-200 drop-shadow-lg">NameNameNameName</p>
                        <div className="flex justify-center items-center text-gray-50">
                            Rank: Silver <GiRank2 />
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-100 p-5 md:p-10 mt-5 drop-shadow-lg">
                    <p className="text-lg font-bold">About Guild</p>
                    <div>Name : <span>Guild Guild</span></div>
                    <div>Target : <span></span></div>
                    <div className="mt-3">
                        <p className="text-lg font-bold">Contact</p>
                        <ul>
                            <li>Admin :</li>
                            <li>Phone :</li>
                            <li>Discord :</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProfileGuild;