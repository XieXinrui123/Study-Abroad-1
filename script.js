const plans = [
  {
    name: 'DIY服务（纯DIY）',
    desc: '材料润色与答疑、申请流程指导',
    price: '按项目计费',
    services: ['简历500/篇', '文书1000/篇', '推荐信400/篇', 'DIY答疑1888/年']
  },
  {
    name: '半DIY服务',
    desc: '材料撰写支持+策略指导+部分流程自主',
    price: '全套3999元起',
    services: ['简历1000/篇', '文书2000/篇', '推荐信800/篇', '网申100/项目']
  },
  {
    name: '全包服务',
    desc: '全程代办+签证支持+流程管理',
    price: '10000元/8项目起',
    services: ['澳新1000/3所', '英港新10000/8项目', '15000/15项目', '超级混申20000']
  }
];

const faqs = [
  ['如何选择服务模式？', '时间充足+自主能力强可选DIY；希望省时但保留自主可选半DIY；想全程省心建议全包。'],
  ['全包服务有保障吗？', '全包支持0 offer全额退款承诺，并提供透明流程与进度同步。'],
  ['服务响应时间？', '7×16小时顾问响应，确保申请问题及时解决。']
];

const testimonials = [
  ['2023届学员数据', '186位学员获QS前100录取。'],
  ['2024届学员数据', '198位学员获QS前100录取。'],
  ['2025届学员数据', '170位学员获QS前100录取。']
];

const fallbackCases = [
  {
    "id": 1,
    "student_school": "武汉理工",
    "student_major": "社会工作",
    "gpa": "3.937/5.0",
    "language_score": "IELTS 6",
    "country": "新加坡/英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "社会学",
        "rank": "QS前10"
      },
      {
        "school": "UCL",
        "major": "社会学",
        "rank": "QS前10"
      },
      {
        "school": "曼彻斯特大学",
        "major": "社会学",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 2,
    "student_school": "辽宁大学",
    "student_major": "日语",
    "gpa": "82",
    "language_score": "无",
    "country": "英国/香港",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "国际发展",
        "rank": "QS前50"
      },
      {
        "school": "香港理工大学",
        "major": "无",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 3,
    "student_school": "武汉理工",
    "student_major": "信息管理",
    "gpa": "86",
    "language_score": "IELTS 6",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工",
        "major": "工程管理",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 4,
    "student_school": "大连海事",
    "student_major": "网络工程",
    "gpa": "79",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "电子信息工程",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 5,
    "student_school": "华北电力大学",
    "student_major": "电气",
    "gpa": "79",
    "language_score": "无",
    "country": "澳洲/英国/香港",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "新南威尔士大学",
        "major": "电气工程",
        "rank": "QS前70"
      },
      {
        "school": "南安普顿大学",
        "major": "电气工程",
        "rank": "QS前100"
      },
      {
        "school": "香港城市大学",
        "major": "电子信息工程",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 6,
    "student_school": "合肥工业大学",
    "student_major": "微电子",
    "gpa": "87",
    "language_score": "IELTS 6.5",
    "country": "中国香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学(深圳)",
        "major": "集成电路",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 7,
    "student_school": "大连海事",
    "student_major": "经济学",
    "gpa": "84",
    "language_score": "IELTS 6.5",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "管理经济学",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 8,
    "student_school": "安徽大学",
    "student_major": "财政学",
    "gpa": "89",
    "language_score": "无",
    "country": "国内",
    "degree": "硕士",
    "result": "保研",
    "offers": []
  },
  {
    "id": 9,
    "student_school": "暨南大学",
    "student_major": "计算机",
    "gpa": "87",
    "language_score": "无",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "信号处理与机器学习",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 10,
    "student_school": "西南大学",
    "student_major": "计算机",
    "gpa": "86",
    "language_score": "IELTS 6",
    "country": "香港/英国",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "创新设计技术",
        "rank": "QS前30"
      },
      {
        "school": "布里斯托大学",
        "major": "数据科学 机器人",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 11,
    "student_school": "北京化工",
    "student_major": "设计",
    "gpa": "90",
    "language_score": "IELTS 6",
    "country": "香港/澳洲/英国",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "创新设计技术",
        "rank": "QS前30"
      },
      {
        "school": "悉尼大学",
        "major": "设计",
        "rank": "QS前20"
      },
      {
        "school": "布里斯托大学",
        "major": "vr设计",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 12,
    "student_school": "安徽大学",
    "student_major": "土木",
    "gpa": "83",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "电子商务",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 13,
    "student_school": "电子科大",
    "student_major": "物理",
    "gpa": "80",
    "language_score": "IELTS 6",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "微电子",
        "rank": "QS前30"
      },
      {
        "school": "香港城市大学",
        "major": "半导体",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 14,
    "student_school": "同济大学",
    "student_major": "英语",
    "gpa": "87",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "伦敦大学学院",
        "major": "Teosl",
        "rank": "QS前10"
      }
    ]
  },
  {
    "id": 15,
    "student_school": "吉林大学",
    "student_major": "计算机",
    "gpa": "78",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港科技大学(广州)",
        "major": "智能制造",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 16,
    "student_school": "四川大学",
    "student_major": "计算机",
    "gpa": "84",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "信息工程",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 17,
    "student_school": "川大",
    "student_major": "无",
    "gpa": "84",
    "language_score": "无",
    "country": "无",
    "degree": "硕士",
    "result": "无",
    "offers": []
  },
  {
    "id": 18,
    "student_school": "中国农业大学",
    "student_major": "工业设计",
    "gpa": "80",
    "language_score": "IELTS 6",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "材料科学与工程",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 19,
    "student_school": "中南大学",
    "student_major": "生物信息",
    "gpa": "77",
    "language_score": "IELTS 6",
    "country": "新加坡/澳洲",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "生物医学工程",
        "rank": "QS前10"
      },
      {
        "school": "南洋理工大学",
        "major": "生物医学工程",
        "rank": "QS前30"
      },
      {
        "school": "澳洲国立大学",
        "major": "生物信息",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 20,
    "student_school": "湖南大学",
    "student_major": "传媒",
    "gpa": "84",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "传媒",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 21,
    "student_school": "地大",
    "student_major": "地理信息系统",
    "gpa": "89",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "AI for Science",
        "rank": "QS前10"
      },
      {
        "school": "香港大学",
        "major": "计算机",
        "rank": "QS前30"
      },
      {
        "school": "南洋理工大学",
        "major": "信号处理与机器学习",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 22,
    "student_school": "中传",
    "student_major": "传媒",
    "gpa": "92",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港/英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "社会学",
        "rank": "QS前10"
      },
      {
        "school": "香港中文大学",
        "major": "社会学",
        "rank": "QS前50"
      },
      {
        "school": "曼彻斯特大学",
        "major": "数字技术传媒与教育",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 23,
    "student_school": "哈工程",
    "student_major": "工业设计",
    "gpa": "82.84/100",
    "language_score": "IELTS 6",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前60",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "管理信息系统",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "机器人",
        "rank": "QS前60"
      },
      {
        "school": "布里斯托大学",
        "major": "计算机",
        "rank": "QS前60"
      },
      {
        "school": "布里斯托大学",
        "major": "VR",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 24,
    "student_school": "北外",
    "student_major": "国际商务",
    "gpa": "85/100",
    "language_score": "IELTS 6.5",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "管理经济学",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 25,
    "student_school": "华农",
    "student_major": "智慧农业",
    "gpa": "3.51/4.00",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "生物医学工程",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "生物医学工程",
        "rank": "QS前50"
      },
      {
        "school": "香港科技大学",
        "major": "生物技术",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 26,
    "student_school": "西南政法",
    "student_major": "法律",
    "gpa": "90",
    "language_score": "IELTS 8",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "LSE",
        "major": "LLM",
        "rank": "QS前50"
      },
      {
        "school": "爱丁堡",
        "major": "LLM",
        "rank": "QS前20"
      }
    ]
  },
  {
    "id": 27,
    "student_school": "河海大学",
    "student_major": "通信工程",
    "gpa": "4.3/5.0",
    "language_score": "IELTS 6.5",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工",
        "major": "通信工程",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 28,
    "student_school": "东北师范",
    "student_major": "会计",
    "gpa": "87",
    "language_score": "IELTS 7",
    "country": "新加坡/英国",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "项目管理",
        "rank": "QS前30"
      },
      {
        "school": "南洋理工大学",
        "major": "工程管理",
        "rank": "QS前30"
      },
      {
        "school": "曼彻斯特大学",
        "major": "发展金融",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 29,
    "student_school": "湖师大",
    "student_major": "数据科学",
    "gpa": "84",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "数学",
        "rank": "QS前50"
      },
      {
        "school": "香港城市大学",
        "major": "商务咨询系统",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 30,
    "student_school": "海南大学",
    "student_major": "食品",
    "gpa": "85",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "食品",
        "rank": "QS前10"
      },
      {
        "school": "香港大学",
        "major": "食品工业与营销",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "营养、食品科学与技术",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 31,
    "student_school": "安徽大学",
    "student_major": "经济学",
    "gpa": "3.53/5.0",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "工业工程与物流管理",
        "rank": "QS前30"
      },
      {
        "school": "香港城市大学",
        "major": "应用经济学",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 32,
    "student_school": "东北林业大学",
    "student_major": "计算机",
    "gpa": "85.42/100",
    "language_score": "IELTS 6.5",
    "country": "香港/新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "计算机",
        "rank": "QS前30"
      },
      {
        "school": "南洋理工大学",
        "major": "区块链",
        "rank": "QS前30"
      },
      {
        "school": "香港城市大学",
        "major": "计算机",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 33,
    "student_school": "华东理工",
    "student_major": "机械工程",
    "gpa": "85",
    "language_score": "IELTS 6.5",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "机械工程",
        "rank": "QS前10"
      },
      {
        "school": "南洋理工大学",
        "major": "计算机控制自动化",
        "rank": "QS前30"
      },
      {
        "school": "南洋理工大学",
        "major": "机械工程",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 34,
    "student_school": "东北林业大学",
    "student_major": "计算机",
    "gpa": "84.00/100",
    "language_score": "IELTS 6",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "电子商务与互联网",
        "rank": "QS前30"
      },
      {
        "school": "香港大学",
        "major": "创新设计技术",
        "rank": "QS前30"
      },
      {
        "school": "香港城市大学",
        "major": "商务咨询系统",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 35,
    "student_school": "武汉理工",
    "student_major": "车辆工程",
    "gpa": "86.82",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立",
        "major": "机械 机器人",
        "rank": "QS前10"
      },
      {
        "school": "香港大学",
        "major": "机器人智能系统",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "机器人",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 36,
    "student_school": "南京财经大学",
    "student_major": "会计",
    "gpa": "89.62/100",
    "language_score": "IELTS 7",
    "country": "英国/澳洲",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "无",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "会计",
        "rank": "QS前60"
      },
      {
        "school": "澳洲国立大学",
        "major": "会计",
        "rank": "QS前30"
      },
      {
        "school": "悉尼大学",
        "major": "会计",
        "rank": "QS前20"
      }
    ]
  },
  {
    "id": 37,
    "student_school": "西南大学",
    "student_major": "经济学",
    "gpa": "82",
    "language_score": "IELTS 7.5",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "人力资源管理",
        "rank": "QS前50"
      },
      {
        "school": "曼彻斯特大学",
        "major": "发展金融",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 38,
    "student_school": "合工大",
    "student_major": "金融工程",
    "gpa": "84",
    "language_score": "IELTS 6.5",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "管理经济学",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 39,
    "student_school": "北京科技大学",
    "student_major": "项目管理",
    "gpa": "80",
    "language_score": "无",
    "country": "英国/澳洲",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "房地产开发",
        "rank": "QS前50"
      },
      {
        "school": "墨尔本大学",
        "major": "项目管理",
        "rank": "QS前30"
      },
      {
        "school": "悉尼大学",
        "major": "项目管理",
        "rank": "QS前20"
      }
    ]
  },
  {
    "id": 40,
    "student_school": "北京体育大学",
    "student_major": "经济学",
    "gpa": "88",
    "language_score": "IELTS 6.5",
    "country": "香港/英国",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "电子商务与物流管理",
        "rank": "QS前50"
      },
      {
        "school": "曼彻斯特大学",
        "major": "信息系统管理",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 41,
    "student_school": "西南大学",
    "student_major": "生物",
    "gpa": "无",
    "language_score": "无",
    "country": "无",
    "degree": "硕士",
    "result": "无",
    "offers": []
  },
  {
    "id": 42,
    "student_school": "西南大学",
    "student_major": "市场营销",
    "gpa": "84",
    "language_score": "IELTS 6",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "管理信息系统",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "市场营销",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 43,
    "student_school": "厦大马来",
    "student_major": "会计",
    "gpa": "2.7",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "新南威尔士",
        "major": "会计",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 44,
    "student_school": "中国农业大学",
    "student_major": "工业设计",
    "gpa": "2.9",
    "language_score": "IELTS 6",
    "country": "新加坡/澳洲",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工",
        "major": "材料科学与工程",
        "rank": "QS前30"
      },
      {
        "school": "悉尼大学",
        "major": "项目管理",
        "rank": "QS前20"
      }
    ]
  },
  {
    "id": 45,
    "student_school": "厦大马来",
    "student_major": "会计",
    "gpa": "2.6",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "新南威尔士",
        "major": "会计",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 46,
    "student_school": "湖南大学",
    "student_major": "金融",
    "gpa": "92",
    "language_score": "IELTS 7",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "应用经济学",
        "rank": "QS前10"
      },
      {
        "school": "香港大学",
        "major": "计算机",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 47,
    "student_school": "湖南大学",
    "student_major": "数学",
    "gpa": "83.94/100",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "数学",
        "rank": "QS前50"
      },
      {
        "school": "香港科技大学",
        "major": "大数据技术",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 48,
    "student_school": "湖南大学",
    "student_major": "金融",
    "gpa": "88.39/100",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "工业工程与系统管理",
        "rank": "QS前50"
      },
      {
        "school": "香港中文大学",
        "major": "电子商务与物流管理",
        "rank": "QS前50"
      },
      {
        "school": "香港中文大学",
        "major": "金融科技",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 49,
    "student_school": "北京师范大学",
    "student_major": "戏剧影视电影与文化",
    "gpa": "85",
    "language_score": "IELTS 6.5",
    "country": "新加坡/英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "戏剧影视",
        "rank": "QS前10"
      },
      {
        "school": "爱丁堡大学",
        "major": "策展",
        "rank": "QS前20"
      },
      {
        "school": "曼彻斯特大学",
        "major": "人力资源管理",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 50,
    "student_school": "同济大学",
    "student_major": "会计",
    "gpa": "85",
    "language_score": "IELTS 6.5",
    "country": "新加坡/香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "经济学",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "经济学",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 51,
    "student_school": "上海交通大学",
    "student_major": "市场营销",
    "gpa": "88",
    "language_score": "IELTS 7",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "市场营销",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 52,
    "student_school": "澳门城市",
    "student_major": "旅游管理",
    "gpa": "3.84/4.0",
    "language_score": "IELTS 7",
    "country": "香港/英国",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "气候治理",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "可持续旅游",
        "rank": "QS前50"
      },
      {
        "school": "曼彻斯特大学",
        "major": "环境监测",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 53,
    "student_school": "澳门城市",
    "student_major": "工商管理",
    "gpa": "3.62/4.00",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "市场营销",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 54,
    "student_school": "澳城",
    "student_major": "人工智能",
    "gpa": "3.6",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "伦敦大学学院",
        "major": "环境数据科学",
        "rank": "QS前10"
      }
    ]
  },
  {
    "id": 55,
    "student_school": "psb",
    "student_major": "传媒",
    "gpa": "80",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "墨尔本",
        "major": "全球市场营销",
        "rank": "QS前30"
      },
      {
        "school": "悉尼",
        "major": "媒体实践",
        "rank": "QS前20"
      },
      {
        "school": "澳国立",
        "major": "数字媒体",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 56,
    "student_school": "psb",
    "student_major": "传媒",
    "gpa": "68",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "悉尼大学",
        "major": "公共关系",
        "rank": "QS前20"
      },
      {
        "school": "澳洲国立",
        "major": "数字媒体",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 57,
    "student_school": "西浦",
    "student_major": "金融数学",
    "gpa": "58",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "南安普顿大学",
        "major": "时尚营销",
        "rank": "QS前100"
      },
      {
        "school": "诺丁汉大学",
        "major": "经济学",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 58,
    "student_school": "阿姆斯特丹",
    "student_major": "金融",
    "gpa": "7.0",
    "language_score": "无",
    "country": "澳洲/香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "悉尼大学",
        "major": "金融",
        "rank": "QS前20"
      },
      {
        "school": "香港城市大学",
        "major": "金融",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 59,
    "student_school": "集美大学",
    "student_major": "会计",
    "gpa": "88",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "悉尼大学",
        "major": "会计",
        "rank": "QS前20"
      },
      {
        "school": "澳洲国立",
        "major": "会计",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 60,
    "student_school": "闽江学院",
    "student_major": "经济学",
    "gpa": "4.08",
    "language_score": "IELTS 7",
    "country": "英国/香港",
    "degree": "硕士",
    "result": "QS前40",
    "offers": [
      {
        "school": "KCL",
        "major": "新兴经济体与国际发展",
        "rank": "QS前40"
      },
      {
        "school": "香港理工大学",
        "major": "经济学",
        "rank": "QS前100"
      },
      {
        "school": "伯明翰",
        "major": "经济学",
        "rank": "QS前100"
      },
      {
        "school": "利兹大学",
        "major": "经济学",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 61,
    "student_school": "浙江理工",
    "student_major": "英语",
    "gpa": "88",
    "language_score": "IELTS 7",
    "country": "香港/英国",
    "degree": "硕士",
    "result": "QS前20",
    "offers": [
      {
        "school": "香港中文大学",
        "major": "TESOL",
        "rank": "QS前50"
      },
      {
        "school": "爱丁堡",
        "major": "TESOL",
        "rank": "QS前20"
      },
      {
        "school": "香港理工",
        "major": "ELT",
        "rank": "QS前100"
      },
      {
        "school": "香港城市",
        "major": "LS/ES",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 62,
    "student_school": "广西民族",
    "student_major": "表演",
    "gpa": "83",
    "language_score": "无",
    "country": "澳洲",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "新南威尔士",
        "major": "传媒",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 63,
    "student_school": "燕山大学",
    "student_major": "工商管理",
    "gpa": "85/100",
    "language_score": "IELTS 7",
    "country": "英国/香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "数据科学",
        "rank": "QS前50"
      },
      {
        "school": "香港理工大学",
        "major": "商业管理",
        "rank": "QS前100"
      },
      {
        "school": "香港城市大学",
        "major": "商业数据分析",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 64,
    "student_school": "北服",
    "student_major": "设计",
    "gpa": "3.76/4.0",
    "language_score": "IELTS 6.5",
    "country": "英国/新加坡/香港",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "伦敦大学学院",
        "major": "性能与交互",
        "rank": "QS前10"
      },
      {
        "school": "南洋理工大学",
        "major": "游戏设计",
        "rank": "QS前30"
      },
      {
        "school": "皇家艺术学院",
        "major": "信息体验设计",
        "rank": "艺术顶尖"
      },
      {
        "school": "伦敦艺术学院",
        "major": "叙事环境 VR",
        "rank": "艺术顶尖"
      },
      {
        "school": "格拉斯哥大学艺术学院",
        "major": "严肃游戏",
        "rank": "QS前100"
      },
      {
        "school": "香港理工大学",
        "major": "多媒体创意娱乐",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 65,
    "student_school": "燕山大学",
    "student_major": "材料",
    "gpa": "72/100",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "帝国理工",
        "major": "材料",
        "rank": "QS前10"
      },
      {
        "school": "伦敦大学学院",
        "major": "材料",
        "rank": "QS前10"
      },
      {
        "school": "曼彻斯特大学",
        "major": "材料",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "材料",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 66,
    "student_school": "广州大学",
    "student_major": "历史",
    "gpa": "90",
    "language_score": "IELTS 6",
    "country": "新加坡/香港/英国",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "比较历史",
        "rank": "QS前10"
      },
      {
        "school": "香港大学",
        "major": "中国历史",
        "rank": "QS前30"
      },
      {
        "school": "香港中文大学",
        "major": "历史",
        "rank": "QS前50"
      },
      {
        "school": "爱丁堡大学",
        "major": "历史",
        "rank": "QS前20"
      },
      {
        "school": "香港城市大学",
        "major": "汉语言文学与历史",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 67,
    "student_school": "桂林理工",
    "student_major": "计算机",
    "gpa": "80.0/100",
    "language_score": "无",
    "country": "澳洲/英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "新南威尔士",
        "major": "计算机",
        "rank": "QS前70"
      },
      {
        "school": "利兹大学",
        "major": "计算机",
        "rank": "QS前100"
      },
      {
        "school": "伯明翰大学",
        "major": "计算机",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 68,
    "student_school": "武汉外经贸",
    "student_major": "英语",
    "gpa": "86",
    "language_score": "IELTS 6",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前20",
    "offers": [
      {
        "school": "爱丁堡大学",
        "major": "TESOL",
        "rank": "QS前20"
      },
      {
        "school": "利兹大学",
        "major": "TESOL",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 69,
    "student_school": "广东科技学院",
    "student_major": "市场营销",
    "gpa": "84.00/100",
    "language_score": "IELTS 6",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前100+",
    "offers": [
      {
        "school": "岭南大学",
        "major": "市场营销",
        "rank": "QS前100+"
      },
      {
        "school": "岭南大学",
        "major": "社会政策创新",
        "rank": "QS前100+"
      }
    ]
  },
  {
    "id": 70,
    "student_school": "浙江树人学院",
    "student_major": "市场营销",
    "gpa": "86",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "利兹大学",
        "major": "国际商务",
        "rank": "QS前100"
      },
      {
        "school": "利兹大学",
        "major": "信息系统与数字化创新",
        "rank": "QS前100"
      },
      {
        "school": "南安普敦大学",
        "major": "市场营销",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 71,
    "student_school": "上海海事",
    "student_major": "电气",
    "gpa": "86",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前60",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "电力系统",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "通信网络与信号处理",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 72,
    "student_school": "长沙理工",
    "student_major": "土木",
    "gpa": "80",
    "language_score": "IELTS 6",
    "country": "新加坡/香港/英国",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "南洋理工大学",
        "major": "土木工程",
        "rank": "QS前30"
      },
      {
        "school": "香港大学",
        "major": "建筑",
        "rank": "QS前30"
      },
      {
        "school": "曼彻斯特大学",
        "major": "城市规划",
        "rank": "QS前50"
      },
      {
        "school": "南安普敦",
        "major": "人工智能与管理",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 73,
    "student_school": "天津城建",
    "student_major": "电气",
    "gpa": "84",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "利兹大学",
        "major": "电气",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 74,
    "student_school": "扬州大学",
    "student_major": "计算机",
    "gpa": "75",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "利兹大学",
        "major": "计算机",
        "rank": "QS前100"
      },
      {
        "school": "伯明翰大学",
        "major": "计算机",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 75,
    "student_school": "广东海洋",
    "student_major": "经济学",
    "gpa": "88",
    "language_score": "IELTS 6.5",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "香港理工大学",
        "major": "应用经济学",
        "rank": "QS前100"
      },
      {
        "school": "香港城市大学",
        "major": "管理与创新",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 76,
    "student_school": "北京舞蹈学院",
    "student_major": "表演艺术",
    "gpa": "93.47",
    "language_score": "无",
    "country": "英国/香港",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "利兹大学",
        "major": "传媒",
        "rank": "QS前100"
      },
      {
        "school": "香港演艺学院",
        "major": "表演艺术研究",
        "rank": "艺术顶尖"
      }
    ]
  },
  {
    "id": 77,
    "student_school": "北京石油化工",
    "student_major": "药学",
    "gpa": "76",
    "language_score": "无",
    "country": "澳洲/英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "莫纳什大学",
        "major": "药学",
        "rank": "QS前50"
      },
      {
        "school": "利兹大学",
        "major": "药学",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 78,
    "student_school": "琼台",
    "student_major": "建筑",
    "gpa": "86",
    "language_score": "无",
    "country": "澳门",
    "degree": "硕士",
    "result": "澳门顶尖",
    "offers": [
      {
        "school": "澳门科技大学",
        "major": "建筑学",
        "rank": "澳门顶尖"
      }
    ]
  },
  {
    "id": 79,
    "student_school": "云南财经大学",
    "student_major": "金融科技",
    "gpa": "78",
    "language_score": "IELTS 6.5",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "南安普顿大学",
        "major": "时尚营销",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 80,
    "student_school": "武大",
    "student_major": "物流管理",
    "gpa": "85",
    "language_score": "IELTS 6",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "工业工程与物流管理",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 81,
    "student_school": "中央民族大学",
    "student_major": "汉语言文学",
    "gpa": "89",
    "language_score": "无",
    "country": "新加坡",
    "degree": "硕士",
    "result": "QS前10",
    "offers": [
      {
        "school": "新加坡国立大学",
        "major": "中国语言文学",
        "rank": "QS前10"
      }
    ]
  },
  {
    "id": 82,
    "student_school": "澳门城市大学",
    "student_major": "旅游",
    "gpa": "2.6",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前100+",
    "offers": [
      {
        "school": "香港教育大学",
        "major": "无",
        "rank": "QS前100+"
      }
    ]
  },
  {
    "id": 83,
    "student_school": "西南大学",
    "student_major": "教育学",
    "gpa": "无",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前30",
    "offers": [
      {
        "school": "香港大学",
        "major": "教育学",
        "rank": "QS前30"
      }
    ]
  },
  {
    "id": 84,
    "student_school": "海南大学",
    "student_major": "创意媒体",
    "gpa": "无",
    "language_score": "无",
    "country": "无",
    "degree": "硕士",
    "result": "无",
    "offers": []
  },
  {
    "id": 85,
    "student_school": "浙江财经",
    "student_major": "经济学",
    "gpa": "84",
    "language_score": "无",
    "country": "英国/香港",
    "degree": "硕士",
    "result": "QS前50",
    "offers": [
      {
        "school": "曼彻斯特大学",
        "major": "发展金融与政策",
        "rank": "QS前50"
      },
      {
        "school": "布里斯托大学",
        "major": "会计 管理",
        "rank": "QS前60"
      },
      {
        "school": "香港理工大学",
        "major": "家族财富管理",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 86,
    "student_school": "哈工大",
    "student_major": "智能医学工程",
    "gpa": "无",
    "language_score": "无",
    "country": "无",
    "degree": "硕士",
    "result": "无",
    "offers": []
  },
  {
    "id": 87,
    "student_school": "惠州学院",
    "student_major": "英语",
    "gpa": "86",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "利兹大学",
        "major": "TESOL",
        "rank": "QS前100"
      },
      {
        "school": "诺丁汉大学",
        "major": "TESOL",
        "rank": "QS前100"
      },
      {
        "school": "谢菲尔德大学",
        "major": "TESOL",
        "rank": "QS前100"
      },
      {
        "school": "纽卡斯尔大学",
        "major": "TESOL",
        "rank": "QS前100"
      },
      {
        "school": "利物浦大学",
        "major": "TESOL",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 88,
    "student_school": "北邮",
    "student_major": "信息工程",
    "gpa": "82",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "AI for Science",
        "rank": "QS前70"
      },
      {
        "school": "香港中文大学(深圳)",
        "major": "计算机信息工程",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 89,
    "student_school": "北理工",
    "student_major": "光电工程",
    "gpa": "82",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "AI for Science 半导体",
        "rank": "QS前70"
      },
      {
        "school": "香港中文大学(深圳)",
        "major": "集成电路 ai与机器人",
        "rank": "QS前50"
      }
    ]
  },
  {
    "id": 90,
    "student_school": "东北农业",
    "student_major": "无",
    "gpa": "无",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "能源与环境",
        "rank": "QS前70"
      }
    ]
  },
  {
    "id": 91,
    "student_school": "杭电自动化",
    "student_major": "自动化",
    "gpa": "76",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "南安普顿大学",
        "major": "机器人",
        "rank": "QS前100"
      },
      {
        "school": "利兹大学",
        "major": "机器人",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 92,
    "student_school": "澳门城市",
    "student_major": "工商管理",
    "gpa": "2.2",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前100+",
    "offers": [
      {
        "school": "香港教育大学",
        "major": "无",
        "rank": "QS前100+"
      }
    ]
  },
  {
    "id": 93,
    "student_school": "青岛科技",
    "student_major": "化学",
    "gpa": "76",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前100",
    "offers": [
      {
        "school": "伯明翰大学",
        "major": "化学",
        "rank": "QS前100"
      },
      {
        "school": "利兹大学",
        "major": "化学",
        "rank": "QS前100"
      }
    ]
  },
  {
    "id": 94,
    "student_school": "北理工珠海",
    "student_major": "电气工程",
    "gpa": "74",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前100+",
    "offers": [
      {
        "school": "香港教育大学",
        "major": "stem教育",
        "rank": "QS前100+"
      }
    ]
  },
  {
    "id": 95,
    "student_school": "大连理工",
    "student_major": "计算机",
    "gpa": "76",
    "language_score": "无",
    "country": "英国",
    "degree": "硕士",
    "result": "QS前60",
    "offers": [
      {
        "school": "布里斯托大学",
        "major": "机器人",
        "rank": "QS前60"
      }
    ]
  },
  {
    "id": 96,
    "student_school": "天津理工",
    "student_major": "计算机",
    "gpa": "84",
    "language_score": "无",
    "country": "香港",
    "degree": "硕士",
    "result": "QS前70",
    "offers": [
      {
        "school": "香港城市大学",
        "major": "AI for Science",
        "rank": "QS前70"
      }
    ]
  }
]; // 已嵌入案例数据，作为 fetch 失败的备用

const state = {
  baseCases: [],
  currentPage: 1,
  pageSize: 9999
};

function normalizeCase(item, idx) {
  const offers = Array.isArray(item.offers) && item.offers.length
    ? item.offers
    : [{ school: item.school || '待更新', major: item.major || '待更新', rank: item.result || '普通录取' }];

  return {
    id: item.id || idx + 1,
    title: item.title || `${item.country || '地区'}${item.degree || '项目'}`,
    student_school: item.student_school || '院校未填写',
    student_major: item.student_major || item.major || '专业未填写',
    gpa: item.gpa || '未填写',
    language_score: item.language_score || '未填写',
    country: item.country || '未分类',
    degree: item.degree || '未分类',
    result: item.result || offers[0]?.rank || '普通录取',
    offers
  };
}

function renderPlans() {
  const wrap = document.getElementById('planCards');
  if (!wrap) return;

  plans.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${p.price}</div>
      <ul>${p.services.map((s) => `<li>${s}</li>`).join('')}</ul>
    `;
    wrap.append(card);
  });
}

function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  faqs.forEach(([q, a]) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `<button class="accordion-btn">${q}</button><div class="accordion-panel">${a}</div>`;
    item.querySelector('button')?.addEventListener('click', () => item.classList.toggle('open'));
    list.append(item);
  });
}

function renderTestimonials() {
  const box = document.getElementById('testimonials');
  if (!box) return;

  testimonials.forEach(([name, text]) => {
    const item = document.createElement('article');
    item.className = 'mini-card';
    item.innerHTML = `<h3>${name}</h3><p>${text}</p>`;
    box.append(item);
  });
}

function setupCases() {
  const searchInput = document.getElementById('searchInput');
  const countryFilter = document.getElementById('countryFilter');
  const degreeFilter = document.getElementById('degreeFilter');
  const resultFilter = document.getElementById('resultFilter');
  const pageSizeSelect = document.getElementById('pageSizeSelect');

  const caseGrid = document.getElementById('caseGrid');
  const vizPanel = document.getElementById('vizPanel');
  const offerRankPanel = document.getElementById('offerRankPanel');
  const topSchoolPanel = document.getElementById('topSchoolPanel');
  const metricsBoard = document.getElementById('metricsBoard');
  const resultTip = document.getElementById('resultTip');
  const dataSourceTip = document.getElementById('dataSourceTip');
  const pager = document.getElementById('pager');

  if (!searchInput || !countryFilter || !degreeFilter || !resultFilter || !caseGrid || !vizPanel || !offerRankPanel || !topSchoolPanel || !metricsBoard || !resultTip || !dataSourceTip || !pager) {
    return;
  }

  const fillSelect = (el, label, vals) => {
    el.innerHTML = `<option value="">全部${label}</option>${vals.map((v) => `<option>${v}</option>`).join('')}`;
  };

  const getFiltered = () => {
    const kw = searchInput.value.trim();

    return state.baseCases.filter((c) => {
      const offerText = c.offers.map((o) => `${o.school}${o.major}${o.rank}`).join(' ');
      const source = `${c.title}${c.student_school}${c.student_major}${c.gpa}${c.language_score}${offerText}`;

      return (!countryFilter.value || c.country === countryFilter.value)
        && (!degreeFilter.value || c.degree === degreeFilter.value)
        && (!resultFilter.value || c.result === resultFilter.value)
        && (!kw || source.includes(kw));
    });
  };

  const renderViz = (items) => {
    const byCountry = Object.entries(items.reduce((acc, c) => {
      acc[c.country] = (acc[c.country] || 0) + 1;
      return acc;
    }, {}));

    if (!byCountry.length) {
      vizPanel.innerHTML = '<h3>数据可视化（按地区）</h3><p class="result-tip">暂无匹配案例</p>';
      return;
    }

    const max = Math.max(...byCountry.map(([, n]) => n));
    vizPanel.innerHTML = `
      <h3>数据可视化（按地区）</h3>
      <div class="bars">
        ${byCountry.map(([k, v]) => `
          <div class="bar-item">
            <small>${k} ${v}例</small>
            <div class="bar-track"><div class="bar-fill" style="width:${(v / max) * 100}%"></div></div>
          </div>
        `).join('')}
      </div>
    `;
  };

  const renderCaseCard = (item) => {
    const topOffers = item.offers.slice(0, 3);
    const restCount = Math.max(0, item.offers.length - 3);

    return `
      <article class="case">
        <div class="case-header">
          <h3>${item.title}</h3>
          <span class="offer-badge">${item.offers.length} Offers</span>
        </div>

        <p class="pill-row">
          <span class="pill">#${item.id}</span>
          <span class="pill">${item.country}</span>
          <span class="pill">${item.degree}</span>
          <span class="pill">${item.result}</span>
        </p>

        <div class="student-meta">
          <div><strong>学生学校</strong><span>${item.student_school}</span></div>
          <div><strong>学生专业</strong><span>${item.student_major}</span></div>
          <div><strong>GPA/均分</strong><span>${item.gpa}</span></div>
          <div><strong>语言成绩</strong><span>${item.language_score}</span></div>
        </div>

        <div class="offer-preview">
          ${topOffers.map((o) => `<span class="offer-chip">${o.school} · ${o.major}</span>`).join('')}
          ${restCount ? `<span class="offer-chip more">+${restCount} 个更多Offer</span>` : ''}
        </div>

        <details class="offer-details">
          <summary>查看全部 Offer 明细</summary>
          <div class="offer-list">
            ${item.offers.map((o) => `
              <div class="offer-item">
                <strong>${o.school}</strong>
                <span>${o.major}</span>
                <em>${o.rank}</em>
              </div>
            `).join('')}
          </div>
        </details>
      </article>
    `;
  };


  const renderMetrics = (items) => {
    const totalOffers = items.reduce((acc, c) => acc + c.offers.length, 0);
    const avgOffer = items.length ? (totalOffers / items.length).toFixed(1) : '0';
    const top10Count = items.filter((c) => `${c.result}`.includes('前10')).length;
    const multiOfferCount = items.filter((c) => c.offers.length >= 2).length;

    metricsBoard.innerHTML = `
      <article class="metric-card"><strong>${items.length}</strong><span>筛选后案例数</span></article>
      <article class="metric-card"><strong>${totalOffers}</strong><span>累计 Offer 数</span></article>
      <article class="metric-card"><strong>${avgOffer}</strong><span>人均 Offer</span></article>
      <article class="metric-card"><strong>${top10Count}</strong><span>QS前10 结果</span></article>
    `;

    offerRankPanel.innerHTML = `
      <h3>录取结果分布</h3>
      <div class="mini-list">${Object.entries(items.reduce((acc, c) => {
        acc[c.result] = (acc[c.result] || 0) + 1;
        return acc;
      }, {})).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,v]) => `<div class="mini-row"><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>
      <p class="result-tip">其中 ${multiOfferCount} 位学生拥有2个及以上Offer</p>
    `;

    const schoolCounter = {};
    items.forEach((c) => c.offers.forEach((o) => { schoolCounter[o.school] = (schoolCounter[o.school] || 0) + 1; }));
    topSchoolPanel.innerHTML = `
      <h3>高频录取院校 Top 8</h3>
      <div class="mini-list">${Object.entries(schoolCounter).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v],idx) => `<div class="mini-row"><span>${idx + 1}. ${k}</span><strong>${v}</strong></div>`).join('')}</div>
    `;
  };

  const render = () => {
    const items = getFiltered();
    const showAll = state.pageSize >= 9999;
    const totalPage = showAll ? 1 : Math.max(1, Math.ceil(items.length / state.pageSize));

    state.currentPage = Math.min(state.currentPage, totalPage);
    const pageItems = showAll
      ? items
      : items.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);

    caseGrid.innerHTML = pageItems.map(renderCaseCard).join('');
    renderViz(items);
    renderMetrics(items);

    resultTip.textContent = showAll
      ? `共 ${items.length} 条案例（当前显示全部）`
      : `共 ${items.length} 条案例，当前第 ${state.currentPage}/${totalPage} 页`;

    pager.innerHTML = showAll
      ? ''
      : Array.from({ length: totalPage }, (_, i) => `
          <button class="${i + 1 === state.currentPage ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>
        `).join('');
  };

  const syncPageSize = () => {
    if (!pageSizeSelect) {
      state.pageSize = 9999;
      return;
    }
    state.pageSize = pageSizeSelect.value === 'all' ? 9999 : Number(pageSizeSelect.value || 12);
  };

  [searchInput, countryFilter, degreeFilter, resultFilter, pageSizeSelect]
    .filter(Boolean)
    .forEach((el) => el.addEventListener('input', () => {
      syncPageSize();
      state.currentPage = 1;
      render();
    }));

  pager.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const page = target.dataset.page;
    if (!page) return;
    state.currentPage = Number(page);
    render();
  });

  (async () => {
    try {
      const res = await fetch('./cases.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const parsed = Array.isArray(data) ? data : (data.cases || []);
      if (!parsed.length) throw new Error('empty data');
      state.baseCases = parsed.map(normalizeCase);
      dataSourceTip.textContent = '✓ 已加载 ' + parsed.length + ' 条案例';
    } catch (error) {
      state.baseCases = fallbackCases.map(normalizeCase);
      dataSourceTip.innerHTML = '<span style="color:#ff6b35">✗ 案例加载失败：' + error.message + '</span><br>已自动切换至本地备用数据（' + fallbackCases.length + '条）';
      console.error('Cases load error:', error);
    }

    fillSelect(countryFilter, '地区', [...new Set(state.baseCases.map((c) => c.country))]);
    fillSelect(degreeFilter, '学历', [...new Set(state.baseCases.map((c) => c.degree))]);
    fillSelect(resultFilter, '结果', [...new Set(state.baseCases.map((c) => c.result))]);

    syncPageSize();
    render();
  })();
}

function setupCommonUI() {
  const header = document.getElementById('topHeader');
  const hero = document.getElementById('hero');
  const toTop = document.getElementById('toTop');
  const themeToggle = document.getElementById('themeToggle');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.2}px`;
    if (toTop) toTop.classList.toggle('show', window.scrollY > 400);
  });

  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  themeToggle?.addEventListener('click', () => document.body.classList.toggle('dark'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  const qrModal = document.getElementById('qrModal');
  const consultBtn = document.getElementById('consultBtn');
  const consultBtnFooter = document.getElementById('consultBtnFooter');
  const qrClose = document.getElementById('qrClose');

  const openQr = () => qrModal?.classList.add('show');
  consultBtn?.addEventListener('click', openQr);
  consultBtnFooter?.addEventListener('click', openQr);
  qrClose?.addEventListener('click', () => qrModal?.classList.remove('show'));
  qrModal?.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('show');
  });
}

renderPlans();
renderFAQ();
renderTestimonials();
setupCases();
setupCommonUI();
