<template>
  <Form autocomplete="off">
    <slot></slot>
  </Form>
</template>

<script>
import { Form } from 'vee-validate'

export default {
  components: { Form },
}
</script>
