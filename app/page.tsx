/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Badge } from "@/components/badge";
import { Github } from "@/components/icons/github";
import { Novu } from "@/components/icons/novu";
import { Whispir } from "@/components/icons/whispir";
import Link from "next/link";

export default async function Home() {
  const { stargazers_count: novuStars }: { stargazers_count: number } = await fetch(
    "https://api.github.com/repos/novuhq/novu",
    {
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <div className="prose dark:prose-invert">
      <h3>Hi, I'm Richard 👋</h3>

      <p>
        {`I'm a Product Engineer, currently working at `}
        <Badge href="https://novu.co">
          <Novu className="w-4 h-4 mr-1" />
          Novu
        </Badge>
        {`, where I'm building the Code-First Infrastructure for Product Notifications. We make omnichannel product communication easy. Star us on `}
        <Badge href="https://github.com/novuhq/novu">
          <Github className="w-4 h-4 mr-1" />
          {`Github ${Math.floor(novuStars / 1000)}k`}
        </Badge>
        {`.`}
      </p>

      <p>
        {`I previously worked at `}
        <Badge href="https://whispir.com">
          <Whispir className="w-4 h-4 mr-1" />
          Whispir
        </Badge>
        {`, where I built a communications workflow platform and developer tools.`}
      </p>

      <p>
        I blog about new technology and software engineering practices. Check out my <Link href="/blog">latest posts</Link>.
      </p>

      <p>
        I'm a keen explorer of the outdoors, and love to travel. I'm in my element when I'm in the mountains, and I'm always looking for new places to conquer.
      </p>
    </div>
  )
}
