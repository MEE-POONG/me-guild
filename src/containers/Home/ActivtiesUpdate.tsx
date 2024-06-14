const ActivityUpdate: React.FC = () => {
    return (
        <section className="bg-gray-900 w-full mt-12">
            <div className="container mx-auto text-gray-100 px-10 py-16">
                <p className="text-xl font-bold flex items-end justify-between text-gray-200 hover:text-gray-800">
                    Activity
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-3">
                    <div className="p-5">
                        <p className="text-xl mb-3">Recommended</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2">Activity01</li>
                            <li className="border-b border-slate-500 mb-2">Activity02</li>
                            <li className="border-b border-slate-500 mb-2">Activity03</li>
                            <li className="border-b border-slate-500 mb-2">Activity04</li>
                            <li className="border-b border-slate-500 mb-2">Activity05</li>
                        </ul>
                    </div>
                    <div className="p-5 bg-slate-100 text-black">
                        <p className="text-xl mb-3">Coming Soon</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2">Activity01</li>
                            <li className="border-b border-slate-500 mb-2">Activity02</li>
                            <li className="border-b border-slate-500 mb-2">Activity03</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ActivityUpdate;