<script setup lang="ts">
  const route = useRoute()
  const { getItemById } = useDirectusItems();
  const item = await getItemById({
    collection: "{$ collection $}",
    id: route.params.id,
  });
</script>

<template>
  <div>
    <h1>{$ collection | capitalize $}</h1>
    <div>{{ item }}</div>
  </div>
</template>