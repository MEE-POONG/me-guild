import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface BreadcrumbProps {
    idTitle?: string; // รับค่า title ที่จะใช้แทนค่า [id]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ idTitle }) => {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter((x) => x);

    return (
        <div className="container mx-auto mt-3">
            <ul className="text-white flex flex-row items-center font-mg05 italic font-bold">
                <li className="inline-block hover:text-yellow-400">
                    <a href="/">Home</a>
                </li>
                {pathnames.map((value, index) => {
                    const isLast = index === pathnames.length - 1;
                    const link = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <li key={index} className="flex items-center">
                            <FaAngleRight className="mx-2" />
                            {isLast && value === '[id]' ? (
                                // ถ้าเป็นรายการสุดท้ายและค่าเป็น [id] แสดง idTitle แทน
                                <span className="text-yellow-200 eng-first-uppercase">
                                    {idTitle || 'Unknown'}
                                </span>
                            ) : isLast ? (
                                // ถ้าเป็นรายการสุดท้ายแต่ไม่ใช่ [id]
                                <span className="text-yellow-200 eng-first-uppercase">{value}</span>
                            ) : (
                                // ถ้าไม่ใช่รายการสุดท้ายให้แสดงลิงก์
                                <a href={link} className="hover:text-yellow-400 eng-first-uppercase">
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
