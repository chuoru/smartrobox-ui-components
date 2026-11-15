<script setup lang="ts">
import { computed } from 'vue';
import { snakeToCamel, camelToSnake } from '@smartrobox/ui';
import type { QtCamelToSnake } from '@smartrobox/ui';

type SampleResponse = {
  robotId: number;
  operatorId: number;
  info: {
    activeStream: string;
    mapInfo: {
      width: number;
      height: number;
    };
  };
};

const snakeCaseResponse: QtCamelToSnake<SampleResponse> = {
  robot_id: 1,
  operator_id: 2,
  info: {
    active_stream: 'local-map',
    map_info: {
      width: 600,
      height: 480,
    },
  },
};

const camelCaseResponse = computed(() => snakeToCamel(snakeCaseResponse));
const snakeCaseAgain = computed(() => camelToSnake(camelCaseResponse.value));
</script>

<template>
  <div class="tw:bg-slate-200 tw:p-1 tw:dark:bg-slate-700">
    <h1>snake_case</h1>
    <pre>{{ JSON.stringify(snakeCaseResponse, null, 2) }}</pre>
  </div>

  <div class="tw:my-2">↓ snakeToCame()</div>

  <div class="tw:bg-slate-200 tw:p-1 tw:dark:bg-slate-700">
    <h1>cameCase</h1>
    <pre>{{ JSON.stringify(camelCaseResponse, null, 2) }}</pre>
  </div>

  <div class="tw:my-2">↓ camelToSnake()</div>

  <div class="tw:bg-slate-200 tw:p-1 tw:dark:bg-slate-700">
    <h1>snake_case (again)</h1>
    <pre>{{ JSON.stringify(snakeCaseAgain, null, 2) }}</pre>
  </div>
</template>
