<script>
  // should generate page1/subpage3/index.html from outer _layout.html
  import Row from '../../_components/row.svelte';

  export let list = [/* from_server */]; // this comment should not be deleted
  export let str = '#{from_server2}';

  if (!list.length) {
    list = [
      ['A', 1],
      ['B', 2],
      ['C', 3],
    ];
  }
</script>

<div>
  <p>{str}</p>
  <table>
    <thead>
      <tr>
        <th>Col1</th>
        <th>Col2</th>
      </tr>
    </thead>
    <tbody>
      {#each list as row}
        <Row cells={row} />
      {/each}
    </tbody>
  </table>
</div>

<style>
  p {
    font-size: 20px;
    color: red;
    background: red;
  }
</style>
