

## Update Open Graph Image and Copy

**What**: Replace the placeholder Lovable OG image with your branded InnerLeaps image and update the title/description that appear in social media link previews.

### Changes (single file: `index.html`)

1. **Copy uploaded image** to `public/og-image.png` (must be in public folder for meta tag direct URL reference)
2. **Update OG tags**:
   - `og:title` → "Innerleaps verlaagt verzuim en voorkomt burn-out door vitaliteitstraining"
   - `og:description` → "Een wetenschappelijk onderbouwd vitaliteitprogramma waarin deelnemers hun brein trainen. Ze ontwikkelen een sterkere focus, kunnen stress sneller herkennen en leren technieken om dit te reguleren."
   - `og:image` → `https://innerleaps.nl/og-image.png`
   - Add `og:image:width` (1200) and `og:image:height` (630)
   - Add `og:url` → `https://innerleaps.nl`
   - `twitter:image` → same image URL
   - Add `twitter:title` and `twitter:description` matching the OG values
3. **Update page-level meta** title and description to match the new copy

### After deployment
Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to clear cached previews.

