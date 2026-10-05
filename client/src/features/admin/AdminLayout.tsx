import { Outlet } from 'react-router-dom';
import './admin.css';
import './admin_app.css';
import AdminSidebar from './components/AdminSidebar';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="admin-container">


      <div className="min-h-screen bg-slate-50 flex">
        {/* SIDEBAR */}
        <AdminSidebar></AdminSidebar>
        <main className='flex-1'>
          <header className="h-16 bg-white border-b px-7 flex items-center justify-between">

            <input
              type="text"
              placeholder="⌕  Search records, users..."
              className="w-72 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
            />

            <div className="flex items-center gap-5">

              {/* Notification */}
              <button className="relative text-xl">
                🔔
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button
                onClick={() => navigate("/settings")}
                className="text-xl"
              >
                ⚙️
              </button>

              {/* New User */}
              <button
                onClick={() => navigate("/add-user")}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                + New User
              </button>

            </div>

          </header>

          {/* Section */}
          <Outlet />

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
