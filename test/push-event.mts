import { hatchet } from '../clients.js';

await hatchet.events.push('github:star:created', {
  action: 'created',
  starred_at: new Date().toISOString(),
  sender: {
    id: 1337,
    login: 'literally-andrei',
    url: 'https://api.github.com/users/test-user',
    html_url: 'https://github.com/test-user',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  },
  repository: {
    name: 'test-repo',
    full_name: 'org/test-repo',
    html_url: 'https://github.com/org/test-repo',
  },
});

console.info('✅ Event pushed!');
