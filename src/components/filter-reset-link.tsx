"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export function FilterResetLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={buttonStyles("secondary")}
      onClick={(event) => {
        const inputs = event.currentTarget.closest("form")?.querySelectorAll<HTMLInputElement>("input:not([type=hidden])");
        inputs?.forEach((input) => {
          input.value = "";
        });
      }}
    >
      <RotateCcw className="size-4" aria-hidden />
      Reset
    </Link>
  );
}
