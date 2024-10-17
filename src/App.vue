<template>
  <div
    :class="store.theme ? 'content-app' : 'content-app app-theme-on'"
    :style="store.theme ? 'background: #1e1e2f' : 'background: #f0f2f5'"
  >
    <Header></Header>
    <Sidenave></Sidenave>
    <div>
      <div
        :style="device ? '' : 'margin-left: 0px!important'"
        :class="store.drawer ? 'container-routing-vue-on' : 'container-routing-vue-off'"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :style="device ? 'margin: 0px 20px 20px 20px' : ''" :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidenave from '@/components/Common/Sidenave.vue'
import Header from '@/components/Common/Header.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/App'
import { useDisplay } from 'vuetify'
import { useAuthenticationStore } from '@/stores/Auth'
import { useProductsStore } from './stores/Products'

const store = useThemeStore()
const device = useDisplay().mdAndUp
const authStore = useAuthenticationStore()
const productStore = useProductsStore()

onMounted(() => {
  if (authStore.isLogged) {
    authStore.getCurrentUser().then((val) => {
      productStore.fetchUserProduct(val.content.id)
    })
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

/* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #397524 #DFE9EB;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
*::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: #dfe9eb;
}

*::-webkit-scrollbar-track:hover {
  background-color: #b8c0c2;
}

*::-webkit-scrollbar-track:active {
  background-color: #b8c0c2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgb(28, 149, 88);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #3ca35e;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #62a34b;
}

.app-theme-on {
  color: #262b43e6;
  .switch-label {
    color: #262b43e6;
  }
  .icon-card {
    color: white !important;
  }
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-color: rgba(128, 128, 128, 0.199) !important;
  }
  .v-table .v-table__wrapper > table > thead > tr > th {
    border-color: rgba(128, 128, 128, 0.199) !important;
  }
}
.content-app {
  min-height: 100vh;
}

.error {
  text-align: center;
  padding: 20px;
}

.theme-on {
  background: white !important;
  color: black !important;
}

.theme-off {
  background: #27293d !important;
  color: white !important;
}

.fade-enter-active {
  animation: bounce-in 0.3s;
}
.fade-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.container-routing-vue-on {
  margin-left: 275px;
  padding: 0px 10px 10px 10px;
}

.container-routing-vue-off {
  margin-left: 75px;
  padding: 0px 10px 10px 10px;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
