import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans antialiliased">
      <div className="absolute inset-0 opacity-20 flex p-8 gap-6 pointer-events-none scale-105 blur-[6px]">
        <div className="w-64 bg-white/10 royunded-xllll h-full"></div>
        <div className="flex-1 flex-col gap-6">
          <div className="grid grid-cols-3 gap-6 h-32">
            <div className="bg-white/10 rounded-xl"></div>
            <div className="bg-white/10 rounded-xl"></div>
            <div className="bg-white/10 rounded-xl"></div>
            <div className="flex-1 bg-white/10 rounded-xl"></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border border-slate-200">
        <div className="text-center mb-6">
          <div className="text-2xl font-black text-blue-600 tracking-tight">Aegis Admin</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-winder mt-0.5">
            Regional Hospital Group
          </div>
          <h1 className="text-lg font-bold text-slate-700 mt-4">Sign in to account</h1>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 p-2 rounded text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 p-2 rounded text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-blue-600 text-white w-full p-2 rounded font-bold hover:bg-blue-700 text-sm transition-colors mt-2"
            onClick={() => {
              if (email === "admin@gmail.com" && password === "admin123") {
                navigate("/admin/dashboard");
              } else {
                alert("Invalid email or password");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;