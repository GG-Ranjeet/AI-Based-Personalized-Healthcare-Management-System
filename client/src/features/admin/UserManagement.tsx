import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, X } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin?: string;
  twoFA: string;
  initials?: string;
  avatarUrl?: string;
  createdAt?: string;
};

function UserManagement() {

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  // Add User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Patient"
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        // Compute initials and format date for UI
        const mappedUsers = data.users.map((u: any) => ({
          ...u,
          initials: u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase(),
          lastLogin: u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never",
          twoFA: u.twoFA || "Disabled",
          department: u.department || "General",
          role: u.role.charAt(0).toUpperCase() + u.role.slice(1) // capitalize role
        }));
        setUsers(mappedUsers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          role: newUser.role.toLowerCase()
        })
      });
      if (res.ok) {
        alert("User Added Successfully");
        setShowAddUser(false);
        setNewUser({ name: "", email: "", role: "Patient" });
        fetchUsers();
      } else {
        alert("Failed to add user");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleUserStatus = async (user: User) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchUsers();
        if (selectedUser && selectedUser._id === user._id) {
            setSelectedUser({ ...selectedUser, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const openUser = (user: User) => {
    setSelectedUser(user);
  };


  return (
    <>
      {/* MAIN AREA */}
      <div >

          {/* TITLE */}
          <div className="flex items-center justify-between mb-7">

            <div>
              <h1 className="text-[22px] font-bold">
                Users
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Manage network access and roles.
              </p>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="bg-[#3265ad] hover:bg-[#285796] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Add User
            </button>
          </div>

          {/* TWO COLUMN AREA */}
          <div className="grid grid-cols-[1fr_315px] gap-6">

            {/* USER TABLE */}
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

              {/* SEARCH */}
              <div className="p-4 border-b flex gap-4">

                <div className="flex-1 relative">

                  <span className="absolute left-4 top-2.5 text-gray-400">
                    <Search size={16} />
                  </span>

                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="px-5 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Filter size={14} /> Filter
                </button>
              </div>

              {showFilter && (
                <div className="p-4 border-b bg-gray-50 flex gap-3">

                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-blue-50">
                    Doctor
                  </button>

                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-blue-50">
                    Patient
                  </button>

                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-blue-50">
                    Admin
                  </button>

                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-blue-50">
                    Active
                  </button>
                </div>
              )}

              {/* TABLE HEADER */}
              <div className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr] px-5 py-4 text-[12px] font-semibold text-gray-500 border-b">

                <div>
                  <input type="checkbox" />
                </div>

                <div>USER</div>
                <div>ROLE</div>
                <div>STATUS</div>
                <div>LAST LOGIN</div>
                <div>ACTIONS</div>
              </div>

              {/* USERS */}
              {filteredUsers.map((user, index) => (

                <div
                  key={user._id || index}
                  onClick={() => openUser(user)}
                  className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr] items-center px-5 py-5 border-b hover:bg-blue-50 cursor-pointer transition"
                >

                  <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </div>

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold overflow-hidden ${index === 0
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        user.initials
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-sm">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* ROLE */}
                  <div className="text-sm">
                    {user.role}
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`text-sm ${user.status === "Active"
                        ? "text-emerald-600"
                        : "text-gray-500"
                        }`}
                    >
                      ● {user.status}
                    </span>
                  </div>


                  {/* LOGIN */}
                  <div className="text-sm text-gray-600">
                    {user.lastLogin}
                  </div>

                  {/* ACTION */}
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openUser(user);
                      }}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View
                    </button>
                  </div>

                </div>
              ))}
              {/* FOOTER */}
              <div className="flex items-center justify-between px-5 py-4">

                <p className="text-sm text-gray-500">
                  Showing {filteredUsers.length} users
                </p>

                <div className="flex gap-2">

                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="w-8 h-8 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() => setPage(page + 1)}
                    className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                  >
                    ›
                  </button>

                </div>
              </div>

            </div>

            {/* USER DETAILS */}
            <div className="bg-white border rounded-xl shadow-sm min-h-187.5 flex flex-col">

              {/* DETAILS HEADER */}
              <div className="flex justify-between items-center p-5 border-b">

                <h2 className="font-bold text-lg">
                  User Details
                </h2>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <X size={24} />
                </button>
              </div>

              {selectedUser ? (

                <>

                  {/* PROFILE */}
                  <div className="p-7 text-center">

                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white mx-auto flex items-center justify-center text-lg font-semibold overflow-hidden">
                      {selectedUser.avatarUrl ? (
                        <img src={selectedUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        selectedUser.initials
                      )}
                    </div>

                    <h3 className="font-bold text-lg mt-4">
                      {selectedUser.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                    <button
                      onClick={() => toggleUserStatus(selectedUser)}
                      className={`mt-3 text-sm font-medium px-3 py-1 rounded-full border ${selectedUser.status === "Active"
                        ? "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                        : "text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      ● {selectedUser.status} Account
                    </button>


                  </div>

                  <div className="px-7">

                    <div className="border-t pt-5">

                      <h4 className="text-xs font-bold text-gray-500">
                        ROLE & DEPARTMENT
                      </h4>

                      <p className="font-medium mt-3 text-sm">
                        {selectedUser.role}
                      </p>

                      <p className="text-sm text-gray-500">
                        {selectedUser.department}
                      </p>
                    </div>

                    {/* SECURITY */}
                    <div className="mt-7">

                      <h4 className="text-xs font-bold text-gray-500">
                        SECURITY
                      </h4>

                      <div className="flex justify-between mt-4 text-sm">
                        <span>2FA</span>

                        <button
                          onClick={() => alert("2FA setting clicked")}
                          className="text-gray-700 font-medium"
                        >
                          {selectedUser.twoFA}
                        </button>
                      </div>

                      <div className="flex justify-between mt-3 text-sm">
                        <span>Last Login</span>

                        <span className="font-medium">
                          {selectedUser.lastLogin}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* EDIT BUTTON */}
                  <div className="mt-auto p-5 border-t">

                    <button
                      onClick={() =>
                        alert("Editing user is currently in development")
                      }
                      className="w-full border rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} /> Edit User
                    </button>

                  </div>

                </>

              ) : (

                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  Select a user to view details
                </div>

              )}

            </div>

          </div>
      </div>

      {/* ADD USER MODAL */}
      {showAddUser && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-105 p-6">

            <div className="flex justify-between mb-5">

              <h2 className="text-lg font-bold">
                Add New User
              </h2>

              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>

            </div>

            <input
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full border rounded-lg px-4 py-3 mb-3 outline-none"
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full border rounded-lg px-4 py-3 mb-3 outline-none"
            />

            <select 
              className="w-full border rounded-lg px-4 py-3 mb-5"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>

            <button
              onClick={handleAddUser}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Add User
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default UserManagement;