"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AppError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <Card className="flex flex-col items-center px-6 py-16 text-center">
      <TriangleAlert className="size-10 text-danger" aria-hidden />
      <h1 className="mt-4 text-lg font-semibold">Data gagal dimuat</h1>
      <p className="mt-1 max-w-md text-sm text-muted">
        Server API tidak merespons. Pastikan service API berjalan, lalu coba lagi.
      </p>
      <Button className="mt-6" onClick={() => retry()}>
        <RefreshCw className="size-4" aria-hidden />
        Coba lagi
      </Button>
    </Card>
  );
}
