import jwt from 'jsonwebtoken';
import { prisma } from "../lib/prisma.js"
import bcrypt from 'bcryptjs';

function renderIndex(req, res) {
  res.render("pageTwo", { title: "Route Two Index" });
}

async function signupUser(req, res, next) {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });

    res.json({ status: 200 })
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  console.log(user)
  if (!user) return res.status(401).json({ error: 'Invalid username' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}

export {
  loginUser,
  renderIndex,
  signupUser
}