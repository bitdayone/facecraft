"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function GeneratePage() {
  const router = useRouter();
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatingProgress, setGeneratingProgress] = useState<number>(0);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState<string | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');

  useEffect(() => {
    // Retrieve data from sessionStorage
    const photoUrl = sessionStorage.getItem("uploadedPhotoUrl");
    const style = sessionStorage.getItem("selectedStyle");
    
    if (!photoUrl || !style) {
      // If required data is missing, redirect back
      toast.error("Missing photo or style. Please start over.");
      router.push("/upload");
      return;
    }
    
    setUploadedPhotoUrl(photoUrl);
    setSelectedStyle(style);
  }, [router]);

  useEffect(() => {
    // Start generation when both photo and style are available
    if (uploadedPhotoUrl && selectedStyle && generationStatus === 'idle') {
      startGeneration();
    }
  }, [uploadedPhotoUrl, selectedStyle, generationStatus]);

  const startGeneration = async () => {
    setGenerationStatus('generating');
    
    // Create a progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setGeneratingProgress(Math.min(progress, 95)); // Only go up to 95% until API response
      
      if (progress >= 95) {
        clearInterval(progressInterval);
      }
    }, 300);
    
    try {
      // Make an API call to our generate endpoint
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoUrl: uploadedPhotoUrl,
          style: selectedStyle,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate avatar");
      }
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      // Update progress to 100%
      setGeneratingProgress(100);
      
      // Short delay to show 100% progress before completing
      setTimeout(() => {
        completeGeneration(data.avatarUrl);
      }, 500);
    } catch (error) {
      console.error("Error generating avatar:", error);
      clearInterval(progressInterval);
      setGenerationStatus('error');
      toast.error("Failed to generate avatar. Please try again.");
    }
  };

  const completeGeneration = (avatarUrl: string) => {
    // Set the generated avatar URL
    setGeneratedAvatarUrl(avatarUrl);
    setGenerationStatus('completed');
    
    // Store the generated avatar URL in sessionStorage
    sessionStorage.setItem("generatedAvatarUrl", avatarUrl);
    
    toast.success("Avatar generated successfully!");
  };

  const handleContinue = () => {
    if (generatedAvatarUrl) {
      router.push("/download");
    }
  };

  const handleRetry = () => {
    setGenerationStatus('idle');
    setGeneratingProgress(0);
    setGeneratedAvatarUrl(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold">FaceCraft</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Generating Your Avatar</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Step 3: AI Transformation</CardTitle>
                <CardDescription>
                  {generationStatus === 'generating' 
                    ? "Our AI is working on your avatar..."
                    : generationStatus === 'completed'
                    ? "Your avatar has been generated!"
                    : generationStatus === 'error'
                    ? "There was an error generating your avatar."
                    : "Preparing to transform your photo."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress bar during generation */}
                {generationStatus === 'generating' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Processing...</span>
                      <span className="text-sm font-medium">{generatingProgress}%</span>
                    </div>
                    <Progress value={generatingProgress} className="w-full" />
                  </div>
                )}

                {/* Display original and generated images side by side */}
                <div className="grid grid-cols-2 gap-6">
                  {uploadedPhotoUrl && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-center">Original Photo</p>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image 
                          src={uploadedPhotoUrl} 
                          alt="Your original photo" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Generated Avatar</p>
                    {generatedAvatarUrl ? (
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image 
                          src={generatedAvatarUrl} 
                          alt="Your generated avatar" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">
                          {generationStatus === 'generating' ? "Generating..." : "Not yet generated"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/styles">Back</Link>
                </Button>
                {generationStatus === 'completed' ? (
                  <Button onClick={handleContinue}>Continue to Download</Button>
                ) : generationStatus === 'error' ? (
                  <Button onClick={handleRetry}>Retry Generation</Button>
                ) : (
                  <Button disabled>Please wait...</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 FaceCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 