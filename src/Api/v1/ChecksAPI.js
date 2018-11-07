import {entrypoint, buildIncludes, get} from '../API';

export const ChecksAPI = {
    all: function (params) {
        const url = new URL('v1/checks', entrypoint);
        if ('offset' in params) {
            url.searchParams.append('offset', params.offset);
        }
        if ('limit' in params) {
            url.searchParams.append('limit', params.limit);
        }
        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
    one: function (id, params) {
        const url = new URL(`v1/checks/${id}`, entrypoint);
        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url)
    },
    items: function (id, params) {
        const url = new URL(`v1/checks/${id}/items`, entrypoint);

        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
};