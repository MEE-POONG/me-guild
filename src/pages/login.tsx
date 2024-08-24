import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage: React.FC = (props) => {
    const [data, setData] = useState<{ adminUser: { username: string, password: string } } | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {

            const response = await fetch("/api/checkLogin");
            const data = await response.json();

            const match = data?.users?.some((user: { username: string, password: string }) => {
                return user.username === username && user.password === password;
            });
            // Simulate login logic, replace with actual API call
            if (match) {
                // Set login success and save to localStorage
                setLoginSuccess(true);
                localStorage.setItem("isLoggedIn", "true"); // Set the logged-in state
                router.push("/");
            } else {
                // Credentials do not match, show an error message
                setLoginSuccess(false);
                setLoginMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        // Fetch data from the API
        fetch("/api/checkLogin")
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched data to the state
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    return (
        <div className="flex justify-center h-lvh loginpage" >
            <img src="/images/bg01.webp"
                className="absolute w-full h-full object-cover lg:object-fit"
                alt="" />
            <div className="absolute top-1/4 p-5 bg-white/85 w-72 rounded-lg shadow-sm">
                <p className="text-center mb-4 font-extrabold text-amber-400 text-xl">LOGIN</p>
                <label htmlFor="username">Usernsme</label>
                <input type="text" name="" value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                />
                <label htmlFor="">Password</label>
                <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400"
                />

                <div className="text-center my-8">
                    <button className="loginbutt">
                        <Link href="/">Login</Link>
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