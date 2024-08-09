import { NextResponse } from "next/server";

export default function createResponse({ message, status, data = {} }: { message: string, status: number, data?: object }) {
    return new NextResponse(JSON.stringify({ message, ...data }), { status });
}