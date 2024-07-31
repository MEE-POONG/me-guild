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
                <div className="text-center bg-[url('/images/bg04.webp')] drop-shadow-lg bg-cover">
                    <div className="bg-black/55 p-16">
                        <img src={guild.avatar}
                            className="w-40 h-full mx-auto rounded-full"
                            alt="" />
                        <p className="text-xl font-bold text-cyan-200 drop-shadow-lg">{guild.guildname}</p>
                        <div className="flex justify-center items-center text-gray-50">
                            {/* Rank: Silver <GiRank2 /> */}
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-200 rounded-b-lg p-5 md:p-10 mt-5 drop-shadow-lg">
                    <p className="text-lg font-bold">About Guild</p>
                    <div>Name : <span>{guild.guildname}</span></div>
                    <div>Age : <span>{guild.age}</span></div>
                    <div>sex : <span>{guild.sex}</span></div>
                    <div>Target : <span>{guild.description}</span></div>
                    {/* <div>Rule : <span>{guild.rule}</span></div> */}
                    <div className="mt-3">
                        <p className="text-lg font-bold">Contact</p>
                        <ul>
                            <li>Discord : <Link href={guild.discordlink}>{guild.guildname}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProfileGuild;