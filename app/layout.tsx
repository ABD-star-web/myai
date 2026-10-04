import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My AI Chat',
  description: 'My own AI chat app built with Next.js and Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">{children}</body>
    </html>
  );
}
