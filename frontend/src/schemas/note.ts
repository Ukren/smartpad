import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  content: z.string().optional().default(''),
  tags: z
    .array(z.string().min(1).max(30))
    .max(10, 'Max 10 tags')
    .optional()
    .default([]),
})

export type NoteFormValues = z.infer<typeof noteSchema>
