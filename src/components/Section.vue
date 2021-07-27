<template>
  <div class="col-sm page justify-content-center align-items-center mx-5 my-1">
    <div class="column">
      <img class="mb-3" :src="url" alt="title" height="150px"/>
      <h3>{{ title }}</h3>
      <div class="text-justify">
        <p class="text-justify">{{ description }}</p>
      </div>
      <div v-if="links">
        <ul style="list-style-type: none; padding-left: 0px">
          <li>
            <a href="https://github.com/mmmbacon/trakr" target="empty" >Trakr</a>
            <p>A Job Application Tracker | Node.js, React, Redux, MaterialUI, Rails</p>
          </li>
          <li>
            <a href="https://github.com/mmmbacon/tinyapp" target="empty">Tinyapp</a>
            <p>A URL Link Shortener | Node.js, Bootstrap, and EJS </p>
          </li>
          <li>
            <a href="https://github.com/mmmbacon/yyc-skatespots" target="empty">SkateSpot</a>
            <p>A skate spot locator and blog | Node.js, React, MaterialUI, GraphQL, Apollo</p>
          </li>
          <li>
            <a href="#">This Site!</a>
            <p>My Personal Portfolio | Node.js, Vue.js, Bootstrap</p>
          </li>
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

