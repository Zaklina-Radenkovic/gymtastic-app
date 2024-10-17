'use client';

import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: { target: any }) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
