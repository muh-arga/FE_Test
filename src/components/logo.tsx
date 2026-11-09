import Image from "next/image";
import logo from "@/assets/logo-jasamarga.png";

export function Logo({ className }: { className?: string }) {
  return <Image src={logo} alt="Jasa Marga" priority className={className} />;
}
