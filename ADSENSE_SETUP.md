# AdSense launch checklist

The codebase is prepared for AdSense, but approval and ad serving require a real publisher account, a live owned domain and final account-side privacy configuration.

## 1. Configure the publisher ID

Use the publisher ID shown in AdSense:

```bash
python3 scripts/configure_adsense.py ca-pub-0000000000000000
```

For the reserved responsive placement below the map, also pass the numeric ad-slot ID:

```bash
python3 scripts/configure_adsense.py ca-pub-0000000000000000 1234567890
```

The command enables `adsense-config.js` and writes the matching authorised-seller line to `ads.txt`. Never deploy another publisher’s ID or click live ads during testing.

## 2. Publish the complete site

Deploy every HTML page, stylesheet, script, data file, vendor file, `robots.txt` and `ads.txt` at the same public origin. The site must be reachable without a password and must not block the AdSense crawler. For Vercel-specific settings, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## 3. Configure consent

In AdSense, open **Privacy & messaging** and configure Google’s CMP or another Google-certified CMP. A certified TCF-integrated CMP is required for personalised ads served to users in the EEA, the UK and Switzerland. The local site intentionally does not imitate a certified consent platform.

## 4. Verify the public URLs

- `/` loads the route planner and explanatory content.
- `/about`, `/privacy` and `/terms` are linked from the primary navigation.
- `/ads.txt` displays the publisher’s real `pub-` line.
- The AdSense script URL contains the same `ca-pub-` ID.
- The map and station planner remain usable at desktop and mobile widths.
- No ad overlaps navigation, map controls or planner actions.

## 5. Request review

Add the live domain under **Sites** in AdSense, choose a verification method, confirm the CMP option and request review. Approval is Google’s decision; technical readiness cannot guarantee approval.

Official references:

- [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263)
- [Make sure your pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Ads.txt guide](https://support.google.com/adsense/answer/12171612)
- [Required privacy content](https://support.google.com/adsense/answer/1348695)
- [Google CMP requirements for publishers](https://support.google.com/adsense/answer/13554116)
