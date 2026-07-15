# Cave Explorer 3D 🕯️👹

A first-person 3D cave game (Three.js). Collect the glowing gems and escape the
exit portal — while a monster hunts you through the maze. Installable as a PWA.

## Files
| File | Purpose |
|------|---------|
| `index.html` | The whole game |
| `manifest.webmanifest` | PWA metadata (name, icons, fullscreen, landscape) |
| `sw.js` | Service worker — offline caching + installability |
| `icons/` | App icons (180 for iOS, 192, 512) |
| `.nojekyll` | Serve files as-is on GitHub Pages |

> The 3D engine (Three.js) loads from a CDN. The service worker caches it on your
> first **online** visit, so after that the installed app works offline.

## Deploy to GitHub Pages
1. Create a repo and push this folder's contents:
   ```bash
   git init
   git add .
   git commit -m "Cave Explorer 3D PWA"
   git branch -M main
   git remote add origin https://github.com/<you>/cave3d.git
   git push -u origin main
   ```
2. GitHub → **Settings → Pages → Deploy from a branch → `main` / root** → Save.
3. Live in ~1 min at `https://<you>.github.io/cave3d/`.

All paths are **relative**, so it works at a domain root or a `/repo/` subpath.

## Install on iPhone (iOS Safari)
PWAs on iOS install through Safari's Share menu (not an install prompt):
1. Open the Pages URL **in Safari** (must be Safari, not Chrome, for install).
2. Wait a few seconds so the service worker caches the game (do this while online).
3. Tap the **Share** button (□↑) → scroll down → **Add to Home Screen** → **Add**.
4. Launch it from the home-screen icon — it opens **fullscreen**, and works offline.

Tip: on the game's first screen choose **📱 Phone / Tablet** to get the joystick,
and hold the phone in **landscape**.

## Updating
After editing `index.html` or assets, bump the version in `sw.js`:
```js
const CACHE_VERSION = 'cave3d-v2';   // was v1
```
Commit & push — clients pick up the new version on their next visit.
