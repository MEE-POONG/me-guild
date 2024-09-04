import { useEffect } from "react";
import { useRouter } from "next/router";

const LogoutPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Clear login-related data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken"); // If you are storing tokens
        localStorage.removeItem("userData");  // If you have user-specific data
        
        // Clear session storage if used
        sessionStorage.clear(); // Clear all session storage

        // Clear cookies if authentication is stored in cookies
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookie

        // Redirect to login page after clearing all data
        router.push("/login");
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutPage;
