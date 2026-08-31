import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  ChartBar,
  CheckCircle,
  CirclesThreePlus,
  Database,
  List,
  Robot,
  Toolbox,
  TrendUp,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const chapters = [
  ["hero", "首页"],
  ["contents", "成果总览"],
  ["responsibility", "岗位职责"],
  ["work", "工作台与工具"],
  ["training", "培训"],
  ["growth", "成长"],
  ["team-plan", "后期规划"],
  ["self-plan", "自身规划"],
  ["thanks", "致谢"],
];

const navItems = [
  ["hero", "首页"],
  ["contents", "成果"],
  ["responsibility", "职责"],
  ["work", "工作"],
  ["team-plan", "规划"],
];

const headlineMetrics = [
  { value: "4", label: "个业务工作台", note: "客服、SEO、春田鲜生、母婴" },
  { value: "7", label: "项专项工具", note: "覆盖招聘、绩效、运营与投流" },
  { value: "7", label: "个部门 / 业务单元", note: "已有交付、支持或培训记录" },
  { value: "1", label: "套培训赋能体系", note: "Obsidian 知识管理 + WorkBuddy 实操" },
];

const departments = [
  { name: "客服中心", work: "自动化中心", detail: "售后组、平台组、周报月报" },
  { name: "综合管理中心", work: "绩效与招聘", detail: "绩效表格、招招机器人" },
  { name: "平台运营部", work: "业务自动化", detail: "密令、活动录入、SEO" },
  { name: "投流 / 社群运营中心", work: "投流数据", detail: "OCPX 与整点数据抓取" },
  { name: "春田鲜生", work: "经营数据中台", detail: "用户、内容、客服、产品运营" },
  { name: "母婴", work: "社群运营数据看板", detail: "客户、推广位、商品及运营基建" },
  { name: "AI 小组", work: "知识协作", detail: "Obsidian 与 WorkBuddy" },
];

const workbenches = [
  {
    name: "客服部门自动化中心",
    department: "客服部门",
    status: "已上线",
    icon: UsersThree,
    summary:
      "把售后组、平台组和周报月报任务统一到一个网页入口，并接入 Jira、CSRM、企微后台等业务数据。",
    metrics: ["覆盖 17 项自动化任务", "整合 7 个业务入口", "接入 3 类业务数据源"],
    outcomes: [
      "Jira、CSRM、企微后台数据可自动抓取、清洗并写入飞书多维表格，减少跨系统人工搬运。",
      "支持排班表自动生成、员工 open_id 自动同步和周数据统计，减少人工制表与重复维护。",
      "售后组、平台组及周报月报任务都能在同一页面使用，并支持任务预约、自动排队和失败重试。",
      "集中展示任务进度、运行结果和异常信息，出现问题时能够及时发现和处理。",
    ],
  },
  {
    name: "云瞻 SEO 控制中心",
    department: "SEO / 运营部门",
    status: "持续优化",
    icon: TrendUp,
    summary:
      "把关键词、文章生成、配图、AI 审核、多平台发布、链接回填与数据分析接入同一个增长控制中心。",
    metrics: ["覆盖 4 类数据分析", "支持主站、副站及 7 类自媒体", "推广效果持续追踪"],
    outcomes: [
      "从关键词管理、文章生成、配图审核到多平台发布形成一站式流程，减少重复操作。",
      "支持 AI 审核、关键词筛选匹配和模型选择，让内容生成与发布过程更可控。",
      "统一查看发布链接、阅读、收录、排名和注册贡献，便于持续判断推广效果。",
    ],
  },
  {
    name: "春田鲜生数据中台",
    department: "春田鲜生",
    status: "核心链路可用",
    icon: Database,
    summary:
      "建设覆盖用户运营、内容运营、客服售后和产品运营的数据中台，并接入自动采集、每日播报和运行监控。",
    metrics: ["覆盖 4 个运营模块", "统一管理 26 张业务表", "支持每日自动播报"],
    outcomes: [
      "集中展示用户、内容、客服售后和产品运营数据，减少在分散 Excel 表格中查找和汇总。",
      "支持自动获取有赞与客户数据，并通过飞书每日播报，帮助团队及时掌握经营情况。",
      "统一查看数据与任务运行情况，关键问题有明确提示，方便后续跟进和优化。",
    ],
  },
  {
    name: "母婴社群运营数据看板",
    department: "母婴 / 社群运营",
    status: "持续完善",
    icon: ChartBar,
    summary:
      "围绕母婴产品销售场景，集中管理客户、推广位、商品和电话卡等运营基础数据，为社群运营提供统一的数据查看入口。",
    metrics: ["覆盖 4 类核心数据", "客户与推广位统一查看", "商品与运营基建集中管理"],
    outcomes: [
      "将客户、推广位、商品及电话卡等资料集中到同一看板，减少在多张表格中反复查找。",
      "帮助社群运营人员快速了解客户和推广资源情况，为销售跟进与日常运营安排提供数据支持。",
      "商品及运营基建数据统一维护，提升信息查找效率，也让数据更新更加清晰一致。",
      "完成业务人员使用培训，并在交付后持续收集和处理实际运行问题。",
    ],
  },
];

const tools = [
  {
    name: "招招机器人",
    department: "综合管理部门",
    status: "已完成优化",
    result:
      "自动收集简历并按岗位要求分析候选人匹配度，同时读取面试纪要生成评价，帮助招聘人员更快完成初筛和判断。",
    metric: "简历收集、初筛与面试分析一体化",
  },
  {
    name: "绩效管理工具 + 报告生成工作流",
    department: "综合管理部门",
    status: "已上线",
    result:
      "绩效管理工具负责多维表格完善与高级权限配置；报告生成工作流支持按钮触发、自动读取数据生成报告、向发起人授权，并将报告链接回写至表格。",
    metric: "绩效管理、报告生成、自动授权与链接回写",
  },
  {
    name: "投流数据自动化 V1.2",
    department: "投流 / 社群运营",
    status: "已交付",
    result:
      "自动汇总腾讯、美团、云瞻等平台数据，计算整点变化并写入飞书，帮助团队及时掌握投放情况和数据异常。",
    metric: "多平台投流数据统一汇总",
  },
  {
    name: "投流 OCPX RPA",
    department: "投流部门",
    status: "已上线",
    result:
      "每日自动建立记录并按小时更新消耗、激励、UV 等关键指标，减少人工统计，为投放调整提供及时数据。",
    metric: "关键投放指标每小时更新",
  },
  {
    name: "淘宝闪购密令申请与续期",
    department: "运营部门",
    status: "已上线",
    result:
      "自动完成密令申请、续期、结果记录和群内通知，减少跨平台查询与逐条录入，避免遗漏续期。",
    metric: "申请、续期与通知全流程自动化",
  },
  {
    name: "美团活动录入中台 RPA",
    department: "运营部门",
    status: "已上线",
    result:
      "自动获取美团活动、整理活动规则并录入云瞻中台，同时处理特殊活动和异常提醒，降低人工录入时间与错漏。",
    metric: "活动获取、规则整理与录入自动完成",
  },
  {
    name: "美团活动写入飞书 RPA",
    department: "运营部门",
    status: "已上线",
    result:
      "自动采集活动信息和门槛规则，并分类写入活动基础、每日追踪和门槛档位表，为日常活动跟踪提供统一数据。",
    metric: "活动数据自动分类沉淀至 3 张表",
  },
];

const featuredCases = [
  {
    number: "01",
    name: "春田鲜生数据中台",
    department: "春田鲜生 · 独立开发",
    status: "核心链路可用",
    problem:
      "用户、内容、客服售后与产品运营数据分散，业务人员需要在不同表格和平台之间反复查找，也缺少统一的自动化运行视图。",
    action:
      "独立完成数据中台的业务梳理、页面设计与开发，把经营指标、自动采集、每日播报、运行监控和异常追踪接入同一套系统。",
    metrics: [
      ["4", "个运营模块"],
      ["26", "张业务表统一管理"],
      ["109", "条当日运行记录"],
    ],
    outcomes: [
      "支付、订单、新老客户、毛利等经营指标可在同一页面查看，并支持按日期对比趋势。",
      "自动采集任务形成真实运行日志；当前截图记录 107 条成功、3 条重试后成功，并保留失败项供追踪。",
      "从“数据分散、任务不可见”转向业务数据与自动化运行统一管理。",
    ],
    images: [
      {
        src: "/assets/chuntian-business-dashboard.png",
        alt: "春田鲜生数据中台用户运营业务数据页面",
        label: "业务数据页面",
        caption: "经营指标、客户结构与成交趋势集中展示",
      },
      {
        src: "/assets/chuntian-automation-logs.png",
        alt: "春田鲜生数据中台自动采集与运行监控页面",
        label: "自动化运行监控",
        caption: "采集任务、运行状态、重试结果与异常统一留痕",
      },
    ],
  },
  {
    number: "02",
    name: "云瞻 SEO 控制中心",
    department: "SEO / 运营部门 · 独立开发",
    status: "持续优化",
    problem:
      "关键词、文章发布、收录、排名和注册贡献分散在不同环节，团队难以持续判断内容是否真正带来增长。",
    action:
      "独立完成 SEO 控制中心的规划与开发，将任务、文章库存、发布记录、关键词排名和注册贡献汇总为可持续追踪的增长链路。",
    metrics: [
      ["1,000", "篇文章发布记录"],
      ["213", "个关键词持续追踪"],
      ["30", "个关键词获得排名"],
    ],
    outcomes: [
      "首次把“文章发布、收录、排名、注册”放在同一条链路中衡量，避免只统计内容产量。",
      "关键词页面显示 29 个 Top 10 关键词，排名覆盖率为 14.1%，可直接定位后续优化对象。",
      "控制中心让收录不足等问题变得可见，为下一阶段提高收录率和注册贡献提供依据。",
    ],
    images: [
      {
        src: "/assets/seo-growth-dashboard.png",
        alt: "云瞻 SEO 控制中心增长看板总览",
        label: "SEO 控制中心总览",
        caption: "文章、收录、排名与注册贡献形成统一漏斗",
      },
      {
        src: "/assets/seo-keyword-dashboard.png",
        alt: "云瞻 SEO 控制中心关键词管理页面",
        label: "关键词管理页面",
        caption: "关键词排名、关联文章、阅读量与更新时间集中追踪",
      },
    ],
  },
];

const otherDeliveries = [
  {
    name: workbenches[0].name,
    department: workbenches[0].department,
    status: workbenches[0].status,
    result: workbenches[0].summary,
    metric: workbenches[0].metrics[0],
  },
  {
    name: workbenches[3].name,
    department: workbenches[3].department,
    status: workbenches[3].status,
    result: workbenches[3].summary,
    metric: workbenches[3].metrics[0],
  },
  ...tools,
];

const trainingPrograms = [
  {
    title: "Obsidian 团队知识库培训",
    icon: Brain,
    metrics: ["56 份 Markdown 笔记", "4 个岗位空间", "5 份 AI 小组文档"],
    text: "以真实的云瞻运营部知识库为演示环境，讲解信息收集、双向链接、岗位空间、SOP、项目归档和关系图谱。",
    outcome:
      "把零散资料变为可搜索、可关联、可持续维护的团队知识资产，降低新人查找和重复问答成本。",
  },
  {
    title: "WorkBuddy AI 协作培训",
    icon: Robot,
    metrics: ["飞书消息接入", "Inbox 自动整理", "Skill 方法沉淀"],
    text: "围绕收集、分类、归档、索引和问答链路，演示 WorkBuddy 如何消费归档指令，并与 Obsidian、飞书和本地脚本协同。",
    outcome:
      "让员工从单次问答转向可复用工作流，形成资料进入、AI 处理、知识沉淀、成果输出和复盘回流的闭环。",
  },
];

const laterPlans = [
  [
    "升级技术路线",
    "评估现有 RPA 流程，选择至少 2 项适合的场景，逐步升级为脚本、API 或 RPA + 脚本 + AI 的组合方案。",
  ],
  [
    "扩展业务覆盖",
    "持续梳理各部门高频、重复、耗时且容易出错的工作，保持每月至少 1 项关键交付或重要迭代。",
  ],
  [
    "记录提效价值",
    "围绕节省工时、覆盖部门和实际使用人数记录项目成果，让数智化价值清晰、可追踪。",
  ],
];

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const elements = chapters
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.25, 0.6] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Navigation({ active }) {
  const [open, setOpen] = useState(false);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="desktop-nav" aria-label="主要导航">
        {navItems.map(([id, label]) => (
          <button
            key={id}
            className={active === id ? "is-active" : ""}
            onClick={() => navigate(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        className="menu-button"
        aria-label={open ? "关闭菜单" : "打开菜单"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>
      {open && (
        <motion.nav
          className="mobile-nav"
          aria-label="移动端导航"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)}>
              {label}
            </button>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, supporting }) {
  return (
    <Reveal className="section-heading">
      <h2>{children}</h2>
      {supporting && <p>{supporting}</p>}
    </Reveal>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -32]);

  return (
    <section className="hero" id="hero" ref={ref}>
      <motion.img
        className="hero-image"
        src="/assets/organizational-constellation.png"
        alt="多个业务部门由 AI 工作流连接，并汇聚为可衡量成果"
        style={{ y: imageY, scale: imageScale }}
        fetchPriority="high"
      />
      <motion.div
        className="hero-content"
        style={{ y: contentY }}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
        }}
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="hero-title-line">让 AI 进入业务，</span>
          <span className="hero-title-line">
            让成果<span className="hero-title-accent">可以衡量</span>
          </span>
        </motion.h1>
        <motion.p
          className="hero-kicker"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          转正述职 <span /> AI 提效实践
        </motion.p>
        <motion.p
          className="hero-meta"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          汇报人：邓佳萁　部门：平台运营部　岗位：RPA 自动化专员
        </motion.p>
      </motion.div>
    </section>
  );
}

function Contents() {
  return (
    <section className="section contents" id="contents">
      <SectionTitle supporting="数据来自飞书项目总文档、RPA 周报和已交付项目记录。">
        试用期成果总览
      </SectionTitle>
      <div className="metric-mosaic">
        {headlineMetrics.map((item, index) => (
          <Reveal key={item.label} className={`metric-block metric-block-${index + 1}`} delay={index * 0.06}>
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="evidence-line">
        <CheckCircle size={24} weight="light" aria-hidden="true" />
        <p>
          当前已形成 <strong>工作台、专项工具、培训赋能</strong> 三条交付线，既解决具体任务，也沉淀统一入口、运行记录和复用方法。
        </p>
      </Reveal>
    </section>
  );
}

function Responsibilities() {
  return (
    <section className="section responsibilities" id="responsibility">
      <SectionTitle supporting="深入真实业务，把模糊需求转化为稳定、易用、能够持续运行的 AI 与自动化方案。">
        我的职责，是连接业务与技术
      </SectionTitle>
      <div className="coverage-layout">
        <Reveal className="coverage-copy">
          <span className="coverage-number">7</span>
          <h3>个可核验服务点</h3>
          <p>
            通过业务调研、流程梳理、方案设计、开发测试和上线维护，为不同部门与业务单元提供数智化支持。
          </p>
          <div className="coverage-note">
            <strong>岗位核心价值</strong>
            <p>
              识别值得自动化的效率瓶颈，用影刀 RPA、WorkBuddy、Codex 与脚本能力重构流程，让重复工作自动执行，让团队把精力投入更有价值的事情。
            </p>
          </div>
        </Reveal>
        <div className="department-map">
          {departments.map((department, index) => (
            <Reveal className="department-row" key={department.name} delay={index * 0.045}>
              <div>
                <strong>{department.name}</strong>
                <span>{department.detail}</span>
              </div>
              <p>{department.work}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCase({ item, index }) {
  return (
    <Reveal className="featured-case" delay={index * 0.08}>
      <div className="featured-case-intro">
        <div className="featured-case-index">
          <span>{item.number}</span>
          <p>{item.department}</p>
        </div>
        <div className="featured-case-title">
          <div>
            <h3>{item.name}</h3>
            <span className="status-label">{item.status}</span>
          </div>
          <p>{item.problem}</p>
        </div>
      </div>

      <div className="featured-metrics">
        {item.metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="featured-story">
        <div>
          <span>我的行动</span>
          <p>{item.action}</p>
        </div>
        <div>
          <span>形成结果</span>
          <div className="featured-outcomes">
            {item.outcomes.map((outcome) => (
              <p key={outcome}>{outcome}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="evidence-gallery">
        {item.images.map((image) => (
          <figure key={image.src}>
            <div className="evidence-image-frame">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
            <figcaption>
              <strong>{image.label}</strong>
              <span>{image.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section className="section work" id="work">
      <SectionTitle supporting="以两个独立开发的业务系统为重点，用真实页面、运行数据和业务结果说明从需求到落地的完整能力。">
        重点成果：两个业务系统
      </SectionTitle>

      <div className="work-category-heading">
        <div>
          <CirclesThreePlus size={28} weight="light" aria-hidden="true" />
          <h3>重点案例</h3>
        </div>
        <p>春田鲜生与 SEO 均由本人独立完成规划、设计与开发，当前页面数据来自真实系统截图。</p>
      </div>
      <div className="featured-case-list">
        {featuredCases.map((item, index) => (
          <FeaturedCase key={item.name} item={item} index={index} />
        ))}
      </div>

      <div className="work-category-heading tools-heading">
        <div>
          <Toolbox size={28} weight="light" aria-hidden="true" />
          <h3>其他交付</h3>
        </div>
        <p>其余工作台与专项工具作为交付矩阵呈现，保留覆盖范围，同时避免削弱重点案例。</p>
      </div>
      <div className="delivery-grid">
        {otherDeliveries.map((tool, index) => (
          <Reveal className="tool-card" key={tool.name} delay={(index % 2) * 0.07}>
            <div className="tool-card-topline">
              <span>{tool.department}</span>
              <span>{tool.status}</span>
            </div>
            <h3>{tool.name}</h3>
            <p>{tool.result}</p>
            <strong>{tool.metric}</strong>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Training() {
  return (
    <section className="section training" id="training">
      <SectionTitle supporting="培训不只讲工具操作，更把可复用的 AI 工作方法留在团队里。">
        培训内容：Obsidian + WorkBuddy
      </SectionTitle>
      <div className="training-grid">
        {trainingPrograms.map((program, index) => {
          const Icon = program.icon;
          return (
            <Reveal className="training-panel" key={program.title} delay={index * 0.1}>
              <Icon size={38} weight="light" aria-hidden="true" />
              <h3>{program.title}</h3>
              <div className="training-metrics">
                {program.metrics.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>
              <p>{program.text}</p>
              <div className="training-outcome">
                <strong>培训成果</strong>
                <p>{program.outcome}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="training-flow">
        {["资料进入", "AI 整理", "知识归档", "成果输出", "复盘回流"].map((step, index) => (
          <div key={step}>
            <span>{step}</span>
            {index < 4 && <ArrowRight size={22} aria-hidden="true" />}
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Growth() {
  return (
    <section className="section growth" id="growth">
      <SectionTitle supporting="试用期最大的成长，是学会先把业务讲清楚，再把技术做出来。">
        从接到需求就开发，到先理解业务再落地
      </SectionTitle>
      <div className="growth-layout">
        <Reveal className="growth-problem">
          <p className="growth-label">最初的挑战</p>
          <h3>技术能做，不等于需求已经清楚</h3>
          <p>
            面对陌生业务、新工具的学习成本，以及跨部门和非技术人员之间的表达差异，真正困难的是理解对方怎样工作、为什么这样工作，以及最值得自动化的环节在哪里。
          </p>
          <div className="growth-facts">
            <span>业务理解</span>
            <span>工具适应</span>
            <span>跨部门沟通</span>
            <span>非技术表达</span>
          </div>
        </Reveal>
        <Reveal className="growth-shift" delay={0.1}>
          <ArrowRight className="growth-arrow" size={62} weight="light" aria-hidden="true" />
          <div>
            <p className="growth-label">现在的工作方式</p>
            <h3>先梳理流程与原型，再进入开发</h3>
            <p>
              从“听到需求就开始做”，转变为先调研业务、整理数据与规则，再用流程图和原型图完成确认，最后进入开发、测试、反馈和持续优化。
            </p>
            <div className="growth-notes">
              <strong>春田鲜生数据工作台</strong>
              <p>对方原先主要依赖 Excel，数据分散，也很难直接描述理想工作台。我先梳理表格、数据来源和使用习惯，再将零散想法转化为流程与原型，双方确认后开展开发和迭代。</p>
              <p>由此形成项目 SOP：业务调研 → 流程梳理 → 原型确认 → 开发测试 → 反馈优化 → 文档交付。</p>
              <strong>能力进阶与业务理解</strong>
              <p>完成影刀 RPA Day 1—Day 17 系统学习，覆盖 Python、数据库、API、XPath、JSON、JavaScript、OCR、验证码和 Excel 进阶等专题，并主动学习公司业务体系，为后续需求分析补充业务背景。</p>
              <strong>自动化项目治理与文档体系</strong>
              <p>搭建部门需求管理、已有应用及自动化管理多维表格，持续维护项目状态；同步沉淀 OCPX、美团活动、淘宝密令、SEO 和客服工作台等项目文档，让自动化资产可追踪、可交接、可维护。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamPlan() {
  return (
    <section className="section team-plan" id="team-plan">
      <SectionTitle supporting="以可兑现的节奏推进技术升级、业务覆盖和价值衡量。">
        下一阶段，让数智化持续产生价值
      </SectionTitle>
      <div className="plan-layout plan-layout-wide">
        <div className="plan-list">
          {laterPlans.map(([title, text], index) => (
            <Reveal className="plan-row" key={title} delay={index * 0.08}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="plan-proof" delay={0.12}>
          <ChartBar size={34} weight="light" aria-hidden="true" />
          <h3>未来六个月行动目标</h3>
          <div>
            <span>2 项技术升级</span>
            <span>每月 ≥ 1 项关键交付</span>
            <span>3 类价值记录</span>
            <span>RPA + 脚本 + AI</span>
          </div>
          <p>目标建立在现有项目基础上，强调稳定推进和真实落地，不以脱离业务的数量作为唯一标准。</p>
        </Reveal>
      </div>
    </section>
  );
}

function SelfPlan() {
  const details = [
    "从业务描述中识别流程痛点、数据边界和真正值得自动化的机会。",
    "用流程图、原型和通俗表达，把业务想法准确转化为技术方案。",
    "深入应用 Codex 等 AI 编程工具，独立推动项目从需求到上线。",
  ];

  return (
    <section className="section self-plan" id="self-plan">
      <SectionTitle supporting="站在业务与技术之间，成为公司数智化建设的落地推动者。">
        成为懂业务的 AI 自动化开发者
      </SectionTitle>
      <div className="self-plan-layout">
        <div className="manifesto">
          {["更懂业务", "更会转译", "更能交付"].map((line, index) => (
            <Reveal className="manifesto-line" key={line} delay={index * 0.08}>
              <span>{line}</span>
              <p>{details[index]}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="self-support" delay={0.12}>
          <div className="plan-proof">
            <Brain size={34} weight="light" aria-hidden="true" />
            <h3>能力成长路径</h3>
            <div>
              <span>Codex 深度应用</span>
              <span>脚本与接口开发</span>
              <span>项目管理</span>
              <span>跨部门沟通</span>
            </div>
            <p>在真实项目中持续学习开发能力，以业务采用、稳定交付和可衡量提效检验成长。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Thanks() {
  return (
    <section className="thanks" id="thanks">
      <img
        src="/assets/organizational-constellation.png"
        alt="AI 工作流连接多个业务部门"
        loading="lazy"
      />
      <Reveal className="thanks-content">
        <p>汇报完毕</p>
        <h2>感谢聆听</h2>
        <span>下一阶段，继续让 AI 更深地进入业务，也让每一份价值被准确看见。</span>
        <small>邓佳萁　平台运营部 · RPA 自动化专员</small>
      </Reveal>
    </section>
  );
}

export function App() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.25 });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navigation active={active} />
      <main>
        <Hero />
        <Contents />
        <Responsibilities />
        <Work />
        <Training />
        <Growth />
        <TeamPlan />
        <SelfPlan />
        <Thanks />
      </main>
    </>
  );
}
