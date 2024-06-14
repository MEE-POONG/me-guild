import Link from "next/link";
import React from "react"

const PeopleList: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl mt-10 font-bold text-gray-700 drop-shadow-md">Poppular</h2>
            <div className="bg-gray-900 p-5 rounded shadow-md mt-2">
                <p className="text-gray-200 mb-3">Top People</p>
                <div>
                    <Link href='' className="flex bg-gray-50 rounded-md space-x-2 w-64 p-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Guild-logo-01_.png"
                            className="w-12 h-12 md:w-20 md:h-20 rounded"
                            alt="" />
                        <div>
                            <p>Name: <span className="font-bold text-teal-700 ">Guild Number One</span></p>
                            <p>Members: 100</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default PeopleList;