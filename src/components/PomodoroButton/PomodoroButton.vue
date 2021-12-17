<template>
  <button class="pomodoro-btn">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: Boolean,
  },
};
</script>

<style lang="postcss" scoped>
.pomodoro-btn {
  display: inline-flex;
  place-items: center;

  background-color: transparent;
  color: var(--clr-surface-text);

  letter-spacing: 0.6em;
  text-indent: 0.6em;

  border: 0;
  border-radius: 1ex;

  cursor: pointer;
  text-transform: uppercase;
  padding-block: var(--spacing-m);
  padding-inline: var(--spacing-sm);

  &:hover {
    background-color: var(--clr-surface-text);
    color: var(--clr-surface);
  }
}
</style>
