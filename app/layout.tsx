import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
});

export const metadata: Metadata = {
    title: "Dirijo.ai - A Lei Mudou",
    description: "Conecte-se diretamente a instrutores independentes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
            </head>
            <body className={`${lexend.variable} font-sans antialiased bg-white text-slate-900 selection:bg-brand-accent selection:text-brand-dark`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
