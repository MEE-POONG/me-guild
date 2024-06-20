import Layout from "@/components/layout"

const ReadNews: React.FC = (props) => {
    return (
        <Layout>
            <div className="max-w-4xl container mx-auto px-4">
                <div>
                    <p className="text-lg mb-3 font-black">The 100 greatest video games of all time, ranked by experts</p>
                    <div className="border-t-4 border-purple-500 text-sm md:text-base">
                        <img src="https://media.gq-magazine.co.uk/photos/645b5c3c8223a5c3801b8b26/16:9/w_1280,c_limit/100-best-games-hp-b.jpg"
                            className="w-full h-full mx-auto drop-shadow-md"
                            alt=""
                        />
                        <p className="mt-5 indent-8 ">
                            Greatest games of all time lists have, for all time, gone the same way; a team of video game journalists sit down and put together
                            a ranking that is almost predetermined – a seemingly canonical hall of fame that attempts to cover off as many bases as possible.
                            Here at GQ, we thought we’d embrace chaos instead. Rather than shuffle Ocarina of Time,
                            Dark Souls and Ico across a big list according to our own whims, we decided to get our friends involved.
                        </p>
                        <div className="mt-5">
                            Credit :
                            <a href="https://www.gq-magazine.co.uk/article/best-video-games-all-time"
                                className="ml-3 hover:text-teal-700" target="_blank">
                                https://www.gq-magazine.co.uk/article/best-video-games-all-time
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
export default ReadNews;