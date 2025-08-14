'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a listing title and description from images.
 *
 * - generateListingDetails - A function that takes image data URIs as input and returns a suggested listing title and description.
 * - GenerateListingDetailsInput - The input type for the generateListingDetails function.
 * - GenerateListingDetailsOutput - The return type for the generateListingDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingDetailsInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      'An array of photos of the e-waste item, as data URIs that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateListingDetailsInput = z.infer<typeof GenerateListingDetailsInputSchema>;

const GenerateListingDetailsOutputSchema = z.object({
  title: z.string().describe('A suggested title for the e-waste listing.'),
  description: z
    .string()
    .describe('A suggested description for the e-waste listing.'),
});
export type GenerateListingDetailsOutput = z.infer<typeof GenerateListingDetailsOutputSchema>;

export async function generateListingDetails(
  input: GenerateListingDetailsInput
): Promise<GenerateListingDetailsOutput> {
  return generateListingDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateListingDetailsPrompt',
  input: {schema: GenerateListingDetailsInputSchema},
  output: {schema: GenerateListingDetailsOutputSchema},
  prompt: `You are an AI assistant that helps users create compelling e-waste listings. Given a set of images of an e-waste item, your goal is to generate a concise and informative title and description for the listing.

  Here are the images of the item:
  {{#each photoDataUris}}
    {{media url=this}}
  {{/each}}

  Based on these images, suggest a title and description for the e-waste listing. Focus on the item's type, condition, and any relevant details that would be helpful for potential collectors.

  Title:
  Description:`,
});

const generateListingDetailsFlow = ai.defineFlow(
  {
    name: 'generateListingDetailsFlow',
    inputSchema: GenerateListingDetailsInputSchema,
    outputSchema: GenerateListingDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
