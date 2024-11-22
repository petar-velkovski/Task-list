<template>
  <div class="task-list-wrapper">
    <h3>Task List</h3>
    <div v-if="paginatedTasks.length === 0" class="task-item no-tasks-card">
      <h3>You have no tasks !</h3>
    </div>
    <div v-for="task in paginatedTasks" :key="task.id" class="task-item">
      <div class="task-content">
        <div class="task-header">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="$emit('update-task', task)"
            class="task-checkbox"
          />
          <span :class="{ completed: task.completed }" class="task-title">
            {{ task.title }}
          </span>
        </div>
        <div class="task-subtitle">
          <span class="task-description">{{ task.description }}</span>
          <span class="task-created-at">{{ formatDate(task.createdAt) }}</span>
          <span class="task-priority">{{ task.priority }}</span>
        </div>
      </div>
      <button class="delete-button" @click="confirmDelete(task.id)">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div v-if="paginatedTasks.length > 0" class="pagination">
      <button
        class="pagination-btns"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="pagination-btns"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps(["tasks"]);
const emit = defineEmits(["update-task", "delete-task"]);

const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.tasks.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(props.tasks.length / itemsPerPage); // Calculate based on filtered tasks
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const confirmDelete = (taskId) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (isConfirmed) {
    emit("delete-task", taskId);
  }
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

watch(
  () => props.tasks.length,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 10px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 600px;
  word-break: break-word;
}

.task-content {
  flex-grow: 1;
  overflow: hidden;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.task-checkbox {
  margin-left: 10px;
  margin-right: 10px;
  flex-shrink: 0;
  transform: scale(1.5);
}
h3 {
  text-align: center;
  font-weight: 500;
}
.no-tasks-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-title {
  font-weight: 600;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  display: block;
}

.task-title.completed {
  text-decoration: line-through; /* Apply line-through when completed */
  color: grey; /* Optional: Change text color when completed */
}

.task-subtitle {
  margin-top: 5px;
  font-size: 0.9em;
  color: #555;
  display: block;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.task-description {
  margin-bottom: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}

.task-priority {
  font-weight: bold;
  display: block;
}
.task-created-at {
  display: block;
}
.delete-button:hover {
  background-color: #ff1f1f;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}

/* Responsive styling */
@media (max-width: 600px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-title {
    font-size: 1em;
  }

  .task-subtitle {
    margin-top: 5px;
    font-size: 0.8em;
  }

  .delete-button {
    padding: 4px 8px;
  }

  .pagination button {
    padding: 6px 10px;
  }
}
</style>
