<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="primary">
          <v-card-title class="white--text font-weight-bold"
            >ຈຳນວນຜູ້ໃຊ້</v-card-title
          >
          <v-card-text>
            <h2
              class="d-flex justify-end"
              style="font-size: 50px; color: #ffffff"
            >
              {{ userCount }}
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="primary">
          <v-card-title class="white--text font-weight-bold"
            >ຈຳນວນກະທູ້</v-card-title
          >
          <v-card-text>
            <h2
              class="d-flex justify-end"
              style="font-size: 50px; color: #ffffff"
            >
              {{ forumCount }}
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="primary">
          <v-card-title class="white--text font-weight-bold"
            >ຈຳນວນແທັກ</v-card-title
          >
          <v-card-text>
            <h2
              class="d-flex justify-end"
              style="font-size: 50px; color: #ffffff"
            >
              {{ tagCount }}
            </h2>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="primary">
          <v-card-title class="white--text font-weight-bold"
            >ຈຳນວນຄວາມຄິດເຫັນ</v-card-title
          >
          <v-card-text>
            <h2
              class="d-flex justify-end"
              style="font-size: 50px; color: #ffffff"
            >
              {{ commentCount }}
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      userCount: 0,
      tagCount: 0,
      forumCount: 0,
      commentCount: 0,
    }
  },
  apollo: {
    userCount: {
      query: gql`
        query Users {
          user_aggregate(where: { status: { _gte: 1, _lte: 2 } }) {
            aggregate {
              count
            }
          }
          tag_aggregate(where: { status: { _gte: 1, _lte: 2 } }) {
            aggregate {
              count
            }
          }
          forum_aggregate(where: { status: { _gte: 1, _lte: 2 } }) {
            aggregate {
              count(distinct: false)
            }
          }
          comment_aggregate(where: { status: { _gte: 1, _lte: 2 } }) {
            aggregate {
              count
            }
          }
        }
      `,
      result({ data }) {
        ;(this.userCount = data.user_aggregate.aggregate.count),
          (this.tagCount = data.tag_aggregate.aggregate.count),
          (this.forumCount = data.forum_aggregate.aggregate.count)
        this.commentCount = data.comment_aggregate.aggregate.count
      },
    },
  },
}
</script>
<style>
.primary {
  background-color: #2196f3;
}
</style>
