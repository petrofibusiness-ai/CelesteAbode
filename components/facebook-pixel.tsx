"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const DEFAULT_PIXEL_ID = "1611049553953262";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

function isRestrictedPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname.startsWith("/admin") ||
    pathname === "/ca-internal-inventory-v1" ||
    pathname.startsWith("/ca-internal-inventory-v1/")
  );
}

export function FacebookPixel({ pixelId }: { pixelId?: string }) {
  const pathname = usePathname();
  const trackedInitialPageView = useRef(false);
  const id = pixelId || DEFAULT_PIXEL_ID;
  const skip = isRestrictedPath(pathname);

  useEffect(() => {
    if (skip || typeof window === "undefined" || !window.fbq) {
      return;
    }

    // Base snippet already fires PageView on first load.
    if (!trackedInitialPageView.current) {
      trackedInitialPageView.current = true;
      return;
    }

    window.fbq("track", "PageView");
  }, [pathname, skip]);

  if (skip) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${id}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
