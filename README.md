# Sakugaa

A modern web interface for browsing animation clips from Sakugabooru.

![Sakugaa Preview](./public/preview.png)

## About

Sakugabooru is an amazing resource for finding exceptional animation moments, but the interface feels stuck in 2010. I wanted to build something cleaner and more enjoyable to browse, so I made this using Next.js.

**What's sakuga?** It's a Japanese term (作画) that refers to moments of outstanding animation quality in anime - those scenes where the animators really show off their skills.

## Features

- Browse thousands of animation clips
- Search and filter by tags
- Responsive design (works on mobile)
- Hover-to-play video previews
- Clean, modern interface

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **API:** Sakugabooru REST API
- **Deployment:** Vercel

## Getting Started

```bash
git clone https://github.com/[your-username]/sakugaa.git
cd sakugaa
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Screenshots

### Homepage
![Homepage](./screenshots/home.png)

### Browse Page
![Browse](./screenshots/browse.png)

## Challenges I Faced

**Mixed media handling:** The API returns both videos and images, which caused playback errors. I had to implement file type detection to render the correct HTML element for each.

**Performance:** Loading 50+ clips at once was causing lag. Solved this with lazy loading - only rendering clips that are actually visible on screen.

**API limitations:** Had to work around rate limiting by implementing basic client-side caching.

## What I Learned

- Working with external APIs and handling edge cases
- Next.js 14 App Router and server components
- Performance optimization for media-heavy sites
- TypeScript for safer API integration
- Responsive design with Tailwind

## To-Do

- [ ] Better error handling
- [ ] Add favorites system (localStorage)
- [ ] Advanced filtering options
- [ ] Light/dark mode toggle
- [ ] Mobile UX improvements

## Project Structure

```
sakugaa/
├── app/
│   ├── page.tsx              # Homepage
│   ├── animations/           # Browse page
│   └── clips/[id]/          # Individual clip pages
├── components/
│   └── Navbar.tsx
├── lib/
│   └── sakugabooru.ts       # API client
└── public/
```

## Author

**Foued**  
BTS CIEL Student  
[GitHub](https://github.com/Foued-pro) • [LinkedIn](https://www.linkedin.com/in/foued-attar/)

## License

MIT

---

Built with Next.js 