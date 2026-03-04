## Automatic Configuration (Recommended)

Configure your app automatically by running the [Sentry wizard](https://docs.sentry.io/platforms/javascript/guides/nextjs/#install) in the root of your project.

```bash
bunx @sentry/wizard@latest -i nextjs --saas --org piotr-szaran --project javascript-nextjs
```

## Verify

Start your development server and visit `/sentry-example-page` if you have set it up. Click the button to trigger a test error.

Or, trigger a sample error by calling a function that does not exist somewhere in your application.

```javascript
myUndefinedFunction();
```

If you see an issue in your Sentry Issues, you have successfully set up Sentry with Next.js.