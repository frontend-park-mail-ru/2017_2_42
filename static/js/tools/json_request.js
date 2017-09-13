export const METHOD_POST = 'POST';
export const METHOD_GET = 'GET';

/**
 * Request function
 * @param method http request method
 * @param path request to this path
 * @param jsonObject json object to transfer
 * @param callback(respStatus, respBody) with arguments of response status and response body
 */
export const json_request = (method, path, jsonObject, callback) => {

    if (method !== METHOD_POST && method !== METHOD_GET ||
        typeof path !== "string" ||
        typeof jsonObject !== "object" ||
        typeof callback !== "function") {
        return;
    }


    let jsonString;
    try {
        jsonString = JSON.stringify(jsonObject);
    }
    catch (err) {
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open(method, path, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        callback(xhr.status, xhr.responseText);
    };

    xhr.send(jsonString);
};
