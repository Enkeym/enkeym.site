export async function GET() {
  return Response.json({
    name: "Nikita / enkeym",
    short_name: "enkeym",
    start_url: "/",
    display: "standalone",
    background_color: "#12071f",
    theme_color: "#2f204e",
    description: "UI Designer & Fullstack Developer",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon"
      },
      {
        src: "/og-image.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any maskable"
      }
    ]
  })
}
