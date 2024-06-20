import Link from "next/link";
import React from "react"

const PeopleList: React.FC = () => {
    return (
        <div className="container mx-auto px-4 max-w-4xl ">
            <h2 className="text-4xl mt-10 font-bold text-gray-700 drop-shadow-md">Poppular</h2>
            <div className="bg-gray-900 p-5 rounded shadow-md mt-2">
                <p className="text-gray-200 mb-3">Top People</p>
                <div>
                    <Link href='' className="flex items-center bg-gray-50 rounded-md space-x-2 md:w-72 p-3 mx-auto mb-5 relative">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Guild-logo-01_.png"
                            className="w-12 h-12 md:w-20 md:h-20 rounded mx-auto"
                            alt="" />
                        <div >
                            <p>Name: <span className="font-bold text-teal-700 text-sm md:text-base">Guild Number One</span></p>
                        </div>
                        <div className="absolute bg-amber-400 rounded-full py-1 px-3 -top-3 right-0">
                            1
                        </div>
                    </Link>
                    <div className="mx-auto flex justify-center gap-5">
                        <Link href='' className="md:flex items-center bg-gray-50 rounded-md space-x-2 p-2 relative">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Guild-logo-01_.png"
                                className="w-12 h-12 md:w-20 md:h-20 rounded mx-auto"
                                alt="" />
                            <div>
                                <p>Name: <span className="font-bold text-teal-700 text-sm md:text-base">Guild Number One</span></p>
                            </div>
                            <div className="absolute bg-amber-400 rounded-full py-1 px-3 -top-3 right-0">
                                2
                            </div>
                        </Link>
                        <Link href='' className="md:flex items-center bg-gray-50 rounded-md space-x-2 p-2 relative">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Guild-logo-01_.png"
                                className="w-12 h-12 md:w-20 md:h-20 rounded mx-auto"
                                alt="" />
                            <div>
                                <p>Name: <span className="font-bold text-teal-700 text-sm md:text-base">Guild Number One</span></p>
                            </div>
                            <div className="absolute bg-amber-400 rounded-full py-1 px-3 -top-3 right-0">
                                3
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="overflow-hidden border border-gray-200  md:rounded-lg mt-5">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <tbody className="">
                            <tr className="text-gray-200 border-b">
                                <td className="pl-3 md:pl-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">4</td>
                                <td className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Guild Name</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="text-gray-200 border-b">
                                <td className="pl-3 md:pl-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">4</td>
                                <td className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Guild Name</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="text-gray-200 border-b">
                                <td className="pl-3 md:pl-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">4</td>
                                <td className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Guild Name</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="text-gray-200 border-b">
                                <td className="pl-3 md:pl-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">4</td>
                                <td className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Guild Name</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">authurmelo@example.com</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>



                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
export default PeopleList;