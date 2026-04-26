import { Metadata } from "next";
import { CollaborationsArchive } from "@/components/hud/collaborations-archive";
import { CollaborationNavbar } from "@/components/hud/collaboration-navbar";
import { GoldenPulseStyles } from "@/components/hud/collaboration-navbar";

/**
 * CollaborationsPage - Panel Táctico Principal.
 * Punto de entrada al sistema de colaboración.
 */
export const metadata: Metadata = {
  title: "COLABORACIONES // FEED_INTEL",
  description: "Panel táctico de colaboraciones autorizadas y feed de inteligencia",
};

export default function CollaborationsPage() {
  return (
    <>
      <GoldenPulseStyles />
      <CollaborationNavbar />
      <CollaborationsArchive />
    </>
  );
}
