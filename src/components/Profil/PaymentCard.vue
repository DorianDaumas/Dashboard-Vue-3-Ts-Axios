<template>
  <div>
    <br />
    <v-card
      variant="outlined"
      hover
      max-width="600px"
      :class="theme.theme ? 'theme-off' : 'theme-on'"
      style="padding: 10px"
    >
      <v-card-item>
        <v-card-title>
          <div class="d-flex align-center justify-space-between">
            <div>
              <v-icon color="#42b883">mdi-credit-card-outline</v-icon>
              <span style="margin-left: 15px"
                >{{ getMaskedValue(user.currentUsers.bank.cardNumber) }}
              </span>
            </div>
            <v-tooltip
              color="primary"
              text="Nous ne stockons pas les détails de votre carte de crédit !"
            >
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="27">mdi-information-outline</v-icon>
              </template>
            </v-tooltip>
          </div>
        </v-card-title>
      </v-card-item>
    </v-card>
    <br /><br />
    <h1 class="title">Informations de facturation</h1>
    <br />
    <v-card
      elevation="2"
      max-width="600px"
      color="rgb(248 249 250 / 11%) !important"
      :class="theme.theme ? 'theme-off' : 'theme-on'"
      style="padding: 10px"
    >
      <span>{{ user.currentUsers.firstName }} {{ user.currentUsers.lastName }}</span>
      <br /><br />
      <div class="info-private-user" style="margin-bottom: 0px">
        <p>
          <strong>Nom de société:</strong>
          <span>{{ user.currentUsers.company.name }}</span>
        </p>
        <br />
        <p>
          E-mail:
          <span>{{ user.currentUsers.email }}</span>
        </p>
        <br />

        <p>
          Numéro de TVA:
          <span>{{ user.currentUsers.bank.iban }}</span>
        </p>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/App'
import { useAuthenticationStore } from '@/stores/Auth'
const theme = useThemeStore()
const user = useAuthenticationStore()

const getMaskedValue = (s: {
  substring: (start: any, end: any) => string
  toString: () => string
}) => {
  if (s) {
    return s
      .toString()
      .replace(s.substring(0, 12), '**** **** **** ')
      .replace(/\d{4}(?=.)/g, '$& ')
  }
  return s
}
</script>
<style lang="scss"></style>
