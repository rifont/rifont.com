import { allPosts } from 'contentlayer/generated';

export default async function sitemap() {
    const blogs = allPosts.map((post) => ({
        url: `https://font.codes/blog/${post.slug}`,
        lastModified: post.date,
    }));

    const routes = ['', '/blog', '/photos'].map(
        (route) => ({
            url: `https://font.codes${route}`,
            lastModified: new Date().toISOString().split('T')[0],
        })
    );

    return [...routes, ...blogs];
}
