import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminLayout from "../components/admin/Layout";
import ConfirmModal from "../components/partials/ConfirmModal";
import Loader from "../components/partials/Loader";
import { notifyError, notifySuccess } from "../components/partials/Toast";

import { deletePost, fetchPosts, togglePostPublish } from "../store/slices/postsSlice";

export default function AdminPostList() {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);

  const handleDelete = (id) => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => notifySuccess("Post deleted successfully!"))
      .catch((err) => notifyError(err.message || "Failed to delete post"));
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
          <h2 className="text-xl font-bold">Posts</h2>

          <Link
            to="/posts/create"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Post
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
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="p-2">{post.id}</td>
                <td className="p-2">{post.title}</td>
                <td className="p-2">{post.slug}</td>
                <td className="p-2">
                  {post.is_published ? "Published" : "Draft"}
                </td>

                <td className="p-2 flex gap-4 justify-end">
                  <button
                    onClick={() => dispatch(togglePostPublish(post.id)).unwrap()
                      .then(() => notifySuccess(`Post ${post.is_published ? 'unpublished' : 'published'} successfully!`))
                      .catch((err) => notifyError(err.message || 'Failed to toggle status'))
                    }
                    className={`px-2 py-1 rounded text-white ${
                      post.is_published ? "bg-gray-500" : "bg-green-500"
                    }`}
                  >
                    {post.is_published ? "Unpublish" : "Publish"}
                  </button>

                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </Link>

                  <ConfirmModal onConfirm={() => handleDelete(post.id)}>
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
