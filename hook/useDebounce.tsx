import { useEffect, useState } from "react";

/**
 * Return a string for the input of the search bar.
 * Debounce Function has been implemented to
 * make Search Bar works in an optimized way.
 * Uses time limit before sending the request while
 * writing on the Search Bar to post only relevant requests.
 * @param value the characters that are written on the search bar
 * @param delay the time limit for the waiting time
 * @returns the searchable string which passes the time limit
 */
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;