// Learn more https://docs.expo.dev/router/reference/static-rendering/#root-html

import { ScrollViewStyleReset } from 'expo-router/html'
import type { PropsWithChildren } from 'react'

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
        <meta content="{app_description}" name="description" />
        <meta content="app-id={itunes_id}" name="apple-itunes-app" />

        {/* Preconnect to known origins for faster resource fetching */}
        {/* <link rel="preconnect" href="https://your-api.com" /> */}
        {/* <link rel="dns-prefetch" href="https://your-api.com" /> */}

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />
      </head>
      <body className="h-full bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
