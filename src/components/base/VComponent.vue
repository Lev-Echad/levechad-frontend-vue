<template>
  <section class="mb-12 text-center red--text">
    <h1
      class="font-weight-light mb-2 headline"
      v-text="`${heading}`"
    />

    <span
      class="font-weight-light secondary--text"
    >
      הנתונים מעודכנים נכון לשעה: 
      <span
        class="secondary--text"
        style="text-decoration:none;"
      >
        13/04/2020 19:32
      </span>
    </span>
  </section>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
    },
  }
</script>
