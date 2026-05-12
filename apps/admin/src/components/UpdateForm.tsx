"use client";

import { Post } from "@repo/db/data";
import { z } from "zod";
import { useRef, useState } from "react";
import { marked } from "marked";
import { savePost } from "../actions/savePost";
import { toUrlPath } from "@repo/utils/url";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string()
        .max(200, "Description is too long. Maximum is 200 characters")
        .min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string()
        .min(1, "Image URL is required")
        .url("This is not a valid URL"),
    tags: z.string().min(1, "At least one tag is required")
});

export function UpdateForm({ post }: { post: Post }) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        title: post?.title || "",
        category: post?.category || "",
        description: post?.description || "",
        content: post?.content || "",
        imageUrl: post?.imageUrl || "",
        tags: post?.tags || "",
        urlId: post?.urlId || ""
    });
    const [message, setMessage] = useState("");

    async function handleSave() {
        const response = postSchema.safeParse(form);
        if (!response.success) {
            const fieldErrors: Record<string, string> = {};
            response.error.errors.forEach((error) => {
                if (!fieldErrors[error.path[0] as string]) {
                    {/* Do not set another error if one exists already */ }
                    fieldErrors[error.path[0] as string] = error.message;
                }
            });
            setErrors(fieldErrors);
        } else {
            setErrors({});
            await savePost({ ...form, postId: post.id });
            setMessage("Post updated successfully");
        }
    }

    const [showPreview, setShowPreview] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const cursor = useRef({ start: 0, end: 0 });
    function handlePreview() {
        setShowPreview(true);
        cursor.current = {
            start: contentRef.current?.selectionStart || 0,
            end: contentRef.current?.selectionEnd || 0
        }
    }
    function handleClosePreview() {
        setShowPreview(false);
        {/* wait until contentRef is in DOM THEN focus */ }
        setTimeout(() => {
            contentRef.current?.focus();
            contentRef.current?.setSelectionRange(cursor.current.start, cursor.current.end);
        }, 0);

    }
    function handleHome() {
        window.location.href = "/";
    }
    return <div className="p-8 bg-gray-100">
        <div className="px-20 py-8 mx-30 my-5 bg-white rounded shadow-md flex flex-col">
            <h1 className="text-xl font-bold my-4 text-center">Update Post</h1>
            <div className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-4">

                <label htmlFor="title">Title</label>
                <div className="flex flex-col">
                    <input id="title" type="text"
                        className="border-gray-300 border w-full mb-4 p-2"
                        defaultValue={post?.title || ""}
                        onChange={(e) => setForm({ ...form, title: e.target.value, urlId: toUrlPath(e.target.value) })}
                    />
                    <span className="text-red-500">{errors.title}</span>
                </div>

                <label htmlFor="category">Category</label>
                <div className="flex flex-col">
                    <input id="category" type="text"
                        className="border-gray-300 border w-full mb-4 p-2"
                        defaultValue={post?.category || ""}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <span className="text-red-500">{errors.category}</span>
                </div>

                <label htmlFor="description">Description</label>
                <div className="flex flex-col">
                    <textarea id="description"
                        className="border-gray-300 border w-full mb-4 p-2"
                        defaultValue={post?.description || ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <span className="text-red-500">{errors.description}</span>
                </div>

                <label htmlFor="content">Content</label>
                <div className="flex flex-col">
                    {showPreview ? (
                        <div data-test-id="content-preview"
                            dangerouslySetInnerHTML={{ __html: marked(form.content) as string }}
                            className="border-gray-300 border w-full mb-4 p-2"
                        />
                    ) : (
                        <textarea id="content" ref={contentRef} value={form.content}
                            className="border-gray-300 border w-full mb-4 p-2"
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        />
                    )}
                    <span className="text-red-500">{errors.content}</span>
                    <button onClick={showPreview ? handleClosePreview : handlePreview}
                        className="bg-wsu text-white py-2 px-4 rounded hover:bg-wsu-dark w-fit mt-4 ml-auto">
                        {showPreview ? "Close Preview" : "Preview"}
                    </button>
                </div>

                <label htmlFor="tags">Tags</label>
                <div className="flex flex-col">
                    <input id="tags" type="text"
                        className="border-gray-300 border w-full mb-4 p-2"
                        defaultValue={post?.tags || ""}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                    <span className="text-red-500">{errors.tags}</span>
                </div>

                <label htmlFor="imageUrl">Image URL</label>
                <div className="flex flex-col">
                    <input id="imageUrl" type="text"
                        className="border-gray-300 border w-full mb-4 p-2"
                        defaultValue={post?.imageUrl || ""}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    />
                    <span className="text-red-500">{errors.imageUrl}</span>
                    {form.imageUrl && (
                        <img src={form.imageUrl} alt="Image Preview" data-test-id="image-preview" className="w-1/4 rounded-lg max-h-96 mb-5 mx-auto" />
                    )}
                    <span className="text-green-500 mx-auto">{message}</span>
                    {Object.keys(errors).length > 0 && (
                        <div className="text-red-500 mx-auto">Please fix the errors before saving.</div>
                    )}
                </div>
                <div>
                    {/* space to push button to the right */}
                    <button className="bg-wsu text-white py-2 px-4 rounded hover:bg-wsu-dark w-fit mt-4 ml-auto" onClick={handleHome}>
                        Home
                    </button>
                </div>
                <div className="flex flex-col">
                    <button className="bg-wsu text-white py-2 px-4 rounded hover:bg-wsu-dark w-fit mt-4 ml-auto" onClick={handleSave}>
                        Save
                    </button>
                </div>

            </div>
        </div>
    </div>
}