/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}
export const DEBUG = "prisma*";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
