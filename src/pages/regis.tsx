import LoginWithDiscord from "@/components/LoginWithDiscord";
import Link from "next/link";

const RegisterPage: React.FC = (props) => {

    return (
        <div className="login-page" >
            <div className="background-image p-2 md:p-10">
                <div className="container mx-auto mt-40">
                    <form className="mt-3 bg-white/60 p-3 md:p-10 rounded-lg md:w-[450px] mx-auto">
                        <p className="text-center mb-4 font-extrabold text-amber-400 text-4xl drop-shadow">REGISTER</p>
                        {/* <p className="text-sm font-thin text-gray-600 mt-5">**กรุณากรอกข้อมูลจริง</p> */}
                        <div className="md:flex justify-between gap-4">
                            <div>
                                <label htmlFor="">Name</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Nickname</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                        </div>
                        <div className="md:flex justify-between gap-4">
                            <div>
                                <label htmlFor="">Age</label>
                                <input type="text" name=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Gender</label>
                                <select name="" id=""
                                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                                >
                                    <option value="">กรุณาเลือก</option>
                                    <option value="">ชาย</option>
                                    <option value="">หญิง</option>
                                    <option value="">LGBTQ+</option>
                                    <option value="">ไม่เปิดเผย</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Discord</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Username</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                       

                        <div className="text-center mt-5">
                            <button className="loginbutt">
                                <Link href="/">สมัคร</Link>
                            </button>
                        </div>
                        {/* <div className="flex items-center justify-center gap-5">
                            <div className="bg-gray-400 h-[1px] w-full" ></div>
                            <div className="text-center">or</div>
                            <div className="bg-gray-400 h-[1px] w-full" ></div>
                        </div>
                        <div className="mt-3">
                            <LoginWithDiscord />
                        </div> */}

                        <p className="text-sm mt-10">Already have an account?
                            <Link href="/login" className="text-blue-600 ml-2">Sign in</Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default RegisterPage;