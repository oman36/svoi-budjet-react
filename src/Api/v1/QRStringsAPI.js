import {entrypoint, buildIncludes, post, get} from '../API';

export const QRStringsAPI = {
    all: function (params) {
        const url = new URL('v1/qr_strings', entrypoint);
        if ('offset' in params) {
            url.searchParams.append('offset', params.offset);
        }
        if ('limit' in params) {
            url.searchParams.append('limit', params.limit);
        }
        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        if ('sort_by' in params) {
            url.searchParams.append('sort_by', params.sort_by)
        }
        return get(url);
    },
    post: function (data) {
        return post(`${entrypoint}v1/qr_strings`, data)
    }
};