<template>
  <div v-if="visible" class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="modal-content bg-white rounded-lg w-full max-w-md transform transition-all">
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Crear Nueva Incidencia</h2>
        <form @submit.prevent="saveIncident">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Título</label>
            <input v-model="newIncident.title" type="text" required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Descripción</label>
            <textarea v-model="newIncident.description" required rows="4"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div class="flex justify-end gap-3">
            <button type="button" @click="closeModal"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      newIncident: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveIncident() {
      this.$emit('saved', {...this.newIncident});
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  animation: modalEnter 0.3s ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>