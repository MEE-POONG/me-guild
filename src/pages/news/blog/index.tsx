import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import WeAreSocial from '@/containers/CardReccommend/WeAreSocial';
import LatestActivity from '@/containers/CardReccommend/LatestActivity';
import SecondaryTopicOne from '@/components/Head/SecondaryTopicOne';
import Breadcrumb from '@/components/Breadcrumb';
import BlogList from '@/containers/Blog/BlogList';
import SearchBar from '@/containers/CardReccommend/SearchBarForm';
import LatestNews from '@/containers/CardReccommend/LatestNews';

const BlogPage: React.FC = (props) => {

    const backgroundImageUrl = '/images/grandhall2.png';


    return (
        <Layout>
            <SecondaryTopicOne title={`Blog`} imgBg={backgroundImageUrl} />
            <Breadcrumb />
            <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">

                <div className='lg:grid grid-cols-12 gap-10 mt-6'>
                    <div className='col-span-8'>
                        <BlogList />
                    </div>
                    <div className='col-span-4'>
                        {/* search */}
                        <SearchBar />

                        {/* Social */}
                        <WeAreSocial />
                        {/* Latest Activity */}
                        <LatestActivity />
                        {/* Latest Match */}
                        <LatestNews title={`News`} api={`/news/search?page=1&pageSize=3&keyCategory=`} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BlogPage;
