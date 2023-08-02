<script>
  // should generate index.html
  import Button from './_components/button.svelte'
  import Links from './_components/links.svelte'
  
  let a = '#{a}'
  let b = {/* b */};
  let c = [/* c */];
  let d = '/*! d */';
</script>

{a}, {b}, {c}, {d}
<Button title="something"></Button>
<Links></Links>
