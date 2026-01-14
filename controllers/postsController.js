import { prisma } from "../lib/prisma.js"
import { cleanHtml } from "../lib/sanitize.js";

async function sendPosts(req, res) {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const isAdmin = !!req.query.isAdmin;

  const findOptions = {
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  };

  const countOptions = {};

  if (!isAdmin) {
    findOptions.where = { published: true };
    countOptions.where = { published: true };
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany(findOptions),
      prisma.post.count(countOptions),
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


async function sendNumberOfPosts(req, res) {
  try {
    const [numberOfPosts, numberOfPublishedPosts] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({
        where: { published: true },
      })
    ])

    res.json({
      numberOfPosts,
      numberOfPublishedPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post count" });
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

    const cleanContent = cleanHtml(req.body.commentContent);

    await prisma.comment.create({
      data: {
        content: cleanContent,
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

const postPost = async (req, res) => {
  try {

    const cleanContent = cleanHtml(req.body.postContent);
    const title = req.body.title

    if (title.length < 3 || title.length > 50) {
      return res.status(400).json({
        error: "Title must be between 3 and 50 characters"
      });
    }

    if (cleanContent.length < 1) {
      return res.status(400).json({
        error: "Body must not be empty"
      });
    }

    await prisma.post.create({
      data: {
        title,
        content: cleanContent,
        authorId: Number(req.body.authorId),
        published: req.body.isPublished
      }
    });

    res.json({ msg: "added post" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to make post" });
  }
}

const deletePost = async (req, res) => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.json({ msg: "deleted post" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
}

export {
  sendPosts,
  sendPost,
  sendComments,
  postComment,
  sendNumberOfPosts,
  postPost,
  deletePost
}