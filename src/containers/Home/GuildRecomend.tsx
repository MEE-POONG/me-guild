import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image';

const GuildRecomend: React.FC = () => {
    const [guilds, setGuilds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuilds = async () => {
            try {
                const response = await fetch('/api/guildProfile?page=1&pageSize=3');
                const data = await response.json();
                setGuilds(data.guilds);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guilds:', error);
                setLoading(false);
            }
        };

        fetchGuilds();
    }, []);
    return (
        <div className="container mx-auto px-4 py-16">
            <h3 className="text-4xl mt-10 font-bold text-gray-700 drop-shadow-md flex items-end justify-between">
                กิลด์แนะนำ
                <Link href="/guild" className="text-base text-teal-600 hover:text-teal-500">ทั้งหมด{`>>`}</Link>
            </h3>
            <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    guilds.map(guild => (
                        <Link href={`/guild/${guild.id}`} key={guild.id} className="flex items-center border p-2 hover:bg-gray-100">
                            <img src={guild.avatar} className="w-24 h-24" alt={guild.guildname} />
                            <div className="ml-3">
                                <p className="text-lg font-bold">{guild.guildname}</p>
                                <p className="text-sm font-thin text-gray-500">{guild.description}</p>
                                <p className="text-sm font-bold text-teal-600 line-clamp-1">{guild.rule}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
export default GuildRecomend;