/**
 * The App Router runs React's canary build, where `<ViewTransition>` lives.
 * The published @types/react ship those declarations in a separate entry that
 * is not part of the default type surface — this reference pulls it in so the
 * page-transition wrapper typechecks against the runtime we actually get.
 */
/// <reference types="react/canary" />
