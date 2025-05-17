"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function StylesPage() {
  const router = useRouter();
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the uploaded photo URL from sessionStorage
    const photoUrl = sessionStorage.getItem("uploadedPhotoUrl");
    if (!photoUrl) {
      // If no photo is uploaded, redirect back to upload page
      router.push("/upload");
      return;
    }
    
    setUploadedPhotoUrl(photoUrl);
  }, [router]);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleContinue = () => {
    if (selectedStyle) {
      // Store the selected style in sessionStorage
      sessionStorage.setItem("selectedStyle", selectedStyle);
      router.push("/generate");
    }
  };

  // Avatar style options
  const styles = [
    { id: "3d", name: "3D Render", description: "Modern 3D rendered character style" },
    { id: "anime", name: "Anime", description: "Japanese anime-inspired style" },
    { id: "cartoon", name: "Cartoon", description: "Fun and colorful cartoon style" },
    { id: "sketch", name: "Sketch", description: "Hand-drawn pencil sketch style" },
    { id: "oil", name: "Oil Painting", description: "Classical oil painting style" },
    { id: "watercolor", name: "Watercolor", description: "Soft watercolor painting style" },
    { id: "pixel", name: "Pixel Art", description: "Retro pixel art style" },
    { id: "cyberpunk", name: "Cyberpunk", description: "Futuristic cyberpunk style" },
    { id: "lowpoly", name: "Low Poly", description: "Geometric low polygon style" },
  ];

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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Style</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Photo Preview Section */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Your Photo</CardTitle>
                  <CardDescription>This is the photo we'll transform</CardDescription>
                </CardHeader>
                <CardContent>
                  {uploadedPhotoUrl && (
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image 
                        src={uploadedPhotoUrl} 
                        alt="Your uploaded photo" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Style Selection Section */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Step 2: Select a Style</CardTitle>
                  <CardDescription>
                    Choose a style for your AI-generated avatar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {styles.map((style) => (
                      <div 
                        key={style.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedStyle === style.id 
                            ? "border-primary bg-primary/5 ring-2 ring-primary" 
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleStyleSelect(style.id)}
                      >
                        <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                          <span className="text-3xl">🎨</span>
                        </div>
                        <h3 className="font-medium">{style.name}</h3>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/upload">Back</Link>
                  </Button>
                  <Button 
                    onClick={handleContinue} 
                    disabled={!selectedStyle}
                  >
                    Continue to Generation
                  </Button>
                </CardFooter>
              </Card>
            </div>
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