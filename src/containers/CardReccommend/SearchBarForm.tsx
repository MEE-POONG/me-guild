import { FC, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to handle the search query here
        console.log('Search query:', searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center ">
            <input
                type="text"
                placeholder="Type something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 focus:outline-none text-sm rounded-l-md"
            />
            <button
                type="submit"
                className="bg-yellow-500 px-4 py-2 text-white hover:bg-red-600 transition-colors rounded-r-md

"
            >
                <FaSearch className="w-5 h-5" />
            </button>
        </form>
    );
};

export default SearchBar;
