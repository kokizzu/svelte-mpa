<script lang="ts">
	import {APIs,LastUpdatedAt} from "./api";
	let apis = []
	
	for (let z in APIs) {
		let prop = APIs[z];
		apis.push({route: z, prop: prop})
	}

</script>

<main>
	<h1>API List {new Date(LastUpdatedAt*1000)}</h1>
	
	{#each apis as { route, prop }}
		<a href="/api/{route}">{route}</a>
		<br/>
		<pre>
			{JSON.stringify( prop, null, 3 )}
		</pre>
	{/each}


</main>

<style>
    :root {
        font-family : -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    pre {
        /*white-space : pre-line;*/
        /*white-space : pre-wrap;*/
	     border: 1px solid gray;
    }

    main {
        text-align : left;
        padding    : 1em;
        margin     : 0 auto;
    }

    h1 {
        color          : #FF3E00;
        text-transform : uppercase;
        font-size      : 4rem;
        font-weight    : 100;
        line-height    : 1.1;
        margin         : 2rem auto;
        max-width      : 14rem;
    }


    @media (min-width : 480px) {
        h1 {
            max-width : none;
        }
    }
</style>
