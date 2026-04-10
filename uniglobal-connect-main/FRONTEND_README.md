# Frontend - Uniglobal Study Abroad Consultancy

Modern React frontend for Uniglobal study abroad consultancy platform.

## Tech Stack

- **React** 18 with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Sonner** - Toast notifications

## Features

✅ Multi-step lead form
✅ Responsive design
✅ Smooth animations
✅ Backend API integration
✅ Real-time validation

## Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update your backend URL:

```env
# Local development
VITE_API_URL=http://localhost:5000/api

# Production (Replit)
VITE_API_URL=https://your-backend.repl.co/api
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on: http://localhost:5173

## Production Build

```bash
npm run build
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Go to https://vercel.com
3. Import the GitHub repo
4. Set environment variables (VITE_API_URL)
5. Deploy!

### Deploy to Netlify

1. Push to GitHub
2. Go to https://netlify.com
3. Create new site from GitHub
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Set environment variables
7. Deploy!

## Frontend API Integration

The frontend connects to backend at: `VITE_API_URL`

### Lead Form

Sends to: `POST /api/leads`

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 555-0100",
  degree: "Master",
  country: "USA",
  preferredCountry: "USA",
  budget: "40-60L",
  intake: "Fall 2025"
}
```

## Project Structure

```
src/
├── components/       # React components
│   ├── LeadForm.tsx  # Multi-step form (connected to backend)
│   ├── Navbar.tsx
│   ├── CTASection.tsx
│   └── ui/           # UI components
├── pages/            # Page components
├── services/
│   └── api.ts        # Backend API client
├── hooks/            # React hooks
├── lib/              # Utilities
├── App.tsx           # Main app
└── main.tsx          # Entry point
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
```

## Tips

- Backend must be running/deployed before form submissions work
- CORS is configured on backend to allow localhost
- Check browser console for API errors
- Verify .env variables are set correctly

## License

ISC

---

**Ready to deploy? Check [GitHub README](../README.md) for full deployment guide!**
