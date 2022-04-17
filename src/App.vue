<template>
  <div class="main-container">
    <div id="nav">
      <router-link to="/">Converter</router-link> |
      <router-link to="/about">Conversion History</router-link>
    </div>
   <keep-alive> 
    <router-view />
   </keep-alive>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  // max-width: 450px;
  margin: 0 auto;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    font-size: 14px;

    &.router-link-exact-active {
      color: #4187dc;
    }
  }
}
</style>
