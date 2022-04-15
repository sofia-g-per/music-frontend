<template>
  <div id="nav">
    <!-- <router-link to="/">Login</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view/>
</template>

<style>
  /* ------------------------------ */
  /* VARIABLES */
  /* ------------------------------ */
  :root{
    --bg-color: black;
    --font-color: white;
    --accent-color-1: rgb(147, 0, 201);
    --accent-color-2: rgb(255, 0, 81);

    --main-font-family: sans-serif;
  }
  /* ------------------------------ */
  /* GENERAL */
  /* ------------------------------ */
  body{
    background-color: var(--bg-color);
    color: var(--font-color);
    font-family: var(--main-font-family);
    box-sizing: border-box;
  }

  *{
    margin: 0;
  }

  /* ------------------------------ */
  /* TEXT */
  /* ------------------------------ */
  .section-heading{

  }
  
  /* ------------------------------ */
  /* CONTAINERS */
  /* ------------------------------ */
  .container--2-clmn{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
