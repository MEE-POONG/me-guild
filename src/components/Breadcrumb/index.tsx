import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Breadcrumb: React.FC = () => {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter((x) => x);
    
    return (
        <div className="container mx-auto mt-3">
            <ul className="text-white flex flex-row items-center font-mg05 italic font-bold">
                <li className="inline-block hover:text-[#f2b265]">
                    <a href="/">Home</a>
                </li>
                {pathnames.map((value, index) => {
                    const isLast = index === pathnames.length - 1;
                    const link = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <li key={index} className="flex items-center">
                            <FaAngleRight className="mx-2" />
                            {isLast ? (
                                <span className="text-[#bd7b2a] eng-first-uppercase">{value}</span>
                            ) : (
                                <a href={link} className="hover:text-[#f2b265] eng-first-uppercase">
                                    {value}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Breadcrumb;