<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"  
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in contentMenu"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ checkRole.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row>
        <v-col v-if="checkRole != 3" :style="isAdmin === true ? 'display:none;' : ''">
          <SearchBar />
        </v-col>
      </v-row>
      <v-spacer />

      <v-btn
        v-if="checkRole != 3"
        color="primary"
        text
        @click="createNewTopic"
        :style="isAdmin === true ? 'display:none;' : ''"
      >
        <v-icon>mdi-comment-plus-outline</v-icon>
        <span>ສ້າງກະທູ້ໃໝ່</span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltipOn }">
              <v-avatar
                color="primary"
                class="avatar-text"
                dark
                v-on="{ ...tooltipOn, ...on }"
              >
                {{ getUsernameInitials(localeUsername) }}
              </v-avatar>
            </template>
            <span>Profile</span>
          </v-tooltip>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items.slice(13, 17)"
            :key="i"
            :to="item.to"
            router
            exact
            @click="test(i)"
          >
            <v-list-item-title>
              <span>{{ item.list }} </span>
              <v-card @click="test" v-if="item.list == 'Manage Profile'"
                >Manage Profile</v-card
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <settingAccount v-model="dialogg"></settingAccount>
      <edit_profile v-model="dialog"></edit_profile>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import edit_profile from '~/components/edit_profile'
import settingAccount from '~/components/settingAccount'
import _ from 'lodash'
import SearchBar from '~/components/search.vue'
export default {
  name: 'DefaultLayout',
  components: { edit_profile, settingAccount, SearchBar },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsUser: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/content',
        },
        {
          icon: 'mdi-comment-plus',
          title: 'ສ້າງກະທູ້ໃໝ່',
          to: '/content/create',
        },
        {
          icon: 'mdi-clock',
          title: 'ປະຫວັດການເຂົ້າອ່ານ',
          to: '/content/feed',
        },
        {
          icon: 'mdi-tag',
          title: 'ແທັກ',
          to: '/info/tag',
        },
        {
          list: 'ບັນຊີ',
          to: '/info/profile',
        },
        {
          list: 'ຈັດການບັນຊີ',
          to: '',
        },
        {
          list: 'ອອກຈາກລະບົບ',
          to: '/auth/login',
        },
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/content',
        },
        {
          icon: 'mdi-comment-plus',
          title: 'ສ້າງກະທູ້ໃໝ່',
          to: '/content/create',
        },
        {
          icon: 'mdi-clock',
          title: 'ປະຫວັດການເຂົ້າອ່ານ',
          to: '/content/feed',
        },
        {
          icon: 'mdi-tag',
          title: 'ແທັກ',
          to: '/info/tag',
        },
        {
          icon: 'mdi-face-agent',
          title: 'ຕິດຕໍ່ທີມງານ',
          to: '/report/contact_admin',
        },
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/report/dashboard',
        },
        {
          icon: 'mdi-account-supervisor',
          title: 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້',
          to: '/manage/user',
        },
        {
          icon: 'mdi-forum',
          title: 'ຈັດການຂໍ້ມູນກະທູ້',
          to: '/manage/forum',
        },
        {
          icon: 'mdi-tag',
          title: 'ຈັດການຂໍ້ມູນແທັກ',
          to: '/manage/tag',
        },
        {
          icon: 'mdi-shape',
          title: 'ຈັດການຂໍ້ມູນໝວດໝູ່',
          to: '/manage/categories',
        },
        {
          icon: 'mdi-forum-outline',
          title: 'ລາຍງານຂໍ້ມູນກະທູ້',
          to: '/report/forum',
        },
        {
          icon: 'mdi-tag-outline',
          title: 'ລາຍງານຂໍ້ມູນແທັກ',
          to: '/report/tag',
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'ລາຍງານມູນຜູ້ໃຊ້',
          to: '/report/user',
        },
        {
          list: 'ບັນຊີ',
          to: '/info/profile',
        },
        {
          list: 'ຈັດການບັນຊີ',
          to: '',
        },

        {
          list: 'ອອກຈາກລະບົບ',
          to: '/manage/setting',
        },
      ],
      unknow: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/content',
        },
        {
          list: 'ບັນຊີ',
          to: '/info/profile',
        },
        {
          list: 'ຈັດການບັນຊີ',
          to: '',
        },
        {
          list: 'ອອກຈາກລະບົບ',
          to: '/auth/login',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Report',
      dialog: false,
      dialogg: false,
      localeId: null,
      localeRole: null,
      localeId: null,
      userData: null,
      localeUsername: null,
      localeRole: null,
      localeEmail: null,
      searchQuery: '',
      username: null,
    }
  },
  created() {
    // Get the data from Local Storage when the component is created
    // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem('userDatId')
    this.localeUsername = localStorage.getItem('userDataUserName')
    // this.localeEmail = localStorage.getItem("userDataEmail");
    this.localeRole = localStorage.getItem('userDataRole')
    
  },
  computed: {
    checkRole() {
      if (this.localeRole === 'user') {
        return 1
      } else if (this.localeRole === 'admin') {
        return 2
      } else {
        return 3
      }
    },

    isAdmin() {
      const userRole = localStorage.getItem('userDataRole')
      const isEmptyUserRole = _.isEmpty(_.trim(userRole))

      if (isEmptyUserRole) {
        return false
      } else {
        if (userRole.toString().toLowerCase() === 'admin') {
          return true
        } else if (userRole.toString().toLowerCase() === 'user') {
          return false
        } else {
          return false
        }
      }
    },

    contentMenu() {
      const userRole = localStorage.getItem('userDataRole')
      const isEmptyUserRole = _.isEmpty(_.trim(userRole))
      if (!isEmptyUserRole) {
        if (userRole.toString().toLowerCase() === 'user') {
          return [
            {
              icon: 'mdi-home',
              title: 'ໜ້າຫຼັກ',
              to: '/content',
            },
            {
              icon: 'mdi-comment-plus',
              title: 'ສ້າງກະທູ້ໃໝ່',
              to: '/content/create',
            },
            {
              icon: 'mdi-clock',
              title: 'ປະຫວັດການເຂົ້າອ່ານ',
              to: '/content/feed',
            },
            {
              icon: 'mdi-tag',
              title: 'ແທັກ',
              to: '/info/tag',
            },
            // {
            //   icon: 'mdi-face-agent',
            //   title: 'ຕິດຕໍ່ທີມງານ',
            //   to: '/report/contact_admin',
            // },
          ]
        } else if (userRole.toString().toLowerCase() === 'admin') {
          return [
            {
              icon: 'mdi-view-dashboard',
              title: 'Dashboard',
              to: '/report/dashboard',
            },
            {
              icon: 'mdi-account-supervisor',
              title: 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້',
              to: '/manage/user',
            },
            {
              icon: 'mdi-forum',
              title: 'ຈັດການຂໍ້ມູນກະທູ້',
              to: '/manage/forum',
            },
            {
              icon: 'mdi-tag',
              title: 'ຈັດການຂໍ້ມູນແທັກ',
              to: '/manage/tag',
            },
            {
              icon: 'mdi-shape',
              title: 'ຈັດການຂໍ້ມູນໝວດໝູ່',
              to: '/manage/categories',
            },
            {
              icon: 'mdi-forum-outline',
              title: 'ລາຍງານຂໍ້ມູນກະທູ້',
              to: '/report/forum',
            },
            {
              icon: 'mdi-tag-outline',
              title: 'ລາຍງານຂໍ້ມູນແທັກ',
              to: '/report/tag',
            },
            {
              icon: 'mdi-account-multiple-outline',
              title: 'ລາຍງານມູນຜູ້ໃຊ້',
              to: '/report/user',
            },
            {
              list: 'ບັນຊີ',
              to: '/info/profile',
            },
            {
              list: 'ຈັດການບັນຊີ',
              to: '',
            },
            {
              list: 'ອອກຈາກລະບົບ',
              to: '/manage/setting',
            },
          ]
        } else {
          return [
            {
              icon: 'mdi-home',
              title: 'ໜ້າຫຼັກ',
              to: '/content',
            },
          ]
        }
      } else {
        return []
      }
    },
  },
  methods: {
    getUsernameInitials(localeUsername) {
      console.log('Username:', localeUsername)
      if (!localeUsername) {
        return '' // Handle the case where username is null or empty
      }
      const initials = localeUsername
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
      return initials
    },

    saveData() {
      // Save the data to Local Storage
      localStorage.setItem('userData', this.userData)
      localStorage.setItem('userDatId', this.localeId)
      localStorage.setItem('userDataUserName', this.localeUsername)
      localStorage.setItem('userDataEmail', this.localeEmail)
      localStorage.setItem('userDataRole', this.localeRole)
    },
    test(i) {
      console.log('test log', i)
      if (i == 1) {
        console.log('open dialog')
        this.dialog = true
      }
      if (i == 2) {
        console.log('open dialogg')
        // this.dialogg = true
        this.$router.push('/auth/login')
      }
    },
    onMenuItemClick(item) {
      if (item === 'Log Out') {
        // Call the logout method here
        this.logout()
      } else {
        // Handle other menu items
        console.log(item)
      }
    },
    logout() {
      this.$store.commit('setAuthenticated', false)
    },
    createNewTopic() {
      console.log('Button clicked! Create a new topic here.')
      this.$router.push('/content/create')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/phetsarath');
.search-row {
  margin-top: 0; /* Adjust the margin-top value as needed */
  margin-bottom: 0; /* Adjust the margin-bottom value as needed */
}

.custom-text-field {
  width: 50px;
  /* Adjust the width as needed */
}
.avatar-text {
  color: white; /* Set the desired font color */
  font-size: 14px; /* Optionally adjust the font size */
}
#app {
  font-family: 'Phetsarath', sans-serif;
}
</style>