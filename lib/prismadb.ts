import { PrismaClient } from "@prisma/client/extension";

declare global {
  var prisma: PrismaClient | undefined; // Ensure you have a global variable named `prisma`
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

export default prismadb