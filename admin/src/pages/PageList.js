import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminLayout from "../components/admin/Layout";
import ConfirmModal from "../components/partials/ConfirmModal";
import Loader from "../components/partials/Loader";
import { notifyError, notifySuccess } from "../components/partials/Toast";

import { deletePage, fetchPages, togglePagePublish } from "../store/slices/pagesSlice";

export default function AdminPageList() {
  const dispatch = useDispatch();
  const { items: pages, loading, error } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);

  const handleDelete = (id) => {
    dispatch(deletePage(id))
      .unwrap()
      .then(() => notifySuccess("Page deleted successfully!"))
      .catch((err) => notifyError(err.message || "Failed to delete page"));
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Pages</h2>

          <Link
            to="/pages/create"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Page
          </Link>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Status</th>
              <th className="p-2 w-40">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b">
                <td className="p-2">{page.id}</td>
                <td className="p-2">{page.title}</td>
                <td className="p-2">{page.slug}</td>
                <td className="p-2">
                  {page.is_published ? "Published" : "Draft"}
                </td>

                <td className="p-2 flex gap-4 justify-end">
                  <button
                    onClick={() => dispatch(togglePagePublish(page.id)).unwrap()
                      .then(() => notifySuccess(`Page ${page.is_published ? 'unpublished' : 'published'} successfully!`))
                      .catch((err) => notifyError(err.message || 'Failed to toggle status'))
                    }
                    className={`px-2 py-1 rounded text-white ${
                      page.is_published ? "bg-gray-500" : "bg-green-500"
                    }`}
                  >
                    {page.is_published ? "Unpublish" : "Publish"}
                  </button>
                  <Link
                    to={`/pages/edit/${page.id}`}
                    className="bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </Link>

                  <ConfirmModal onConfirm={() => handleDelete(page.id)}>
                    Delete
                  </ConfirmModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
