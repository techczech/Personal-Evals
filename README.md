# Prompt Eval Library

A modern, interactive, and responsive web application designed to store, categorize, and display various prompts used for evaluating Large Language Models (LLMs). The application features a clean "orange-themed" UI, search functionality, and syntax-highlighted code blocks with copy-paste capabilities.

## 🏗 Architecture

This project is a **Single Page Application (SPA)** built with React 19. It is designed to be entirely client-side, requiring no backend server or database.

### Core Technologies
*   **Framework:** React 19 (Functional components with Hooks)
*   **Styling:** Tailwind CSS (Utility-first CSS framework)
*   **Icons:** Lucide React
*   **Type Safety:** TypeScript
*   **Module System:** ES Modules (via `importmap` for dependency resolution in the current setup)

### Data Management
There is no external database. Content is managed via a static data file (`data.tsx`).
*   **Pros:** Extremely fast read times, zero latency, free hosting (static), easy to version control prompts.
*   **Cons:** Adding content requires a code commit and redeploy.

### Key Components
1.  **`App.tsx`**: The main entry point handling view state routing (Home vs. Browser) and global keyboard shortcuts.
2.  **`EvalBrowser.tsx`**: The core application logic. It manages the sidebar navigation, content rendering, and filtering.
3.  **`SearchModal.tsx`**: A command-palette style modal (triggered by `/` or `Cmd+K`) that performs real-time client-side search across titles, categories, and content bodies.
4.  **`data.tsx`**: The central repository of prompt data.

## 📂 Project Structure

```text
.
├── index.html              # Entry point, handles Tailwind CDN and Import Maps
├── index.tsx               # React DOM root mounting
├── App.tsx                 # Main application controller
├── types.ts                # TypeScript interfaces (SectionData, Props)
├── data.tsx                # Static database of prompts
├── psmithData.ts           # Large text assets (long context examples)
├── metadata.json           # Application metadata and permissions
├── README.md               # Documentation
├── components/             # Reusable UI Components
│   ├── CodeBlock.tsx       # Copy-pasteable code/prompt display
│   ├── EvalBrowser.tsx     # Main documentation viewer layout
│   ├── FileAttachment.tsx  # Downloadable/Viewable file component
│   ├── HomePage.tsx        # Landing page
│   ├── InfoBlock.tsx       # Callout component for extra context
│   ├── PlaceholderImage.tsx# Image handler with fallback logic
│   └── SearchModal.tsx     # Global search UI
└── samplefiles/            # Static assets folder (images, text files)
```

## 🚀 Deployment

Since this application relies entirely on client-side code, it can be deployed to any static site hosting service.

### Prerequisites
In a production environment, you would typically bundle this application using a tool like **Vite**, **Parcel**, or **Webpack** to optimize assets and handle TypeScript compilation.

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)
This is the recommended approach.

1.  **Build:** Run your build script (e.g., `npm run build` if using Vite) to generate a `dist` or `build` folder containing the compiled HTML, CSS, and JS.
2.  **Upload:** Upload the contents of the build folder to the hosting provider.
3.  **Configuration:** Ensure your host is configured to serve `index.html` as the entry point.

### Option 2: S3 + CloudFront (AWS)
1.  Upload the build artifacts to an AWS S3 bucket configured for static website hosting.
2.  Point a CloudFront distribution to the S3 bucket to provide SSL (HTTPS) and global caching.

### Option 3: Docker (Containerization)
If you prefer containerization, you can serve the static files using Nginx.

```dockerfile
# Example Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🛠 Extending the Library

To add new prompts to the library, you do not need to modify React components.

1.  Open `data.tsx`.
2.  Add a new object to the `contentData` array following the `SectionData` interface:

```typescript
{
  id: 'unique-id',
  title: 'Prompt Title',
  category: 'Category Name',
  keywords: 'search tags, specific terms',
  searchContent: 'Raw text content for search indexing',
  content: (
    <>
      <h2>Description</h2>
      <CodeBlock code={`Your prompt goes here`} />
    </>
  )
}
```
3.  The application will automatically render the new section in the sidebar and index it for search.
