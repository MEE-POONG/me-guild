import Breadcrumb from "@/components/Breadcrumb";
import CommentSection from "@/components/CommentSection";
import Layout from "@/components/Layout"
import LatestMath from "@/containers/Activity/LatsetMath";
import LatestActivity from "@/containers/CardReccommend/LatestActivity";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiArrowFromRight, BiChevronRight } from "react-icons/bi";

const ReadNews: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchNews = async () => {
                try {
                    const response = await fetch(`/api/news/${id}`);
                    const data = await response.json();
                    setNews(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching news:', error);
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!news) {
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
                <div className="pt-[140px]" />
                <Breadcrumb idTitle={news.title} />
                <h3 className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    {news.title}
                </h3>
                <div className="lg:grid grid-cols-12 gap-10 mt-6">
                    <div className="col-span-8">
                        <div>
                            <img
                                src={news.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/wmd` : "/images/default.png"}
                                alt={news.title || 'news'}
                                className="w-full h-[420px] mx-auto drop-shadow-md object-cover"
                            />
                            <p className="mt-10 indent-8 text-white text-justify text-sm bg-black/50 p-6 drop-shadow">
                                {news.description}
                            </p>

                            <div className="mt-6 border-t text-gray-100">
                                อ่านเพิ่ม :
                                <Link href={news.creditlink}
                                    className="ml-3 text-amber-100 hover:text-amber-300" target="_blank">
                                    {news.creditlink}
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

                            <CommentSection articleId={news.id} />
                        </div>
                    </div>


                    <div className='col-span-4'>
                        {/* search */}
                        <SearchBar />

                        {/* Social */}
                        <WeAreSocial />
                        {/* Latest Activity */}
                        <LatestActivity />
                        {/* Latest Match */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ReadNews;