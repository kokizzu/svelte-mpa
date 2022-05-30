const sveltePreprocess = require('svelte-preprocess');
const { windi } = require('svelte-windicss-preprocess');
const { writeFileSync } = require('fs');

const contentReplacer = args => global.zPlaceholderReplacer && { code: global.zPlaceholderReplacer(args.content) };

module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    windi({
      plugins: [require('windicss/plugin/forms')],
    }),
    sveltePreprocess(),
    {
      style: contentReplacer,
      script: contentReplacer,
    },
  ],
  cache: false,
  compilerOptions: { preserveComments: true },
};
