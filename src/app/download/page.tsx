"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function DownloadPage() {
  const router = useRouter();
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Retrieve the generated avatar URL from sessionStorage
    const avatarUrl = sessionStorage.getItem("generatedAvatarUrl");
    if (!avatarUrl) {
      toast.error("No generated avatar found. Please start over.");
      router.push("/upload");
      return;
    }
    
    setGeneratedAvatarUrl(avatarUrl);
  }, [router]);

  const handleDownload = async () => {
    if (!generatedAvatarUrl) return;
    
    try {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = generatedAvatarUrl;
      link.download = `facecraft-avatar-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Avatar downloaded successfully!");
    } catch (error) {
      console.error("Error downloading avatar:", error);
      toast.error("Failed to download avatar. Please try again.");
    }
  };

  const handleShare = (platform: string) => {
    if (!generatedAvatarUrl) return;
    
    // In a real implementation, we would use platform-specific share APIs
    // For now, we'll just show a toast message
    toast.success(`Sharing to ${platform} would happen here!`);
  };

  const handleStartOver = () => {
    // Clear sessionStorage and redirect to upload page
    sessionStorage.clear();
    router.push("/upload");
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
            <h1 className="text-3xl font-bold mb-8 text-center">Your Avatar is Ready!</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Download & Share</CardTitle>
                <CardDescription>
                  Your AI-generated avatar is ready to download and share
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {generatedAvatarUrl && (
                  <div className="relative aspect-square w-64 h-64 rounded-lg overflow-hidden mb-6">
                    <Image 
                      src={generatedAvatarUrl} 
                      alt="Your generated avatar" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Button onClick={handleDownload} className="flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download Avatar
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" x2="12" y1="2" y2="15" />
                        </svg>
                        Share Avatar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare("Twitter")}>
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("Instagram")}>
                        Instagram
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("Facebook")}>
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("LinkedIn")}>
                        LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/generate">Back</Link>
                </Button>
                <Button variant="outline" onClick={handleStartOver}>
                  Create Another Avatar
                </Button>
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