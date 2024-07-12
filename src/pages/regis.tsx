import Link from "next/link";

const RegisterPage: React.FC = (props) => {

    return (
        <div className="loginpage" >
            <div className="background-image p-5 md:p-10">
                <div className="container mx-auto mt-40">
                    <form className="mt-3 bg-white/50 p-5 rounded-lg md:w-[450px] mx-auto">
                        <p className="text-center mb-4 font-extrabold text-amber-400 text-2xl">REGISTER</p>
                        <p className="text-sm font-thin text-gray-600 mt-5">**กรุณากรอกข้อมูลจริง</p>
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
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Discord</label>
                            <input type="text" name=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Career/อาชีพ</label>
                            <select name="" id=""
                                className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                            >
                                <option value="">กรุณาเลือก</option>
                                <option value="">นักเวทย์</option>
                                <option value="">แทงค์</option>
                                <option value="">ฮีลเลอร์</option>
                            </select>
                        </div>

                        <div className="text-center my-8">
                            <button className="loginbutt">
                                <Link href="/">ลงชื่อเข้าใช้</Link>
                            </button>
                        </div>

                        <p className="text-sm">Already have an account?
                            <Link href="/login" className="text-blue-600 ml-2">Sign in</Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default RegisterPage;