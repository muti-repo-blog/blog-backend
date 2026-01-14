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

async function sendNumberOfUsers(req, res) {
  try {
  const numberOfUsers = await prisma.user.count()

    res.json({ numberOfUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
}

export {
  sendFeatured,
  sendNumberOfUsers
}