// pages/newsDetail/newsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeletonShow: true,
    detail:{
      content:"测试",
      title:"刘家村-大连东软信息学院",
      publish_date:"10-25",
      view_count:"6.5k",
      author:"陈亮男"
    },
    xuanze:[
      {
        content:"<p style='margin-bottom: 15px;'>刘家生态农业认养项目位于远近闻名的果品之乡——刘家村，是村级集体企业大连鑫源实业总公司，在大力做精做强生态产业链的同时，开发建设的一处集休闲农业、农事活动和生态旅游观光体验于一体的“刘家生态农业认养项目”，打造乡村振兴发展新亮点。</p><p style='margin-bottom: 15px;'>该项目以刘家自有集体果园为基础，依托刘家庄园果品品牌，将苹果、大樱桃等果树纳入认养范围。现有三大认养区域、七个果树分区以及一个游客休闲区，充分满足认养人的各类需求。与认养人签订果树认养协议，悬挂果树认养牌，一对一配置果树认养管家，及时发布果树生长动态和农事活动信息，让认养人第一时间了解掌握果树的生长过程和管理状态。果树的日常管理均由鑫源公司负责，认养人可自愿参与田间劳作，感受农事劳作的快乐，寻找《桃花源记》中的意境和乡愁......</p><p style='margin-bottom: 15px;'>刘家生态农业认养项目是新时代农业生产的一种体制创新和经营拓展，是推动乡村振兴的一次大胆尝试，真正实现乡村经济发展与自然和谐共生，打造出一个更为开放、共享的美丽、富裕之村，走出新时代下的别样乡村振兴发展之路。</p>",
        title:"刘家生态农业认养项目简介",
        publish_date:"10-15",
        view_count:"200",
        author:"村宣传"
      },
      {
        content:"<h3>一、地理坐标</h3><p style='margin-bottom: 15px;'>刘家村位于大连市甘井子区红旗街道西南部，坐落于大连西郊国家森林公园内，是一个狭长条带式山村，距离城区5公里。</p><img style='display: block; margin: 15px auto; width: 350px' src='https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/图片2.png' alt='图片'><h3>二、村庄规模</h3><p style='margin-bottom: 15px;'>全村总面积8.16平方公里，可规划面积124公顷，在籍户数260户、人口657人。</p><h3>三、开发主体</h3><p style='margin-bottom: 15px;'>村级集体经济组织大连鑫源实业总公司联合刘家村股份经济合作社共同建设。</p><h3>四、开发理念</h3><p style='margin-bottom: 15px;'>秉承“创新、担当、绿色、共享”的发展理念，始终坚持优化生态环境，在保护中求得发展，在发展中兼顾保护的发展总基调，勇于开拓，敢于争先，扛起乡村经济建设的重担，走出新时代下的别样乡村发展之路。</p><h3>五、获得荣誉</h3><p style='margin-bottom: 15px;'>刘家村先后获得“辽宁省乡村旅游示范村”“游客最喜爱的美丽乡村”“辽宁省休闲农业和乡村旅游特色村”“大连乡村旅游最美目的地”等荣誉。</p>",
        title:"红旗街道刘家村“果品浓香·红色文旅融合发展模式”",
        publish_date:"10-16",
        view_count:"230",
        author:"村党委"
      },
      {
        content:"<h3>一、刘家村旅游资源现状</h3><p style='margin-bottom: 15px;'>刘家村位于甘井子区红旗街道西南部，全村总面积为8.16平方公里，户籍户数260户，在籍人口657人，原始植被保存完好，生态环境优越，地域特点为“八山半水一分田”，森林覆盖率为92%。目前，辖区范围内有3万余平方米长青湖公园以及5公里长绿化景观木栈道，年到访游客约40余万人，农家乐饭店3家，露营地1家，垂钓园2家，樱桃自采园500余亩，苹果、桃、梨等自采园500余亩。近年来，依靠自身区位优势，已吸引众多市民前来近郊游、徒步、踏青、骑行、露营。</p><p style='margin-bottom: 15px;'>大连鑫源实业总公司系村级集体经济组织，是刘家美丽乡村建设的重要承担者和践行者。公司秉承“创新、担当、绿色、共享”的发展理念，紧紧围绕“绿水青山就是金山银山”这一生态文明发展目标，创建绿色产业体系，大力发展都市农业、现代旅游业和服务业等。自创“刘家庄园果品”品牌，主产樱桃、苹果、桃子、梨等，享有“近郊樱桃第一村”美誉。</p><h3>二、刘家村发展旅游做法</h3><p style='margin-bottom: 15px;'>近年来大连鑫源实业总公司一直以突出生态环境保护、注重规划要素引领、加速集体经济发展、全力推进民生保障为总基调，打造刘家生态农业和休闲观光为主的文旅融合式产业链。</p><h3>（一）农业资源状况</h3><p style='margin-bottom: 15px;'>大连鑫源实业总公司是农业部地理标志“大连油桃”“大连大樱桃”“大连苹果”签约使用单位，成功入选地理标志农产品保护工程备案企业。在2021年大连樱桃地理标志品牌评选活动中，被评为“大连大樱桃示范基地”和“大连大樱桃优质品牌”，在2021年大连油桃地理标志品牌评选活动中，金霞油蟠获得金奖。</p><p style='margin-bottom: 15px;'>自2018年鑫源公司将原生产队承包的果园已全部收回，1005.2亩集体果园全部由村公司统一管理，陆续对150亩残次园进行改造，因地制宜的优化品种、建果树苗木基地。</p><h3>（二）旅游资源状况</h3><p style='margin-bottom: 15px;'>刘家村先后荣获“辽宁省乡村旅游示范村”“辽宁省休闲农业和乡村旅游特色村”“大连乡村旅游最美目的地”以及中国旅游协会颁发的“游客喜爱的美丽乡村”等荣誉称号。</p><p style='margin-bottom: 15px;'>2009年初，红旗街道践行“绿水青山就是金山银山”的发展理念，对刘家村原有河道和果园进行治理疏浚，建造了人工景观湖，取名长青湖，寓意“山水长青、幸福常在、生机无限”。水域面积2万平方米，蓄水总量5万立方米。景区内湖色宜人，锦鲤成群，岸边物种丰富，栽植云杉、元宝枫等树木70种7000余棵，形成一个天然、绿色的生态氧吧，是近郊游的首先之地。景区拥有大连市第一条园艺、生态、环保示范路——刘凌路。5公里旅游景观木栈道贯穿全域，被誉为新都市森林网红健身打卡地，漫步于此，沿途秀美风光尽收眼底。</p><p style='margin-bottom: 15px;'>2018年，公司在长青湖畔，投资创办集文创休闲于一体的“果岸咖啡店”，可接纳150余名游客。周边基础设施健全。果岸咖啡现已成为较为知名的旅游打卡地，深受市民朋友喜爱。</p><p style='margin-bottom: 15px;'>2021年6月正式启用“刘家十里党建长廊”人文景观廊道，打造红色旅游文化，献礼建党百年。项目启用当天大连电视台、大连日报、晚报、天健网等各大媒体到场并报道。截至目前，已接待外省及本市、区、街近100余个党组织及调研团队，累计参观千余人次。该项目充分将长青湖景区、鑫源公司特色产品和党建元素有机融合，让品牌亮出来、产业强起来、党建实起来，充分发挥党建引领乡村振兴作用。</p><p style='margin-bottom: 15px;'>2021年8月果岸咖啡打造“长青云集”室外观景平台，寓意“山水长青，宾客云集”。观景台临水而建与果岸咖啡紧密相连，在这里容身自然，尽享咖啡芳香，以最佳的角度观湖赏景。</p><p style='margin-bottom: 15px;'>2022年沿刘凌路两侧建设了“十里花廊”项目，摘种步登高、二月兰、向日葵等树木花草60余种、70余万株、4万余平方米，打造景观式花海，为游客提供增设网红打卡景点。</p>",
        title:"红旗街道刘家村“果品浓香·红色文旅融合发展模式”",
        publish_date:"10-19",
        view_count:"207",
        author:"村党委"
      },
      {
        content:"<p style='margin-bottom: 15px;'>大连鑫源实业总公司成立于1992年，系刘家村集体经济企业。是刘家美丽乡村建设的重要承担者和践行者。公司秉承“创新、担当、绿色、共享”的发展理念，紧紧围绕绿水青山就是金山银山这一生态文明发展目标，创建绿色产业体系，大力发展都市农业、现代旅游业和服务业等。</p><p style='margin-bottom: 15px;'>作为远近闻名的“近郊樱桃第一村”，鑫源公司凭得一方“好山好水好风光”，伴得“八山半水一分田”的独有致景，自创“西城刘家果品”品牌，自有集体果园1005.2亩，果树34582余株，主产樱桃、苹果、桃子、梨等各类果品。凭借北纬38.5°的独有“低二度小气候”，西城刘家果品色泽诱人、果香浓郁，果质细腻醇厚，口感爽脆蜜甜。</p><h3>1.打造刘家生态农业认养基地、农学基地。</h3><p style='margin-bottom: 15px;'>鑫源公司凭借优越的地理条件和区位优势，结合教育部最新义务教育课程方案，适时推出刘家生态农业认养基地和刘家生态农业农学基地项目，破解“高投入、低效益”发展难题，加快农商文旅融合发展，打造乡村振兴发展新亮点。截至目前，刘家生态农业认养基地已认养果树近1000棵。</p><h3>2.提升技术水平，促进绿色发展。</h3><p style='margin-bottom: 15px;'>引进苹果、大樱桃自动选果机、甲壳素液态膜、秸秆粉碎机、人工物理防治病虫害等技术，减支增收，绿色防控，发展绿色技术农业。建立农业苗木培育基地，引进新品苗木10000余株。与正果生物科技（上海）有限公司、大连海事大学船舶与海洋防污染控制技术国际联合研发中心合作对果园土地板结情况进行试点治理实验。</p><h3>3.斩获多项殊荣，赛出更高品质。</h3><p style='margin-bottom: 15px;'>刘家果品入选农业部地理标志“大连大樱桃、大连苹果、大连油桃”农产品保护工程备案企业。先后获得“辽宁农产品交易会优质农产品”“优质水果评选金奖”“大连油桃擂台赛金奖”；荣获“大连大樱桃示范基地”“大连大樱桃优质品牌”等荣誉。目前刘家庄园果品正在申报绿色食品。</p>",
        title:"大连鑫源实业总公司简介",
        publish_date:"10-31",
        view_count:"56",
        author:"村宣传"
      }
    ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      detail:this.data.xuanze[options.id]
    });
    setTimeout(() => {
      this.setData({
        skeletonShow:false
      })
    }, 1800);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onShareTimeline(){

  }
})