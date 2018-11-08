export const get = function (url, options) {
    options = options || {};

    options.method = 'GET';

    if (!options.headers) {
        options.headers = {};
    }

    options.headers["Content-Type"] = "application/json; charset=utf-8";
    options.headers["Accept"] = "application/json; charset=utf-8";
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if ((200 <= response.status) && (response.status < 300)) {
                    return response.json().then(resolve);
                } else {
                    return response.text()
                        .then(text => {
                            let result = {
                                text: text,
                                status: response.status,
                            };
                            try {
                                result.json = JSON.parse(text);
                            } catch (e) {
                            }
                            return result;
                        })
                        .then(reject);
                }
            });
    });
};
const sendJsonBody = function (url, data, method) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept":  "application/json; charset=utf-8",
            },
            redirect: "follow",
            body: JSON.stringify(data),
        })
            .then(response => {
                if ((200 <= response.status) && (response.status < 300)) {
                    return response.json().then(resolve);
                } else {
                    return response.text().then(text => {
                        let result = {
                            text: text,
                            status: response.status,
                        };
                        try {
                            result.json = JSON.parse(text);
                        } catch (e) {
                        }
                        return result;
                    }).then(reject);
                }
            });
    });
};

export const post = function (url, data) {
    return sendJsonBody(url, data, 'POST')
};


export const patch = function (url, data) {
    return sendJsonBody(url, data, 'PATCH')
};

export const del = function (url, data) {
    return sendJsonBody(url, data, 'DELETE')
};

export const entrypoint = document.location.origin + '/api/';

export const buildIncludes = function (includes) {
    if (!(includes instanceof Array)) {
        includes = [includes]
    }
    return includes.map(function (model) {
        return model instanceof Array ? model.join('.') : model
    }).join(',');
};