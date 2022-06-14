<script setup lang="ts">
  const { getItems } = useDirectusItems();
  const filters = {/* Put your filters here */};
  const items = await getItems<any>({
    collection: "{$ collection $}",
    params: {
      filter: filters,
    }
  });
</script>

<template>
  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">
      <router-link :to="`/{$ collection $}/${item.id}`">
        {{ item.id }}
      </router-link>
    </li>
  </ul>
  <p v-else>No {$ collection $} found.</p>
</template>