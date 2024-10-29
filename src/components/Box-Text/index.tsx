import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface BoxTextProps {
    title?: string; // รับค่า title ที่จะใช้แทนค่า [id]
    detailOne?: string;
    detailTwo?: string;
    detailThree?: string;
}

const BoxText: React.FC<BoxTextProps> = ({ title, detailOne, detailTwo, detailThree }) => {

    return (
        <div className='relative box-one'>
            {/* <div className="border-2 border-[#de9b72] h-[99%] w-[98%] p-1 mx-auto">
                <div className="border-6 border-[#de9b72] h-full w-full p-1 mx-auto">
                    <div className="relative border-2 border-[#de9b72] h-full w-full mx-auto flex flex-col justify-center">
                        <Image className="absolute top-0 left-0 w-12" src="/images/box-one.png" alt="Decoration" />
                        <Image className="absolute top-0 right-0 w-12 transform scale-x-[-1]" src="/images/box-one.png" alt="Decoration" />
                        <Image className="absolute bottom-0 right-0 w-12 transform scale-[-1]" src="/images/box-one.png" alt="Decoration" />
                        <Image className="absolute bottom-0 left-0 w-12 transform scale-y-[-1]" src="/images/box-one.png" alt="Decoration" />
                        <p className="m-6 leading-relaxed text-lg text-[#e39d79] relative">
                            &nbsp;&nbsp;&nbsp;&nbsp;{detailOne}
                        </p>
                    </div>
                </div>
            </div> */}
            <div className="outer-border bg-[#ffffff]">
                <div className="mid-border">
                    <div className="inner-border">
                        <Image alt="left-top" className="corner-decoration  w-full h-full corner-left-top" src="/images/box-one.png" />
                        <Image alt="right-top" className="corner-decoration  w-full h-full corner-right-top" src="/images/box-one.png" />
                        <Image alt="right-bottom" className="corner-decoration  w-full h-full corner-right-bottom" src="/images/box-one.png" />
                        <Image alt="left-bottom" className="corner-decoration  w-full h-full corner-left-bottom" src="/images/box-one.png" />
                        <div className="container p-6">
                            {/* ถ้ามี title จึงจะแสดง */}
                            {title && (
                                <div className="relative z-10 text-center m-auto">
                                    <div className="flex items-center text-3xl text-gold justify-center" data-text={title}>
                                        {title}
                                    </div>
                                </div>
                            )}

                            {/* ถ้ามี detailOne จึงจะแสดง */}
                            {detailOne && (
                                <p className="mb-6 leading-relaxed text-lg text-[#e39d79] relative">
                                    &nbsp;&nbsp;&nbsp;&nbsp;{detailOne}
                                </p>
                            )}

                            {/* ถ้ามี detailTwo จึงจะแสดง */}
                            {detailTwo && (
                                <p className="mb-6 leading-relaxed text-lg text-[#e39d79] relative">
                                    &nbsp;&nbsp;&nbsp;&nbsp;{detailTwo}
                                </p>
                            )}

                            {/* ถ้ามี detailThree จึงจะแสดง */}
                            {detailThree && (
                                <p className="mb-6 leading-relaxed text-lg text-[#e39d79] relative">
                                    &nbsp;&nbsp;&nbsp;&nbsp;{detailThree}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxText;
