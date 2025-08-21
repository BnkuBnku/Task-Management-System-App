<template>
  <div>
    <DataTable 
      :value="tasks"
      tableStyle="min-width:50rem; border-spacing:1rem;"
      class="border border-gray-300 border-separate"
      :scrollable="true"
    >
      <!-- ID Column -->
      <Column field="id" header="ID">
        <template #body="{ data }">
          <div class="px-4 py-2">{{ data.id }}</div>
        </template>
      </Column>

      <!-- Title Column -->
      <Column field="title" header="Title">
        <template #body="{ data }">
          <div class="px-4 py-2">{{ data.title }}</div>
        </template>
      </Column>

      <!-- Description Column -->
      <Column field="description" header="Description">
        <template #body="{ data }">
          <div class="px-4 py-2">{{ data.description }}</div>
        </template>
      </Column>

      <!-- Status Column -->
      <Column field="status" header="Status">
        <template #body="{ data }">
          <div class="px-4 py-2">{{ data.status }}</div>
        </template>
      </Column>

      <!-- Priority Column -->
      <Column field="priority" header="Priority">
        <template #body="{ data }">
          <div class="px-4 py-2">{{ data.priority }}</div>
        </template>
      </Column>

      <!-- Actions Column -->
      <Column header="Actions">
        <template #body="{ data }">
          <button
            @click="deleteTask(data.id)"
            class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </template>
      </Column>

      <!-- Draggable Rows Slot -->
      <template #tbody="{ value: rows }">
        <Draggable v-model="tasks" item-key="id" @end="saveOrder" tag="tbody">
          <template #item="{ element }">
            <tr>
              <td class="border px-4 py-2">{{ element.id }}</td>
              <td class="border px-4 py-2">{{ element.title }}</td>
              <td class="border px-4 py-2">{{ element.description }}</td>
              <td class="border px-4 py-2">{{ element.status }}</td>
              <td class="border px-4 py-2">{{ element.priority }}</td>
              <td class="border px-4 py-2">
                <button
                  @click="deleteTask(element.id)"
                  class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </Draggable>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useTasks } from '@/stores/tasks'
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Draggable from 'vuedraggable';

  const fetchPayload = {
    keyword: '',
    status: '',
    priority: '',
    take: 10,
    skip: 0
  }

  const { tasks, fetchTasks, deleteTask, updateOrder } = useTasks();

  const loadTasks = async () => {
    try {
      const result = await fetchTasks(fetchPayload) // fetchTasks sets tasks.value

      // If unauthorized
      if (result?.error?.message === 'Unauthenticated.') {
        router.push('/login')
      }
    } catch (err) {
      if (err.response?.status === 401) router.push('/login')
      else console.error('Failed fetching tasks:', err)
    }
  }

  onMounted(() => loadTasks())

// Save order after dragging
const saveOrder = () => updateOrder();
</script>
