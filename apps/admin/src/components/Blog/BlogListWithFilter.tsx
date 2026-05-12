"use client";
import type { Post } from "@repo/db/data";
import { useState, useMemo, useEffect } from "react";
import { dateFormatter } from "../../functions/dateFormatter";
import { activatePost } from "../../actions/activatePost";
import { useRouter } from "next/dist/client/components/navigation";

export function BlogListWithFilter({ posts }: { posts: Post[] }) {
    //usestates for all fields in filter section
    const [contentFilter, setContentFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [sortFilter, setSortFilter] = useState("date-desc");
    const [visibilityFilter, setVisibilityFilter] = useState("all");

    function resetFilters() {
        setContentFilter("");
        setTagFilter("");
        setDateFilter("");
        setSortFilter("date-desc");
        setVisibilityFilter("all");
    }

    const filteredPosts = useMemo(() => {
        return posts
            .sort((a, b) => {
                {/* Early Sort */ }
                switch (sortFilter) {
                    case "title-asc":
                        return a.title.localeCompare(b.title);
                    case "title-desc":
                        return b.title.localeCompare(a.title);
                    case "date-asc":
                        return a.date.valueOf() - b.date.valueOf();
                    case "date-desc":
                        return b.date.valueOf() - a.date.valueOf();
                    default:
                        return 0;
                }
            })
            .filter((p) => {
                {/* Then filter */ }
                const titleMatch = p.title.toLowerCase().includes(contentFilter.toLowerCase());
                const contentMatch = p.content.toLowerCase().includes(contentFilter.toLowerCase());
                const tagMatch = p.tags.toLowerCase().includes(tagFilter.toLowerCase());
                const dateMatch = dateFilter ? p.date >= new Date(dateFilter) : true;
                {/* Checks if date is entered otherwise always passes */ }
                const visibilityMatch = visibilityFilter === "active" ? p.active : visibilityFilter === "inactive" ? !p.active : true;
                {/* True if active !False for inactive */ }
                return (titleMatch || contentMatch) && tagMatch && dateMatch && visibilityMatch;
            })

    }, [posts, contentFilter, tagFilter, dateFilter, sortFilter, visibilityFilter]);

    const router = useRouter();
    async function handleActivatePost(postId: number) {
        await activatePost(postId);
        router.refresh();
    }

    const inputCSS = "border-none border w-full p-2 border-radius rounded bg-white focus:outline-none";
    return (
        <div className="flex flex-row justify-center">
            {/* Content Section */}
            <div className="flex flex-col flex-none w-[60%] items-center gap-4 overflow-y-auto h-screen">
                {filteredPosts.map((p) => (
                    <article key={p.id} className="flex flex-row text-primary p-8 w-full border-b border-gray-200">
                        <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-70 h-40 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex flex-col flex-1 gap-2 pl-7 ">
                            <a
                                href={`/post/${p.urlId}`}
                                className="text-md font-semibold text-xl text-primary hover:text-wsu">
                                Title: {p.title}
                            </a>

                            <p>Category: {p.category}</p>
                            {p.tags.split(",").map((tag, index, array) => (
                                <span key={tag} className="text-xs text-wsu">#{tag}{index < array.length - 1 ? ", " : ''}</span>
                            ))}
                            <p>Posted on {dateFormatter(p.date)}</p>
                            {p.active ?
                                <button onClick={() => handleActivatePost(p.id)} className="bg-green-500 text-white px-3 py-2 w-20 ml-auto rounded-full">Active</button> :
                                <button onClick={() => handleActivatePost(p.id)} className="bg-red-500 text-white px-3 py-2 w-20 ml-auto rounded-full">Inactive</button>
                            }
                        </div>
                    </article>
                ))}
                {/* End Content Section */}
            </div>

            <div className="flex flex-col gap-4 border-l border-gray-200 pl-4 pr-4 text-primary w-[40%] bg-gray-100" >
                {/* Filter Section */}
                <h1 className="flex text-primary text-xl font-bold p-4 items-center justify-center">Choose Filter</h1>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4">
                    <label htmlFor="filter-content">Filter by Content:</label>
                    <input
                        id="filter-content"
                        type="text"
                        onChange={(e) => setContentFilter(e.target.value)}
                        value={contentFilter}
                        className={inputCSS} />

                    <label htmlFor="filter-tag">Filter by Tag:</label>
                    <input
                        id="filter-tag"
                        type="text"
                        onChange={(e) => setTagFilter(e.target.value)}
                        value={tagFilter}
                        className={inputCSS} />
                    <label htmlFor="filter-date">Filter by Date Created:</label>
                    <input
                        id="filter-date"
                        type="date"
                        onChange={(e) => setDateFilter(e.target.value)}
                        value={dateFilter}
                        className={inputCSS} />

                    <label htmlFor="filter-sort">Sort By:</label>
                    <select
                        id="filter-sort"
                        onChange={(e) => setSortFilter(e.target.value)}
                        value={sortFilter}
                        className={inputCSS} >
                        <option value="date-desc">date-desc</option>
                        <option value="date-asc">date-asc</option>
                        <option value="title-asc">title-asc</option>
                        <option value="title-desc">title-desc</option>
                    </select>
                    <label htmlFor="filter-visibility">Filter by Visibility:</label>
                    <select
                        id="filter-visibility"
                        onChange={(e) => setVisibilityFilter(e.target.value)}
                        value={visibilityFilter}
                        className={inputCSS} >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button onClick={resetFilters} className="bg-wsu text-white py-2 px-4 rounded w-60 self-center">
                    Reset Filters
                </button>
                <h1 className="flex text-primary text-xl font-bold p-4 items-center justify-center mt-10">Create a new post</h1>
                <a href={`/posts/create`} className="bg-wsu text-white py-2 px-4 rounded text-center w-60 self-center">
                    Create Post
                </a>
            </div>
            {/* End Filter Section */}

        </div>

    );
}