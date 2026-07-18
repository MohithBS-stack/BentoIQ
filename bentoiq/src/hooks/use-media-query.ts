import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    
    // Check initially without calling setMatches unless it differs to avoid strict-mode warnings
    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", handler);
    
    return () => mediaQueryList.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
