<template>
  <main>
    <Timer />
  </main>
</template>

<script>
import Timer from "./components/Timer/Timer.vue";
export default {
  components: { Timer },
};
</script>

<style lang="postcss">
@import "/src/styles/abstracts/font-face.css";
@import "/src/styles/base/reset.css";
@import "/src/styles/base/root.css";
</style>

<style lang="postcss" scoped>
main {
  display: grid;
  align-content: center;

  max-inline-size: 30rem;
  min-block-size: 100%;

  padding-inline: var(--spacing-m);
  margin: 0 auto;
}
</style>
