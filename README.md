# Package JSON Trails

Scan a `package.json` and see which dependencies have major, minor, or patch updates available.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:4000](http://localhost:4000).

You can paste or upload a `package.json`, include `devDependencies`, search and filter the results, download a report, or open it in your email app.

## Build

```bash
npm run build
```

## Next

- Send reports directly from the webpage through a secure email service.
- Create a polished HTML email template with update summaries, severity colors, and package links.
- Add a `How to fix` action for each outdated package that generates an upgrade plan with the recommended command, risk level, and affected version.