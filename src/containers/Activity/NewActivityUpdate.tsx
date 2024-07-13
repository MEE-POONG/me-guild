import Link from "next/link";

const NewActivityUpdate: React.FC = (props) => {
    return (
        <div className="">
            <div className="container mx-auto bg-gray-100 text-gray-900 p-16">
                <p className="text-xl font-bold flex items-end justify-between text-blue-950 hover:text-gray-800">
                    Activity
                    <a href="" className="text-sm">All {'>>'}</a>
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-3">
                    <div className="p-5">
                        <p className="text-xl mb-3">Daily</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2 ">
                                <a href="" className="flex justify-between">
                                    Activity01
                                    <span className="text-orange-400">5 point</span>
                                </a>
                            </li>
                            <li className="border-b border-slate-500 mb-2 ">
                                <a href="" className="flex justify-between">
                                    Activity01
                                    <span className="text-orange-400">5 point</span>
                                </a>
                            </li>
                            <li className="border-b border-slate-500 mb-2 ">
                                <a href="" className="flex justify-between">
                                    Activity01
                                    <span className="text-orange-400">5 point</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 bg-slate-100 text-black">
                        <p className="text-xl mb-3">Monthly</p>
                        <ul className="list-inside text-sm">
                            <li className="border-b border-slate-500 mb-2 ">
                                <a href="" className="flex justify-between">
                                    Activity01
                                    <span className="text-orange-400">5 point</span>
                                </a>
                            </li>    
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default NewActivityUpdate;