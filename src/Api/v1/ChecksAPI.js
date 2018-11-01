export const ChecksAPI = {
    all: function (params) {
        const url = new URL('v1/checks', document.location.origin + '/api/');
        if ('offset' in params) {
            url.searchParams.append('offset', params.offset);
        }
        if ('limit' in params) {
            url.searchParams.append('limit', params.limit);
        }
        if ('include' in params) {
            let include;
            if (params.include instanceof Array) {
                include = params.include.map(function (model) {
                    return model instanceof Array ? model.join('.') : model
                }).join(',');
            } else {
                include = params.include
            }
            url.searchParams.append('include', include)
        }
        return fetch(url).then((response => response.json()));
    },
};