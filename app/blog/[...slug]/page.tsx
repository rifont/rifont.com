import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getBlogFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug)

  if (!blog) {
    null
  }

  return blog
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const blog = await getBlogFromParams(params)

  if (!blog) {
    return {}
  }

  return {
    title: blog.title,
    description: blog.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }))
}

export default async function BlogPage({ params }: PostProps) {
  const blog = await getBlogFromParams(params)

  if (!blog) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h2 className="mb-2">{blog.title}</h2>
      {blog.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {blog.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={blog.body.code} />
    </article>
  )
}
