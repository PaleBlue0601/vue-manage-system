import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../stores/permiss';
import Home from '../views/home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dshboard',
        meta: {
          title: '系统首页',
          permiss: '1',
        },
        component: () => import('../views/dashboard.vue')
      },
      {
        path: '/table',
        name: 'basetable',
        meta: {
          title: '表格',
          permiss: '2',
        },
        component: () => import('../views/table.vue'),
      },
      {
        path: '/import',
        name: 'import',
        meta: {
          title: '导入Excel',
          permiss: '2',
        },
        component: () => import('../views/import.vue'),
      },
      {
        path: '/export',
        name: 'export',
        meta: {
          title: '导出Excel',
          permiss: '2',
        },
        component: () => import('../views/export.vue'),
      },
      {
        path: '/tabs',
        name: 'tabs',
        meta: {
          title: 'tab选项卡',
          permiss: '3',
        },
        component: () => import('../views/tabs.vue'),
      },
      {
        path: '/form',
        name: 'baseform',
        meta: {
          title: '表单',
          permiss: '5',
        },
        component: () => import('../views/form.vue'),
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: '文件上传',
          permiss: '6'
        },
        component: () => import('../views/upload.vue')
      },
      {
        path: '/editor',
        name: 'editor',
        meta: {
          title: '富文本编辑器',
          permiss: '8'
        },
        component: () => import('../views/editor.vue')
      },
      {
        path: '/icon',
        name: 'icon',
        meta: {
          title: '自定义图标',
          permiss: '10'
        },
        component: () => import('../views/icon.vue')
      },
      {
        path: '/charts',
        name: 'basecharts',
        meta: {
          title: 'schart图表',
          permiss: '11'
        },
        component: () => import('../views/charts.vue')
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '权限管理',
          permiss: '13'
        },
        component: () => import('../views/permission.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '个人中心',
        },
        component: () => import('../views/user.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限',
    },
    component: () => import('../views/403.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username');
  const permiss = usePermissStore();
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permiss && !permiss.key.includes(<string>to.meta.permiss)) {
    // 如果没有权限，则进入403
    console.log(to);
    next('/403');
  } else {
    next();
  }
});

export default router;