import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const GuildList: React.FC = () => {
    const [guilds, setGuilds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchGuilds = async () => {
            try {
                const response = await fetch('/api/guildProfile');
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

    const filteredGuilds = guilds.filter(guild =>
        guild.guildname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold flex items-end justify-between text-gray-600 border-b border-gray-400 drop-shadow-lg">
                Guild Hall
            </h2>

            {/* Search Input */}
            <div className="mt-4 flex items-center justify-end gap-2">
                <p className="text-gray-600 text-sm">ค้นหา</p>
                <input
                    type="search"
                    placeholder="Search guilds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 w-52 rounded-md text-sm "
                />
                <CiSearch size={20} />
            </div>

            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredGuilds.map(guild => (
                        <Link href={`/guild/${guild.id}`} key={guild.id}
                            className="flex items-center border-b-2 p-2 hover:bg-gray-100 hover:border-teal-400"
                        >
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
    );
}

export default GuildList;
