"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../supabase.js";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    category: "",
    description: "",
    price: "",
    ebookPrice: "",
    audioPrice: "",
    edition: "",
    publisher: "",
    datePublished: "",
    ISBN: "",
    serialNumber: "",
    tags: [],
    imageUrl: "",
    epubUrl: "",
    pdfUrl: "",
    audioUrl: "",
    videoUrl: "",
  });

  const [files, setFiles] = useState({
    image: null,
    epub: null,
    pdf: null,
    audio: null,
    video: null,
  });

  const [useUrls, setUseUrls] = useState({
    image: false,
    epub: false,
    pdf: false,
    audio: false,
    video: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchBookData = async () => {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setFormData({
          bookTitle: data.book_title,
          authorName: data.author_name,
          category: data.category,
          description: data.description,
          price: data.book_price,
          ebookPrice: data.ebook_price,
          audioPrice: data.audio_price,
          edition: data.book_edition,
          publisher: data.publisher,
          datePublished: data.date_published,
          ISBN: data.isbn,
          serialNumber: data.serial_number,
          tags: data.tag || [],
          imageUrl: data.image_url,
          epubUrl: data.ebook_url,
          pdfUrl: data.pdf_url,
          audioUrl: data.audio_url,
          videoUrl: data.video_url,
        });
      } catch (error) {
        console.error("Error fetching book data:", error.message);
      }
    };

    fetchBookData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: newFiles } = e.target;
    const file = newFiles[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newTags = checked
        ? [...prevData.tags, value]
        : prevData.tags.filter((tag) => tag !== value);
      return { ...prevData, tags: newTags };
    });
  };

  const toggleUrlUpload = (field) => {
    setUseUrls((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bookTitle) newErrors.bookTitle = "Book title is required";
    if (!formData.authorName) newErrors.authorName = "Author name is required";
    if (!files.image && !formData.imageUrl) newErrors.image = "Book cover image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const fileUrls = [];

      const uploadFile = async (file, path) => {
        const fileName = `${path}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from("bookstore")
          .upload(fileName, file);

        if (error) throw new Error(`Upload error: ${error.message}`);

        const { data } = await supabase.storage
          .from("bookstore")
          .getPublicUrl(fileName);

        return data.publicUrl;
      };

      // Handle image upload or URL
      if (files.image) {
        fileUrls.push(await uploadFile(files.image, "images"));
      } else if (formData.imageUrl) {
        fileUrls.push(formData.imageUrl);
      } else {
        throw new Error("Image is required");
      }

      // Handle EPUB upload or URL
      if (files.epub) {
        fileUrls.push(await uploadFile(files.epub, "epubs"));
      } else if (formData.epubUrl) {
        fileUrls.push(formData.epubUrl);
      } else {
        fileUrls.push(null);
      }

      // Handle PDF upload or URL
      if (files.pdf) {
        fileUrls.push(await uploadFile(files.pdf, "pdfs"));
      } else if (formData.pdfUrl) {
        fileUrls.push(formData.pdfUrl);
      } else {
        fileUrls.push(null);
      }

      // Handle audio upload or URL
      if (files.audio) {
        fileUrls.push(await uploadFile(files.audio, "audios"));
      } else if (formData.audioUrl) {
        fileUrls.push(formData.audioUrl);
      } else {
        fileUrls.push(null);
      }

      // Handle video upload or URL
      if (files.video) {
        fileUrls.push(await uploadFile(files.video, "videos"));
      } else if (formData.videoUrl) {
        fileUrls.push(formData.videoUrl);
      } else {
        fileUrls.push(null);
      }

      const dataToUpdate = {
        book_title: formData.bookTitle,
        author_name: formData.authorName,
        category: formData.category,
        description: formData.description,
        isbn: formData.ISBN,
        serial_number: formData.serialNumber,
        date_published: formData.datePublished,
        book_edition: formData.edition,
        book_price: formData.price,
        ebook_price: formData.ebookPrice,
        audio_price: formData.audioPrice,
        image_url: fileUrls[0],
        ebook_url: fileUrls[1],
        pdf_url: fileUrls[2],
        audio_url: fileUrls[3],
        video_url: fileUrls[4],
        tag: formData.tags,
      };

      const { error } = await supabase
        .from("books")
        .update(dataToUpdate)
        .eq("id", id);

      if (error) throw error;

      alert("Book updated successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      alert(error.message || "Book update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        setIsLoading(true);
        const { error } = await supabase
          .from("books")
          .delete()
          .eq("id", id);

        if (error) throw error;

        alert("Book deleted successfully!");
        router.push("/admin/dashboard");
      } catch (error) {
        alert(error.message || "Book deletion failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border-t-4 border-primary-dark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Edit Book</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-dark hover:text-primary-light transition-colors"
        >
          <AiOutlineArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Title and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
            {errors.bookTitle && <p className="text-red-500 text-sm mt-1">{errors.bookTitle}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
            {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>}
          </div>
        </div>

        {/* Category and other details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Cookbook">Cookbook</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Edition</label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
        </div>

        {/* ISBN, Serial Number, Date Published */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Published</label>
            <input
              type="date"
              name="datePublished"
              value={formData.datePublished}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
        </div>

        {/* Price Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">eBook Price</label>
            <input
              type="number"
              name="ebookPrice"
              value={formData.ebookPrice}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Audio Price</label>
            <input
              type="number"
              name="audioPrice"
              value={formData.audioPrice}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent h-32"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-4">
            {["Best Sellers", "Hot Deals", "Sales", "Limited Time Offers", "Special Discounts"].map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={handleTagChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-6">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Cover Image (Required)</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => toggleUrlUpload("image")}
                className="text-sm text-primary-dark hover:text-primary-light"
              >
                {useUrls.image ? "Switch to File Upload" : "Switch to URL"}
              </button>
            </div>
            {useUrls.image ? (
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleUrlChange}
                placeholder="Enter image URL"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            ) : (
              <input
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            )}
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* EPUB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">EPUB (Optional)</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => toggleUrlUpload("epub")}
                className="text-sm text-primary-dark hover:text-primary-light"
              >
                {useUrls.epub ? "Switch to File Upload" : "Switch to URL"}
              </button>
            </div>
            {useUrls.epub ? (
              <input
                type="text"
                name="epubUrl"
                value={formData.epubUrl}
                onChange={handleUrlChange}
                placeholder="Enter EPUB URL"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            ) : (
              <input
                type="file"
                name="epub"
                accept=".epub"
                onChange={handleFileChange}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            )}
          </div>

          {/* PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700">PDF (Optional)</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => toggleUrlUpload("pdf")}
                className="text-sm text-primary-dark hover:text-primary-light"
              >
                {useUrls.pdf ? "Switch to File Upload" : "Switch to URL"}
              </button>
            </div>
            {useUrls.pdf ? (
              <input
                type="text"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleUrlChange}
                placeholder="Enter PDF URL"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            ) : (
              <input
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            )}
          </div>

          {/* Audio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Audio (Optional)</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => toggleUrlUpload("audio")}
                className="text-sm text-primary-dark hover:text-primary-light"
              >
                {useUrls.audio ? "Switch to File Upload" : "Switch to URL"}
              </button>
            </div>
            {useUrls.audio ? (
              <input
                type="text"
                name="audioUrl"
                value={formData.audioUrl}
                onChange={handleUrlChange}
                placeholder="Enter Audio URL"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            ) : (
              <input
                type="file"
                name="audio"
                accept=".mp3,.wav,.m4a"
                onChange={handleFileChange}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            )}
          </div>

          {/* Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Video (Optional)</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => toggleUrlUpload("video")}
                className="text-sm text-primary-dark hover:text-primary-light"
              >
                {useUrls.video ? "Switch to File Upload" : "Switch to URL"}
              </button>
            </div>
            {useUrls.video ? (
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleUrlChange}
                placeholder="Enter Video URL"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            ) : (
              <input
                type="file"
                name="video"
                accept=".mp4,.mkv,.mov"
                onChange={handleFileChange}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : null}
            {isLoading ? "Updating..." : "Update Book"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : null}
            {isLoading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      </form>
    </div>
  );
}