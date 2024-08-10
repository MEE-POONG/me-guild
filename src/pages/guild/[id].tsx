import Layout from "@/components/layout"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiRank2 } from "react-icons/gi";

const ProfileGuild: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [guild, setGuild] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchGuild = async () => {
                try {
                    const response = await fetch(`/api/guildProfile/${id}`);
                    const data = await response.json();
                    setGuild(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching guild:', error);
                    setLoading(false);
                }
            };

            fetchGuild();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto py-24 px-5">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!guild) {
        return (
            <Layout>
                <div className="container mx-auto py-24 px-5">
                    <p>Guild not found</p>
                </div>
            </Layout>
        );
    }
    

    return (
        <Layout>
            <div className="container mx-auto py-24 px-5">
                <div className="text-center bg-[url('/images/bg04.webp')] drop-shadow-lg bg-cover h-[340px] rounded-t-lg overflow-hidden">
                    <div className="bg-black/55 p-16 h-full">
                        <img src={guild.avatar}
                            className="w-40 h-40 mx-auto rounded-full shadow-white/75 shadow-lg"
                            alt="" />
                        <p className="text-xl font-bold text-white drop-shadow-lg mt-3">{guild.guildname}</p>
                        <div className="flex justify-center items-center text-gray-50">
                            {/* Rank: Silver <GiRank2 /> */}
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-200 rounded-b-lg p-5 md:p-10 mt-8 drop-shadow-lg">
                    <p className="text-lg font-bold">About Guild</p>
                    <div className="text-sm md:text-base text-cyan-700">Name : <span className="text-black">{guild.guildname}</span></div>
                    <div className="text-sm md:text-base text-cyan-700">Age : <span className="text-black">{guild.age}</span></div>
                    {/* <div className="text-sm md:text-base text-cyan-700">sex : <span className="text-black">{guild.sex}</span></div> */}
                    <div className="text-sm md:text-base text-cyan-700">Target : <span className="text-black">{guild.description}</span></div>
                    {/* <div>Rule : <span>{guild.rule}</span></div> */}
                    <div className="mt-3">
                        <p className="text-lg font-bold">Contact</p>
                        <ul>
                            <li className="text-sm md:text-base text-cyan-700">
                                Discord : <Link href={guild.discordlink} className="text-black">{guild.guildname}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProfileGuild;