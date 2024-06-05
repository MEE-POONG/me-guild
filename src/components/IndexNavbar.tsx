import React from "react";

const IndexNavbar: React.FC = () => {

    return (
        <div className={`z-50 bg-black fixed w-full p-5`}>

            <ul className="flex justify-center gap-10 text-white">
                <li><a href="">Home</a></li>
                <li><a href="">Activity</a></li>
                <li><a href="">Guild</a></li>
                <li><a href="">About Me Guild</a></li>
            </ul>

        </div>
    )
}
export default IndexNavbar; 