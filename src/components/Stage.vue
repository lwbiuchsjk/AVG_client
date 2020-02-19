<!-- HTML模板 -->
<template>
  <div class="container">
    <div class="drama">
      {{ DramaContent }}
    </div>
    <div class="options">
      <div class="option" v-for="op in options" v-bind:key="op.data" v-bind:data-index="op.data" @click="next">{{ op.text }}</div>
    </div>
    <div class = "input">
      <p>{{input}}</p>
      <input button v-model="input">
    </div>
    <div>
      <button v-bind="isButtonDisabled">Button</button>
    </div>
  </div>
</template>

<!-- CSS模板 此处语法为SASS -->
<style lang="scss" scoped>
.container {
  margin: 12px auto;
  
  .drama {
    font-size: 24px;
  }
}
</style>

<!-- js模板 -->
<script>
import { AjaxDemo, GetNextMove } from '@/api/ajax'
export default {
  name: 'Stage',  // 该组件的名称
  // 在本页面中所有要使用到的数据
  data () {
    return {
      DramaContent: '请回答下列问题',
      options: [  // 操作选项
        {
          text: '选项一',  // 用于显示的文字
          data: '1'  // 选项对应的ID
        }, {
          text: '选项二',
          data: '2'
        }, {
          text: '选项三',
          data: '3'
        }, {
          text: '选项四',
          data: '4'
        }
      ],
      input: 'hello'
    }
  },
  // 在本页面中所有要用到的方法
  methods: {
    // 点击选项方法
    next: function(event) {
      let nextId = event.target.dataset['index']  // 获取选项对应的下一段落id
      GetNextMove(nextId).then(res => {
        this.options = res.data.options
      })
    }
  },
  // 本页面的初始化事件
  mounted() {
    // 使用演示接口
    AjaxDemo(new Date().toLocaleString()).then(res => {
      // 用请求到的演示数据替换演示内容
      this.DramaContent = res.data
    })
  }
}
</script>