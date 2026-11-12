export type CartIndicator = {
  hasItems: boolean;
};

/**
 * Synchronous stand-in until a cart exists.
 * A future cart that reads the request should stay inside its own Suspense boundary.
 */
export function getCartIndicator(): CartIndicator {
  return { hasItems: false };
}
