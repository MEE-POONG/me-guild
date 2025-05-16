import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import StepComponents from "@/components/step";

const RegisterPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [discordId, setDiscordId] = useState("");
    const [discordUser, setDiscordUser] = useState<any>(null);
    const stepTitles = ["1: ค้นหาข้อมูล", "2: กรอกข้อมูล", "3: สำเร็จ"];
    const [error, setError] = useState<string>(""); // ใช้สำหรับแสดง error

    const [formData, setFormData] = useState({
        discordId: "",
        username: "",
        email: "",
        nickname: "",
        password: "",
        firstname: "",
        lastname: "",
        birthday: "",
        gender: "",
        alternativeGender: "",
        preferences: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDiscordVerification = async () => {
        try {
            // เรียก API ด้วย axios
            const response = await axios.get(`/api/discord/verifyDiscordId`, {
                params: { discord_id: discordId }, // ส่ง query parameters
            });

            const data = response.data;

            if (data.exists) {
                setDiscordUser(data.user); // ตั้งค่า discordUser
                setFormData((prevData) => ({
                    ...prevData,
                    username: data.user?.username || "", // ตั้งค่า username อัตโนมัติ
                    nickname: data.user?.name || "", // ตั้งค่า username อัตโนมัติ
                    discordId: discordId // เก็บ Discord ID ใน formData
                }));
                setStep(2); // ไปยังขั้นตอนถัดไป
            } else {
                alert("Discord ID not found. Please join the server.");
            }
        } catch (error) {
            console.error("Error verifying Discord ID:", error);

            // เพิ่มข้อความแจ้งเตือนหากเกิดข้อผิดพลาด
            alert("Failed to verify Discord ID. Please try again later.");
        }
    };

    const handleSubmit = async () => {
        try {
            // ส่งข้อมูลไปยัง API /api/user
            const response = await axios.post('/api/user', {
                discord_id: formData.discordId,
                username: formData.username,
                email: formData.email,
                nickname: formData.nickname,
                password: formData.password,

            });

            // ตรวจสอบ Response
            if (response.status === 201) {
                setStep(3); // ไปยังขั้นตอนถัดไป
            } else {
                setError("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง");
            }
        } catch (error: any) {
            // ตรวจสอบ error จาก API และแสดงข้อความภาษาไทย
            if (error.response && error.response.data.error) {
                console.log("86 : ", error.response.data.error);
                setError(error.response.data.error);
            } else {
                setError("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง");
            }
        }
    };




    return (
        <div className="register-page noselect">
            <img className="w-full h-full fixed -z-10 " src='/images/bg-map.jpg' alt="bg-layout" />
            <div className="background-image p-2 md:p-10">
                <div className="container mx-auto w-full noselect">
                    <div className="mt-3 bg-white/80 p-3 md:p-5 rounded-lg md:w-[450px] mx-auto w-full">
                        <img src="/images/logo.png" className="w-24 m-auto" alt="logo 3/2" />
                        <p className="text-center mb-4 font-extrabold text-amber-800 text-2xl drop-shadow font-mg01">
                            REGISTER
                        </p>
                        <StepComponents currentStep={step} arrayTitle={stepTitles} />

                        {step === 1 && (
                            <>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm font-medium ">
                                        Discord ID: ระบุ ID ผู้ใช้ ดิสครอส
                                        : </label>
                                    <input type="text"
                                        name="discord_id"
                                        onChange={(e) => setDiscordId(e.target.value)}
                                        className="bg-gray-50 text-gray-900 text-sm rounded-lg border-b-2 focus:outline-none focus:border-amber-400 block w-full p-2.5" placeholder="Discord ID" required />
                                </div>
                                <div className="text-center mt-4 md:mt-6">
                                    <button onClick={handleDiscordVerification}
                                        className="mx-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        ถัดไป
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                                <div className="w-full">
                                    <div className="flex flex-col items-center ">
                                        <div className="bg-white w-full rounded-md p-3 justify-center flex items-center space-x-4 mb-3">
                                            <img
                                                src={`https://cdn.discordapp.com/avatars/${discordId}/${discordUser?.avatar}.webp?size=600`}
                                                alt="User Avatar"
                                                className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
                                            />
                                            <div>
                                                <h5 className="text-lg font-semibold text-gray-800 w-full text-center">
                                                    Discord Account
                                                </h5>
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    Name : <span className="text-blue-600">{discordUser?.name || "N/A"}</span>
                                                </h5>
                                                <p className="text-md text-gray-600">
                                                    Username: <span className="text-blue-600">{discordUser?.username || "N/A"}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 items-center mb-4">
                                            {/* Username */}
                                            <label className="font-medium text-right">Username : </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="col-span-2 px-3 py-2 border-b-2 focus:outline-none focus:border-amber-400 rounded-lg"
                                                placeholder="Enter your username"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 items-center mb-4">
                                            {/* Email */}
                                            <label className="font-medium text-right">Email : </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="col-span-2 px-3 py-2 border-b-2 focus:outline-none focus:border-amber-400 rounded-lg"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 items-center mb-4">
                                            {/* Password */}
                                            <label className="font-medium text-right">Password : </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="col-span-2 px-3 py-2 border-b-2 focus:outline-none focus:border-amber-400 rounded-lg"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>

                                        {/* ปุ่มยืนยันข้อมูล */}
                                        <div className="flex mt-4 md:mt-6 justify-center">
                                            <button
                                                type="button"
                                                onClick={handleSubmit} // เพิ่มการเรียกใช้งาน handleSubmit เมื่อคลิก
                                                className="mx-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                ยืนยันข้อมูล
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => window.location.reload()}
                                                className="mx-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            >
                                                ยกเลิก
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-4 text-green-700">Confirm Information</h2>
                                    <p className="text-green-700">ยืนยันการสมัครผ่าน E-Mail</p>
                                    <div className="mt-6">
                                        <Link
                                            href={`/login`}
                                            className="ms-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Ok
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
