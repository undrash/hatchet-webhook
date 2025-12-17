import { hatchet } from '../clients.js';
import { captureGitHubStar } from '../services/posthog.js';

enum GitHubEvent {
  StarCreated = 'github:star:created',
}

type StarCreated = {
  action: 'created';
  starred_at: string;
  sender: {
    id: number;
    login: string;
    url: string;
    html_url: string;
    avatar_url: string;
  };
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
};

export const created = hatchet.task({
  name: 'star',
  onEvents: [GitHubEvent.StarCreated],
  fn: async ({ starred_at, sender, repository }: StarCreated) => {
    console.info('⭐ New star!');
    console.info(`  User: ${sender.login} (ID: ${sender.id})`);
    console.info(`  Profile: ${sender.html_url}`);
    console.info(`  Repository: ${repository.full_name}`);
    console.info(`  Starred at: ${starred_at}`);

    await captureGitHubStar({
      distinctId: sender.login,
      user: sender.login,
      userId: sender.id,
      userUrl: sender.url,
      avatar: sender.avatar_url,
      repository: repository.full_name,
      starredAt: starred_at,
    });
  },
});
