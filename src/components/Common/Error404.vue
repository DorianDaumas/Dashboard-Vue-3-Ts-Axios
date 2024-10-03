<template>
  <div class="error-container">
    <h1>404</h1>
    <p>La page que vous cherchez n'existe pas.</p>
    <br /><br />
    <v-btn to="/" color="#1c9558">Retourner à l'accueil</v-btn>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.error-container {
  text-align: center;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 4rem;
    font-weight: 600;
    color: #adb4d2;
  }
}
</style>
