import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const GuildList: React.FC = () => {
    const [guilds, setGuilds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchGuilds = async () => {
            try {
                const response = await fetch('/api/guildProfile');
                const data = await response.json();
                
                setGuilds(data.guilds); // Correctly set the guild data
                setLoading(false); // Stop loading after data is set
            } catch (error) {
                console.error('Error fetching guilds:', error);
                setLoading(false); // Stop loading on error as well
            }
        };

        fetchGuilds();
    }, []);

    const filteredGuilds = guilds.filter(guild =>
        guild.guildname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="">
            {/* Optional Search Input */}
            {/* Guild List */}
            <div className="mt-6">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredGuilds.map(guild => (
                        <Link href={`/guild/list/${guild.id}`} key={guild.id} className="flex items-center bg-gray-300 hover:shadow-lg hover:shadow-[#f2b265] mb-3 p-2 rounded-lg">
                            <img src={guild.guildLogo} className="w-28 h-28 bg-gray-900 rounded-md" alt={guild.guildname} />
                            <div className="ml-3">
                                <p className="text-sm md:text-lg font-bold">{guild.guildname}</p>
                                <p className="text-xs md:text-sm font-thin text-gray-500 line-clamp-2">{guild.description}</p>
                                <p className="text-xs md:text-sm font-bold text-yellow-600 line-clamp-1">{guild.rule}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default GuildList;
