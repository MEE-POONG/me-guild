import Link from "next/link";

const NewActivityUpdate: React.FC = (props) => {
    return (
        <div className="bg-gray-900 py-8 px-4">
            <div className="container mx-auto  text-gray-100 py-16">
                <p className="text-xl font-bold flex items-end justify-between text-gray-200 hover:text-gray-800">
                    Activity
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-3">
                    <div className="p-5">
                        <p className="text-xl mb-3">Daily</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2 flex justify-between">
                                Activity01
                                <span className="text-orange-400">5 point</span>
                            </li>
                            <li className="border-b border-slate-500 mb-2 flex justify-between">
                                Activity01
                                <span className="text-orange-400">5 point</span>
                            </li>
                            <li className="border-b border-slate-500 mb-2 flex justify-between">
                                Activity01
                                <span className="text-orange-400">5 point</span>
                            </li>
                            <li className="border-b border-slate-500 mb-2 flex justify-between">
                                Activity01
                                <span className="text-orange-400">5 point</span>
                            </li>

                        </ul>
                    </div>
                    <div className="p-5 bg-slate-100 text-black">
                        <p className="text-xl mb-3">Monthly</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2 flex justify-between">
                                Activity01
                                <span className="text-orange-400">20 point</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default NewActivityUpdate;