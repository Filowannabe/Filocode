import { Metadata } from "next";
import { notFound } from "next/navigation";
import collaborationsData from "@/data/collaborations.json";
import { Collaboration } from "@/types/collaboration";
import { createT } from "@/lib/i18n";
import { CollaborationContent } from "@/components/hud/collaboration-content";

/**
 * generateStaticParams - Mandato GH Pages (Fase 3)
 * Pre-renderizado de las 4 rutas de colaboraciones en tiempo de build.
 */
export async function generateStaticParams() {
  const { collaborations } = collaborationsData as any;
  return collaborations.map((project: Collaboration) => ({
    id: project.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * generateMetadata - Helper para metadata con i18n
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { collaborations } = collaborationsData as any;
  const project = collaborations.find((c: any) => c.id === id);

  if (!project) return { title: "Project Not Found" };

  const t = createT();
  const translatedTitle = t("collaborations.intelligence_report");

  return {
    title: `${project.company} // ${translatedTitle}`,
    description: t(`projects.${id}.clientOverview`),
  };
}

/**
 * CollaborationDetailPage - Server Component (Orquestador).
 * Delega la interactividad a CollaborationContent (Client Component).
 */
export default async function CollaborationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { collaborations } = collaborationsData as any;
  const project = collaborations.find((c: any) => c.id === id) as Collaboration;

  if (!project) notFound();

  return <CollaborationContent project={project} />;
}
