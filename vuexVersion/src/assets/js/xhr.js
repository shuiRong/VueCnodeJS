var dealParams = param => {
    let result = '';
    for(let [key, value] of Object.entries(param)) {
        result += `${key}=${value}&`
    }
    return result.replace(/&$/, '');
}

class XHR {
    get(url, params) {
        if(params) {
            url = `${url}?${dealParams(params)}`
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
                        // JSON.parse(arr) will be mistaked if arr is undeinfed;
                        if(xhr.responseText) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(`XHR unsuccessful:${xhr.status}`);
                    }
                }
            };
            xhr.open('get', url, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(null);
        });
    }
}

export default new XHR().get
