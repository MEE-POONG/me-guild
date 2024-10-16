import { FC, useState } from 'react';

const SearchBar: FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to handle the search query here
        console.log('Search query:', searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                placeholder="Type something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
                type="submit"
                className="bg-red-500 px-4 py-2 text-white rounded-r-md hover:bg-red-600 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;
