const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Title 1',
      content: 'Content 1',
      published: false,
      author: 'Author1'
    },
  })

  await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Title 2',
      content: 'Content 2',
      published: false,
      author: 'Author2'
    },
  })

  await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Title 3',
      content: 'Content 3',
      published: false,
      author: 'Author3'
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })