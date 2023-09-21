import { allBlogs } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allBlogs.map((blog) => (
        <article key={blog._id}>
          <Link href={blog.slug}>
            <h2>{blog.title}</h2>
          </Link>
          {blog.description && <p>{blog.description}</p>}
        </article>
      ))}
    </div>
  )
}
