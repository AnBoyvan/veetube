export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Base
			BASE_URL: string;
			NEXT_PUBLIC_BASE_URL: string;
			NEXT_PUBLIC_DEVELOPED_BY: string;

			// Clerk
			NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
			CLERK_SECRET_KEY: string;
			NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
			NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
			NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: string;
			NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: string;
			CLERK_SIGNING_SECRET: string;

			// Database
			DATABASE_URL: string;

			// Mux
			MUX_TOKEN_ID: string;
			MUX_TOKEN_SECRET: string;
			MUX_SIGNING_SECRET: string;

			// OpenAI
			OPENAI_API_KEY: string;
			OPENAI_API_IMAGE_URL: string;

			// Uploadthing
			UPLOADTHING_TOKEN: string;

			// Upstash
			UPSTASH_REDIS_REST_URL: string;
			UPSTASH_REDIS_REST_TOKEN: string;
			UPSTASH_WORKFLOW_URL: string;
			QSTASH_URL: string;
			QSTASH_TOKEN: string;
			QSTASH_CURRENT_SIGNING_KEY: string;
			QSTASH_NEXT_SIGNING_KEY: string;

			// Node
			NODE_ENV: 'development' | 'production' | 'test';
		}
	}
}
