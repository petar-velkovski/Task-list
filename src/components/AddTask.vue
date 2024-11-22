<template>
  <div class="add-task">
    <div v-if="taskAdded" class="success">Task Added</div>
    <div class="input-group">
      <label for="task-title">Title</label>
      <input id="task-title" v-model="title" type="text" />
    </div>

    <div class="input-group">
      <label for="task-description">Description</label>
      <textarea id="task-description" v-model="description"></textarea>
    </div>

    <div class="input-group">
      <label for="task-priority">Priority</label>
      <select id="task-priority" v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <button
      :disabled="isSubmitDisabled"
      :class="{ disabled: isSubmitDisabled }"
      @click="handleAddTask"
    >
      Add Task
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Task from "@/modules/task";

const title = ref("");
const description = ref("");
const priority = ref("low");
const taskAdded = ref(false);

const emit = defineEmits(["add-task"]);
const isSubmitDisabled = computed(() => {
  return !title.value;
});
const handleAddTask = () => {
  if (!title.value) return;
  const newTask = new Task(title.value, description.value, priority.value);
  emit("add-task", newTask);
  title.value = "";
  description.value = "";
  priority.value = "low";
  taskAdded.value = true;
  setTimeout(() => {
    taskAdded.value = false;
  }, 1000);
};
</script>

<style scoped>
.add-task {
  padding: 20px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
}
button {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.success {
  background: #45a049;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
  text-align: center;
}
@media (min-width: 768px) {
  .add-task {
    flex-direction: row;
    align-items: flex-start;
  }

  .input-group {
    flex: 1;
  }
}
</style>
