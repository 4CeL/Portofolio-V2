import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} | Portfolio 2026`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Monochrome share card in the same frame style as the site.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 36,
          background: "#e8e8e5",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid rgba(17,17,17,0.3)",
            borderRadius: 24,
            padding: "48px 56px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 2 }}>
            <span>STEFANUS / 2026</span>
            <span>~/portfolio</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, letterSpacing: 2, color: "rgba(17,17,17,0.65)" }}>
              PORTFOLIO 2026 / BACKEND + DATA + AUTOMATION
            </span>
            <span style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, marginTop: 16, letterSpacing: -4 }}>
              {profile.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36 }}>
            <span>I build</span>
            <span style={{ background: "#111111", color: "#e8e8e5", padding: "4px 16px" }}>RESTful APIs</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
