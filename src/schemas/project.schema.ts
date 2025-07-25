import { z } from "zod";

const guidelinesSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().max(150),
});

const projName = z
  .string()
  .trim()
  .max(150)
  .refine((val) => val.length > 0, {
    message: "É necessário informar um nome",
  });

const desc = z.string().trim();

const guidelines = z
  .array(guidelinesSchema)
  .min(1, "O projeto precisa ter ao menos uma diretriz relacionada");

export const createProjectSchema = z.object({
  projName,
  desc,
  guidelines,
});

export const editProjectSchema = z.object({
  projName,
  desc,
  guidelines,
  feedback: z.string().trim().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type EditProjectSchema = z.infer<typeof editProjectSchema>;
