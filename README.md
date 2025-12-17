# GitHub Stars Tracker with Hatchet & PostHog

Track GitHub stars in real-time using [Hatchet](https://hatchet.run) webhooks and capture analytics in [PostHog](https://posthog.com).

```
GitHub Star Event → Hatchet Webhook → Worker → PostHog Analytics
```

## Features

- Automatically tracks when someone stars your GitHub repo
- Captures star events in PostHog for analytics
- Real-time processing via Hatchet's event-driven architecture
- Docker-ready for cloud deployment

## Prerequisites

- Node.js 20+
- [Hatchet Cloud](https://cloud.onhatchet.run) account (or self-hosted)
- [PostHog](https://posthog.com) account
- GitHub repository to track

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file:

```env
# Hatchet (required)
HATCHET_CLIENT_TOKEN=your-hatchet-token

# PostHog (required)
POSTHOG_KEY=phc_your-posthog-project-api-key
POSTHOG_HOST=https://us.i.posthog.com  # or https://eu.i.posthog.com for EU
```

### 3. Run locally

```bash
npm run dev
```

### 4. Test with a sample event

In a separate terminal:

```bash
npm run test:push
```

## Setup Guide

### Hatchet Webhook Configuration

1. Go to **Hatchet Dashboard** → **Webhooks** → **Create Webhook**

2. Configure the webhook:
   | Field | Value |
   |-------|-------|
   | **Name** | `github-stars` |
   | **Source** | `GitHub` |
   | **Event Key Expression** | `'github:' + headers['x-github-event'] + ':' + input.action` |
   | **Secret** | Your chosen webhook secret |

3. Copy the generated **Webhook URL**

### GitHub Webhook Configuration

1. Go to your GitHub repo → **Settings** → **Webhooks** → **Add webhook**

2. Configure:
   | Field | Value |
   |-------|-------|
   | **Payload URL** | Webhook URL from Hatchet |
   | **Content type** | `application/json` |
   | **Secret** | Same secret from Hatchet webhook |
   | **Events** | Select "Stars" under "Let me select individual events" |

3. Click **Add webhook**

### PostHog Setup

1. Get your **Project API Key** from PostHog:
   - Go to **Settings** → **Project** → **Project API Key**
   - Key should start with `phc_`

2. Add it to your `.env` as `POSTHOG_KEY`

## Deployment

### Hatchet Managed Compute (Recommended)

1. Push your code to GitHub
2. Go to **Hatchet Dashboard** → **Settings** → **Managed Compute**
3. Connect your GitHub repository
4. Configure environment variables in Hatchet
5. Deploy!

## How It Works

1. **GitHub** sends a webhook when someone stars your repo
2. **Hatchet** receives the webhook and converts it to an event using the Event Key Expression (`github:star:created`)
3. Your **Worker** listens for `github:star:created` events and processes them
4. **PostHog** captures the event with user details for analytics

## PostHog Event Properties

Each "GitHub Star" event in PostHog includes:

| Property     | Description                         |
| ------------ | ----------------------------------- |
| `repository` | Full repo name (e.g., `owner/repo`) |
| `starred_at` | ISO timestamp of the star           |
| `user`       | GitHub username                     |
| `user_id`    | GitHub user ID                      |
| `user_url`   | GitHub API URL for user             |
| `avatar`     | User's avatar URL                   |

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start worker in development mode |
| `npm run build`     | Compile TypeScript               |
| `npm run start`     | Run compiled worker              |
| `npm run test:push` | Push a test event                |

## Local Development Tips

- **Event debugging**: Check **Hatchet Dashboard** → **Runs** to see processed events
- **PostHog debugging**: Check **Activity** → **Live events** for real-time event tracking
