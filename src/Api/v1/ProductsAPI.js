import {entrypoint, buildIncludes, get} from '../API';

export const ProductsAPI = {
    all: function (params) {
        const url = new URL('v1/products', entrypoint);
        [
            'offset',
            'limit',
            'sort_by',
            'name_contains'
        ].forEach((key) => {
            if (key in params) url.searchParams.append(key, params[key])
        });

        if ('include' in params) {
            url.searchParams.append('include', buildIncludes(params.include))
        }
        return get(url);
    },
    items: function (id, params) {
        const url = new URL(`v1/products/${id}/items`, entrypoint);
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