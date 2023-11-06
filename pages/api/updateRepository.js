import prisma from "lib/prisma.js";

export default async function updateHandler(req, res) {
  try {
    const { id, data } = req.body;

    const updatedRecord = await prisma.repository.update({
      where: { id },
      data, // New data to update the record with
    });

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
