import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {

    return (
        <div className="bg-[#1f1f1c] text-white p-5 w-full text-center">
            <p className="text-xs md:text-sm">© 2024 Community of Guild. All Rights Reserved | Design by
                <Link href="" className="ml-2">MPT Technology</Link>
            </p>
        </div>
    )
}
export default Footer; 