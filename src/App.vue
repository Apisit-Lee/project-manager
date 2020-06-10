<template>
  <div id="app">
    <div id="nav">
      <h2>PM Daily</h2>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div id="page">
      <router-view/>
    </div>
  </div>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  #page {
    flex: 1;
    border-top: 3px double #f8f8f8;
  }
</style>
