import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const activeHttpReqs = useRef([]);

    const sendRequest = useCallback(async ({ endpoint, method, requestData = null }) => {
        setLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpReqs.current.push(httpAbortCtrl);

        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };

            const config = {
                headers,
                method,
                signal: httpAbortCtrl.signal,
                // credentials: 'include', // Include credentials (eg. cookies) for the request
            };

            if (method === 'POST') {
                config.body = JSON.stringify(requestData);
            } else {
                config.headers = requestData != null ? requestData : headers;
            }

            const response = await fetch(`${apiUrl}${endpoint}`, config);
            // Parse the response body
            const responseData = await response.json();
            //console.info(response);
            //console.info(responseData);

            // Remove abortCtrl from the array of controllers once the req completes
            activeHttpReqs.current = activeHttpReqs.current.filter(
                (reqCtrl) => reqCtrl !== httpAbortCtrl
            );

            if (response.ok) {
                // Return a successful response with data
                return { status: 'success', data: responseData };
            } else {
                // Return an error response with the error message
                return { status: 'error', error: responseData.error || 'Request failed' };
            }
        } catch (err) {
            // Return an error response with the error message
            return { status: 'error', error: 'An error occurred during the request' };
        } finally {
            // Ensure loading state is always set to false
            setLoading(false);
        }
    }, []);

    // cleanup logic to cancel ongoing requests on unmount
    useEffect(() => {
        return () => {
            activeHttpReqs.current.forEach(controller => controller.abort());
        };
    }, [sendRequest]);

    return { loading, sendRequest };
};

export default useHttpClient;
