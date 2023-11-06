import prisma from "lib/prisma.js";

export default async function handler(req, res) {
  try {
    const status = await prisma.status.findMany();
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
