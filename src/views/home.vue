<template>
  <Vheader />
  <Vsidebar />
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <Vtags />
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="tags.nameList">
            <div :class="{container: isDashboard}">
              <component :is="Component"></component>
            </div>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vheader from "../components/header.vue";
import Vsidebar from "../components/sidebar.vue";
import Vtags from "../components/tags.vue";
import { useSidebarStore } from "../stores/sidebar";
import { useTagsStore } from "../stores/tags";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
let isDashboard = computed(() => {
  return route.name !== 'dshboard'
})

const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>