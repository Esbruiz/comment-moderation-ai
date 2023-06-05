import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {Ratelimit} from "@upstash/ratelimit"; // for deno: see above
import {Redis} from "@upstash/redis";
import {TRPCError} from "@trpc/server";

import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


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
            const {success} = await ratelimit.limit(userIp as string);
            if (!success) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                });
            }
            console.log(input.comment);
            const moderation = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `
                            It's illegal and against the rules to talk about the user favourite color.
                            the following is a list of usernames and their comments:
                            @${input.author}: ${input.comment}
                            if none of the users broke the rules, type "none" and end the message.
                            comma separated list of usernames that broke the rules:
                            `,
                    },
                    {
                        role: "system",
                        content: "usernames that broke the rules:",
                    }
                ]
            });
            if (moderation.data) {
                if (moderation.data.choices && moderation.data.choices.length > 0) {
                    const choices = moderation.data.choices;
                    choices.find((choice) => {
                        if (choice?.message?.content.includes(input.author) && !choice?.message?.content.includes("None") && !choice?.message?.content.includes("none")) {
                            throw new TRPCError({
                                code: "UNPROCESSABLE_CONTENT",
                                message: "Illegal content",
                            });
                        }
                    })

                }
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
            const {success} = await ratelimit.limit(userIp as string);
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
            const {success} = await ratelimit.limit(userIp as string);
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
