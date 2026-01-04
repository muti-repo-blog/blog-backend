import 'dotenv/config';
import prisma from './pool.js';

async function main() {
  console.log('seeding...');
  const created = await prisma.example.create({ data: { name: 'seed-example' } });
  console.log('created:', created);
  await prisma.$disconnect();
  console.log('seeded!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
