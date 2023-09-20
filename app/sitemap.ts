import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
    const blogs = allBlogs.map((blog) => ({
        url: `https://font.codes/blog/${blog.slug}`,
        lastModified: blog.date,
    }));

    const routes = ['', '/blog', '/photos'].map(
        (route) => ({
            url: `https://font.codes${route}`,
            lastModified: new Date().toISOString().split('T')[0],
        })
    );

    return [...routes, ...blogs];
}
