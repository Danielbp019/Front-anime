<template>
    <v-data-table :headers="headers" :items="filteredAnimes" :items-per-page="5" :loading="loading"
        :sort-by="[{ key: 'Nombre', order: 'asc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Lista de animes</v-toolbar-title>

                <v-text-field v-model="search" label="Buscar por nombre" prepend-inner-icon="mdi-magnify"
                    variant="outlined" hide-details single-line></v-text-field>

                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="ms-auto" color="primary" dark v-bind="props">
                            Nuevo anime
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.numero_capitulos"
                                            label="numero de capitulos"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-select v-model="editedItem.visto"
                                            :items="[{ title: 'visto', value: 1 }, { title: 'no visto', value: 0 }]"
                                            label="visto"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea v-model="editedItem.comentarios" label="comentarios"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Esta seguro que desea borrar ese registro?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import api from '@/api/api';

const dialog = ref(false);
const dialogDelete = ref(false);
const loading = ref(false);
const search = ref('');
const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Número de Capítulos', key: 'numero_capitulos' },
    { title: 'Visto', key: 'visto' },
    { title: 'Comentarios', key: 'comentarios' },
    { title: 'Acciones', key: 'actions', sortable: false },
];
const animes = ref([]);
let editedIndex = -1;
const editedItem = ref({
    id: '',
    nombre: '',
    numero_capitulos: '',
    visto: '',
    comentarios: '',
});
const defaultItem = {
    id: '',
    nombre: '',
    numero_capitulos: '',
    visto: '',
    comentarios: '',
};

const formTitle = computed(() => (editedIndex === -1 ? 'Nuevo Anime' : 'Editar Anime'));

const filteredAnimes = computed(() => {
    return animes.value.filter(anime => anime.nombre.toLowerCase().includes(search.value.toLowerCase()));
});

watch(dialog, (val) => {
    if (!val) close();
});
watch(dialogDelete, (val) => {
    if (!val) closeDelete();
});

onMounted(async () => {
    try {
        loading.value = true;
        const response = await api.getAllAnimes();
        animes.value = response.data.map(anime => ({
            ...anime,
            visto: anime.visto ? 'visto' : 'no visto'
        }));
        loading.value = false;
    } catch (error) {
        console.error('Error obteniendo animes:', error);
        loading.value = false;
    }
});

const editItem = (item) => {
    editedIndex = animes.value.indexOf(item);
    editedItem.value = { ...item };
    dialog.value = true;
};

const deleteItem = (item) => {
    editedIndex = animes.value.indexOf(item);
    editedItem.value = { ...item };
    dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
    try {
        await api.deleteAnime(editedItem.value.id);
        animes.value.splice(editedIndex, 1);
        closeDelete();
    } catch (error) {
        console.error(`Error borrando anime con la id ${editedItem.value.id}:`, error);
    }
};

const close = () => {
    dialog.value = false;
    editedItem.value = { ...defaultItem };
    editedIndex = -1;
};

const closeDelete = () => {
    dialogDelete.value = false;
    editedItem.value = { ...defaultItem };
    editedIndex = -1;
};

const save = async () => {
    try {
        if (editedIndex > -1) {
            await api.updateAnime(editedItem.value.id, editedItem.value);
            Object.assign(animes.value[editedIndex], editedItem.value);
        } else {
            const response = await api.createAnime(editedItem.value);
            // Accede a la propiedad 'nuevoAnime' de la respuesta
            const nuevoAnime = response.data.nuevoAnime;
            animes.value.push(nuevoAnime);
        }
        // Actualiza la lista de animes
        const response = await api.getAllAnimes();
        animes.value = response.data.map(anime => ({
            ...anime,
            visto: anime.visto ? 'visto' : 'no visto'
        }));
        close();
    } catch (error) {
        console.error('Error guardando anime:', error);
    }
};

</script>
