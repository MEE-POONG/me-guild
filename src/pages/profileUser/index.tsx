import Layout from "@/components/layout"
import { GiRank2 } from "react-icons/gi";

const ProfileUser: React.FC = (props) => {
    return (
        <Layout>
            <div className="container mx-auto py-24 px-5 ">
                <div className="text-center bg-[url('/images/bg05.webp')] drop-shadow-lg bg-cover">
                    <div className="bg-black/45 p-10">
                        <img src="https://static.vecteezy.com/system/resources/previews/006/735/770/original/beautiful-woman-avatar-profile-icon-vector.jpg"
                            className="w-44 h-44 mx-auto rounded-full"
                            alt="" />
                        <p className="text-xl font-bold text-cyan-200 drop-shadow-lg">NameNameNameName</p>
                        <div className="flex justify-center items-center text-gray-50">
                            Rank: Silver <GiRank2 />
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-100 p-5 md:p-10 mt-5 drop-shadow-lg">
                    <p className="text-lg font-bold">About Me</p>
                    <div>Name : <span>Yaya</span></div>
                    <div>Guild : <span>Yaya Homeless</span></div>
                    <div>Career : <span>Mage</span></div>
                    <div className="mt-3">
                        <p className="text-lg font-bold">Contact</p>
                        <ul>
                            <li> Phone :</li>
                            <li>Discord :</li>
                            <li>FB :</li>
                            <li>IG :</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProfileUser;