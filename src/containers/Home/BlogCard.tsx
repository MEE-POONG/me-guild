import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const BlogCard: React.FC = () => {
    const [blogData, setBlogData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // เพิ่ม state สำหรับจัดการข้อผิดพลาด

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/blog?page=1&pageSize=6`);
                setBlogData(response.data.data); // เปลี่ยนจาก `news` เป็น `blogs`
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p className="text-center text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-yellow-500">{error}</p>;
    }

    return (
        <section className="container mx-auto px-2 md:px-10 xl:px-0 py-16">
            <p className="text-xl md:text-3xl flex items-end justify-between text-amber-400 border-b-4 border-gray-700 mb-2 uppercase">
                <span>
                    Latest
                    <span className="ml-3 text-white">blog</span>
                </span>
                <Link href="/news/blog" className="text-base text-amber-400 hover:text-amber-500">ทั้งหมด {`>>`}</Link>
            </p>
            <div className="flex flex-wrap mt-3">
                {/* {blogData.length === 0 ? (
                    <p className="text-center text-gray-400">No blogs available</p>
                ) : (
                    blogData.map(blog => (
                        <div key={blog.id} className="lg:w-1/2 p-2">
                            <div className="h-full drop-shadow-lg">
                                <Link href={`/news/blog/${blog.id}`} className="img-wrapper lg:h-48 md:h-36 w-full overflow-hidden inline-block box-border">
                                    <img
                                        className="inner-img transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                                        src={blog.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img}/wmd` : "/images/default.png"}
                                        alt={blog.title || 'blog'}
                                    />
                                </Link>
                                <div className="mt-1">
                                    <div className="tracking-widest text-xs font-medium text-white mb-1 px-2 py-1 w-12 bg-cyan-400 rounded-r">
                                        BLOG
                                    </div>
                                    <Link href={`/news/blog/${blog.id}`} className="title-font text-sm md:text-lg font-medium mb-3 text-white hover:text-cyan-400 leading-3">
                                        {blog.title}
                                    </Link>
                                    <p className="text-xs line-clamp-2 indent-5 font-extralight text-gray-400 mt-3">{blog.description}</p>
                                    <div className="mt-5">
                                        <Link href={`/news/blog/${blog.id}`} className="text-white inline-flex items-center md:mb-2 lg:mb-0 text-sm bg-gray-800/50 p-2 rounded hover:bg-red-600">
                                            Read
                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )} */}
            </div>
        </section>
    );
};

export default BlogCard;
