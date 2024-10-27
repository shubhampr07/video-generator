import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_CAPTION_API,
    });

    const FILE_URL = audioFileUrl;

    const config = {
      audio: FILE_URL,
    };
    const transcript = await client.transcripts.transcribe(config);
    // console.log(transcript.words);
    return NextResponse.json({ 'transcript': transcript.words });
  } catch (e) {
    return NextResponse.json({'error': e});
  }
}
