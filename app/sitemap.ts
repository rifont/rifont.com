import { siteConfig } from '@/config/site';
import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
    const blogs = allBlogs.map((blog) => ({
        url: `${siteConfig.url}/blog/${blog.slug}`,
        lastModified: blog.date,
    }));

    const routes = ['', '/blog', '/photos'].map(
        (route) => ({
            url: `${siteConfig.url}${route}`,
            lastModified: new Date().toISOString().split('T')[0],
        })
    );

    return [...routes, ...blogs];
}
