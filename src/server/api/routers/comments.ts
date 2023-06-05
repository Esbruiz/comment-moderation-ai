import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import {TRPCError} from "@trpc/server";


// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    analytics: true,
});
export const commentsRouter = createTRPCRouter({
    createT1Comment: publicProcedure
        .input(z.object({
            comment: z.string(),
            author: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const userIp = ctx.req.headers["x-real-ip"] ?? ctx.req.headers["x-forwarded-for"] ?? ctx.req.connection.remoteAddress as string;
            const { success } = await ratelimit.limit(userIp as string);
            if (!success) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                });
            }
            return ctx.prisma.annonimousT1Comments.create({
                data: {
                    comment: input.comment,
                    author: input.author && input.author !== '' ? input.author : "Anonymous",
                    harmfull: false,
                },
            });
        }),
    getAllT1Comments: publicProcedure.query(({ctx}) => {
        return ctx.prisma.annonimousT1Comments.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
    }),
    createT2Comment: publicProcedure
        .input(z.object({
            comment: z.string(),
            author: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const userIp = ctx.req.headers["x-real-ip"] ?? ctx.req.headers["x-forwarded-for"] ?? ctx.req.connection.remoteAddress as string;
            const { success } = await ratelimit.limit(userIp as string);
            if (!success) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: "Too many requests",
                });
            }
            return ctx.prisma.annonimousT2Comments.create({
                data: {
                    comment: input.comment,
                    author: input.author && input.author !== '' ? input.author : "Anonymous",
                    harmfull: false,
                },
            });
        }),
    getAllT2Comments: publicProcedure.query(({ctx}) => {
        return ctx.prisma.annonimousT2Comments.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
    }),
    createT3Comment: publicProcedure
        .input(z.object({
            comment: z.string(),
            author: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const userIp = ctx.req.headers["x-real-ip"] ?? ctx.req.headers["x-forwarded-for"] ?? ctx.req.connection.remoteAddress as string;
            const { success } = await ratelimit.limit(userIp as string);
            if (!success) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: "Too many requests",
                });
            }
            return ctx.prisma.annonimousT2Comments.create({
                data: {
                    comment: input.comment,
                    author: input.author && input.author !== '' ? input.author : "Anonymous",
                    harmfull: false,
                },
            });
        }),
    getAllT3Comments: publicProcedure.query(({ctx}) => {
        return ctx.prisma.annonimousT3Comments.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
    }),
});
