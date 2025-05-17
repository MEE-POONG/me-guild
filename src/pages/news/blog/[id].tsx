import Breadcrumb from "@/components/Breadcrumb";
import CommentSection from "@/components/CommentSection";
import Layout from "@/components/Layout"
import LatestMath from "@/containers/Activity/LatsetMath";
import LatestActivity from "@/containers/CardReccommend/LatestActivity";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import axios from "axios";
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
                    const response = await axios.get(`/api/blog/${id}`);
                    setBlogs(response.data.data);
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
                            <img
                                className="w-full h-full mx-auto drop-shadow-md"
                                src={blogs.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blogs.img}/wmd` : "/images/default.png"}
                                alt={blogs.title || 'blog'}
                            />
                            <p className="mt-10 indent-8 text-gray-100 bg-black/50 p-6 text-sm text-justify">
                                {blogs.description}
                            </p>

                            {/* <div>
                                <iframe src={blogs.video} ></iframe>
                            </div> */}

                            <div className="mt-10 text-gray-100 border-t pt-1">
                                ที่มา :
                                <Link href={blogs.creditlink}
                                    className="ml-3 text-amber-400 hover:text-amber-300" target="_blank">
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
                        <LatestNews title={`News`} api={`/news/search?page=1&pageSize=3&keyCategory=`} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ReadBlog;