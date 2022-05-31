<script setup lang="ts">
  const route = useRoute()
  const { getItemById } = useDirectusItems();
  const selectedItem = async () => {
    try {
      var item = await getItemById({
        collection: "{$ collection $}",
        id: route.params.id,
      });
    } catch (e) {}
  };
</script>

<template>
  <h1>{{ {$ collection $} }}</h1>
  {{ item }}
</template>