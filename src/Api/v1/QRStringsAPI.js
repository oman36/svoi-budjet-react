import {entrypoint, buildIncludes, post, get, patch, del} from '../API';

export const QRStringsAPI = {
    all: function (params) {
        const url = new URL('v1/qr_strings', entrypoint);

        [
            'offset',
            'limit',
            'sort_by',
        ].forEach((key) => {
            if (key in params) url.searchParams.append(key, params[key])
        });

        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
    post: function (data) {
        return post(`${entrypoint}v1/qr_strings`, data)
    },
    patch: function (data) {
        return patch(`${entrypoint}v1/qr_strings`, data)
    },
    delete: function (id) {
        return del(`${entrypoint}v1/qr_strings/${id}`, {})
    }
};