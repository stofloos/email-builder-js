import { z } from 'zod';

export const TemplatePropsSchema = z.object({
  props: z
    .object({
      document: z.any().optional().nullable(),
      id: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type TemplateProps = z.infer<typeof TemplatePropsSchema>;
