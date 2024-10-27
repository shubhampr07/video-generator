import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log(prompt);
        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();  // Await the text

        return NextResponse.json({ 'result': JSON.parse(responseText) }); // Parsing the text to JSON
    } catch (error) {
        console.error("Error in POST /api/get-video-script:", error.message);
        return NextResponse.json({ 'error': error.message }, { status: 500 }); // Send error with status code 500
    }
}
