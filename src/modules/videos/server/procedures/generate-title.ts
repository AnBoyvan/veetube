import { z } from 'zod';

import { workflow } from '@/lib/workflow';
import { protectedProcedure } from '@/trpc/init';

export const generateTitle = protectedProcedure
	.input(z.object({ id: z.string().uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		const { workflowRunId } = await workflow.trigger({
			url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/title`,
			body: { userId, videoId: input.id },
		});

		return workflowRunId;
	});
