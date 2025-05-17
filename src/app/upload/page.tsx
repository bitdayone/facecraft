"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoUploader } from "@/components/photo-uploader";
import { toast } from "sonner";

export default function UploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = async (file: File) => {
    try {
      setUploading(true);
      
      // Create FormData for API request
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload the file to our API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload file");
      }
      
      // Set the uploaded photo URL
      setUploadedPhotoUrl(data.url);
      
      // Store the uploaded photo URL in sessionStorage for the next steps
      sessionStorage.setItem("uploadedPhotoUrl", data.url);
      
      toast.success("Photo uploaded successfully!");
      setUploading(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo. Please try again.");
      setUploading(false);
    }
  };

  const handleContinue = () => {
    if (uploadedPhotoUrl) {
      router.push("/styles");
    }
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
            <h1 className="text-3xl font-bold mb-8 text-center">Upload Your Photo</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Upload a photo</CardTitle>
                <CardDescription>
                  Upload a clear photo of your face for the best results. 
                  We support JPG, PNG, and other common image formats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="camera">Camera</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="p-4">
                    <PhotoUploader 
                      onPhotoSelected={handlePhotoUpload} 
                      uploadedPhotoUrl={uploadedPhotoUrl}
                      isUploading={uploading}
                    />
                  </TabsContent>
                  <TabsContent value="camera" className="p-4">
                    <div className="text-center p-10 border-2 border-dashed rounded-lg">
                      <p>Camera functionality would be implemented here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This feature is not available in the demo version
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/">Back</Link>
                </Button>
                <Button 
                  onClick={handleContinue} 
                  disabled={!uploadedPhotoUrl || uploading}
                >
                  Continue to Styles
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