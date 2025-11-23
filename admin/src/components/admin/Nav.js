import { Link, useLocation } from "react-router-dom";

export default function AdminNav() {
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <nav className="bg-gray-900 text-white w-64 p-4">
      <ul className="space-y-3">
        <li>
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded transition-colors ${
              isActive("/dashboard") ? "bg-gray-800" : "hover:bg-gray-600"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/posts"
            className={`block px-3 py-2 rounded transition-colors ${
              isActive("/posts") ? "bg-gray-800" : "hover:bg-gray-600"
            }`}
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            to="/pages"
            className={`block px-3 py-2 rounded transition-colors ${
              isActive("/pages") ? "bg-gray-800" : "hover:bg-gray-600"
            }`}
          >
            Pages
          </Link>
        </li>
      </ul>
    </nav>
  );
}
