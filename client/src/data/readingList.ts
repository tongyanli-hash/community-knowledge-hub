// Reading List Data — sourced from curated spreadsheet (Columns A: Part, B: Category, C: Book)
// 100 books across 8 parts and 30 categories

export interface Book {
  part: string;
  category: string;
  book: string;
  title: string;
  author: string;
}

export interface Category {
  name: string;
  books: Book[];
}

export interface Part {
  id: string;
  name: string;
  shortName: string;
  categories: Category[];
  totalBooks: number;
}

const rawData: { part: string; category: string; book: string }[] = [
  // Part I - 经济学和大势
  { part: "Part I - 经济学和大势", category: "教材类", book: "经济学原理-微观分册 -- 曼昆" },
  { part: "Part I - 经济学和大势", category: "教材类", book: "宏观经济学 -- 曼昆" },
  { part: "Part I - 经济学和大势", category: "教材类", book: "中国宏观经济学 -- 徐高" },
  { part: "Part I - 经济学和大势", category: "中国智库级专家", book: "战略与路径 -- 黄奇帆" },
  { part: "Part I - 经济学和大势", category: "中国智库级专家", book: "分析与思考 -- 黄奇帆" },
  { part: "Part I - 经济学和大势", category: "中国智库级专家", book: "十次危机 -- 温铁军" },
  { part: "Part I - 经济学和大势", category: "中国智库级专家", book: "从冷战到新冷战 -- 温铁军" },
  { part: "Part I - 经济学和大势", category: "中国智库级专家", book: "当代中国经济改革教程 -- 吴敬琏" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "繁荣与衰退 - 美国经济发展史 -- 格林斯潘" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "时代变迁 - 世界货币、美元地位和人民币的未来 -- 沃尔克" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "21世纪货币政策 -- 伯南克" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "当音乐停止之后 -- 布林德" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "亚洲大趋势 - 中国和新兴经济体的未来 -- 乔什塔维尔" },
  { part: "Part I - 经济学和大势", category: "美国智库级专家", book: "激荡三十年 -- 吴晓波" },
  // Part II - 创业思维
  { part: "Part II - 创业思维", category: "中国和亚洲商业发展史", book: "小米创业思考 -- 雷军" },
  { part: "Part II - 创业思维", category: "中国和亚洲商业发展史", book: "段永平投资问答录 - 商业逻辑篇 -- 段永平" },
  { part: "Part II - 创业思维", category: "成功企业家创业方法论", book: "经营者养成笔记 -- 柳井正" },
  { part: "Part II - 创业思维", category: "成功企业家创业方法论", book: "一胜九败 -- 柳井正" },
  { part: "Part II - 创业思维", category: "从0-1方法论", book: "从0到1 - 开启商业与未来的秘密 -- 皮特帝尔" },
  { part: "Part II - 创业思维", category: "从0-1方法论", book: "精益创业 -- 新创企业的成长思维 -- 埃里克莱斯" },
  { part: "Part II - 创业思维", category: "运营管理类", book: "富甲美国：沃尔玛创始人山姆沃尔顿自传 -- 山姆沃尔顿" },
  { part: "Part II - 创业思维", category: "运营管理类", book: "经营管理全集 -- 松下幸之助" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "一只小鸟告诉我的事 -- 比兹斯通" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "创业者的解答 -- 克莱顿克里斯坦森" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "精益创业实战 -- 阿什莫瑞亚" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "重新定义公司 - 谷歌是如何运营的 -- 埃里克施密特" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "格雷夫给经理人的第一课 -- 安迪格鲁夫" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "关乎天下 - 中小企业赢的秘诀 -- 关明生" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "创业维艰 - 如何完成比难更难的事 -- 本霍洛维兹" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "创业之殇 - 初创企业为什么失败 -- David Feinleib" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "大败局 -- 吴晓波" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "大败局2 -- 吴晓波" },
  { part: "Part II - 创业思维", category: "失败教训类", book: "十亿美金的教训 -- 林军" },
  // Part III - 如何做产品
  { part: "Part III - 如何做产品", category: "CEO视角做产品", book: "微信背后的产品观 -- 张小龙" },
  { part: "Part III - 如何做产品", category: "CEO视角做产品", book: "李想产品实战16讲 -- 李想" },
  { part: "Part III - 如何做产品", category: "一线导师视角做产品", book: "真需求 -- 梁宁" },
  { part: "Part III - 如何做产品", category: "一线导师视角做产品", book: "俞军产品方法论 -- 俞军" },
  { part: "Part III - 如何做产品", category: "实物产品", book: "鞋狗 -- 菲尔奈特" },
  { part: "Part III - 如何做产品", category: "实物产品", book: "Little Black Stretchy Pants -- Chip Wilson" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "上瘾 -- 让用户养成使用习惯的四大产品逻辑 -- 尼尔艾亚尔" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "任天堂的体验设计 -- 玉树真一郎" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "启示录 - 打造用户喜欢的产品 -- 马蒂卡根" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "用户体验要素 - 以用户为中心的产品设计 -- Jess James Garrett" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "用户体验度量 - 收集、分析与呈现 -- 特里斯" },
  { part: "Part III - 如何做产品", category: "实际落地方法论", book: "简约至上 - 交互式设计四策略 -- Giles Colborne" },
  // Part IV - 营销和定位
  { part: "Part IV - 营销和定位", category: "定位类", book: "定位 -- 艾里斯、杰克特劳特" },
  { part: "Part IV - 营销和定位", category: "定位类", book: "21世纪的定位 -- 邓德隆" },
  { part: "Part IV - 营销和定位", category: "定位类", book: "升级定位 -- 冯卫东" },
  { part: "Part IV - 营销和定位", category: "营销实战策略", book: "跟华杉学品牌营销 -- 华杉" },
  { part: "Part IV - 营销和定位", category: "营销心理学", book: "参与感 -- 黎万强" },
  { part: "Part IV - 营销和定位", category: "营销心理学", book: "如何让他买 - 改变消费者行为的十大策略 -- 亚当费里尔" },
  { part: "Part IV - 营销和定位", category: "营销传播学", book: "影响力 -- 罗伯西奥尼迪" },
  { part: "Part IV - 营销和定位", category: "营销传播学", book: "The Culting of Brands -- Douglas Atkin" },
  { part: "Part IV - 营销和定位", category: "营销传播学", book: "疯传 -- 乔纳伯杰" },
  { part: "Part IV - 营销和定位", category: "营销传播学", book: "引爆点 -- 马尔科姆格拉德威尔" },
  { part: "Part IV - 营销和定位", category: "如何做符合大势的品牌", book: "很久很久以前 - 以神话原型打造深植人心的品牌 -- 玛格丽特马克" },
  { part: "Part IV - 营销和定位", category: "如何做符合大势的品牌", book: "如何让品牌直击人心 - 品牌的12个心理原型 -- 玛格丽特马克" },
  { part: "Part IV - 营销和定位", category: "如何做符合大势的品牌", book: "文化战略 - 以创新的意识形态构建独特的品牌文化 -- 道格拉斯霍尔特" },
  { part: "Part IV - 营销和定位", category: "如何做符合大势的品牌", book: "第四消费时代 -- 三浦展" },
  // Part V - 增长和流量
  { part: "Part V - 增长和流量", category: "流量的战略级理解", book: "流量池 -- 杨飞" },
  { part: "Part V - 增长和流量", category: "流量的战略级理解", book: "回头客策略 -- 谢佳华" },
  { part: "Part V - 增长和流量", category: "增长黑客", book: "增长黑客 - 如何低成本实现爆发式增长 -- 肖恩埃利斯" },
  { part: "Part V - 增长和流量", category: "增长黑客", book: "硅谷增长黑客实战笔记 -- 曲卉" },
  { part: "Part V - 增长和流量", category: "增长黑客", book: "极简增长 -- 彭志强" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "精益数据分析 -- 阿里斯泰尔科罗尔" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "拉新 - 快速实现用户增长 -- 加布里埃尔温伯格" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "关系分轮 - 用户亲密关系如何左右私域及未来增长热潮 -- 徐志斌" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "小群效应 -- 徐志斌" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "直播电商的逻辑 -- 楚燕来" },
  { part: "Part V - 增长和流量", category: "平台环境", book: "流媒体的时代 - 新媒体和娱乐行业的未来 -- 迈克尔史密斯" },
  // Part VI - 财务金融和法律
  { part: "Part VI - 财务金融和法律", category: "财务类", book: "财务报表分析必修课 -- 张新民" },
  { part: "Part VI - 财务金融和法律", category: "财务类", book: "从报表看企业 -- 张新民" },
  { part: "Part VI - 财务金融和法律", category: "财务类", book: "经营与会计 -- 稻盛和夫" },
  { part: "Part VI - 财务金融和法律", category: "财务类", book: "中小企业财务报表分析 -- 张新民" },
  { part: "Part VI - 财务金融和法律", category: "法律类", book: "企业财税合规实战入门 -- 宋瑾篱" },
  { part: "Part VI - 财务金融和法律", category: "法律类", book: "电商财税合规一本通 -- 春戈" },
  { part: "Part VI - 财务金融和法律", category: "公司金融类", book: "创业投资法律手册 - 那些你在创业时期应该知道的公司法知识 -- 杨春宝" },
  { part: "Part VI - 财务金融和法律", category: "公司金融类", book: "什么是金融 -- 米歇尔德赛" },
  { part: "Part VI - 财务金融和法律", category: "公司金融类", book: "公司金融 -- 对外经贸大学" },
  { part: "Part VI - 财务金融和法律", category: "公司金融类", book: "金融经济学25讲 -- 徐高" },
  { part: "Part VI - 财务金融和法律", category: "公司金融类", book: "公司理财 -- 达摩达兰" },
  // Part VII - 股份分配和融资
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "穿越寒冬 - 创业者的融资策略与独角兽思维 -- 史蒂夫霍夫曼" },
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "超级天使投资 - 捕捉未来商业机会的行动指南 -- 戴维罗斯" },
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "风险投资的游戏 - 条款清单全揭秘 -- 布拉德菲尔德" },
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "股权融资 - 创业与风险投资 -- 桂曙光" },
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "创业之初你不可不知的融资秘密 - 寻找风险投资全揭秘 -- 桂曙光" },
  { part: "Part VII - 股份分配和融资", category: "外部融资", book: "给你一个亿你能干什么 - 天使投资人写给有梦想的创业者 -- 查立" },
  { part: "Part VII - 股份分配和融资", category: "内部分股", book: "一本书看透股权架构 -- 李利威" },
  { part: "Part VII - 股份分配和融资", category: "内部分股", book: "股权是1 -- 王坤" },
  { part: "Part VII - 股份分配和融资", category: "内部分股", book: "股权战争 - 创投界的mba式教案 -- 苏飞龙" },
  // Part VIII - 团队建设
  { part: "Part VIII - 团队建设", category: "人生智慧", book: "穷查理宝典 -- 查理芒格" },
  { part: "Part VIII - 团队建设", category: "效率提升", book: "高效能人士的七个习惯 -- 史蒂芬柯维" },
  { part: "Part VIII - 团队建设", category: "okr管理", book: "学会提问 -- 尼尔布朗" },
  { part: "Part VIII - 团队建设", category: "okr管理", book: "OKR - 源于英特尔和谷歌的目标管理利器 -- 保罗尼文" },
  { part: "Part VIII - 团队建设", category: "okr管理", book: "这就是OKR - 让谷歌和亚马逊实现爆炸性增长的工作法 -- 约翰杜尔" },
  { part: "Part VIII - 团队建设", category: "企业文化", book: "金字塔原理 -- 芭芭拉明托" },
  { part: "Part VIII - 团队建设", category: "企业文化", book: "不拘一格 - 网飞的自由与责任工作法 -- 里德哈斯廷斯" },
  { part: "Part VIII - 团队建设", category: "企业文化", book: "奈飞文化手册 -- 帕蒂麦考德" },
  { part: "Part VIII - 团队建设", category: "创意思维", book: "创造时间 - 专注于每天最重要的事 -- 杰克" },
  { part: "Part VIII - 团队建设", category: "创意思维", book: "黄沾创意思维课 -- 黄沾" },
];

function parseBook(raw: { part: string; category: string; book: string }): Book {
  const bookStr = raw.book.trim();
  const separatorIndex = bookStr.lastIndexOf(' -- ');
  let title = bookStr;
  let author = '';
  if (separatorIndex !== -1) {
    title = bookStr.substring(0, separatorIndex).trim();
    author = bookStr.substring(separatorIndex + 4).trim();
  }
  return { ...raw, title, author };
}

function buildParts(): Part[] {
  const partMap = new Map<string, Map<string, Book[]>>();

  for (const raw of rawData) {
    if (!partMap.has(raw.part)) {
      partMap.set(raw.part, new Map());
    }
    const catMap = partMap.get(raw.part)!;
    if (!catMap.has(raw.category)) {
      catMap.set(raw.category, []);
    }
    catMap.get(raw.category)!.push(parseBook(raw));
  }

  const parts: Part[] = [];
  let idx = 1;
  for (const [partName, catMap] of Array.from(partMap.entries())) {
    const categories: Category[] = [];
    let totalBooks = 0;
    for (const [catName, books] of Array.from(catMap.entries())) {
      categories.push({ name: catName, books });
      totalBooks += books.length;
    }
    const dashIdx = partName.indexOf(' - ');
    const shortName = dashIdx !== -1 ? partName.substring(dashIdx + 3) : partName;
    parts.push({
      id: `part-${idx}`,
      name: partName,
      shortName,
      categories,
      totalBooks,
    });
    idx++;
  }
  return parts;
}

export const readingListParts: Part[] = buildParts();

export const allBooks: Book[] = rawData.map(parseBook);

export const totalBookCount = allBooks.length;
