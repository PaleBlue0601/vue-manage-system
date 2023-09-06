<template>
  <div class="tags" v-if="tags.show">
    <ul>
      <li class="tags-li" v-for="(item, index) in tags.list" :class="{ active: isActive(item.path) }" :key="index">
        <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
        <el-icon @click="closeTags(index)">
          <Close />
        </el-icon>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from "../stores/tags";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

const tags = useTagsStore();
const route = useRoute();
const router = useRouter();

const isActive = (path: string) => {
  return path === route.fullPath;
}

const closeTags = (index: number) => {
  const deItem = tags.list[index];
  tags.delTagsItem(index);
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
  if (item) {
    deItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push('/');
  }
}

const setTags = (route: any) => {
  const isExist = tags.list.some(item => {
    return item.path === route.fullPath;
  })
  if (!isExist) {
    if (tags.list.length >= 8) tags.delTagsItem(0);
    tags.setTagsItem({
      name: route.name,
      path: route.fullPath,
      title: route.meta.title
    });
  }
}
setTags(route);
onBeforeRouteUpdate(to => {
  setTags(to);
})
// 关闭其他
const closeOther = () => {
  const indexItem = tags.list.filter(item => {
    return item.path === route.fullPath;
  })
  tags.closeTagsOther(indexItem)
}
// 关闭全部
const closeAll = () => {
  tags.clearTags()
}

const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll();
}
</script>

<style lang="less">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;

  ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}

.tags-li {
  display: flex;
  align-items: center;
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>