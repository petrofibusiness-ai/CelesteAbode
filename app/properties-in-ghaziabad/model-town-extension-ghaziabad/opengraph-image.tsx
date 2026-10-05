import { ImageResponse } from "next/og";
import {
  MODEL_TOWN_EXTENSION_HERO_ALT,
  MODEL_TOWN_EXTENSION_HERO_IMAGE,
} from "@/lib/model-town-extension-assets";

export const runtime = "edge";
export const alt = MODEL_TOWN_EXTENSION_HERO_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#141816",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MODEL_TOWN_EXTENSION_HERO_IMAGE}
          alt=""
          width={1200}
          height={630}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
