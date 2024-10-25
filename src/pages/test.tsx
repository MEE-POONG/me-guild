import Layout from "@/components/Layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React, { useState } from "react";


const TestPage: React.FC = (props) => {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-3xl p-10 bg-white shadow-xl">
        <img src={`/images/bg-paper-page-${page}.png`} alt="bg-paper" className="absolute top-0 w-full -z-10" />
        <h1 className="text-4xl font-bold mb-5">Page {page}</h1>
        <p className="text-lg">เนื้อหาของหน้า {page}</p>
      </div>

      <div className="mt-5 flex space-x-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default TestPage;
