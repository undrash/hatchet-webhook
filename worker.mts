import { hatchet } from './clients.js';
import { created } from './tasks/created.js';

const worker = await hatchet.worker('github-worker', {
  workflows: [created],
});

await worker.start();
