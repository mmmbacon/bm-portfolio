<template>
  <div class="page">
    <header class="hero">
      <h1 class="hero__name">Brandon Macdonald</h1>
      <p class="hero__role">Full Stack Web Developer</p>
      <nav class="hero__links" aria-label="Social links">
        <a href="https://github.com/mmmbacon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src="../public/img/GitHub-Mark-64px.png" alt="" class="hero__icon hero__icon--github" />
        </a>
        <a href="https://www.linkedin.com/in/brandon-m-macdonald/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="../public/img/icons8-linkedin-50.png" alt="" class="hero__icon hero__icon--social" />
        </a>
        <a href="mailto:bmacdonald1986@gmail.com" aria-label="Email">
          <img src="../public/img/icons8-secured-letter-50.png" alt="" class="hero__icon hero__icon--social" />
        </a>
      </nav>
    </header>

    <main class="sections">
      <Section
        v-for="(section, index) in sections"
        :key="section.title"
        :url="section.url"
        :title="section.title"
        :description="section.description"
        :links="section.links"
        :reverse="index % 2 === 1"
      />
    </main>
  </div>
</template>

<script>
import Section from './components/Section.vue'

export default {
  name: 'App',
  components: {
    Section
  },
  data() {
    return {
      sections: [
        {
          url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/engine1_ayc9ze.png',
          title: 'Front End',
          description:
            'I am a passionate and creative front end web developer. I enjoy designing simple and effective web experiences. I have recently made a career change and transitioned into technology after 10+ years in engineering consulting. I made this change because I love to write code.'
        },
        {
          url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png',
          title: 'Back End',
          description:
            "I love writing REST API's using Express.js. I have experience with both SQL and NoSQL databases. I have recently learned GraphQL."
        },
        {
          url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357789/cdn/cargo2_yj22cz.png',
          title: 'Projects',
          description: 'Here are some projects I am proud of:',
          links: true
        },
        {
          url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png',
          title: 'About Me',
          description:
            'I love to build things. I am inspired by elegant and simple software that performs its job well. I also love inline skating.'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0f172a;
}

.page {
  min-height: 100vh;
}

.hero {
  text-align: center;
  padding: 2.5rem 1.5rem 2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.hero__name {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
  color: #0f172a;
}

.hero__role {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  margin: 0 0 1.25rem;
}

.hero__links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.hero__links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero__links a:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
}

.hero__icon {
  display: block;
  width: auto;
}

.hero__icon--github {
  height: 22px; /* 70% of 32px */
}

.hero__icon--social {
  height: 25px; /* 70% of 36px */
}

.sections {
  background: #fff;
  padding: 2rem 0 4rem;
}
</style>
