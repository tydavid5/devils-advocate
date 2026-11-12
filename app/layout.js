import "./globals.css";

export const metadata = {
  title: "Devil's Advocate",
  description: "Everyone falls in love with their own idea, plan, or argument, and no one around them will say the hard truth about it."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
