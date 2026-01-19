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


  res.json({ posts: featuredPosts });
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

async function sendUsers(req, res) {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
      }),
      prisma.user.count()
    ])

    res.json({
      users,
      page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

async function deleteUser(req, res) {
  const userId = parseInt(req.params.id);

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    res.status(200).json({ error: "Deleted User" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete user" })
  }
}

export {
  sendFeatured,
  sendNumberOfUsers,
  sendUsers,
  deleteUser,
}