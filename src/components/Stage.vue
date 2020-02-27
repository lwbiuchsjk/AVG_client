<!-- HTML模板 -->
<template>
  <div class="container">
    <div class="drama">{{ DramaContent }}</div>
    <div class="options">
      <div
        class="option"
        v-for="op in options"
        v-bind:key="op.data"
        v-bind:data-index="op.data"
        @click="next"
      >{{ op.text }}</div>
    </div>
    <div class="input">
      <p>{{input}}</p>
      <input button v-model="input" />
    </div>
    <div class="select">
      <select select="1" v-model="selectText">
        <option disabled value>请选择对象</option>
        <option
          v-for="send in sendList"
          name="selectText"
          :key="send.id"
          :value="send.text"
        >{{ send.text }}</option>
      </select>
    </div>
    <div id="hero_Answer" v-for="(doc_item, index) in docName" :key="index">
      <tr style="text-align:center">
        <span style="width:900px;float:left;text-align:right">{{doc_item.text}}</span>
        <el-select select="1" v-model="docName[index].hero" style="width:100px;float:left">
          <el-option disabled value>请选择对象</el-option>
          <el-option
            v-for="send in sendList"
            name="selectText"
            :key="send.id"
            :value="send.text"
          >{{ send.text }}</el-option>
        </el-select>
      </tr>
    </div>
    <div id="time_line">
      <el-select
        select="1"
        v-for="(doc_item, index) in docName"
        v-model="timelineAnswer[index]"
        :key="index"
      >
        <el-option disabled value>请选择文档</el-option>
        <el-option>{{ "我再想想" }}</el-option>
        <el-option
          v-for="(doc, index) in docName"
          :key="index"
          :value="doc.text"
          :disabled="timelineAnswer.indexOf(doc.text) == -1 ? false:true"
        >{{ doc.text }}</el-option>
      </el-select>
    </div>
    <span>{{ timelineAnswer }}</span>
    <div id="sendButton">
      <el-button @click="sendMessage">Button</el-button>
    </div>
    <div id="hero_Answer">
      <span>{{ getHero }}</span>
    </div>
    <div id="timeline_Answer">
      <span>{{ getTimeline }}</span>
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
import { /*AjaxDemo,*/ GetNextMove, SendAnswer } from "@/api/ajax";
export default {
  name: "Stage", // 该组件的名称
  // 在本页面中所有要使用到的数据
  data() {
    return {
      DramaContent:
        "请为下列文档，选择正确的调查对象。调查对象有三人：欧阳志保、青晓燕、欧阳文光",
      options: [
        // 操作选项
        {
          text: "选项一", // 用于显示的文字
          data: "1" // 选项对应的ID
        },
        {
          text: "选项二",
          data: "2"
        },
        {
          text: "选项三",
          data: "3"
        },
        {
          text: "选项四",
          data: "4"
        }
      ],
      input: "hello",
      sendList: [
        {
          text: "欧阳文光",
          id: "dad"
        },
        {
          text: "欧阳志保",
          id: "guy"
        },
        {
          text: "青晓燕",
          id: "girl"
        }
      ],
      docName: [
        { text: "调查5", hero: "" },
        { text: "调查7", hero: "" },
        { text: "调查8", hero: "" },
        { text: "调查12", hero: "" },
        { text: "调查14", hero: "" },
        { text: "调查24", hero: "" },
        { text: "调查36", hero: "" }
      ],
      getHero: "",
      getTimeline: "",
      timelineAnswer: ["", "", "", "", "", "", ""]
    };
  },
  // 在本页面中所有要用到的方法
  methods: {
    // 点击选项方法
    next: function(event) {
      let nextId = event.target.dataset["index"]; // 获取选项对应的下一段落id
      GetNextMove(nextId).then(res => {
        this.options = res.data.options;
      });
    },
    // 尝试发送答案
    sendMessage: function() {
      SendAnswer(this.docName, this.timelineAnswer).then(res => {
        this.getHero = res.data.hero;
        this.getTimeline = res.data.timeline;
        //this.getTimeline = res.data.timeline
      });
    }
  },
  // 本页面的初始化事件
  mounted() {
    // 使用演示接口
    /*
    AjaxDemo(new Date().toLocaleString()).then(res => {
      // 用请求到的演示数据替换演示内容
      this.DramaContent = res.data
    })
    */
  }
};
</script>