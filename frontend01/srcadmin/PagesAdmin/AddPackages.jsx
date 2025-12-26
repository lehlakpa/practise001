import React, { useState } from "react";
import axios from "axios";
import { Upload, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";

const AddPackages = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.price) {
            return toast.error((t) => (
                <div className="flex items-center gap-2">
                    <span>All fields are required</span>
                    <button onClick={() => toast.dismiss(t.id)} className="p-1 hover:bg-black/10 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            ));
        }

        if (images.length === 0) {
            return toast.error((t) => (
                <div className="flex items-center gap-2">
                    <span>Please upload at least one image</span>
                    <button onClick={() => toast.dismiss(t.id)} className="p-1 hover:bg-black/10 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            ));
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);

            images.forEach((img) => {
                data.append("images", img);
            });

            const auth = JSON.parse(localStorage.getItem("adminAuth"));
            const token = auth?.accessToken || auth?.data?.accessToken;

            if (!token) {
                toast.error((t) => (
                    <div className="flex items-center gap-2">
                        <span>Session expired. Please login again.</span>
                        <button onClick={() => toast.dismiss(t.id)} className="p-1 hover:bg-black/10 rounded-full">
                            <X size={16} />
                        </button>
                    </div>
                ));
                return;
            }

            await axios.post(
                "http://localhost:5000/api/v1/users/upload",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            toast.success((t) => (
                <div className="flex items-center gap-2">
                    <span>Package created successfully!</span>
                    <button onClick={() => toast.dismiss(t.id)} className="p-1 hover:bg-black/10 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            ));

            setFormData({
                title: "",
                description: "",
                price: "",
            });
            setImages([]);
        } catch (error) {
            toast.error((t) => (
                <div className="flex items-center gap-2">
                    <span>{error?.response?.data?.message || "Failed to create package"}</span>
                    <button onClick={() => toast.dismiss(t.id)} className="p-1 hover:bg-black/10 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            ));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Add Internet Package</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        placeholder="Package Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    <textarea
                        name="description"
                        placeholder="Package Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price (Rs.)"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    <div>
                        <label className="block mb-2 font-medium">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload />
                                Create Package
                            </>
                        )}
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default AddPackages;
