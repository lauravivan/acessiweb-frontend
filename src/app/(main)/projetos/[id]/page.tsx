import { Metadata } from "next/types";
import Project from "./Project";
import { ParamsPromise } from "@/types/params";
import { getProject } from "@/routes/projects";

export const metadata: Metadata = {
  title: "Meus projetos",
};

type PageProps = ParamsPromise;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (project && "id" in project) {
    return (
      <Project project={project} handleSecPageTitle={() => project.name} />
    );
  }

  return;
}
