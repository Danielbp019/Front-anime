<template>
  <v-card>
    <v-card-title>
      Anime CRUD
    </v-card-title>
    <v-card-text>
      <!-- Barra de búsqueda -->
      <v-text-field v-model="search" label="Buscar por título" outlined></v-text-field>

      <!-- Tabla de datos -->
      <v-data-table :headers="headers" :items="animes" :search="search" :loading="loading" :items-per-page="perPage"
        @update:options="getAllAnimes"></v-data-table>

    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api/api'; // Importa tu módulo de API

export default {
  data() {
    return {
      search: '',
      loading: false,
      animes: [],
      totalItems: 0,
      perPage: 5,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Capítulos', value: 'numero_capitulos' },
        { text: 'Visto', value: 'visto' },
        { text: 'Comentarios', value: 'comentarios' },
        { text: 'Actualizado', value: 'updated_at' },
      ],
    };
  },
  methods: {
    async getAllAnimes() {
      try {
        this.loading = true;
        const response = await api.getAllAnimes(); // Reemplaza con tu llamada a la API
        this.animes = response.data;
        this.totalItems = response.totalCount; // Ajusta esto según la respuesta de tu API
      } catch (error) {
        console.error('Error al obtener animes:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
