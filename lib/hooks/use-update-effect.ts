import { useEffect, useRef } from 'react';

/**
 * A useEffect that skips the initial render (mount) and only runs on updates.
 * Keeps a ref to the latest effect callback so that identity changes of the callback
 * don't trigger the effect unless one of the dependencies in `deps` changes.
 */
export function useUpdateEffect(effect: () => void, deps: React.DependencyList) {
  const isMounted = useRef(false);
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return effectRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
