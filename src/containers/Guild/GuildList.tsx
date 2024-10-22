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
        <div className="">
            {/* Search Input */}
            {/* <div className="mt-4 flex items-center justify-end gap-2">
                <p className="text-gray-600 text-sm">ค้นหา</p>
                <input
                    type="search"
                    placeholder="Search guilds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 w-52 rounded-md text-sm "
                />
                <CiSearch size={20} />
            </div> */}

            <div className="">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredGuilds.map(guild => (
                        <Link href={`/guild/${guild.id}`} key={guild.id}
                            className="flex items-center bg-gray-300 hover:shadow-lg hover:shadow-teal-400 mb-3"
                        >
                            <img src={guild.avatar} className="w-28 h-28 bg-gray-900 p-2" alt={guild.guildname} />
                            <div className="ml-3">
                                <p className="text-sm md:text-lg font-bold ">{guild.guildname}</p>
                                <p className="text-xs md:text-sm font-thin text-gray-500 line-clamp-2">{guild.description}</p>
                                <p className="text-xs md:text-sm font-bold text-teal-600 line-clamp-1">{guild.rule}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default GuildList;
