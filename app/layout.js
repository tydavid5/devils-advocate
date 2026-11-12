import "./globals.css";

export const metadata = {
  title: "Devil's Advocate",
  description: "Ever had an idea and nobody tells you the flaw? They just say it sounds great, it looks great, it is a banger idea. Devil's Advocate checks your idea for flaws, and tells you straight whether it actually checks out.",
  icons: { icon: "/favicon.png" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
