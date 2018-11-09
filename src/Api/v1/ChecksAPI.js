import {entrypoint, buildIncludes, get} from '../API';

export const ChecksAPI = {
    all: function (params) {
        const url = new URL('v1/checks', entrypoint);
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
    one: function (id, params) {
        const url = new URL(`v1/checks/${id}`, entrypoint);
        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url)
    },
    items: function (id, params) {
        const url = new URL(`v1/checks/${id}/items`, entrypoint);

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
};