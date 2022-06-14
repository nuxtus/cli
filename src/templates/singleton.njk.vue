<script setup lang="ts">
  const { getSingletonItem } = useDirectusItems();
  
  const item = await getSingletonItem<any>({
    collection: "{$ collection $}"
  });
</script>

<template>
  <h1>{{ {$ collection $} }}</h1>
  {{ item }}
</template>