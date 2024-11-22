<template>
  <div class="filters">
    <div class="input-group">
      <label for="filter-by">Filter by</label>
      <select
        id="filter-by"
        v-model="selectedFilter"
        @change="emitFilterChange"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
    <div class="input-group">
      <label for="sort-by">Sort by</label>
      <select id="sort-by" v-model="selectedSort" @change="emitSortChange">
        <option value="title">Sort by Title</option>
        <option value="date">Sort by Date</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedFilter = ref("all");
const selectedSort = ref("title");

const emit = defineEmits(["filter-change", "sort-change"]);

const emitFilterChange = () => {
  emit("filter-change", selectedFilter.value);
};

const emitSortChange = () => {
  emit("sort-change", selectedSort.value);
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: white;
  margin: 10px 0px;
  border-radius: 10px;
}
@media (min-width: 768px) {
  .filters {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
