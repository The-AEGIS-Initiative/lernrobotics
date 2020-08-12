import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

/**
 * Custom Hook to POST data to API
 * @memberof module:components/HttpController
 * @param {string} url API endpoint path relative to http://localhost:8000/
 * @param {object} data Data object to POST
 * @return {object} {response, loading flag, error}
 * @example <caption>Example usage of usePostData</caption>
 * function PostTest() {
 *   // Call usePostData custom hook
 *   const {res, loading, error} = usePostData("example/database/form", {"name": "KEVIN"});
 *
 *   return (
 *     <>
 *       {res && <p>{res}</p>}
 *       {loading && <p>{loading}</p>}
 *       {error && <p>{error}</p>}
 *     </>
 *   )
 * }
 */
export default function usePostData(url, data) {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post(url, data, { headers })
      .then((res) => {
        setRes(JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((e) => {
        setError(JSON.stringify(e));
      });
  }, [data, headers, url]);

  return { res, loading, error };
}
