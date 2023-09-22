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
    <div className="w-full text-xs sm:text-sm font-mono mt-4">
      <div className="text-xs flex p-1 text-gray-500">
        <button className={`w-20 text-left ${sort.key === "date" && sort.direction !== "desc"
          ? "text-gray-700 dark:text-gray-400" : ""}`}
          onClick={sortDate}
        >
          date
          {sort.key === "date" && sort.direction === "asc" && "↑"}
        </button>
        <span className="grow ml-2 sm:ml-4">title</span>
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
          <article className="flex grow hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md p-1">
            <span className="text-gray-500 self-start shrink-0 w-20">{new Date(blog.date).toLocaleString("en", { month: 'short', day: 'numeric', year: '2-digit' })}</span>
            <span className="flex flex-col grow ml-2 sm:ml-4">
              <span>{blog.title}</span>
              <p className="hidden sm:block text-xs my-1">{blog.description}</p>
            </span>
            <span className="text-xs text-gray-500 w-16 text-right">{blog.views.toLocaleString("en")}</span>
          </article>
        </Link>
      ))}
    </div>
  )
}
