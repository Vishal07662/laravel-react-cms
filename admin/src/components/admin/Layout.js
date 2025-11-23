import AdminHeader from "./Header";
import AdminNav from "./Nav";

export default function AdminLayout({ children }) {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminNav />
        <div className="flex flex-1 overflow-x-hidden max-h-[calc(100svh-3rem)] ">

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
