
export async function doRequest(route, params, timout = 5000) {
    const baseUrl = 'http://127.0.0.1:7001'
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const res = await Promise.race([fetch(`${baseUrl}${route}`, {
        method: "POST",
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(params)
    }), new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('timemout')
        }, timout)
    })])
    if( res.status !== 200 ){
        throw new Error('网络错误');
    }
    return res.json();

} 