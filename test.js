import { prisma } from './lib/prisma.js';

async function main() {
  await prisma.user.create({
    data: {
      username: 'bob',
      password: 'yo mom',
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());