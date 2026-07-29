"use client";

import { useEffect } from "react";
import Script from "next/script";
import { InstagramEmbedSlide } from "@/components/instagram-embed-slide";
import { processInstagramEmbeds } from "@/lib/instagram-embed";

type BlogInstagramEmbedProps = {
  url: string;
};

export function BlogInstagramEmbed({ url }: BlogInstagramEmbedProps) {
  const permalink = url.trim();

  useEffect(() => {
    if (!permalink) return;
    processInstagramEmbeds();
    const timer = window.setTimeout(processInstagramEmbeds, 500);
    return () => window.clearTimeout(timer);
  }, [permalink]);

  if (!permalink) return null;

  return (
    <>
      <section className="instagram-embeds-section mb-10 w-full" aria-label="Instagram reel">
        <div className="mx-auto w-full max-w-md">
          <InstagramEmbedSlide url={permalink} />
        </div>
      </section>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          processInstagramEmbeds();
          window.setTimeout(processInstagramEmbeds, 200);
        }}
      />
    </>
  );
}
