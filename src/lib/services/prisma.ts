import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '~/generated/prisma/client'

// Configure Prisma ORM to connect to PostgreSQL using the node-postgres driver adapter.
// https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-node-postgres-driver
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
