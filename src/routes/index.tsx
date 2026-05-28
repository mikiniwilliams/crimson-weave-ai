import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The AI Vision Weaver — Strategy, Systems, AI & Design by Mikini Williams" },
      {
        name: "description",
        content:
          "Weaving strategy, systems, AI, and design into digital products that feel like the future. Premium AI strategy, digital products, and creative systems by Mikini Williams.",
      },
      { property: "og:title", content: "The AI Vision Weaver" },
      {
        property: "og:description",
        content:
          "Strategy, systems, AI, and design woven into intelligent brands and digital income.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Landing,
});
