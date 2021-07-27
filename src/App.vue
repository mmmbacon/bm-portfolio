<template>
    <div class="container-fluid d-flex flex-column justify-content-center px-0"> 
      <div class="justify-content-center text-center mb-1 header p-2 px-0">
        <h1 style="font-size: 3em; font-weight: 900; margin-bottom: 0px; margin-top: 5px;">BRANDON MACDONALD</h1>
        <h5>FULL STACK WEB DEVELOPER</h5>
        <div>
          <a href="https://github.com/mmmbacon" target="empty">
            <img src="../public/img/GitHub-Mark-64px.png" height="32px"/>
          </a>
          <a href="https://www.linkedin.com/in/brandon-m-macdonald/" target="empty">
            <img src="../public/img/icons8-linkedin-50.png" height="38px" class="pl-2" />
          </a>
          <a href="mailto:bmacdonald1986@gmail.com">
            <img src="../public/img/icons8-secured-letter-50.png" height="38px" class="pl-2" />
          </a>
        </div>
      </div>
      <div class="row justify-content-center" id="app" style="background-color:white; padding-top: 50px; min-height: 75vh;">  
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/engine1_ayc9ze.png"
          title="FRONT END"
          description="I am a passionate and creative front end web developer. I enjoy designing simple and effective web experiences. I have recently made a career change and transitioned into technology after 10+ years in engineering consulting. I made this change because I LOVE TO WRITE CODE."/>
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png"
          title="BACK END"
          description="I love writing REST API's using Express.js. I have experience with both SQL and NoSQL databases. I have recently learned GraphQL." />
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357789/cdn/cargo2_yj22cz.png"
          title="PROJECTS"
          description="Here are some projects I am proud of:"
          links="true"
        >
        </Section>
        <Section
          url="https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png"
          title="ABOUT ME"
          description="I love to build things. I am inspired by elegant and simple software that performs its job well. I also love inline skating." />
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
</style>
