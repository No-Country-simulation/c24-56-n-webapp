<template>
  <transition name="toast">
    <div v-if="visible" class="toast-success fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
      <i class="mdi mdi-check-circle mr-2"></i>
      <p>Incidencia creada con éxito!</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['visible'],
};
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease;
}
.toast-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>