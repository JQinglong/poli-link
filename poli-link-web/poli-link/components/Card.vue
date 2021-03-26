<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
})
</script>
