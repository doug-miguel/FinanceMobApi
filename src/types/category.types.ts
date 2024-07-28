import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    category_name: z.string(),
});