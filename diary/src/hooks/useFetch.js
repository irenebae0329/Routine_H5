import { useEffect, useState } from "react";
export function useFetch(request, params) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const [params, setParams] = useState(params);
    async function doRequest() {
        try {
            setPending(true);
            const res = await request(params);
            setResult(res);
        } catch (err) {
            setError(err);
        }
    }
    useEffect(async () => {
        doRequest(params);
    }, [params])
    return {
        result,
        error,
        pending,
        setParams
    }
}
