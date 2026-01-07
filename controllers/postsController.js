import { prisma } from "../lib/prisma.js"

async function sendPosts(req, res) {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: { published: true },
      }),
    ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}


async function sendPost(req, res) {
  const { id } = req.params
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    if (!post) res.json({ posts: "No post found" })

    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

const sendComments = async (req, res) => {
  const { id } = req.params
  try {

    const comments = await prisma.comment.findMany({
      where: { postId: Number(id) },
      include: {
        author: { select: { username: true } }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    if (!comments) {
      return res.status(404).json({ error: "No comments found" });
    }

    res.json({ postComments: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

const postComment = async (req, res) => {
  const { id } = req.params
  try {

    await prisma.comment.create({
      data: {
        content: req.body.commentContent,
        postId: Number(id),
        authorId: Number(req.body.authorId)
      }
    });

    res.json({ msg: "added comment" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to make comment" });
  }
}

export {
  sendPosts,
  sendPost,
  sendComments,
  postComment,
}