<script setup lang="ts">
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { DatePicker } from 'reka-ui/namespaced';
import type { DateValue } from 'reka-ui';

const model = defineModel<DateValue | null>();
</script>

<template>
  <DatePicker.Root v-model="model">
    <DatePicker.Field
      v-slot="{ segments }"
      class="date-picker-field"
    >
      <div class="date-picker-segments">
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <DatePicker.Input
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </DatePicker.Input>
          <DatePicker.Input
            v-else
            :part="item.part"
            class="date-picker-input"
          >
            {{ item.value }}
          </DatePicker.Input>
        </template>
      </div>

      <DatePicker.Trigger class="date-picker-trigger">
        <CalendarIcon class="date-picker-trigger-icon" />
      </DatePicker.Trigger>
    </DatePicker.Field>

    <DatePicker.Content
      :side-offset="6"
      class="date-picker-popup"
    >
      <DatePicker.Arrow class="date-picker-arrow" />
      <DatePicker.Calendar
        v-slot="{ weekDays, grid }"
        class="date-picker-calendar"
      >
        <DatePicker.Header class="date-picker-header">
          <DatePicker.Prev class="date-picker-nav-btn">
            <ChevronLeftIcon class="date-picker-nav-icon" />
          </DatePicker.Prev>

          <DatePicker.Heading class="date-picker-heading" />

          <DatePicker.Next class="date-picker-nav-btn">
            <ChevronRightIcon class="date-picker-nav-icon" />
          </DatePicker.Next>
        </DatePicker.Header>

        <div class="date-picker-grid-wrap">
          <DatePicker.Grid
            v-for="month in grid"
            :key="month.value.toString()"
            class="date-picker-grid"
          >
            <DatePicker.GridHead>
              <DatePicker.GridRow class="date-picker-grid-head-row">
                <DatePicker.HeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="date-picker-head-cell"
                >
                  {{ day }}
                </DatePicker.HeadCell>
              </DatePicker.GridRow>
            </DatePicker.GridHead>
            <DatePicker.GridBody>
              <DatePicker.GridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="date-picker-grid-row"
              >
                <DatePicker.Cell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <DatePicker.CellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="date-picker-cell"
                  />
                </DatePicker.Cell>
              </DatePicker.GridRow>
            </DatePicker.GridBody>
          </DatePicker.Grid>
        </div>
      </DatePicker.Calendar>
    </DatePicker.Content>
  </DatePicker.Root>
</template>

<style>
.date-picker-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.25rem;
  border: 1px solid var(--sr-color-border);
  padding: 0.375rem;
  text-align: center;
  user-select: none;

  &[data-invalid] {
    border-color: var(--sr-primary-500);
  }

  .date-picker-segments {
    display: flex;
    align-items: center;

    .date-picker-input {
      border-radius: 0.25rem;
      padding: 0.125rem;

      &:focus-visible {
        outline: 2px solid var(--sr-primary-400);
      }
    }
  }

  .date-picker-trigger {
    border-radius: 0.25rem;
    padding: 0.25rem;

    &:focus-visible {
      outline: 2px solid var(--sr-primary-400);
    }

    .date-picker-trigger-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

.date-picker-popup {
  border-radius: 0.25rem;
  border: 1px solid var(--sr-color-border);
  color: var(--sr-color-text);
  background-color: var(--sr-color-bg-dlg);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  .date-picker-arrow {
    fill: var(--sr-color-bg-dlg);
    stroke: var(--sr-color-border);
    transform: translateY(-1px);
  }

  .date-picker-calendar {
    padding: 1rem;

    .date-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .date-picker-nav-btn {
        display: inline-flex;
        color: var(--sr-color-text);
        height: 1.75rem;
        width: 1.75rem;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        background-color: transparent;

        &:hover {
          opacity: 0.45;
          /* background-color: var(--sr-gray-100); */
        }
        &:focus-visible {
          outline: 2px solid var(--sr-primary-400);
        }

        .date-picker-nav-icon {
          width: 1rem;
          height: 1rem;
        }
      }

      .date-picker-heading {
        font-weight: 500;
      }
    }

    .date-picker-grid-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
    }

    .date-picker-grid {
      width: 100%;
      border-collapse: collapse;
      user-select: none;

      .date-picker-grid-head-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 0.25rem;

        .date-picker-head-cell {
          width: 2rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          color: var(--sr-color-success);
        }
      }

      .date-picker-grid-row {
        display: flex;
        width: 100%;

        .date-picker-cell {
          position: relative;
          display: flex;
          height: 2rem;
          width: 2rem;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          border: 1px solid transparent;
          background-color: transparent;
          font-size: 0.875rem;
          font-weight: 400;
          white-space: nowrap;
          outline: none;

          &:hover {
            opacity: 0.65;
            cursor: pointer;
          }
          &::before {
            content: '';
            position: absolute;
            top: 0.3125rem;
            display: none;
            height: 0.25rem;
            width: 0.25rem;
            border-radius: 9999px;
          }
          &[data-outside-view] {
            color: var(--sr-gray-400);
          }
          &[data-selected] {
            background-color: var(--sr-color-success);
            color: white;
          }
          &[data-today] {
            font-weight: bold;
            text-decoration: underline;
          }
          &[data-unavailable] {
            pointer-events: none;
            background-color: var(--sr-gray-400);
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
