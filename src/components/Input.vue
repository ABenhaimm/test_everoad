<template>
    <md-field>
      <label>{{placeholder}}</label>
      <md-input ref="number" type="number" :value='value.number' @input='updateNumber()'></md-input>
    </md-field>
</template>

<script>
  export default {
    name: 'Input',
    props: ['value', 'placeholder'],
    methods: {
        updateNumber(){
            this.$emit('input', {
                number: +this.$refs.number.MdField.value
            })
        }
    }
  }
</script>
