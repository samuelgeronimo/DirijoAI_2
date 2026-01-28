import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.dirijoai.com'),
    title: {
        default: "Dirijo.ai - Instrutores de Direção Independentes",
        template: "%s | Dirijo.ai",
    },
    description: "Conecte-se diretamente a instrutores independentes. Aulas práticas individuais com carros impecáveis e foco na aprovação.",
    keywords: ["instrutor de direção", "aulas de direção", "CNH", "autoescola", "instrutores independentes"],
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: "https://www.dirijoai.com",
        title: "Dirijo.ai - Instrutores de Direção Independentes",
        description: "Conecte-se diretamente a instrutores independentes.",
        siteName: "Dirijo.ai",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Dirijo.ai",
        "url": "https://www.dirijoai.com",
        "logo": "https://www.dirijoai.com/logo.png",
        "description": "Plataforma que conecta alunos a instrutores de direção independentes.",
        "sameAs": [
            "https://instagram.com/dirijo.ai",
            "https://facebook.com/dirijo.ai"
        ]
    };

    return (
        <html lang="pt-BR">
            <head>
                {/* Preconnect and DNS-prefetch for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

                {/* Material Symbols with display=swap */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                    media="all"
                />

                <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className={`${lexend.variable} font-sans antialiased bg-white text-slate-900 selection:bg-brand-accent selection:text-brand-dark`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
