const sveltePreprocess = require('svelte-preprocess');

const contentReplacer = args => global.zPlaceholderReplacer && { code: global.zPlaceholderReplacer(args.content) };

module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess(),
    {
      style: contentReplacer,
      script: contentReplacer,
      markup: contentReplacer,
    },
  ],
  cache: false,
  compilerOptions: { preserveComments: true },
};
