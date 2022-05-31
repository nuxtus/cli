<script setup lang="ts">
  const { getItems } = useDirectusItems();
  const fetchItems = async () => {
    try {
      var filters = { /** Add your filter here */ };
      var items = await getItems<any>({
        collection: "{$ collection $}",
        params: {
          filter: filters,
        },
      });
    } catch (e) {}
  };
</script>

<template>

</template>