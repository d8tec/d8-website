import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" } }
    ).then((r) => r.text());
    const match = css.match(/url\((.+?\.woff2)\)/);
    if (!match?.[1]) return null;
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const isEs = params?.locale === "es";
  const fontData = await getFont();

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 700;
    style: "normal";
  }[] = fontData
    ? [{ name: "Space Grotesk", data: fontData, weight: 700, style: "normal" }]
    : [];

  const fontFamily = fontData ? "Space Grotesk" : "system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#080808",
          position: "relative",
        }}
      >
        {/* Purple top accent */}
        <div
          style={{
            width: "100%",
            height: 4,
            backgroundColor: "#9900ff",
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px",
            fontFamily,
          }}
        >
          {/* Domain — top right */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{ fontSize: 18, color: "#555555", letterSpacing: "0.08em" }}
            >
              d8tec.com
            </div>
          </div>

          {/* Headline + tags */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#f0f0f0",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              {isEs ? "Ingeniería y" : "Engineering &"}
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#b84dff",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                marginBottom: 48,
              }}
            >
              {isEs ? "Desarrollo." : "Development."}
            </div>
            <div
              style={{ fontSize: 18, color: "#555555", letterSpacing: "0.06em" }}
            >
              {isEs
                ? "R&D  ·  HARDWARE / SOFTWARE  ·  WEB & APP  ·  IA"
                : "R&D  ·  HARDWARE / SOFTWARE  ·  WEB & APP  ·  AI"}
            </div>
          </div>
        </div>

        {/* D8 watermark */}
        <div
          style={{
            position: "absolute",
            right: 52,
            bottom: 16,
            fontSize: 280,
            fontWeight: 700,
            color: "#1e1e1e",
            lineHeight: 1,
            fontFamily,
            letterSpacing: "-0.05em",
          }}
        >
          D8
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
