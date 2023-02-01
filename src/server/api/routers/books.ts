import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const booksRouter = createTRPCRouter({
  // membuat buku baru di database
  createBook: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(3, { message: "Must be 5 or more characters of length!" })
          .max(200, {
            message: "Must not be more than 200 characters of length!",
          })
          .trim(),
        author: z
          .string()
          .min(3, { message: "Must be 5 or more characters of length!" })
          .max(200, {
            message: "Must not be more than 200 characters of length!",
          })
          .trim(),
        description: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.books.create({
          data: {
            title: input.title,
            author: input.author,
            description: input.description,
            price: input.price,
          },
        });
      } catch (error) {
        // console log tidak dapat membuat buku $error
        console.log("cannot create book", error);
      }
    }),

  // ambil semua buku dari database
  allBooks: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma?.books?.findMany({
        select: {
          id: true,
          title: true,
          price: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      // console log tidak dapat mengambil buku $error
      console.log("cannot get books", error);
    }
  }),

  // ambil detail buku dari database
  detailBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.books.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(`Note detail not found`, error);
      }
    }),
});
