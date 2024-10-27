import BoxText from "@/components/Box-Text";
import Breadcrumb from "@/components/Breadcrumb";
import SecondaryTopicOne from "@/components/Head/SecondaryTopicOne";
import Layout from "@/components/Layout";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { BiArrowFromRight } from "react-icons/bi";
import { FaAngleRight, FaStar } from "react-icons/fa";
import { GiDaemonSkull } from "react-icons/gi";

const GuildPage: React.FC = (props) => {

    return (
        <Layout>
            <div className="pt-[140px]" />
            <Breadcrumb />
            <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto relative mb-24">
                <img src="/images/bg-paper.png" alt="bg-paper" className="absolute left-0 " />
                <div className="relative w-full bg-center bg-contain border border-yellow-900 bg-no-repeat shadow-md shadow-[#000000] bg-[#f8f0d9]" >
                    <div className="text-brown-900 font-serif text-lg m-8 p-4 md:text-xl leading-relaxed border-2 border-orange-950/20	">
                        <div className="relative z-10 text-center m-auto ">
                            <h1 className="text-7xl font-bold font-mg04 text-gold" data-text={`MeGuild`}>
                                MeGuild
                            </h1>
                        </div>
                        <div className=" relative mb-10 mx-auto max-w-7xl flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row text-gray-700">
                            <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
                                <img src="/images/logoFull.png" alt="logoFull" className="object-cover object-center rounded" />
                            </div>
                            <div className="sm:text-center lg:text-left">
                                <h2 className="text-4xl tracking-tight font-extrabold text-gray-800">
                                    <span className="block text-[#ee9a34] xl:inline font-mg05">MeGuild </span>
                                    <span className="block xl:inline">คืออะไร</span>
                                </h2>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    ร่วมสร้างกิลล์ในฝันของคุณ! มาเป็นส่วนหนึ่งของชุมชนแห่งความสนุกและมิตรภาพ เกิดขึ้นจากความต้องการในการสร้างพื้นที่ที่ผู้เล่นสามารถมารวมตัวกัน สร้างมิตรภาพ และสนับสนุนกันและกันได้ MeGuild เชื่อว่าการเล่นเกมไม่ควรเป็นแค่การพยายามทำคะแนนหรือผ่านด่าน แต่ควรเป็นประสบการณ์ที่ช่วยให้ผู้เล่นได้สนุกไปกับคนอื่นๆ ผ่านการทำงานร่วมกัน การสร้าง Guild ใน MeGuild จึงเป็นแนวทางที่เปิดโอกาสให้ทุกคนสามารถสร้างชุมชนของตนเอง มีส่วนร่วมในกิจกรรมที่หลากหลาย และเรียนรู้ไปพร้อมกับเพื่อนร่วมทีม
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                                            เยี่ยมเยือนโลกของMe Guild
                                        </a>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                            สร้าง Guild
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                ทำไมถึงสร้าง MeGuild ขึ้นมา?
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-500">
                                &nbsp;&nbsp;&nbsp;&nbsp;MeGuild เกิดขึ้นจากความต้องการที่จะสร้างแพลตฟอร์มที่เป็นศูนย์กลางในการรวมกลุ่มและสร้างชุมชนที่แข็งแกร่งในโลกของเกมออนไลน์ ในปัจจุบัน โลกของเกมได้พัฒนาไปอย่างรวดเร็ว การเล่นเกมไม่ใช่แค่การผจญภัยในด่านต่างๆ ด้วยตัวคนเดียวอีกต่อไป แต่ได้กลายเป็นประสบการณ์ที่เชื่อมโยงผู้คนจากทุกมุมโลก MeGuild ถูกสร้างขึ้นเพื่อรองรับความต้องการนี้ ให้ผู้เล่นสามารถรวมกลุ่ม สร้างความสัมพันธ์ และสนุกไปกับการทำงานร่วมกันอย่างแท้จริง
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                เป้าหมายหลักของ MeGuild
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-500">
                                <span className="font-bold">สร้างพื้นที่สำหรับการเชื่อมต่อ</span> : MeGuild ถูกสร้างขึ้นเพื่อเป็นพื้นที่ที่ผู้เล่นสามารถมาพบปะและเชื่อมต่อกับคนที่มีความสนใจเดียวกัน เราเชื่อว่าการเล่นเกมไม่ใช่เพียงแค่การทำภารกิจเท่านั้น แต่ยังเป็นโอกาสในการสร้างมิตรภาพใหม่ๆ การรวมกลุ่มในกิลล์ช่วยให้ผู้เล่นได้สร้างสัมพันธ์อันแน่นแฟ้น และสามารถสนุกไปด้วยกันได้ไม่ว่าพวกเขาจะอยู่ที่ไหนในโลก
                                <br />
                                <span className="font-bold">ส่งเสริมการทำงานเป็นทีม</span> : MeGuild เข้าใจถึงพลังของการทำงานร่วมกัน การสร้างกิลล์ไม่ใช่เพียงแค่การรวมกลุ่มคนเท่านั้น แต่ยังเป็นโอกาสให้ผู้เล่นได้ฝึกฝนการทำงานเป็นทีม วางแผนกลยุทธ์ และเผชิญหน้ากับความท้าทายที่ยิ่งใหญ่ การที่ผู้เล่นสามารถรวมกลุ่มและสนับสนุนกันและกันทำให้การเล่นเกมสนุกและเต็มไปด้วยประสบการณ์ที่น่าจดจำมากยิ่งขึ้น
                                <br />
                                <span className="font-bold">ให้โอกาสในการสร้างชุมชนของตนเอง</span> : MeGuild มอบเครื่องมือให้ผู้เล่นสามารถสร้างกิลล์ของตนเองได้ง่ายๆ ตั้งแต่การเลือกชื่อ ออกแบบโลโก้ ไปจนถึงการจัดการสมาชิกในกิลล์ ผู้เล่นสามารถสร้างชุมชนในแบบที่พวกเขาต้องการ และมีอิสระในการสร้างกลุ่มที่ตรงกับสไตล์การเล่นและเป้าหมายของตนเอง
                                <br />
                                <span className="font-bold"> มุ่งเน้นการสนับสนุนชุมชน</span> : MeGuild ถูกออกแบบมาเพื่อสนับสนุนและเสริมสร้างความรู้สึกของการเป็นส่วนหนึ่งในชุมชน เมื่อคุณเป็นส่วนหนึ่งของกิลล์ คุณจะไม่รู้สึกว่ากำลังเล่นคนเดียวอีกต่อไป คุณจะได้รับการช่วยเหลือและสนับสนุนจากเพื่อนร่วมกิลล์ ทำให้สามารถฝ่าฟันความท้าทายต่างๆ ได้อย่างมั่นใจ
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Guild คืออะไร
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-500">
                                Guild คือการรวมตัวของกลุ่มผู้เล่นที่มีจุดประสงค์หรือเป้าหมายร่วมกันในเกมออนไลน์หรือชุมชนต่างๆ โดยสมาชิกของกิลล์มักจะช่วยเหลือกันในเรื่องต่างๆ เช่น การทำภารกิจร่วมกัน การแบ่งปันทรัพยากร หรือการแลกเปลี่ยนความรู้และประสบการณ์ในการเล่นเกม นอกจากนี้ Guild ยังเป็นสถานที่ที่ผู้เล่นสามารถสร้างความสัมพันธ์ระหว่างกัน ทำให้การเล่นเกมไม่ใช่แค่เรื่องของการเล่นคนเดียว แต่เป็นการสร้างชุมชนที่แข็งแกร่งและสนุกสนานไปพร้อมกัน
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                ประโยชน์ของการเข้าร่วม
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-500">
                                <span className="font-bold">สนุกไปกับระบบสนับสนุนจากชุมชน </span>
                                : การเข้าร่วมกิลล์จะช่วยให้คุณมีโอกาสเรียนรู้และได้รับการช่วยเหลือจากสมาชิกที่มีประสบการณ์มากขึ้น
                                <br />
                                <span className="font-bold">โอกาสพิเศษสำหรับกิจกรรมและรางวัลพิเศษ </span>
                                : กิลล์ใน MeGuild จะมีการจัดกิจกรรมพิเศษ เช่น การแข่งขันภายในกิลล์หรือกิจกรรมรายสัปดาห์ ซึ่งจะมอบรางวัลให้กับผู้ที่เข้าร่วม
                            </p>
                        </div>
                        <div className="mb-8">
                            <div className="ml-auto flex items-center justify-center m-0 p-0 font-bold flex-col w-max text-center" >
                                <img src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/907bdcd3-565b-4ae1-045b-c4d966eaa600/350" alt="" className="mx-auto h-16" />
                                <p className="w-full hidden md:inline font-bold text-cyan-400">Me Prompt Technology</p>
                                <p className="text-sm">จัดทำโดย</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default GuildPage;