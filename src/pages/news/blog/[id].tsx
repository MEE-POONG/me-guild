import Breadcrumb from "@/components/Breadcrumb";
import CommentSection from "@/components/CommentSection";
import Layout from "@/components/Layout"
import LatestMath from "@/containers/Activity/LatsetMath";
import LatestActivity from "@/containers/CardReccommend/LatestActivity";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiArrowFromRight, BiChevronRight, BiPause, BiPlay } from "react-icons/bi";

const ReadBlog: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [blogs, setBlogs] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        if (id) {
            const fetchBlogs = async () => {
                try {
                    const response = await fetch(`/api/blog/${id}`);
                    const data = await response.json();
                    setBlogs(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                    setLoading(false);
                }
            };

            fetchBlogs();
        }
    }, [id]);

    const handlePlayPause = () => {
        const videoElement = document.getElementById("video") as HTMLVideoElement;
        if (videoElement) {
            if (isPlaying) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!blogs) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>News not found</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                <div className="pt-[140px]"></div>
                <Breadcrumb idTitle={blogs.title} />
                <h3 className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    {blogs.title}
                </h3>
                <div className="lg:grid grid-cols-12 gap-10 mt-6">
                    <div className="col-span-8">
                        <div className="">
                            <img src={blogs.img}
                                className="w-full h-full mx-auto drop-shadow-md"
                                alt=""
                            />
                            <p className="mt-10 indent-8 text-gray-200">
                                {blogs.description}
                            </p>

                            {/* Video Play */}
                            <div className="flex justify-center mt-5">
                                <div className="relative w-full max-w-lg">
                                    <video
                                        id="video"
                                        className="w-full rounded-lg shadow-lg"
                                        controls
                                        poster="/path/to/your-poster-image.jpg"
                                    >
                                        <source src={blogs.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Play/Pause Button */}
                                    <button
                                        onClick={handlePlayPause}
                                        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        {isPlaying ? <BiPause/> : <BiPlay/>}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 text-gray-100">
                                อ่านเพิ่ม :
                                <Link href={blogs.creditlink}
                                    className="ml-3 text-teal-500 hover:text-teal-300" target="_blank">
                                    {blogs.creditlink}
                                </Link>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <div className="flex items-center justify-center">
                                <div className="w-10 border-t-4 border-gray-400"></div>
                                <h2 className="mx-4 text-red-600 text-2xl font-bold whitespace-nowrap">
                                    LATEST <span className="text-white ml-3">MATCHES</span>
                                </h2>
                                <div className="flex-grow border-t-4 border-gray-400"></div>
                            </div>
                            <LatestMath />

                            <CommentSection articleId={blogs.id} />
                        </div>
                    </div>


                    <div className='col-span-4'>
                        {/* search */}
                        <SearchBar />

                        {/* Social */}
                        <WeAreSocial />
                        {/* Latest Activity */}
                        <LatestActivity />
                        {/* Latest News */}
                        <LatestNews />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ReadBlog;