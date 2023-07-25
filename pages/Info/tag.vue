<template>
    <div>
        <v-row justify="center">
            <v-col class=" mt-10" cols="12" sm="9">
                <v-text-field label="Search" placeholder="ຊື່ແທັກ" outlined hide-details solo dense
                    class="custom-text-field mb-12" append-icon="mdi-magnify"></v-text-field>
                <v-card elevation="0">
                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>ແທັກທີ່ຕິດຕາມ</v-toolbar-title>
                    </v-toolbar>
                    <v-list >
                        <v-list-item-group>
                            <template>
                                <v-list-item v-for="(item, index) in items" :key="index">
                                    <template>
                                        <v-list-item-content>
                                            <v-row>
                                                <v-col sm="1" class="d-flex align-center">
                                                    <v-row class="d-flex justify-center">
                                                        <v-icon color="primary">
                                                            mdi-tag-outline
                                                        </v-icon>
                                                    </v-row>
                                                </v-col><v-col>
                                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-btn depressed color="error">ຍົກເລີກຕິດຕາມ
                                            </v-btn>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card>

                <v-card elevation="0">
                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>ແທັກທັງໝົດ</v-toolbar-title>
                    </v-toolbar>
                    <v-list >
                        <v-list-item-group>
                            <template>
                                <v-list-item v-for="(item, index) in items" :key="index">
                                    <template>
                                        <v-list-item-content>
                                            <v-row>
                                                <v-col sm="1" class="d-flex align-center">
                                                    <v-row class="d-flex justify-center">
                                                        <v-icon color="primary">
                                                            mdi-tag-outline
                                                        </v-icon>
                                                    </v-row>
                                                </v-col><v-col>
                                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-btn depressed color="primary">ຕິດຕາມ
                                            </v-btn>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            posts: [
                {
                    title: "First Post",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet lobortis sem, et fringilla ligula tristique in.",
                    //cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
                },
                {
                    title: "Second Post",
                    content:
                        "Sed eu odio ac felis tincidunt volutpat non vitae lacus. Aenean dapibus, tellus vitae ultrices luctus, purus felis volutpat ipsum, nec volutpat purus ex id justo.",
                    cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
                },
                {
                    title: "Third Post",
                    content:
                        "Nunc accumsan libero non mauris laoreet, non lacinia lectus maximus. Etiam sagittis ipsum a volutpat auctor.",
                    cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
                },
            ],
            selected: [2],
            items: [
                {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                },
                {
                    action: '2 hr',
                    headline: 'Summer BBQ',
                    subtitle: `Wish I could come, but I'm out of town this weekend.`,
                    title: 'me, Scrott, Jennifer',
                },
                {
                    action: '6 hr',
                    headline: 'Oui oui',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?',
                    title: 'Sandra Adams',
                },
                {
                    action: '12 hr',
                    headline: 'Birthday gift',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                    title: 'Trevor Hansen',
                },
                {
                    action: '18hr',
                    headline: 'Recipe to try',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    title: 'Britta Holt',
                },
            ],
        };
    },
};
</script>
  