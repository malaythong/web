<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items.slice(0, 5)" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <edit_profile v-model="dialog"></edit_profile>
      <settingAccount v-model="dialogg"></settingAccount>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ items.title }}</v-toolbar-title>
      <v-text-field label="Search" placeholder="ຊື່ກະທູ້, ຊື່ແທັກ, ໝວດໝູ່" outlined hide-details solo dense
        class="custom-text-field "></v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer />


      <v-btn color="primary" text @click="createNewTopic">
        <v-icon>mdi-comment-plus-outline</v-icon>
        <span>ສ້າງກະທູ້ໃໝ່</span>
      </v-btn>
      <!-- <v-btn color="primary" icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltipOn }">
              <v-avatar color="primary" dark v-on="{ ...tooltipOn, ...on }">
                <img src="https://www.newshub.co.nz/home/lifestyle/2019/08/the-top-five-cat-memes-of-all-time-rated/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1565234972425/KNOWYOURMEME-sad-cat-crying-1120.jpg" alt="John" />
              </v-avatar>
            </template>
            <span>Profile</span>
          </v-tooltip>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items.slice(5, 9)" :key="i" :to="item.to" router exact @click="test(i)">

            <v-list-item-title>
              <span>{{ item.list }}</span>
              <!-- <v-card  @click="test" v-if="item.list=='Manage Profile'">Manage Profile</v-card> -->
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import edit_profile from "~/components/edit_profile"
import settingAccount from "~/components/settingAccount"
export default {
  name: "DefaultLayout",
  components: { edit_profile, settingAccount },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "ໜ້າຫຼັຫ",
          to: "/content",
        },
        {
          icon: "mdi-comment-plus",
          title: "ສ້າງກະທູ້ໃໝ່",
          to: "/content/create",
        },
        {
          icon: "mdi-clock",
          title: "ປະຫວັດການເຂົ້າອ່ານ",
          to: "/content/feed",
        },
        {
          icon: "mdi-tag",
          title: "ແທັກ",
          to: "/info/tag",
        },
        {
          icon: "mdi-face-agent",
          title: "ຕິດຕໍ່ທິມງານ",
          to: "/report/contact_admin",
        },
        {
          list: "ບັນຊີ",
          to: "/info/profile",
        },
        {
          list: "ຈັດການບັນຊີ",
          to: "",
        },
        {
          list: "ຕັ້ງຄ່າ",
          to: "",
        },
        {
          list: "ອອກຈາກລະບົບ",
          to: "/manage/setting",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Report",
      dialog: false,
      dialogg: false,
    };
  },
  methods: {
    test(i) {
      console.log("test log", i)
      if (i == 1) {
        console.log("open dialog")
        this.dialog = true
      }
      if (i == 2) {
        console.log("open dialogg")
        this.dialogg = true
      }
    },
    onMenuItemClick(item) {
      if (item === 'Log Out') {
        // Call the logout method here
        this.logout();
      } else {
        // Handle other menu items
        console.log(item);
      }
    },
    logout() {
      this.$store.commit('setAuthenticated', false);
    },
    createNewTopic() {
      console.log("Button clicked! Create a new topic here.");
      this.$router.push('/content/create');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/phetsarath');

.custom-text-field {
  width: 50px;
  /* Adjust the width as needed */
}
#app{
  font-family: 'Phetsarath', sans-serif;                                  
}

</style>