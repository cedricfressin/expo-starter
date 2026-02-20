import { prisma } from '~/lib/services/prisma'

async function main() {
  // TODO: Seed the database with the necessary data
}

main()
  .catch(error => {
    console.error('Error seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
