import { ViewTransition, type ReactNode } from 'react';

/**
 * Wraps a route's content so navigating between pages cross-dissolves
 * instead of cutting. React drives the browser's View Transitions API here;
 * the keyframes live in globals.css under the `page` class.
 *
 * Uses `default` rather than an `enter`/`exit` pair on purpose. Every route
 * renders this boundary at the same position under the same root layout, so
 * React reconciles the two as one *updating* boundary — it never sees a
 * mount or an unmount, and an enter/exit pair silently never fires (verified:
 * `document.startViewTransition` was not called at all with that shape).
 * `default` covers the update case, which is the one that actually happens.
 *
 * Belongs in every `page.tsx`, never in a layout: a layout persists across
 * navigation, so its subtree would not be the thing that changed. Browsers
 * without the API just swap as before.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition default="page">{children}</ViewTransition>;
}
