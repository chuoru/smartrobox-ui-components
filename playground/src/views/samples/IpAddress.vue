<script setup lang="ts">
import { ref } from 'vue';
import { useIpAddress } from '@smartrobox/ui';

const ipAddress = useIpAddress('v4');

const addresses = ref([
  '192.168.1.0',
  '192.168.1.0/24',
  '192.168.1.0/16',
  '255.255.255.255',
  '255.255.255.300',
  '255.255.0.0/33',
]);
const hosts = ['192.168.1.1', '192.169.2.1'];
const networks = [
  '192.168.1.1',
  '192.168.1.2',
  '192.168.0.0/8',
  '192.168.0.0/16',
  '192.169.0.0/16',
  '192.0.0.0/24',
  '0.0.0.0/0',
];
</script>

<template>
  <div>
    <h1 class="tw:text-lg tw:font-bold">IPv4</h1>
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
            :class="
              ipAddress.isValid(address)
                ? 'tw:text-green-700 tw:dark:text-green-400'
                : 'tw:text-red-700 tw:dark:text-red-400'
            "
          >
            {{ ipAddress.isValid(address) }}
          </td>
        </tr>
      </tbody>
    </table>

    <table class="tw:mt-4">
      <thead>
        <tr class="tw:border-b tw:border-slate-300">
          <th class="tw:px-3 tw:py-1">host</th>
          <th class="tw:px-3 tw:py-1">network</th>
          <th class="tw:px-3 tw:py-1">isInSubnet</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="host of hosts"
          :key="host"
        >
          <tr
            v-for="network of networks"
            :key="`${host}-${network}`"
            class="tw:border-b tw:border-slate-300"
          >
            <td class="tw:px-3 tw:py-1">{{ host }}</td>
            <td class="tw:px-3 tw:py-1">{{ network }}</td>
            <td
              class="tw:px-3 tw:py-1"
              :class="
                ipAddress.isInSubnet(host, network)
                  ? 'tw:text-green-700 tw:dark:text-green-400'
                  : 'tw:text-red-700 tw:dark:text-red-400'
              "
            >
              {{ ipAddress.isInSubnet(host, network) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
