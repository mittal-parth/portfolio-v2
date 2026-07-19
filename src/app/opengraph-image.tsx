import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Parth Mittal — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1a4d3a",
          color: "#f5f0e8",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>Parth Mittal</div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.85 }}>
          Member of Technical Staff @ Oracle · 12× Hackathon Winner
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          made on a canvas
        </div>
      </div>
    ),
    { ...size },
  );
}
