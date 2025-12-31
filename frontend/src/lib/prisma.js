import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/* ✅ TAMBAHAN (TIDAK UBAH LOGIC) */
export { prisma };

/* ✅ DEFAULT EXPORT (TETAP ADA) */
export default prisma;
