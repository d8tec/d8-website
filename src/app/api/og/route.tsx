import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#080808",
        }}
      >
        <div style={{ color: "#f0f0f0", fontSize: 96, margin: "auto" }}>D8</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
