<template>
  <div style="border: 1px solid #ccc; padding: 10px; margin: 5px; display: inline-block;">
    <p>Очки: {{ count }}</p>
    <p style="font-size: 12px; color: gray;">+{{ amount }} за клик</p>

    <span @click="handleClick" style="cursor: pointer;">
      <slot>
        <button>Клик</button>
      </slot>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  amount: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['button-clicked']);

const count = ref(0);

function handleClick() {
  count.value += props.amount;
  emit('button-clicked');
}
</script>