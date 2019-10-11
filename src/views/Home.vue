<template>
  <div class="home_">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="header_wrap_">
      <div class="home_header_ w1024">
        <div class="nav_ clearfix">
          <div class="logo_">
            <img src="../assets/home/logo2.png" />
          </div>
          <div class="right_">
            <ul>
              <li
                @click="handleSwitch(0)"
                :class="currentTabKey == 0 ? 'active' : ''"
              >
                首页
              </li>
              <li
                @click="handleSwitch(1)"
                :class="currentTabKey == 1 ? 'active' : ''"
              >
                我们的产品
              </li>
              <li
                @click="handleSwitch(2)"
                :class="currentTabKey == 2 ? 'active' : ''"
              >
                理赔服务
              </li>
              <li
                @click="handleSwitch(3)"
                :class="currentTabKey == 3 ? 'active' : ''"
              >
                关于我们
              </li>
              <li>
                <router-link to="/login">
                  <button class="btn_ btn_plain_ btn_login_">用户登录</button>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="center_">
          <div class="title_">一站式员工福利保险方案专家</div>
          <div class="desc_">
            5000家企业，数十万名员工的信赖<br />
            用心做企业信任、员工满意的企业员工保险平台
          </div>
          <div class="btn_wrap_">
            <router-link style="margin-left: " to="/submitCustomPlan"
              ><button class="btn_ btn_default_">预约投保</button></router-link
            >
            <!-- <button class="btn_ btn_plain_ mrgl_18">定制方案</button> -->
          </div>
        </div>
      </div>
    </div>
    <div id="section1" class="content_ w1024">
      <div class="section_ section_1_">
        <div class="bottom_line_ title_">产品简介</div>
        <ul>
          <li class="item_">
            <img class="img_" src="../assets/home/img1.png" />
            <div class="item_title_">专为企业定制</div>
            <div class="desc_">
              可供企业定制<br />
              专属方案优化企业福利待遇
            </div>
          </li>
          <li class="item_">
            <img class="img_" src="../assets/home/img2.png" />
            <div class="item_title_">产品多样化</div>
            <div class="desc_">
              涵盖员工保险、体检<br />
              和多种增值服务，为<br/>
              企业员工提供了一站<br />
              式家庭保障产品的购买
            </div>
          </li>
          <li class="item_">
            <img class="img_" src="../assets/home/img3.png" />
            <div class="item_title_">线上操作，解放hr </div>
            <div class="desc_">
              智能管理系统<br />
              为企业提供全程管理服务，<br/>
              支持随时增、减员及在线理赔
            </div>
          </li>
        </ul>
      </div>
      <div id="section2" class="section_ section_1_">
        <div class="bottom_line_ title_">理赔流程</div>
        <div style="height: 300px;">
          <svg
            width="100%"
            height="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              class="g-rect-fill"
              points="0,252 246,60 497,252 757,60 1024,252"
              style="fill:white;stroke:#297FFF;stroke-width:2"
            >
              <animate
                attributeName="points"
                attributeType="XML"
                from="1"
                to="1024"
                begin="2s"
                dur="5s"
                fill="freeze"
              />
            </polyline>
            <circle
              cx="246"
              cy="60"
              r="10"
              stroke="#297FFF"
              stroke-width="2"
              fill="#297FFF"
            />
            <circle
              cx="497"
              cy="252"
              r="10"
              stroke="#297FFF"
              stroke-width="2"
              fill="#297FFF"
            />
            <circle
              cx="757"
              cy="60"
              r="10"
              stroke="#297FFF"
              stroke-width="2"
              fill="#297FFF"
            />

            <text
              font-weight="600"
              font-size="18"
              fill="#297FFF"
              text-anchor="middle"
              y="155"
              x="238"
            >
              微信申请理赔
            </text>
            <text
              font-size="12"
              fill="black"
              text-anchor="middle"
              y="180"
              x="238"
            >
              关注公众号，在线申请
            </text>
            <text
              font-size="46"
              fill="rgba(51,51,51,0.3)"
              text-anchor="middle"
              y="36"
              x="248"
            >
              01
            </text>
            <text
              font-weight="600"
              font-size="18"
              fill="#297FFF"
              text-anchor="middle"
              y="105"
              x="490"
            >
              拍照上传单据
            </text>
            <text
              font-size="12"
              fill="black"
              text-anchor="middle"
              y="150"
              x="492"
            >
              医疗理赔2000元以下
              <br />
              免收原始纸质单据
            </text>
            <text
              font-size="46"
              fill="rgba(51,51,51,0.3)"
              text-anchor="middle"
              y="300"
              x="495"
            >
              02
            </text>
            <text
              font-weight="600"
              font-size="18"
              fill="#297FFF"
              text-anchor="middle"
              y="155"
              x="760"
            >
              赔款给付
            </text>
            <text
              font-size="12"
              fill="black"
              text-anchor="middle"
              y="180"
              x="760"
            >
              审核通过，打款报销
              <br />
              全程透明，进度清晰可查
            </text>
            <text
              font-size="46"
              fill="rgba(51,51,51,0.3)"
              text-anchor="middle"
              y="36"
              x="760"
            >
              03
            </text>
            <image
              xlink:href="../assets/home/qrcode.jpeg"
              x="200"
              y="220"
              height="79"
              width="79"
            />
          </svg>
        </div>
      </div>
      <div id="section3" class="section_ section_3_">
        <div class="bottom_line_ title_">公司简介</div>
        <div>
          <div class="img_wrap_">
            <img src="../assets/home/img4.png" />
          </div>
          <div class="right_">
            <div class="item_title_">ABOUT US</div>
            <div class="desc_">
              宇泰员福是专业的企业员工保险平台，基于成熟的产品和系统服务经验，我们为企业提供一站式员工保险服务和员工保险管理系统，目前宇泰员福已与人保财险、光大永明、中航安盟等知名保险公司签约合作。
              我们的团队是一支年轻且富有想象力的创业团队，专业、专注、敢于实践。团队核心成员来自于太阳联合，美亚，平安，友邦等著名保险公司以及甲骨文、软通动力中科软等著名IT公司，核心成员均有超过十年的保险行业和大数据运营经验。
            </div>
          </div>
        </div>
      </div>
      <div class="section_ section_4_">
        <div class="bottom_line_ title_">他们信任员福</div>
        <div style="margin-bottom: 32px;" class="c_">
          <a-row :gutter="12">
            <a-col :span="4">
              <img class="img_" src="../assets/home/c1.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c2.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c3.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c4.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c5.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c6.jpg" />
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="4">
              <img class="img_" src="../assets/home/c7.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c8.jpg" />
            </a-col>
            <a-col :span="4">
              <img class="img_" src="../assets/home/c9.jpg" />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="footer_">
      <div class="w1024">
        <a-row class="pre_">
          <a-col :span="12">
            <div class="left_">
              <div class="mrg_b27"></div>
              <div class="mrg_b23">
                <a-icon
                  type="phone"
                />客服专线：400-820-3433（服务时间9:30-17:30）
              </div>
              <div><a-icon type="mail" />客服邮箱：kefu@ssish.com</div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="right_">
              <div class="qrcode_wrap_">
                <img src="../assets/home/qrcode.jpeg" />
                宇泰员福公众号
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="company_info_">
        宇泰信息技术有限公司 © 2019-2029 yutaieb.com All Rights Reserved
        京ICP备16001338号-6
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.home_ {
  min-width: 1200px;
}
.btn_wrap_ {
  text-align: center;
  a:focus,
  button:focus,
  button:active {
    outline: none;
  }
}
.g-rect-fill {
  fill: none;
  stroke-width: 10;
  stroke: #ff7700;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 0, 1370;
  stroke-dashoffset: 0;
  animation: lineMove 2s ease-out infinite;
}
@keyframes lineMove {
  0% {
    stroke-dasharray: 0, 1350;
  }
  100% {
    stroke-dasharray: 1350, 1350;
  }
}
.w1200 {
  max-width: 1200px;
  margin: 0 auto;
}
.w1024 {
  max-width: 1024px;
  margin: 0 auto;
}
.mrgl_18 {
  margin-left: 18px;
}
.mrg_b27 {
  margin-bottom: 27px;
}
.mrg_b23 {
  margin-bottom: 23px;
}
img {
  display: block;
  width: 100%;
  height: auto;
}
.header_wrap_ {
  background: url("../assets/home/img5.png") no-repeat;
  background-size: 100% 100%;
  background-position: left top;
  padding-bottom: 2px;

  .nav_ {
    height: 74px;
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    .logo_ {
      width: 121px;
      height: 33px;
      display: inline-block;
      margin-top: 22px;
    }
    .right_ {
      float: right;
      padding-top: 16px;
      li {
        display: inline-block;
        text-align: center;
        margin-left: 56px;
        font-size: 13px;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        &.active {
          &::after {
            display: block;
            content: "";
            margin: 0 auto;
            width: 36px;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(0, 240, 255, 1) 0%,
              rgba(0, 132, 255, 1) 100%
            );
            border-radius: 1px;
            margin-top: 28px;
          }
        }
      }
    }
  }
}
.content_ {
  text-align: center;
  .bottom_line_ {
    &::after {
      display: block;
      content: "";
      width: 133px;
      height: 1px;
      background: rgba(41, 127, 255, 1);
      margin: 6px auto 0;
    }
  }
  .section_ {
    padding-top: 100px;
    .title_ {
      width: 393px;
      height: 34px;
      background: url("");
      margin: 0 auto 66px;
      font-size: 26px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .section_1_ {
    .item_ {
      display: inline-block;
      width: 211px;
      margin-right: 114px;
      vertical-align: top;
      &:last-child {
        margin-right: 0;
      }
      .img_ {
        height: 211px;
      }
      .item_title_ {
        font-size: 19px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin: 28px 0 15px;
      }
      .desc_ {
        font-size: 13px;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .section_3_ {
    .img_wrap_ {
      display: inline-block;
      width: 466px;
      height: 320px;
      background: #eee;
      vertical-align: top;
    }
    .right_ {
      display: inline-block;
      width: 554px;
      padding: 50px 36px;
      text-align: left;
      .item_title_ {
        font-size: 19px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 53px;
        padding-bottom: 20px;
        width: 133px;
        border-bottom: 1px solid rgba(41, 127, 255, 1);
        margin-bottom: 21px;
      }
      .desc_ {
        font-size: 13px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 31px;
      }
    }
  }
  .section_4_ {
    .img_wrap_ {
      display: inline-block;
      width: 160px;
      height: 53px;
      margin-right: 12px;
      background: #eee;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.footer_ {
  background: rgba(42, 53, 69, 1);
  .pre_ {
    height: 187px;
    padding-top: 39px;
    .left_ {
      border-right: 1px solid rgba(251, 251, 251, 1);
      height: 112px;
      font-size: 16px;
      font-family: SourceHanSansCN-Light;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: left;
    }
    .right_ {
      .qrcode_wrap_ {
        margin-left: 375px;
        color: #fff;
        text-align: center;
        img {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .company_info_ {
    height: 48px;
    line-height: 48px;
    background: rgba(33, 42, 56, 1);
    font-size: 12px;
    font-family: SourceHanSansCN-Light;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      currentTabKey: 0
    };
  },
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    if (location.hash.indexOf("section") > -1) {
      window.location.hash = location.hash.substr(0, 9);
    }
  },
  methods: {
    handleSwitch(index) {
      this.currentTabKey = index;
      window.location.hash = "#section" + index;
    }
  }
};
</script>
