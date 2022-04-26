<template>
  <div class="container is-fluid">
    <h1>gd</h1>
    <font-awesome-icon icon="fa-solid fa-heart" beat />
    <font-awesome-icon icon="fa-solid fa-circle-info" beat-fade />
    <font-awesome-icon icon="fa-solid fa-basketball" bounce />
    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" fade />
    <font-awesome-icon icon="fa-solid fa-compact-disc" flip />
    <font-awesome-icon icon="fa-solid fa-bell" shake />
    <font-awesome-icon icon="fa-solid fa-cog" spin />
    <font-awesome-icon icon="fa-solid fa-compass" spin spin-reverse />
    <font-awesome-icon icon="fa-solid fa-spinner" spin-pulse />
    <div class="columns is-centered">
      <div class="column is-6">{{ name }}</div>
      <font-awesome-layers full-width class="fa-4x">
        <font-awesome-icon icon="fa-solid fa-envelope" />
        <font-awesome-layers-text counter value="1" position="top-right" />
      </font-awesome-layers>
    </div>
    <font-awesome-layers full-width class="fa-4x">
      <font-awesome-icon icon="fa-solid fa-certificate" inverse />
      <font-awesome-layers-text
        class="gray8"
        transform="down-2 shrink-8"
        value="New!"
      />
    </font-awesome-layers>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      name: "xxxxxx",
    };
  },
};
</script>

<style>
body {
  background-color: aquamarine;
}
</style>
