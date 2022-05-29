const sveltePreprocess = require('svelte-preprocess');
const { windi } = require('svelte-windicss-preprocess');

module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    windi({
      plugins: [require('windicss/plugin/forms')],
    }),
    sveltePreprocess(),
  ],
};
