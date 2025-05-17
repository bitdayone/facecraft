import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      title: "Upload Photo",
      description: "Upload your photo from your device or take one with your camera",
      icon: "📷"
    },
    {
      title: "Choose Style",
      description: "Select from multiple avatar styles including 3D, anime, cartoon, and more",
      icon: "🎨"
    },
    {
      title: "AI Transformation",
      description: "Our AI transforms your photo into amazing avatars in seconds",
      icon: "✨"
    },
    {
      title: "Download & Share",
      description: "Download your new avatars and share them across social media",
      icon: "📱"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">FaceCraft</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your Photos into Amazing AI Avatars
              </h1>
              <p className="text-xl mb-8">
                Create stunning, personalized avatars in various styles with just a few clicks
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/upload">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4 mx-auto">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Example Transformations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* These would be actual examples in production */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🖼️</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 FaceCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
