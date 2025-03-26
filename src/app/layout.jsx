// File: app/layout.jsx
import './globals.css';

export const metadata = {
  title: "frrlrbn | Digital Space",
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}