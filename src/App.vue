<template>
    <div class="container-fluid d-flex flex-column justify-content-center px-0"> 
      <div class="justify-content-center text-center mb-1 header p-4 px-0">
        <h1>BRANDON MACDONALD</h1>
        <h5>PORTFOLIO</h5>
      </div>
      <div class="row justify-content-center align-items-center" id="app" style="background-color:white; padding-top: 70px;">  
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/engine1_ayc9ze.png"
          title="FRONT END"
          description="React, Ruby on Rails, MaterialUI, Vue.js"/>
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png"
          title="BACK END"
          description="Node.js, Express, Ruby on Rails, GraphQL, PostgreSQL" />
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357789/cdn/cargo2_yj22cz.png"
          title="PROJECTS"
          description="Here are some projects I have made recently."
          links="true"
        >
          <div>
            <a href="#">Link</a>
          </div>
        </Section>
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png"
          title="ABOUT ME"
          description="I love to write code. I love to build things. I am inspired by elegant and simple software that performs its job well. I also love to inline skate." />
      </div>
    </div>
</template>

<script>
// import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
import Section from './components/Section.vue'

export default {
  name: 'App',
  components: {
    Section
  }
}
</script>

<style>
#app {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  font-family: Raleway, Helvetica, Arial, sans-serif;
}
.header {
  background-color: #f5f5f5;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c1dde4' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
