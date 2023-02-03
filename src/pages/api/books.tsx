
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const handler = async (req: Request, res: Response) => {
    try {
        const response = await prisma.books.findMany();
        res.status(200).json(response);
    }
    catch (error) {
        console.log(`books update error`, error);
    }
}

export default handler;