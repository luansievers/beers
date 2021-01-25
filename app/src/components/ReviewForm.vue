<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="grey darken-3" v-on="on">
          Add review
          <v-icon right>
            mdi-message-draw
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row align="center" justify="center">
              <v-col cols="12" align="center">
                <v-rating
                    background-color="grey"
                    color="warning"
                    length="5"
                    size="40"
                    v-model="rating"
                ></v-rating>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Add a written review"
                    auto-grow
                    rows="1"
                    v-model="comments"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="insertReview"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  data: () => ({
    dialog: false,
    rating: 1,
    comments: null
  }),
  methods: {
    insertReview() {
      console.log(
        this.email, this.rating, this.comments, this.id
      )
      this.axios.post(`http://localhost:3000/beer/${this.id}`, {
        rating: this.rating,
        comments: this.comments
      },{
        headers: {
          'x-user': this.email
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => (
          this.dialog = false
      ))
    }
  }
}
</script>