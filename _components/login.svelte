<form on:submit|preventDefault={handleSubmit} name="loginRegister">
	
	{#if isLoading}
		Submitting..
	{:else}
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" bind:value={email}/>
		<br/>
		{#if mode===LOGIN || mode==REGISTER}
			<label for="password">Password:</label>
			<input type="password" name="password" id="password" bind:value={password}/>
			<br/>
		{/if}
		{#if mode===REGISTER}
			<label for="password2">Retype Password:</label>
			<input type="password" name="password2" id="password2" bind:value={password2}/>
			<br/>
		{/if}
		<button on:click|preventDefault={handleSubmit}>{mode}</button>
		{#if mode!==LOGIN}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			or <span class="link" on:click|preventDefault={() => mode=LOGIN}> {LOGIN} </span>
		{/if}
		{#if mode!==REGISTER}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			or <span class="link" on:click|preventDefault={() => mode=REGISTER}> {REGISTER} </span>
		{/if}
		{#if mode!==FORGOT}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			or <span class="link" on:click|preventDefault={() => mode=FORGOT}> {FORGOT} </span>
		{/if}
		
		{#if lastError}
			<div class="error">{lastError}</div>
		{/if}
	{/if}
</form>

<script>
  export let user;
  
  // enums
  const LOGIN = 'Log In'
  const REGISTER = 'Register'
  const FORGOT = 'Forgot Password'
  
  // local state
  let mode = LOGIN;
  let isLoading = false;
  let lastError = '';
  
  // input form
  let email = '';
  let password = '';
  let password2 = '';
  
  const axios = require( 'axios' ).default;
  
  function handleSubmit() {
    lastError = '';
    let endpoint = '/register'
    let data = {
      email: email, password: password
    }
    if( mode===REGISTER ) {
      if( password!==password2 ) {
        lastError = 'password does not match';
        return
      }
    } else if( mode===LOGIN ) {
      endpoint = '/login'
    } else if( mode===FORGOT ) {
      endpoint = '/forgot'
      data = {
        email: email,
      }
    }
    axios.post( endpoint, data ).then( ( resp ) => {
      console.log( resp )
      let data = resp.data || {};
      if( !setLastError( data.error || '' ) && mode===LOGIN ) {
        user = data.user
      }
    } ).catch( setLastError )
  }
  
  function setLastError( err ) {
    lastError = err
    return err;
  }

</script>

<style>
    form {
        width       : 500px;
        margin      : 0 auto;
        text-align  : center;
        font-family : sans-serif;
    }

    form label {
        display       : block;
        margin-bottom : 0.5em;
        font-weight   : bold;
        font-size     : 1.2em;
        text-align    : left;
    }

    form input[type="email"],
    form input[type="password"] {
        width         : 100%;
        padding       : 0.2em;
        border        : 1px solid #CCC;
        border-radius : 4px;
        box-sizing    : border-box;
        font-size     : 1em;
        margin-bottom : 1em;
    }

    form input:focus {
        border : 1px solid #4CAF50;
    }

    form button {
        background-color : #4CAF50;
        color            : white;
        padding          : 0.2em 0.5em;
        border           : none;
        border-radius    : 4px;
        cursor           : pointer;
        font-size        : 1em;
    }

    form button:hover {
        background-color : #45A049;
    }

    form .error {
        color     : red;
        font-size : 0.8em;
    }

    form span.link {
        text-decoration : underline;
        color           : blue;
        cursor          : pointer;
    }

</style>