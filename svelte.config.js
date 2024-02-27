import sveltePreprocess from 'svelte-preprocess';

const contentReplacer = ( args ) => {
  global.zPlaceholderReplacer && { code: global.zPlaceholderReplacer(args.content) };
}

export default {
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
