module.exports = {
    has: (obj, keyName) => {
        return !obj ? false : Object.prototype.hasOwnProperty.call(obj, keyName);
    },

    unlockParams: (query, params) => {
        let unlockedTemplate = query;

        for (const [param] of Object.entries(params)) {
            unlockedTemplate = module.exports.unlockTemplate(unlockedTemplate, param);
        }

        return unlockedTemplate;
    },

    unlockTemplate: (query, templateName) => {
        const pattern = new RegExp(`/\\*\s*${templateName}:([^\*]*)\\*/`, 'gm');
        return query.replace(pattern, '$1');
    },

    getPreparedQuery: (query, params) => {
        const values = [];

        let text = module.exports.unlockParams(query, params);

        return text.replace(/\:(\w+)/g, (text, placeholder) => {
            if (module.exports.has(params, placeholder)) {
                const array = Array.isArray(params[placeholder]) && params[placeholder].join() || params[placeholder];
                const value = typeof params[placeholder] === 'string' && `'${params[placeholder]}'` ||
                    typeof params[placeholder] === 'number' && params[placeholder] ||
                    typeof params[placeholder] === 'object' && !Array.isArray(params[placeholder]) && `'${JSON.stringify(params[placeholder])}'` ||
                    Array.isArray(params[placeholder]) && `'{${array}}'` ||
                    params[placeholder];
                values.push(params[placeholder]);
                return `${value}`;
            }
            return text;
        }).trim();
    },

};