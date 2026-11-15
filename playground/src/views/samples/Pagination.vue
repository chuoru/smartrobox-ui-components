<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { JsonPlaceholderRepository } from '@/repositories/JsonPlaceholderRepository';
import { Pagination } from '@smartrobox/ui';

type RepositoryInstance = ReturnType<typeof JsonPlaceholderRepository.getInstance>;
type PhotoList = Awaited<ReturnType<RepositoryInstance['fetchPhotos']>>;

const photos = ref<PhotoList>([]);
const page = ref(1);
const itemsPerPage = ref(5);

onMounted(async () => {
  photos.value = await JsonPlaceholderRepository.getInstance().fetchPhotos(1);
});
</script>

<template>
  <div>
    <Pagination
      v-model:page="page"
      :total="photos.length"
      :sibling-count="1"
      :default-page="1"
      :items-per-page="itemsPerPage"
      show-edges
    />
  </div>

  <div class="tw:mt-4 tw:flex tw:flex-col tw:text-green-600">
    <div>total: {{ photos.length }}</div>
    <div>page: {{ page }}</div>
  </div>

  <div class="tw:mt-4">
    <table class="tw:border tw:border-gray-200">
      <thead class="tw:bg-amber-50 tw:shadow">
        <tr>
          <th class="tw:px-3">ID</th>
          <th class="tw:px-3">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item of photos.slice((page - 1) * itemsPerPage, page * itemsPerPage)"
          :key="item.id"
        >
          <td class="tw:px-4 tw:py-1">{{ item.id }}</td>
          <td class="tw:px-4 tw:py-1">{{ item.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
