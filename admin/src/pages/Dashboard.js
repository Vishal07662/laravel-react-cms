import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../components/admin/Layout";
import Loader from "../components/partials/Loader";
import { fetchDashboard } from "../store/slices/dashboardSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    if (loading) {
        return (
        <AdminLayout>
            <Loader />
        </AdminLayout>
        );
    }

    return (
        <AdminLayout>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-xl mb-2 font-semibold">Posts</h3>
                <p className="text-3xl font-bold">{stats.posts || 0}</p>
            </div>

            <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-xl mb-2 font-semibold">Published Posts</h3>
                <p className="text-3xl font-bold">{stats.publishedPosts || 0}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-xl mb-2 font-semibold">Pages</h3>
                <p className="text-3xl font-bold">{stats.pages || 0}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-xl mb-2 font-semibold">Active Pages</h3>
                <p className="text-3xl font-bold">{stats.publishedPages || 0}</p>
            </div>
        </div>
        </AdminLayout>
    );
}
