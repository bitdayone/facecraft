# FaceCraft - AI Avatar Generator

FaceCraft is a web application that transforms your photos into stunning AI-generated avatars with various styles. Users can upload photos, select from multiple avatar styles, generate AI avatars, and download or share the results.

## Features

- Photo upload with drag-and-drop functionality
- Selection of various avatar styles (3D, anime, cartoon, etc.)
- AI-powered avatar generation
- Download and social sharing capabilities
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Storage**: Vercel Blob Storage
- **API Routes**: Next.js API Routes
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/facecraft.git
   cd facecraft
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   OPENAI_API_KEY=your_openai_api_key
   ```

   You can obtain an OpenAI API key by signing up at [OpenAI Platform](https://platform.openai.com/).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
facecraft/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API endpoints
│   │   ├── download/    # Download page
│   │   ├── generate/    # Avatar generation page
│   │   ├── styles/      # Style selection page
│   │   ├── upload/      # Photo upload page
│   │   └── page.tsx     # Landing page
│   ├── components/      # Reusable React components
│   │   ├── layout/      # Layout components
│   │   ├── ui/          # UI components from shadcn/ui
│   │   └── ...          # Other components
│   └── lib/             # Utility functions
└── ...
```

## API Endpoints

- `POST /api/upload`: Uploads a photo to Vercel Blob Storage
- `POST /api/generate`: Generates an avatar using OpenAI's GPT-4o and DALL-E 3 models

## Deployment

The application is configured for easy deployment on Vercel:

```bash
npm run build
vercel deploy
```

## Future Enhancements

- Additional AI model options for avatar generation
- More avatar styles and customization options
- User authentication and profile management
- Gallery of previously generated avatars
- Improved sharing capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)
