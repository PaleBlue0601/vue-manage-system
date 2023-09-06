<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button :icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm(login)">
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { usePermissStore } from "../stores/permiss";

interface RuleForm {
  username: string,
  password: string
}

const router = useRouter()
const param = reactive<RuleForm>({
  username: 'admin',
  password: '123456'
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})
const permiss = usePermissStore()
const login = ref<FormInstance>();
const submitForm = (formEL: FormInstance | undefined) => {
  if (!formEL) return;
  formEL.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('登录成功')
      localStorage.setItem('ms_username', param.username)
      const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user']
      permiss.handleSet(keys)
      localStorage.setItem('ms_keys', JSON.stringify(keys))
      router.push('/')
    } else {
      ElMessage.error('登录失败')
      return false;
    }
  })
}
</script>

<style scoped lang="less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../assets//img/login-bg.jpg');
  background-size: 100%;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;

  .ms-title {
    color: #fff;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  .ms-content {
    padding: 30px;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
}
</style>