import Link from "next/link";
/**
 * @ points to the root folder @see ./jsconfig.json.
 */
import Header from "@/components/header.js";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About us</Link></p>
    </main>
  );
}
