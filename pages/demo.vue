<template>
    <div>
        <v-btn @click="openRatingDialog">Open Rating Dialog</v-btn>

        <!-- Rating Dialog -->
        <v-dialog v-model="ratingDialog" max-width="500">
            <v-card>
                <v-card-title>Rate This Item</v-card-title>
                <v-card-text class="d-flex justify-center">
                    <v-rating v-model="rating" icon-label="custom icon label text {0} of {1}" size="64"></v-rating>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="closeRatingDialog">Close</v-btn>
                    <v-btn text @click="submitRating">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            ratingDialog: false,
        };
    },
    methods: {
        openRatingDialog() {
            this.ratingDialog = true;
        },
        closeRatingDialog() {
            this.ratingDialog = false;
        },
        submitRating() {
            console.log('Rating submitted:', this.rating);
            this.ratingDialog = false;
        },
    },
};
</script>
  