import { PostHog } from 'posthog-node';

const POSTHOG_KEY = process.env.POSTHOG_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://us.i.posthog.com';

if (!POSTHOG_KEY) {
  console.warn('POSTHOG_KEY not set - PostHog tracking disabled');
}

export const posthog = POSTHOG_KEY
  ? new PostHog(POSTHOG_KEY, { host: POSTHOG_HOST })
  : null;

type GitHubStarEvent = {
  distinctId: string;
  user: string;
  userId: number;
  userUrl: string;
  avatar: string;
  repository: string;
  starredAt: string;
};

export const captureGitHubStar = async (event: GitHubStarEvent) => {
  if (!posthog) {
    console.info('PostHog disabled - skipping event capture');
    return;
  }

  posthog.capture({
    distinctId: event.distinctId,
    event: 'github:star',
    properties: {
      repository: event.repository,
      starred_at: event.starredAt,
      user: event.user,
      user_id: event.userId,
      user_url: event.userUrl,
      avatar: event.avatar,
    },
  });

  // Flush to ensure event is sent (important for short-lived processes)
  await posthog.flush();

  console.info('📊 PostHog event captured');
};
