<script setup lang="ts">
import { ref } from 'vue';
import { useMacAddress } from '@smartrobox/ui';

const macAddress = useMacAddress();

const addresses = ref([
  '00:1A:2B:3C:4D:5E',
  'FF:FF:FF:FF:FF:FF',
  'AA:BB:CC:DD:EE:FF',
  '00:00:00:00:00:00',
  'GG:HH:II:JJ:KK:LL',
]);
</script>

<template>
  <div>
    <h1 class="tw:text-lg tw:font-bold">MAC Address</h1>
    <table class="tw:mt-4">
      <thead>
        <tr class="tw:border-b tw:border-slate-300">
          <th class="tw:px-3 tw:py-1">address</th>
          <th class="tw:px-3 tw:py-1">isValid</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="address of addresses"
          :key="address"
          class="tw:border-b tw:border-slate-300"
        >
          <td class="tw:px-3 tw:py-1">{{ address }}</td>
          <td
            class="tw:px-3 tw:py-1"
            :class="macAddress.isValid(address) ? 'tw:text-green-400' : 'tw:text-red-400'"
          >
            {{ macAddress.isValid(address) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
