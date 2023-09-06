<template>
  <div class="handle-box">
    <el-button type="primary" @click="exportXlsx">导出Excel</el-button>
  </div>
  <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
    <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="sno" label="学号"></el-table-column>
    <el-table-column prop="class" label="班级"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column prop="sex" label="性别"></el-table-column>
  </el-table>
</template>

<script setup lang="ts" name="export">
import { ref } from "vue";
import * as xlsx from "xlsx";

interface TableItem {
  id: number;
  name: string;
  sno: string;
  class: string;
  age: string;
  sex: string
}

const tableData = ref<TableItem[]>([])

// 获取表格数据
const getData = () => {
  tableData.value = [
    {
      id: 1,
      name: '小明',
      sno: 'S001',
      class: '一班',
      age: '10',
      sex: '男',
    },
    {
      id: 2,
      name: '小红',
      sno: 'S002',
      class: '一班',
      age: '9',
      sex: '女',
    },
  ];
};
getData();

const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];

const exportXlsx = () => {
  tableData.value.map((item: TableItem, index: number) => {
    const arr: any[] = [index + 1];
    arr.push(...[item.name, item.sno, item.class, item.age, item.sex]);
    list.push(arr);
  })
  let WorkSheet = xlsx.utils.aoa_to_sheet(list)
  let new_workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(new_workbook, WorkSheet, '第一页')
  xlsx.writeFile(new_workbook, '表格.xlsx')
}


</script>

<style scoped lang="less">
.handle-box {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  font-size: 14px;
}
</style>