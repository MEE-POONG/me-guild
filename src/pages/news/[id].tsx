import Layout from "@/components/layout"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
            <div className="container mx-auto px-4 py-10">
                <div>
                    <p className="text-2xl mb-3 font-black">{news.title}</p>
                    <div className="border-t-4 border-purple-500 text-sm md:text-base">
                        <img src={news.img}
                            className="w-full h-full mx-auto drop-shadow-md"
                            alt=""
                        />
                        <p className="mt-10 indent-8 ">
                           {news.description}
                        </p>
                        
                        <div className="mt-10">
                            <hr className="mb-3" />
                            อ่านเพิ่ม :
                            <a href= {news.creditlink}
                                className="ml-3 text-teal-500 hover:text-teal-700" target="_blank">
                                {news.creditlink}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
export default ReadNews;