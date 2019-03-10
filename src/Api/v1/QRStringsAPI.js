import {entrypoint, buildIncludes, post, get, patch, del, sendFiles} from '../API';

export const QRStringsAPI = {
    one: function (id, params) {
        params = params || {};
        const url = new URL(`v1/qr_strings/${id}`, entrypoint);

        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
    all: function (params) {
        params = params || {};
        const url = new URL('v1/qr_strings', entrypoint);

        [
            'offset',
            'limit',
            'with_check',
            'is_valid',
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
    patch: function (id, data) {
        return patch(`${entrypoint}v1/qr_strings/${id}`, data)
    },
    delete: function (id) {
        return del(`${entrypoint}v1/qr_strings/${id}`, {})
    },
    get_images: function (id, params) {
        params = params || {};
        const url = new URL(`v1/qr_strings/${id}/images`, entrypoint);

        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
    post_images: function (id, data) {
        const url = new URL(`v1/qr_strings/${id}/images`, entrypoint);
        return sendFiles(url, data, 'POST');
    },
    delete_images: function (id, data) {
        const url = new URL(`v1/qr_strings/${id}/images`, entrypoint);
        return del(url, data);
    },
    delete_image: function (link,  data) {
        return del(link, data);
    },
};