import SidePanel from "../component/subComponent/SidePanel.tsx";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header.tsx";
import "./patient.css"

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
}

const initialPatientInfo = {
    id: "P-80492",
    name: "Sumit Singh",
    age: 24,
    gender: "Male",
    bloodGroup: "B+",
};

const patient: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [patientInfo] = useState(initialPatientInfo);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await fetch("api/dashboard/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <SidePanel></SidePanel>
            <div className="flex flex-col w-5/6 h-screen">
                {/* <NavBar></NavBar> */}
                <Header patientInfo={patientInfo} />

                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default patient;
