<template>
    <v-app>
        <v-navigation-drawer
                app
                temporary
                v-model="drawer"
        >
            <v-list>
                <v-list-item
                        v-for="link of links"
                        :key="link.title"
                        :to="link.url">
                    <v-list-item-icon>
                        <v-icon>mdi-{{link.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                        v-if="isUserLoggedIn"
                        @click="onLogout"
                  >
                    <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="'Logout'"></v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark color="primary">
            <v-app-bar-nav-icon
                  @click="drawer = !drawer"
                  class="hidden-md-and-up"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" class="pointer">Ad application</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                 <v-btn
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                        text>
                    <v-icon left>mdi-{{link.icon}}</v-icon>
                  {{link.title}}
                </v-btn>
                <v-btn
                        @click="onLogout"
                        v-if="isUserLoggedIn"
                        text>
                    <v-icon left>mdi-exit-to-app</v-icon>
                  LogOut
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content>

            <!-- Provides the application the proper gutter -->
        <v-container fluid>
                <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
        <template v-if="error">
         <v-snackbar
                    :multi-line="true"
                    :timeout="5000"
                    color="error"
                    @input="closeError"
                    :value="true"
            >
            {{error}}
            <v-btn
              dark
              text
             @click="closeError"
             >
             Close
             </v-btn>
          </v-snackbar>
        </template>
      </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
            }
        },
      methods: {
        closeError() {
          this.$store.dispatch('clearError');
        },
        onLogout() {
          this.$store.dispatch('logoutUser');
          this.$router.push('/');
        }
      },
      computed: {
        error() {
          return this.$store.getters.error;
        },
        isUserLoggedIn() {
          return this.$store.getters.isUserLoggedIn;
        },
        links() {
          if (this.isUserLoggedIn) {
            return [
                    {title: 'Orders', icon: 'bookmark-outline', url: '/orders'},
                    {title: 'New add', icon: 'file-plus', url: '/new'},
                    {title: 'My ads', icon: 'format-list-bulleted', url: '/list'},
            ]
          }
          return [
                    {title: 'Login', icon: 'lock', url: '/login'},
                    {title: 'Registration', icon: 'face', url: '/registration'},

          ]
        },
      }
    }
</script>

<style lang="scss">
    * {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }

    * i {
        font-family: 'Material Icons';
    }
</style>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
