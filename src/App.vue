<template>
  <div class="task-manager">
    <AddTask @add-task="addTask" />
    <TaskFilters @filter-change="setFilter" @sort-change="setSort" />
    <TaskList
      :tasks="filteredAndSortedTasks"
      @update-task="updateTask"
      @delete-task="deleteTask"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AddTask from "@/components/AddTask.vue";
import TaskFilters from "@/components/TaskFilters.vue";
import TaskList from "@/components/TaskList.vue";

const tasks = ref([]);
const filterBy = ref("all");
const sortBy = ref("title");

const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const addTask = (newTask) => {
  tasks.value.push(newTask);
  saveTasks();
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
  saveTasks();
};

const updateTask = (task) => {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1, task);
    saveTasks();
  }
};

const setFilter = (filter) => {
  filterBy.value = filter;
};

const setSort = (sort) => {
  sortBy.value = sort;
};

const filteredAndSortedTasks = computed(() => {
  let filteredTasks = tasks.value.filter((task) => {
    if (filterBy.value === "completed") return task.completed;
    if (filterBy.value === "incomplete") return !task.completed;
    return true;
  });

  if (sortBy.value === "title") {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === "date") {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return filteredTasks;
});

onMounted(loadTasks);
</script>

<style scoped>
.task-manager {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
