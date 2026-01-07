import { prisma } from "../lib/prisma.js"

async function sendFeatured(req, res) {
  const featuredPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 3, // limits to 3, but will return fewer if less exist
    where: {
      published: true
    },
  });


  res.json({ posts: featuredPosts});
}

export {
  sendFeatured,
}