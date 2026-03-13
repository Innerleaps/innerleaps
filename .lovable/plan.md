

## Add Apollo.io Website Tracker

**What**: Add the Apollo.io tracking script to the website so you can track visitors coming from cold email campaigns.

**How**: Add the script to `index.html` in the `<head>` section, right before the closing `</head>` tag. This ensures it loads on every page across the site.

**Technical detail**: The script will be added as-is — it loads asynchronously (`async` + `defer`) so it won't impact page load performance. The `appId` `691354c3d2251c00215e6dae` will be hardcoded since it's a public tracking ID (similar to Google Analytics).

**Files changed**:
- `index.html` — add the Apollo.io script in the `<head>`

