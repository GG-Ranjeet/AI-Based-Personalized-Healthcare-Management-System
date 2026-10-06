import { Outlet } from 'react-router-dom';
import './admin.css';
import './admin_app.css';
import AdminSidebar from './components/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, UserPlus } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="admin-container">


      <div className="min-h-screen bg-slate-50 flex">
        {/* SIDEBAR */}
        <AdminSidebar></AdminSidebar>
        <main className='flex-1'>
          <header className="h-16 bg-white border-b px-7 flex items-center justify-between">

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search records, users..."
                className="w-72 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-5">

              {/* Notification */}
              <button className="relative text-gray-500 hover:text-gray-700 transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Settings */}
              <button
                onClick={() => navigate("/settings")}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <Settings size={20} />
              </button>

              {/* New User */}
              <button
                onClick={() => navigate("/add-user")}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-800 transition"
              >
                <UserPlus size={16} /> New User
              </button>

            </div>

          </header>

          {/* Section */}

          <div className='p-7'>
            <Outlet />
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t text center">
            <p className="text-sm font-semibold text-black">
              Developed by: Sakshi Tripathi
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
