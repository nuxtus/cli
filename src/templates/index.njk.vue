<script setup lang="ts">
  const { getItems } = useDirectusItems();
  const items = async () => {
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
  <ul>
    <li v-for="item in items" :key="item.id">
      <router-link :to="`/{$ collection $}/${item.id}`">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>