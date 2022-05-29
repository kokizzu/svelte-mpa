<script lang="ts">
	import {APIs,LastUpdatedAt} from "../api";
	
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
		<span style="white-space: pre;">  
			{JSON.stringify( prop, null, 3 )}
		</span>
	{/each}


</main>

<style global windi:global windi:preflights windi:safelist>
    :root {
        font-family : -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align : center;
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

        p {
            max-width : none;
        }
    }
</style>
