import { ImageResponse } from "next/og";

// Configuración de la imagen dinámica
export const runtime = "edge";
export const alt = "Filocode Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generador de OpenGraph Image (OG) mediante Satori.
 * Utiliza estilos en línea compatibles con Satori para el renderizado en el Edge.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          border: "12px solid #b45309",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Marca de agua / Decoración brutalista */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontSize: 24,
            fontWeight: "bold",
            color: "#b45309",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          {"// HUD_INTERACTIVE_PORTFOLIO"}
        </div>

        {/* Título Principal */}
        <div
          style={{
            display: "flex",
            color: "#b45309",
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
          }}
        >
          FILOCODE
        </div>

        {/* Subtítulo */}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            opacity: 0.8,
            fontSize: 40,
            letterSpacing: "0.1em",
            marginTop: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          SENIOR SOFTWARE ENGINEER
        </div>

        {/* Status (Satori compatible bottom-right simulation) */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            display: "flex",
            color: "#22c55e",
            fontSize: 24,
            fontWeight: "bold",
            letterSpacing: "0.05em",
          }}
        >
          STATUS: ONLINE // SYSTEM: STABLE
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
