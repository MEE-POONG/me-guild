import Link from "next/link";

const LoginPage: React.FC = (props) => {

    return (
        <div className="flex justify-center h-lvh loginpage" >
            <img src="/images/bg01.webp"
                className="absolute w-full h-full object-cover lg:object-fit"
                alt="" />
            <div className="absolute top-1/4 p-5 bg-white/85 w-72 rounded-lg shadow-sm">
                <p className="text-center mb-4 font-extrabold text-amber-400 text-xl">LOGIN</p>
                <label htmlFor="username">Usernsme</label>
                <input type="text" name="" className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3" />
                <label htmlFor="">Password</label>
                <input type="password" name="" className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400" />

                <div className="text-center my-8">
                    <button className="loginbutt">
                        <Link href="/regis">Login</Link>
                    </button>
                </div>

                <p className="text-sm">Don’t have an account yet?
                    <Link href="/regis" className="text-blue-600 ml-2">Sign up</Link>
                </p>
            </div>
        </div>
    )
}
export default LoginPage;