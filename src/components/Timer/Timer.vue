<template>
  <section class="timer">
    <h1 class="sr-only">Pomodoro Timer</h1>
    <p class="sr-only">
      {{ minutes }} minutes and {{ seconds }} seconds remaining.
    </p>
    <ProgressRing :percentage="percentage" />
    <time
      class="timer__text clr-surface-text"
      role="timer"
      :datetime="`PT0H${minutes}M${seconds}S`"
      aria-hidden="true"
    >
      {{ minutes }}:{{ padSeconds(seconds) }}
    </time>
    <div class="timer__actions" role="group">
      <PomodoroButton
        :aria-label="started ? 'Stop Timer' : 'Start Timer'"
        class="clr-surface-text"
        @click="started ? onStopTime() : onStartTime()"
      >
        {{ started ? "Stop" : "Start" }}
      </PomodoroButton>
      <PomodoroButton aria-label="Edit Time">
        <SettingsIcon />
      </PomodoroButton>
    </div>
  </section>
</template>

<script>
import CheckIcon from "../CheckIcon/CheckIcon.vue";
import PomodoroButton from "../PomodoroButton/PomodoroButton.vue";
import ProgressRing from "../ProgressRing/ProgressRing.vue";
import SettingsIcon from "../SettingsIcon/SettingsIcon.vue";

import { computed, ref } from "vue";

export default {
  components: { CheckIcon, PomodoroButton, ProgressRing, SettingsIcon },
  setup() {
    const originalTime = 10;
    const started = ref(false);
    const time = ref(originalTime);
    const timeout = ref(0);

    const minutes = computed(() => ~~(time.value / 60).toString());
    const seconds = computed(() => time.value % 60);
    const percentage = computed(() => (time.value / originalTime) * 100);
    const isZero = computed(() => time.value === 0);

    const padSeconds = (num) => {
      return (new Array(3).join("0") + num).slice(-2);
    };

    const onStartTime = () => {
      if (isZero.value) {
        time.value = originalTime;
      }

      timeout.value = setInterval(() => {
        if (isZero.value) {
          onStopTime();
        } else {
          time.value -= 1;
        }
      }, 1000);

      started.value = true;
    };

    const onStopTime = () => {
      clearTimeout(timeout.value);
      started.value = false;
    };

    return {
      minutes,
      seconds,
      percentage,
      started,

      padSeconds,
      onStartTime,
      onStopTime,
    };
  },
};
</script>

<style lang="postcss" scoped>
@import "/src/styles/utilities/screen-reader.css";
@import "/src/styles/utilities/surface.css";

.timer {
  display: grid;
  place-items: center;
  grid-template-rows: 1fr min-content;
  gap: var(--spacing-la);

  position: relative;
  isolation: isolate;

  background-image: var(--clr-surface-gradient);

  border-radius: 2ex;
  padding: var(--spacing-la);

  box-shadow: -5px 15px 50px black,
    5px -15px 50px var(--clr-surface-transparent),
    inset 0px 0px 100px var(--clr-surface-text-transparent);

  @media (min-height: 30em) and (orientation: landscape) {
    aspect-ratio: 1;
    border-radius: 50%;
  }
}

.timer__text {
  display: flex;
  font: var(--fs-xl) "Bebas Neue Book", "system-ui", sans-serif;
  letter-spacing: 0.04em;
  text-indent: 0.04em;
}

.timer__actions {
  display: grid;
  place-items: center;
}
</style>
