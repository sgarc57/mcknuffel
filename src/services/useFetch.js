import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [state, setState] = useState({ data: [], isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState({ data, isLoading: false });
      } catch (error) {
        console.error("This page could not be loaded.", error);
      }
    };
    fetchData();
  }, [url]);

  return state;
}
