"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export function StudioClient() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-lg w-full rounded-xl border border-border bg-card p-6 space-y-3 shadow-lg">
          <h1 className="text-xl font-bold">Sanity Studio ainda não configurado</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Defina <code className="font-mono text-foreground">NEXT_PUBLIC_SANITY_PROJECT_ID</code> e{" "}
            <code className="font-mono text-foreground">NEXT_PUBLIC_SANITY_DATASET</code> no arquivo{" "}
            <code className="font-mono text-foreground">.env.local</code> (ou rode{" "}
            <code className="font-mono text-foreground">npx sanity@latest init --env</code>) e reinicie o servidor.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
