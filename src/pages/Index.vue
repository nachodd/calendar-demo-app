<template>
  <!-- flex-center -->
  <q-page class="flex ">
    <calendar />
  </q-page>
</template>

<style></style>

<script>
import Calendar from "src/components/Calendar/index"
export default {
  name: "PageIndex",
  components: { Calendar },
}
</script>
