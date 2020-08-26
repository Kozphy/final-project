<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans TC', sans-serif;
}
@import '@/assets/scss/component/tailwindcss';
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
html {
  overflow: -moz-hidden-unscrollable;
  height: 100%;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  height: 100%;
  width: 100vw;
  width: calc(100vw + 18px);
  overflow: auto;
}
</style>
