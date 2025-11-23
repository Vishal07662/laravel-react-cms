import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

export default function AdminHeader() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Admin Panel</div>

        <div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
