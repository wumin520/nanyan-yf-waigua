export default {
  // 行业分类
  industryOptions: [
    {
      name: "农、林、牧、渔业",
      value: "0"
    },
    {
      name: "采矿业",
      value: "1"
    },
    {
      name: "制造业",
      value: "2"
    },
    {
      name: "电力、热力、燃气及水生产和供应业",
      value: "3"
    },
    {
      name: "建筑业",
      value: "4"
    },
    {
      name: "交通运输、仓储和邮政业",
      value: "5"
    },
    {
      name: "信息传输、软件和信息技术服务业",
      value: "6"
    },
    {
      name: "批发和零售业",
      value: "7"
    },
    {
      name: "住宿和餐饮业",
      value: "8"
    },
    {
      name: "金融业",
      value: "9"
    },
    {
      name: "房地产业",
      value: "10"
    },
    {
      name: "租赁和商务服务业",
      value: "11"
    },
    {
      name: "科学研究和技术服务业",
      value: "12"
    },
    {
      name: "水利、环境和公共设施管理业",
      value: "13"
    },
    {
      name: "居民服务、修理和其他服务业",
      value: "14"
    },
    {
      name: "教育",
      value: "15"
    },
    {
      name: "卫生和社会工作",
      value: "16"
    },
    {
      name: "文化、体育和娱乐业",
      value: "17"
    },
    {
      name: "公共管理、社会保障和社会组织",
      value: "18"
    },
    {
      name: "国际组织",
      value: "19"
    }
  ], // 个人证件类型
  idTypeOptions: [
    {
      name: "身份证",
      value: "0"
    },
    {
      name: "护照",
      value: "1"
    },
    {
      name: "其他",
      value: "2"
    }
  ], // 公司证件类型
  idTypeCompanyOptions: [
    {
      name: "工商营业执照",
      value: "0"
    },
    {
      name: "税务登记证",
      value: "1"
    },
    {
      name: "组织机构代码证",
      value: "2"
    },
    {
      name: "其他",
      value: "3"
    }
  ], // 支付类型
  payTypeOptions: [
    {
      name: "直付保司",
      value: "0"
    },
    {
      name: "宇泰代收",
      value: "1"
    }
  ], // 纳税人类别
  taxpayerTypeOptions: [
    {
      name: "一般纳税人",
      value: "0"
    },
    {
      name: "小规模纳税人",
      value: "1"
    }
  ],
  sexOptions: [
    {
      name: '男',
      value: 'M'
    },
    {
      name: '男',
      value: 'F'
    }
  ]
};

// 单位证件类型：统一社会信用代码、税务登记证、纳税识别号，调用友接口自动填充证件号码
