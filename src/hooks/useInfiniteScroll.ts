import { useEffect, useRef } from "react";

export default function useInfiniteScroll(
  hasNextPage: boolean,
  fetchNextPage: () => void
) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return observerRef;
}
