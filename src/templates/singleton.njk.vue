<script setup lang="ts">
  const { getSingletonItem } = useDirectusItems();
  const selectedItem = async () => {
    try {
    var item = await getSingletonItem<any>({
      collection: "{$ collection $}"
    });
  } catch (e) {}
  };
</script>

<template>
  <h1>{{ {$ collection $} }}</h1>
  {{ item }}
</template>