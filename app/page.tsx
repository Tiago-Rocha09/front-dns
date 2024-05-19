import Image from "next/image";
import { Form } from "./components/form";
import { headers } from "next/headers";

function extractSubdomain(host: string): string | null {
  const parts = host.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}

export default function Home() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const subdomain = extractSubdomain(host) || 'unknown';

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-5">
      Acessando usuário: {subdomain}
      <Form />
    </main>
  );
}
