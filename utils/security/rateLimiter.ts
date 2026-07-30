interface RateLimitTracker {
	count: number;
	resetTime: number;
}

const trackerStore = new Map<string, RateLimitTracker>();

export const rateLimiter = (identifier: string, maxRequests = 10, windowMs = 60 * 1000): { isRateLimited: boolean; remaining: number } => {
	const now = Date.now();
	const tracker = trackerStore.get(identifier);

	if (!tracker || now > tracker.resetTime) {
		trackerStore.set(identifier, { count: 1, resetTime: now + windowMs });
		return { isRateLimited: false, remaining: maxRequests - 1 };
	}

	if (tracker.count >= maxRequests) {
		return { isRateLimited: true, remaining: 0 };
	}

	tracker.count += 1;
	return { isRateLimited: false, remaining: maxRequests - tracker.count };
};
