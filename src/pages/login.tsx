import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

            if (match) {
                // Login success: save login state to localStorage
                localStorage.setItem("isLoggedIn", "true");
                setLoginMessage("Login successful!");
                router.push("/"); // Redirect to home
            } else {
                // Show error message for invalid credentials
                setLoginMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="flex justify-center h-lvh loginpage">
            <img
                src="/images/bg01.webp"
                className="absolute w-full h-full object-cover lg:object-fit"
                alt=""
            />
            <div className="absolute top-1/4 p-5 bg-white/85 w-72 rounded-lg shadow-sm">
                <p className="text-center mb-4 font-extrabold text-amber-400 text-xl">LOGIN</p>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400 mb-3"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-1 px-2 drop-shadow-lg bg-none border-b-2 border-amber-400 focus:outline-none focus:border-blue-400"
                    />

                    {loginMessage && <p>{loginMessage}</p>}

                    <div className="text-center my-8">
                        <button type="submit" className="loginbutt">
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-sm">
                    Don’t have an account yet?
                    <Link href="/regis" className="text-blue-600 ml-2">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
