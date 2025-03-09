import { headers } from 'next/headers';

import {
	VideoAssetCreatedWebhookEvent,
	VideoAssetDeletedWebhookEvent,
	VideoAssetErroredWebhookEvent,
	VideoAssetReadyWebhookEvent,
	VideoAssetTrackReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';
import { eq } from 'drizzle-orm';
import { UTApi } from 'uploadthing/server';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';

const SIGNING_SECRET = process.env.MUX_SIGNING_SECRET;

type WebhookEvent =
	| VideoAssetCreatedWebhookEvent
	| VideoAssetErroredWebhookEvent
	| VideoAssetReadyWebhookEvent
	| VideoAssetTrackReadyWebhookEvent
	| VideoAssetDeletedWebhookEvent;

export const POST = async (request: Request) => {
	if (!SIGNING_SECRET) {
		throw new Error('MUX_SIGNING_SECRET is not set');
	}

	const headersPayload = await headers();
	const muxSignature = headersPayload.get('mux-signature');

	if (!muxSignature) {
		throw new Response('No signature found', { status: 401 });
	}

	const payload = await request.json();
	const body = JSON.stringify(payload);

	mux.webhooks.verifySignature(
		body,
		{
			'mux-signature': muxSignature,
		},
		SIGNING_SECRET,
	);

	switch (payload.type as WebhookEvent['type']) {
		case 'video.asset.created': {
			const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('No upload ID found', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxAssetId: data.id,
					muxStatus: data.status,
				})
				.where(eq(videos.muxUploadId, data.upload_id));

			break;
		}

		case 'video.asset.ready': {
			const data = payload.data as VideoAssetReadyWebhookEvent['data'];
			const playbackId = data.playback_ids?.[0].id;

			if (!data.upload_id) {
				return new Response('No upload ID found', { status: 400 });
			}

			if (!playbackId) {
				return new Response('Missing playback ID', { status: 400 });
			}

			const tempThumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
			const tempPreviewUrl = `https://image.mux.com/${playbackId}/animated.gif`;
			const duration = data.duration ? Math.round(data.duration * 1000) : 0;

			const utapi = new UTApi();
			const [uploadedThumbnail, uploadedPreview] =
				await utapi.uploadFilesFromUrl([tempThumbnailUrl, tempPreviewUrl]);

			if (!uploadedThumbnail.data || !uploadedPreview.data) {
				return new Response('Failed to upload thumbnail or preview');
			}

			const { key: thumbnailKey, ufsUrl: thumbnailUrl } =
				uploadedThumbnail.data;
			const { key: previewKey, ufsUrl: previewUrl } = uploadedPreview.data;

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
					muxPlaybackId: playbackId,
					muxAssetId: data.id,
					thumbnailUrl,
					thumbnailKey,
					previewUrl,
					previewKey,
					duration,
				})
				.where(eq(videos.muxUploadId, data.upload_id));

			break;
		}

		case 'video.asset.errored': {
			const data = payload.data as VideoAssetErroredWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('No upload ID found', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
				})
				.where(eq(videos.muxUploadId, data.upload_id));

			break;
		}

		case 'video.asset.deleted': {
			const data = payload.data as VideoAssetDeletedWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('No upload ID found', { status: 400 });
			}

			await db.delete(videos).where(eq(videos.muxUploadId, data.upload_id));

			break;
		}

		case 'video.asset.track.ready': {
			const data = payload.data as VideoAssetTrackReadyWebhookEvent['data'] & {
				asset_id: string;
			};

			const assetId = data.asset_id;
			const trackId = data.id;
			const status = data.status;

			if (!assetId) {
				return new Response('Missing asset ID', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxTrackId: trackId,
					muxTrackStatus: status,
				})
				.where(eq(videos.muxAssetId, assetId));

			break;
		}

		default:
			break;
	}

	return new Response('Webhook received', { status: 200 });
};
