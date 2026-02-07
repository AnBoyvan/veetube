import { z } from 'zod';

import { workflow } from '@/lib/workflow';
import { protectedProcedure } from '@/trpc/init';

export const generateThumbnail = protectedProcedure
	.input(z.object({ id: z.uuid(), prompt: z.string().min(10) }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		const { workflowRunId } = await workflow.trigger({
			url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/thumbnail`,
			body: { userId, videoId: input.id, prompt: input.prompt },
		});

		return workflowRunId;
	});
