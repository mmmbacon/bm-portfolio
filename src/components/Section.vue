<template>
  <div class="col-sm page justify-content-center align-items-center mx-5 my-1">
    <div class="column">
      <img class="mb-3" :src="url" alt="title" height="250px"/>
      <h3>{{ title }}</h3>
      <div style="max-width: 500px">
        <p>{{ description }}</p>
      </div>
      <div v-if="links">
        <ul style="list-style-type: none;">
          <li><a href="#">Trakr</a></li>
          <li><a href="#">Tweetr</a></li>
          <li><a href="#">SkateSpot</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: String,
    description: String,
    url: String,
    links: Boolean
  }
}
</script>

<style>

p {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

