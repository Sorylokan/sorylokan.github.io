# Easy Multiple Screenshots

A single-file, no-install tool to repeatedly capture the **same fixed zone**
of your screen — handy when you want to scroll through a page (or any
window) and save successive chunks without redefining the capture area
every time.

Runs entirely client-side. Nothing is uploaded anywhere.

## Try it

Open `index.html` in your browser, or, once this is on GitHub Pages, just
visit the published URL.

**Supported browsers:** any **Chromium-based** browser — Chrome, Edge,
Opera / Opera GX, Brave, Vivaldi, etc. Firefox and Safari don't yet support
direct folder access (`showDirectoryPicker`), so the destination-folder
step won't work there.

## How it works

1. **Share screen** — pick the screen, window, or tab you want to capture.
2. **Draw the zone** by dragging on the preview. Once it exists, you can
   fine-tune it any time: drag the **corner/edge handles** to resize, or
   drag **inside** it to move it — no need to redraw from scratch.
3. **Choose folder** — grant access to a local folder via the browser's
   native picker.
4. Click **Capture** (or press **F4** while this tab is focused) every time
   you want to save what's currently in the zone.
5. Scroll, switch back to this tab, capture again — files are saved as
   `capture_001.png`, `capture_002.png`, etc., automatically numbered.

## Notes

- The **F4** shortcut only fires while this browser tab has focus — a web
  page can't listen for global hotkeys across other windows. Switch back to
  the tab (Alt+Tab / click) before pressing it.
- If you share a **tab** instead of the whole screen, only that tab's
  content is captured — useful when you only want to capture one web page.
- If you share the entire screen and the zone overlaps this tool's own
  window, the tool will appear in the screenshot — share just the target
  window/tab instead to avoid that.
- On HTTPS (e.g. once hosted on GitHub Pages), screen capture and folder
  access work reliably out of the box — no extra setup needed.

## Deploying to GitHub Pages

1. Push `index.html` (and this `README.md`) to a repository.
2. In the repo settings, enable **Pages** → deploy from the `main` branch,
   root folder.
3. Your tool will be live at `https://<username>.github.io/<repo>/`.
