'use client';
import { allBlogs, Blog } from "@/.contentlayer/generated"
import Link from "next/link"
import { useMemo, useState } from "react";

type BlogWithViews = Blog & { views: number };

const hash = (str: string) => str.split('').reduce((hc, cv) => (cv.charCodeAt(0) + (hc << 6) + (hc << 16) - hc), 0);

export default function Home() {
  const [sort, setSort] = useState<{ key: keyof (BlogWithViews), direction: "asc" | "desc" }>({ key: 'date', direction: 'desc' });
  const blogWithViews = useMemo(() => allBlogs.map((blog) => {
    const views = Math.floor(Math.abs(hash(blog.date)) / 1000000);
    return { ...blog, views } as BlogWithViews;
  }), []);
  const sortedBlogs = blogWithViews.sort((a, b) => a[sort.key] > b[sort.key] ? (sort.direction === 'asc' ? 1 : -1) : (sort.direction === 'asc' ? -1 : 1));

  const sortDate = () => {
    setSort(sort => ({
      key: 'date',
      direction: sort.key !== 'date' || sort.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  const sortViews = () => {
    setSort(sort => ({
      key: sort.key === "views" && sort.direction === "asc" ? "date" : "views",
      direction: sort.key !== "views" ? "desc" : sort.direction === "asc" ? "desc" : "asc",
    }));
  }

  return (
    <div className="text-xs sm:text-base font-mono mt-4 prose dark:prose-invert">
      <div className="text-xs flex justify-between p-1 text-gray-500">
        <button className={`w-32 text-left ${sort.key === "date" && sort.direction !== "desc"
          ? "text-gray-700 dark:text-gray-400"
          : ""
          }`}
          onClick={sortDate}
        >
          date
          {sort.key === "date" && sort.direction === "asc" && "↑"}
        </button>
        <span className="mr-auto">title</span>
        <button
          className={`w-16 text-right ${sort.key === "views" ? "text-gray-700 dark:text-gray-400" : ""}`}
          onClick={sortViews}
        >
          views
          {sort.key === "views" ? (sort.direction === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>
      {sortedBlogs.map((blog) => (
        <Link href={blog.slug} key={blog._id} className="no-underline">
          <article className="hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md p-1">
            <div className="flex justify-between">
              <span className="text-gray-500 w-32">{new Date(blog.date).toLocaleString("en", { month: 'short', day: 'numeric', year: '2-digit' })}</span>
              <span className="mr-auto text-left">{blog.title}</span>
              <span className="text-xs text-gray-500 w-16 text-right">{blog.views.toLocaleString()}</span>
            </div>
            {blog.description && <p className="hidden sm:block text-xs my-1 ml-32 mr-16">{blog.description}</p>}
          </article>
        </Link>
      ))}
    </div>
  )
}
