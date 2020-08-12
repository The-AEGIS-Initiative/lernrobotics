/** Controls and Manages client-server interactions
 * @module components/HttpController
 * @requires axios
 */

import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = false;

/**
 * Custom Hook to GET data from API
 * @memberof module:components/HttpController
 * @param {string} url API endpoint path relative to http://localhost:8000/
 * @return {object} {response, loading flag, error}
 * @example <caption>Example usage of useGetData</caption>
 * function GetTest(){
 *   const {res, loading, e} = useGetData("example/database/get");
 *
 *   return (
 *     <>
 *       {res && <p>{res}</p>}
 *       {loading && <p>{loading}</p>}
 *       {e && <p>{e}</p>}
 *     </>
 *   );
 * }
 */
export function useGetData(url) {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setRes(JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((e) => {
        setError(JSON.stringify(e));
      });
  }, [url]);

  return { res, loading, error };
}

export function postData(url, data, callback) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }, // , credentials: 'include'
  })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      // Log errors
      console.error(err);
      alert("POST error, please try again");
    });
}

export function getData(url, callback) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Prevent using cache with out of date response
      "Cache-Control": "no-cache",
    }, // , credentials: 'include'
  })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      // Log errors
      console.error(err);
      alert("GET error, please try again");
    });
}
