import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CreateEmployeeModal from "./CreateEmployeeModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // optional
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between items-center bg-blue-400 font-extrabold border-black my-1">
        {/* LEFT – Title */}
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          Employee Management System
        </h1>

        {/* RIGHT – Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setOpenEmployeeModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Employee
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MODAL */}
      <CreateEmployeeModal
        open={openEmployeeModal}
        onClose={() => setOpenEmployeeModal(false)}
      />
    </>
  );
}
