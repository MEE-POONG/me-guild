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
    const backgroundImageUrl = '/images/grandhall2.png';

    return (
        <Layout>
            {/* <SecondaryTopicOne title={`Guild Hall`} imgBg={backgroundImageUrl} /> */}
            <div className="pt-[140px]" />
            <Breadcrumb />
            <section className="text-gray-700 body-font py-8">
                <div className="relative z-10 text-center m-auto">
                    <h1 className="text-7xl font-bold font-mg04 text-gold" data-text={`MeGuild`}>
                        MeGuild
                    </h1>
                </div>
                <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img src="/images/logoFull.png" alt="logoFull" className="object-cover object-center rounded" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
                        <BoxText title="Me Guild คือ" detailOne="ร่วมสร้างกิลล์ในฝันของคุณ! มาเป็นส่วนหนึ่งของชุมชนแห่งความสนุกและมิตรภาพ เกิดขึ้นจากความต้องการในการสร้างพื้นที่ที่ผู้เล่นสามารถมารวมตัวกัน สร้างมิตรภาพ และสนับสนุนกันและกันได้ MeGuild เชื่อว่าการเล่นเกมไม่ควรเป็นแค่การพยายามทำคะแนนหรือผ่านด่าน แต่ควรเป็นประสบการณ์ที่ช่วยให้ผู้เล่นได้สนุกไปกับคนอื่นๆ ผ่านการทำงานร่วมกัน การสร้าง Guild ใน MeGuild จึงเป็นแนวทางที่เปิดโอกาสให้ทุกคนสามารถสร้างชุมชนของตนเอง มีส่วนร่วมในกิจกรรมที่หลากหลาย และเรียนรู้ไปพร้อมกับเพื่อนร่วมทีม" />
                    </div>

                </div>
            </section>


            {/* Section 1: Why we created Meguild */}
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">ทำไมถึงสร้าง MeGuild ขึ้นมา?</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    MeGuild เกิดขึ้นจากความต้องการที่จะสร้างแพลตฟอร์มที่เป็นศูนย์กลางในการรวมกลุ่มและสร้างชุมชนที่แข็งแกร่งในโลกของเกมออนไลน์ ในปัจจุบัน โลกของเกมได้พัฒนาไปอย่างรวดเร็ว การเล่นเกมไม่ใช่แค่การผจญภัยในด่านต่างๆ ด้วยตัวคนเดียวอีกต่อไป แต่ได้กลายเป็นประสบการณ์ที่เชื่อมโยงผู้คนจากทุกมุมโลก MeGuild ถูกสร้างขึ้นเพื่อรองรับความต้องการนี้ ให้ผู้เล่นสามารถรวมกลุ่ม สร้างความสัมพันธ์ และสนุกไปกับการทำงานร่วมกันอย่างแท้จริง                        </p>

            </section>
            {/* Section 2: What is a Guild */}
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    เป้าหมายหลักของ MeGuild
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold">สร้างพื้นที่สำหรับการเชื่อมต่อ</span> : MeGuild ถูกสร้างขึ้นเพื่อเป็นพื้นที่ที่ผู้เล่นสามารถมาพบปะและเชื่อมต่อกับคนที่มีความสนใจเดียวกัน เราเชื่อว่าการเล่นเกมไม่ใช่เพียงแค่การทำภารกิจเท่านั้น แต่ยังเป็นโอกาสในการสร้างมิตรภาพใหม่ๆ การรวมกลุ่มในกิลล์ช่วยให้ผู้เล่นได้สร้างสัมพันธ์อันแน่นแฟ้น และสามารถสนุกไปด้วยกันได้ไม่ว่าพวกเขาจะอยู่ที่ไหนในโลก
                    <br />
                    <span className="font-bold">ส่งเสริมการทำงานเป็นทีม</span> : MeGuild เข้าใจถึงพลังของการทำงานร่วมกัน การสร้างกิลล์ไม่ใช่เพียงแค่การรวมกลุ่มคนเท่านั้น แต่ยังเป็นโอกาสให้ผู้เล่นได้ฝึกฝนการทำงานเป็นทีม วางแผนกลยุทธ์ และเผชิญหน้ากับความท้าทายที่ยิ่งใหญ่ การที่ผู้เล่นสามารถรวมกลุ่มและสนับสนุนกันและกันทำให้การเล่นเกมสนุกและเต็มไปด้วยประสบการณ์ที่น่าจดจำมากยิ่งขึ้น
                    <br />
                    <span className="font-bold">ให้โอกาสในการสร้างชุมชนของตนเอง</span> : MeGuild มอบเครื่องมือให้ผู้เล่นสามารถสร้างกิลล์ของตนเองได้ง่ายๆ ตั้งแต่การเลือกชื่อ ออกแบบโลโก้ ไปจนถึงการจัดการสมาชิกในกิลล์ ผู้เล่นสามารถสร้างชุมชนในแบบที่พวกเขาต้องการ และมีอิสระในการสร้างกลุ่มที่ตรงกับสไตล์การเล่นและเป้าหมายของตนเอง
                    <br />
                    <span className="font-bold"> มุ่งเน้นการสนับสนุนชุมชน</span> : MeGuild ถูกออกแบบมาเพื่อสนับสนุนและเสริมสร้างความรู้สึกของการเป็นส่วนหนึ่งในชุมชน เมื่อคุณเป็นส่วนหนึ่งของกิลล์ คุณจะไม่รู้สึกว่ากำลังเล่นคนเดียวอีกต่อไป คุณจะได้รับการช่วยเหลือและสนับสนุนจากเพื่อนร่วมกิลล์ ทำให้สามารถฝ่าฟันความท้าทายต่างๆ ได้อย่างมั่นใจ                        </p>


            </section>

            {/* Section 3: Invitation Steps */}
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">ก้าวเชิญชวน</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    การเข้าร่วม Meguild นั้นง่ายมาก มีเพียงไม่กี่ขั้นตอน...
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mt-4">
                    <li>สมัครสมาชิกที่เว็บไซต์ของเรา</li>
                    <li>กรอกข้อมูลและเข้าร่วมกลุ่มที่สนใจ</li>
                    <li>เริ่มต้นทำภารกิจหรือกิจกรรมร่วมกับเพื่อนใน Guild</li>
                </ul>
            </section>
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Guild คืออะไร </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Guild คือการรวมตัวของกลุ่มผู้เล่นที่มีจุดประสงค์หรือเป้าหมายร่วมกันในเกมออนไลน์หรือชุมชนต่างๆ โดยสมาชิกของกิลล์มักจะช่วยเหลือกันในเรื่องต่างๆ เช่น การทำภารกิจร่วมกัน การแบ่งปันทรัพยากร หรือการแลกเปลี่ยนความรู้และประสบการณ์ในการเล่นเกม นอกจากนี้ Guild ยังเป็นสถานที่ที่ผู้เล่นสามารถสร้างความสัมพันธ์ระหว่างกัน ทำให้การเล่นเกมไม่ใช่แค่เรื่องของการเล่นคนเดียว แต่เป็นการสร้างชุมชนที่แข็งแกร่งและสนุกสนานไปพร้อมกัน
                </p>
            </section>

            {/* Section 4: Q&A */}
            <section className="container mx-auto px-4 py-5">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Q&A</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-700">Q: ฉันต้องทำอย่างไรถึงจะเข้าร่วม Meguild ได้?</h3>
                        <p className="text-lg text-gray-700">A: เพียงลงทะเบียนบนเว็บไซต์ของเราแล้วคุณจะสามารถเข้าร่วมได้ทันที</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-700">Q: ภารกิจของ Guild คืออะไร?</h3>
                        <p className="text-lg text-gray-700">A: ภารกิจของ Guild คือการรวมตัวกันเพื่อทำกิจกรรมหรือภารกิจที่ท้าทาย...</p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default GuildPage;