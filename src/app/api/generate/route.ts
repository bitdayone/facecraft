import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { put } from "@vercel/blob";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { photoUrl, style } = await request.json();
    
    if (!photoUrl) {
      return NextResponse.json(
        { error: "No photo URL provided" },
        { status: 400 }
      );
    }
    
    if (!style) {
      return NextResponse.json(
        { error: "No style selected" },
        { status: 400 }
      );
    }
    
    // First, analyze the image with GPT-4o to understand the person's features
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an AI assistant that helps describe people's facial features to create stylized avatars. Be detailed but concise."
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Describe this person's key facial features, so I can create a ${style} style avatar of them.` },
            { type: "image_url", image_url: { url: photoUrl } }
          ]
        }
      ]
    });
    
    // Get the description of the person
    const description = visionResponse.choices[0]?.message?.content || "";
    
    // Use DALL-E 3 to generate the stylized avatar based on the description
    const generationResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a ${style} style avatar portrait based on this description: ${description}. The avatar should maintain the likeness of the person while stylizing them in a ${style} aesthetic. The image should be a portrait-style avatar with a clean background.`,
      n: 1,
      size: "1024x1024",
    });

    // Get the generated image URL from OpenAI
    const openaiImageUrl = generationResponse.data?.[0]?.url;
    
    if (!openaiImageUrl) {
      throw new Error("Failed to generate image with OpenAI");
    }
    
    // Download the image from OpenAI
    const imageResponse = await fetch(openaiImageUrl);
    const imageBlob = await imageResponse.blob();
    
    // Upload to Vercel Blob Storage
    const blob = await put(`facecraft-avatars/${Date.now()}-${style}.png`, imageBlob, {
      access: 'public',
    });
    
    // Use the Vercel Blob URL
    const avatarUrl = blob.url;

    return NextResponse.json({
      success: true,
      avatarUrl,
      style,
      description,
    });
  } catch (error) {
    console.error("Error generating avatar:", error);
    return NextResponse.json(
      { error: "Failed to generate avatar" },
      { status: 500 }
    );
  }
} 