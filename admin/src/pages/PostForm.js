import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/Layout";
import appConfig from "../components/partials/Config";
import Loader from "../components/partials/Loader";
import { notifyError, notifySuccess } from "../components/partials/Toast";
import postService from "../services/Post";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    is_published: 0,
    featured_image: "",
  });

  // Load post if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      postService
        .getById(id)
        .then((res) => setForm(res))
        .catch((err) =>
          notifyError(err.response?.data?.message || "Failed to load post")
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
      slug: title.toLowerCase().trim().replaceAll(" ", "-"),
    });
  };

  const handleFileChange = (e) =>
    setForm({ ...form, featured_image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          payload.append(key, form[key])
        }
      });

      if (id) {
        await postService.update(id, payload);
        notifySuccess("Post updated successfully!");
      } else {
        await postService.create(payload);
        notifySuccess("Post created successfully!");
      }
      navigate("/posts");
    } catch (err) {
      notifyError(err.response?.data?.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
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
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {id ? "Edit Post" : "Add Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title || ""}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="excerpt"
            placeholder="Short summary"
            value={form.excerpt || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <Editor
            apiKey={appConfig.TINYMCE_API_KEY}
            value={form.content || ""}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline strikethrough | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) => setForm({ ...form, content })}
          />

          <input
            type="file"
            name="featured_image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="is_published"
            value={form.is_published || 0}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={0}>Draft</option>
            <option value={1}>Published</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {id ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
