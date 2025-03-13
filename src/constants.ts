export const APP_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const DEFAULT_VIDEOS_LIMIT = 18;
export const MAX_VIDEOS_LIMIT = 100;

export const DEFAULT_SUGGESTIONS_LIMIT = 10;
export const MAX_SUGGESTIONS_LIMIT = 100;

export const DEFAULT_COMMENTS_LIMIT = 20;
export const MAX_COMMENTS_LIMIT = 100;

export const DEFAULT_PLAYLISTS_LIMIT = 18;
export const MAX_PLAYLISTS_LIMIT = 100;

export const DEFAULT_SUBSCRIPTIONS_LIMIT = 20;
export const MAX_SUBSCRIPTIONS_LIMIT = 100;

export const USER_FALLBACK = '/user-placeholder.svg';
export const THUMBNAIL_FALLBACK = '/placeholder.svg';

export const TITLE_SYSTEM_PROMPT = `Your task is to generate an SEO-focused title for a YouTube video based on its transcript. Please follow these guidelines:
- Be concise but descriptive, using relevant keywords to improve discoverability.
- Highlight the most compelling or unique aspect of the video content.
- Avoid jargon or overly complex language unless it directly supports searchability.
- Use action-oriented phrasing or clear value propositions where applicable.
- Ensure the title is 3-8 words long and no more than 100 characters.
- ONLY return the title as plain text. Do not add quotes or any additional formatting.`;

export const DESCRIPTION_SYSTEM_PROMPT = `Your task is to summarize the transcript of a video. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points and main ideas without losing important details.
- Avoid jargon or overly complex language unless necessary for the context.
- Focus on the most critical information, ignoring filler, repetitive statements, or irrelevant tangents.
- ONLY return the summary, no other text, annotations, or comments.
- Aim for a summary that is 3-5 sentences long and no more than 200 characters.`;
