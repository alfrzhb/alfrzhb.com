# Cloudflare Pages

This project is a static React/Vite application. A `dist/index.html` build plus static assets is all that Pages needs. No Functions, database, secret, or Workers runtime is required.

## Git integration

1. Put this source in the intended GitHub repository.
2. In Cloudflare, create a Pages project and connect that repository.
3. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | repository root |
| Node version | `22` |

4. Review the generated `pages.dev` URL before attaching a custom domain.
5. Attach `alfrzhb.com` only when you intend to replace the existing portfolio deployment. This implementation has not changed the current domain.

## Direct upload

Run `npm ci` and `npm run build`. Upload the **contents of `dist`**, or the supplied `alfrzhb-cloudflare-pages.zip`, through Cloudflare Pages Direct Upload.

If your own shell is already authenticated with Cloudflare, an alternative is:

```sh
npx wrangler pages deploy dist --project-name <your-pages-project>
```

The command above is an instruction for your authenticated environment, not evidence that a deployment was performed here.

## Preview before publishing

`npm run preview` serves the production build locally. The separate standalone `alfrzhb-preview.html` is for convenient review and is not the deployment artifact.

All page navigation uses section anchors, so no custom SPA redirects are required. Cloudflare copies `_headers` from `public` into `dist` during the build.

Verified against the official [React Pages guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), and [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/) on 2 October 2026.
