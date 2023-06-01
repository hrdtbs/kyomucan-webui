import "./globals.css";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";

const font = Zen_Kaku_Gothic_Antique({
  weight: "300",
  subsets: [],
});

export const metadata = {
  title: "Kyomucan WebUI",
  description:
    "Generate CSV data of IC cards used for transportation in Japan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={font.className}>{children}</body>
    </html>
  );
}
