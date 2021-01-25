<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card
            color="teal lighten-2"
            dark
        >
          <v-card-title class="headline">
            Search for your beer 🍺
          </v-card-title>
          <template>
            <v-card-text>
              Before using our system, please enter your email
            </v-card-text>
            <v-card-text>
              <v-text-field
                  v-model="email"
                  color="white"
                  clearable
                  label="Enter your email"
                  prepend-icon="mdi-email"
              ></v-text-field>
            </v-card-text>
          </template>
          <v-expand-transition>
            <v-card-text v-show="isValidEmail">
              <v-divider></v-divider>
              <v-card-text>
                Now you can use our system, thank you :)
              </v-card-text>
              <v-autocomplete
                  v-model="beer"
                  :items="entries"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="white"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="name"
                  item-value="name"
                  label="Beer name"
                  prepend-icon="mdi-database-search"
                  return-object
              ></v-autocomplete>
            </v-card-text>
          </v-expand-transition>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list
                v-if="beer"
                class="teal lighten-3"
            >
              <v-container>
                <v-row align="center" justify="center">
                  <v-card-text>First Brewed: <strong>{{ beer.first_brewed }}</strong></v-card-text>
                  <v-col cols="8">
                    <v-textarea
                        label="Description"
                        v-model="beer.description"
                        auto-grow
                        readonly
                        rows="1"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3">
                    <v-list class="teal lighten-1" dense elevation="2">
                      <v-subheader><strong>Here are some great food pairing 🍔</strong></v-subheader>
                      <v-list-item
                          v-for="(value, i) in beer.food_pairing"
                          :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-subtitle v-text="value"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-expand-transition>
          <v-card-actions v-if="beer">
            <v-spacer></v-spacer>
            <ReviewForm :email="email" :id="beer.id"/>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ReviewForm from "@/components/ReviewForm";

export default {
  components: {
    ReviewForm,
  },
  data: () => ({
    // email: null,
    email: "lua@gmail.com",
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    beer: null,
    search: null,
  }),

  computed: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    }
  },
  watch: {
    search() {
      if (this.entries.length > 0) return

      if (this.isLoading) return

      this.isLoading = true

      this.axios.get('http://localhost:3000/beer', {
        headers: {
          'x-user': this.email
        }
      }).then((response) => {
        this.entries = response.data
      }).catch(err => {
        console.log(err)
      }).finally(() => (this.isLoading = false))
    },
  },
}
</script>
