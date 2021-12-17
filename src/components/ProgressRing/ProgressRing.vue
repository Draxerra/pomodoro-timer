<template>
  <div class="progress-ring" />
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  props: {
    percentage: {
      default: 100,
      type: Number,
    },
  },
  setup(props) {
    const { percentage } = toRefs(props);
    const gradientPercentage = computed(() => `${percentage.value}%`);
    const transparentGradientPercentage = computed(() => {
      const perc =
        percentage.value === 0
          ? percentage.value
          : Math.min(percentage.value + 10, 100);
      return `${perc}%`;
    });

    return {
      gradientPercentage,
      transparentGradientPercentage,
    };
  },
};
</script>

<style lang="postcss" scoped>
.progress-ring {
  position: absolute;
  inset: 0;

  border-radius: inherit;
  padding: 10px;

  background-image: conic-gradient(
    from 0.5turn,
    var(--clr-error) v-bind(gradientPercentage),
    transparent v-bind(transparentGradientPercentage)
  );
  mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
  mask-composite: exclude;

  z-index: -1;
}
</style>
