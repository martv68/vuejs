<template>
  <div>
    <h1>100 Кликеров</h1>

    <Clicker
      v-for="n in 100"
      :key="n"
      :amount="n % 5 + 1"
      @button-clicked="() => handleClickerEvent(n)"
    >
      <button style="background: #42b883; color: white; border: none; padding: 4px 10px; border-radius: 4px;">
        Кликер {{ n }}
      </button>
    </Clicker>
  </div>
</template>

<script setup>
import Clicker from './Clicker.vue';

function handleClickerEvent(n) {
  alert(`Clicker ${n} clicked!`);
}
</script>