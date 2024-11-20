import Link from 'next/link';
import { FC, useEffect, useState } from 'react';


const ReccommentBlog: FC = () => {
    const [blogData, setBlogData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blog?page=1&pageSize=3');
                const data = await response.json();
                setBlogData(data.blogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className="text-gray-200 text-center">Loading...</p>;
    }

    return (
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/75 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-yellow-500">LATEST</span> BLOG
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className='bg-gray-700 p-3'>
                {blogData.map(blog => (
                    <div key={blog.id} className="">
                        <div className="flex">
                            <Link href={`/blog/${blog.id}`} className='img-wrapper w-36 h-16 overflow-hidden inline-block box-border' >
                                <img
                                    className="inner-img transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                                    src={blog.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img}/wmd` : "/images/default.png"}
                                    alt={blog.title || 'blog image'}
                                />
                            </Link>
                            <div className="p-2">
                                <Link href={`/blog/${blog.id}`} className="text-gray-50 text-xs font-medium hover:text-yellow-500">
                                    {blog.title}
                                </Link>
                            </div>
                        </div>
                        <hr className="my-2 border-gray-600" />
                    </div>
                ))}
                <Link href="/news/blog" className='flex justify-end text-xs text-gray-50 hover:text-purple-400 mt-3'>
                    เพิ่มเติม
                </Link>
            </div>
        </div>
    );
};

export default ReccommentBlog;
