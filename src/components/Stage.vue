<!-- HTML模板 -->
<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content grid-auto-middle bg-purple-dark">
          <div v-for="(item, index) in question_content" :key="index">
            <div class="question">{{ item }}</div>
          </div>
          <div id="sendButton" style="margin:30px">
            <el-button @click="sendMessage">提交调查结果</el-button>
          </div>
          <div id="hero_answer">
            <span>{{ getHero }}</span>
          </div>
          <div id="timeline_Answer">
            <span>{{ getTimeline }}</span>
          </div>
          <el-row :gutter="50">
            <el-col :span="16">
              <div class="grid-content grid-updown-shift bg-purple-light grid-left-shift hero">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-left-shift text-left-shift doc_name">{{ doc_content }}</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="hero grid-right-shift">{{ hero_content }}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <div class="hero" v-for="(doc_item, index) in docName" :key="index">
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-left-shift text-left-shift">
                          <el-link
                            class="drama"
                            type="primary"
                            @click="checkDoc(doc_item.text)"
                          >{{ doc_item.text }}</el-link>
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-right-shift">
                          <el-select select="1" v-model="docName[index].hero">
                            <el-option disabled value>请选择人物</el-option>
                            <el-option
                              v-for="send in sendList"
                              name="selectText"
                              :key="send.id"
                              :value="send.text"
                            >{{ send.text }}</el-option>
                          </el-select>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content grid-updown-shift bg-purple-light grid-right-shift timeline">
                <div class="timeline">{{ timeline_content }}</div>
                <div class="grid-sub-auto-middle">
                  <el-select
                    class="timeline"
                    select="1"
                    v-for="(doc_item, index) in docName"
                    v-model="timelineAnswer[index]"
                    :key="index"
                  >
                    <el-option disabled value>共7篇文档</el-option>
                    <el-option>{{ "……我再想想……" }}</el-option>
                    <el-option
                      v-for="(doc, index) in docName"
                      :key="index"
                      :value="doc.text"
                      :disabled="timelineAnswer.indexOf(doc.text) == -1 ? false:true"
                    >{{ doc.text }}</el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<!-- CSS模板 此处语法为SASS -->
<style lang="scss" scoped>
.container {
  margin: 12px auto;

  .drama {
    font-size: 16px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.question {
  font-size: 36px;
  padding: 5px 0;
  align-items: center;
  text-align: center;
}
.doc_name {
  font-size: 24px;
  padding: 15px 0;
}
.timeline {
  font-size: 24px;
  padding: 15px 0;
}
.hero {
  font-size: 24px;
  padding: 15px 0;
}
.text-left-shift {
  text-align: right;
  align-items: center;
}

.grid-updown-shift {
  margin-top: 50px;
  margin-bottom: 50px;
}
.grid-left-shift {
  margin-left: 50px;
}
.grid-right-shift {
  margin-right: 50px;
}
.grid-auto-middle {
  margin-right: auto;
  margin-left: auto;
}
.grid-auto-center {
  margin-top: 20 auto;
  margin-bottom: 5 auto;
}
.grid-sub-auto-middle {
  margin-right: auto 0;
  margin-left: auto 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  max-width: 1000px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
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
      question_content: [
        "请为每个文档选择正确的调查对象。",
        "然后按照文档内容实际发生时间，梳理时间线。"
      ],
      hero_content: "调查对象",
      timeline_content: "时间线",
      doc_content: "点击查看文档",
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
          text: "欧阳志保",
          id: "guy"
        },
        {
          text: "青晓燕",
          id: "girl"
        },
        {
          text: "欧阳文光",
          id: "dad"
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
      getHero: " ",
      getTimeline: " ",
      timelineAnswer: ["", "", "", "", "", "", ""],
      fileName: " "
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
        this.fileName = res.data.fileName;
        if (this.fileName != "" && this.fileName != undefined) {
          let server_path =
            process.env.VUE_APP_API.replace("/api/", "/") + this.fileName;
          console.log(server_path);
          window.open(server_path);
        }
        //this.getTimeline = res.data.timeline
      });
    },
    // 点击链接打开文件。
    checkDoc: function(doc_name) {
      let file_path =
        process.env.VUE_APP_API.replace("/api/", "/file/") + doc_name + ".pdf";
      console.log(file_path);
      window.open(file_path);
    }
  },
  // 本页面的初始化事件
  mounted() {}
};
</script>