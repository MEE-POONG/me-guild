import Layout from "@/components/layout"
import { GiRank2 } from "react-icons/gi";

const ProfileUser: React.FC = (props) => {
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="border grid grid-cols-12 gap-5">
                    <div className="col-span-3 text-center p-5">
                        <img src="https://static.vecteezy.com/system/resources/previews/006/735/770/original/beautiful-woman-avatar-profile-icon-vector.jpg"
                            className="w-48 h-48 mx-auto"
                            alt="" />
                        <p className="text-xl font-bold text-cyan-700">NameNameNameName</p>
                        <div className="flex justify-center items-center">
                            Rank: Silver <GiRank2 />
                        </div>
                    </div>
                    <div className="col-span-9 bg-gray-100 p-5">
                        <p>About : Name</p>
                        Name:
                        Guild:
                        Occupation:
                        <div>
                            <p>Contact:</p>
                            <ul>
                                <li> Phone:</li>
                                <li>Discord:</li>
                                <li>FB:</li>
                                <li>IG:</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProfileUser;