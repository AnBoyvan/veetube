export const formatDuration = (duration: number) => {
	const seconds = Math.floor((duration % 60000) / 1000);
	const minutes = Math.floor((duration % (60000 * 60)) / 60000);
	const hours = Math.floor(duration / (60000 * 60));
	return `${hours > 0 ? `${hours.toString()}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
