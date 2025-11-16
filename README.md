# Local AI Chat - Landing Page

Modern, fully responsive landing page for Local AI Chat built with Next.js, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**🔗 [View Live Site](https://m1nor-proj.vercel.app)**

## ✨ Features

- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- Animated pattern separators
- Interactive comparison section with post-it notes
- Performance metrics visualization
- Platform-specific downloads (Windows, macOS, Linux)
- Custom theme (navy blue & beige)
- Mobile-first approach with intuitive layouts

## 📱 Responsive Design

The landing page is fully responsive and optimized for all screen sizes:

- **Desktop**: Full-width layout with sidebar elements and spacious content areas
- **Tablet**: Adaptive layouts with optimized spacing
- **Mobile**: 
  - Centered download button
  - Stacked post-it notes with slight overlap for visual appeal
  - Compact pattern library (4x2 grid)
  - Vertically stacked metrics and cards
  - Optimized typography and spacing

## 🖼️ Preview Screenshots

### Desktop View
![Desktop Preview](./public/preview.png)

### Mobile View
![Mobile Preview](./public/preview-mobile.png)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Project Structure

```
landing/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── DownloadButton.tsx
│   ├── DownloadSection.tsx
│   ├── ComparisonSection.tsx
│   ├── PatternLibrary.tsx
│   ├── PostItNote.tsx
│   ├── MetricsChart.tsx
│   └── Footer.tsx
└── public/
    ├── preview.png       # Desktop screenshot
    └── preview-mobile.png # Mobile screenshot
```

## 🎨 Design Highlights

- **Color Scheme**: Deep navy blue (#0A1E5E) with light yellow-green accents (rgb(237,254,193))
- **Typography**: Serif headings with iOS-style body text
- **Animations**: Smooth transitions and hover effects
- **Pattern Library**: Dynamic canvas-based pattern generation
- **Post-it Notes**: Randomly shuffled with subtle rotations for organic feel

## 📝 License

This project is part of the Local AI Chat application.
