import { useState } from "react";
import Selector from "../component/utils/Selector";
import Checkbox from "../component/utils/Checkbox";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState<number>(1);
    const navigate = useNavigate();

    const roles = [
        { id: 1, name: "Patient" },
        { id: 2, name: "Doctor" },
        { id: 3, name: "Admin" },
    ];

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleRoleChange = (roleId: number) => {
        setSelectedRole(roleId);
    }
    const handleLoginForm = async (e: React.BaseSyntheticEvent<SubmitEvent, HTMLFormElement, HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const role = roles[selectedRole - 1].name; // Get the role name based on the selectedRole index
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("Form submitted with values:", { role, email, password });
        
        try{
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role, email, password }),
            });
            console.log("Response:", response);
            if (response.ok){
                const data = await response.json();
                console.log("Login successful:", data);
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
            else {
                const result = await response.json();
                console.error("Login failed:", result.message);
                if (result.message) {
                    alert(`Login failed: ${result.message}`);
                } else {
                    alert("Login failed. Please check your details and try again.");
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
    

    return (
        <div className="w-full max-w-sm flex flex-col gap-5 px-4 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-slate-800">MediFlow AI</h1>
                <p>Secure Personalized Medical portal</p>
            </div>

            <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-xl">
                <form  className="space-y-6" onSubmit={handleLoginForm}>
                    <div>
                        <label htmlFor="selector" className="text-sm font-medium">
                            SELECT ACCESS ROLE
                        </label>
                        <Selector name="role" type="selector" options={roles} selected={selectedRole} handler={handleRoleChange}></Selector>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 ">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition"
                                placeholder="abc@example.com"
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <label htmlFor="forget-password" className="block text-sm font-semibold text-indigo-400">
                                Forgot Password?
                            </label>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition"
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <div className="space-y-6">
                        <Checkbox props={{id: "remember-me", name:"remember-me"}} >
                            <label htmlFor="remember-me" className="text-sm text-gray-500">
                                Remember this device for 30 days
                            </label>            
                        </Checkbox>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition"
                        >
                            Sign in to portal
                        </button>
                    </div>
                </form>
                <hr className="border-none h-0.5 bg-gray-200"/>
                <p className="text-sm text-center text-gray-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-600">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
