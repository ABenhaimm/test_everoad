<template>
  <md-button class="md-raised md-primary">{{ text }}</md-button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: String
    }
  }
</script>
