// Knowledge Domains — specialized learning areas with curated content
// Each domain links back to relevant books in the reading list

export interface Resource {
  title: string;
  description: string;
  type: "tool" | "course" | "article" | "framework" | "book" | "community";
  url?: string;
  tags: string[];
  free?: boolean;
}

export interface LearningPath {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  description: string;
  steps: { title: string; detail: string }[];
}

export interface ConceptNode {
  id: string;
  title: string;
  description: string;
  subtopics: string[];
  relatedBooks?: string[]; // book titles from reading list
}

export interface Domain {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name
  color: string; // oklch color
  status: "active" | "coming-soon";
  stats: { label: string; value: string }[];
  concepts: ConceptNode[];
  learningPaths: LearningPath[];
  resources: Resource[];
  relatedReadingListParts: string[]; // part short names from reading list
}

export const domains: Domain[] = [
  {
    id: "data-engineering",
    slug: "data-engineering",
    title: "Data Engineering",
    subtitle: "Build the infrastructure that powers data-driven decisions",
    description:
      "Data engineering is the practice of designing, building, and maintaining the systems and infrastructure that enable data collection, storage, processing, and analysis at scale. It sits at the intersection of software engineering and data science, forming the backbone of every modern data-driven organization.",
    icon: "Database",
    color: "oklch(0.45 0.12 240)",
    status: "active",
    stats: [
      { label: "Core Concepts", value: "8" },
      { label: "Curated Tools", value: "24" },
      { label: "Learning Paths", value: "3" },
      { label: "Resources", value: "20" },
    ],
    concepts: [
      {
        id: "data-modeling",
        title: "Data Modeling",
        description:
          "The process of defining how data is structured, stored, and related within a system. Includes dimensional modeling, entity-relationship diagrams, and schema design patterns.",
        subtopics: [
          "Star & Snowflake Schemas",
          "Slowly Changing Dimensions (SCD)",
          "Data Vault 2.0",
          "Normalization vs Denormalization",
          "Entity-Relationship Diagrams",
        ],
        relatedBooks: ["精益数据分析"],
      },
      {
        id: "data-pipelines",
        title: "Data Pipelines & ETL/ELT",
        description:
          "Automated workflows that extract data from sources, transform it into usable formats, and load it into destinations. Modern ELT patterns leverage cloud-scale compute.",
        subtopics: [
          "Batch vs Streaming Processing",
          "ETL vs ELT Patterns",
          "Apache Airflow Orchestration",
          "dbt Transformations",
          "Change Data Capture (CDC)",
        ],
        relatedBooks: [],
      },
      {
        id: "data-warehousing",
        title: "Data Warehousing",
        description:
          "Centralized repositories optimized for analytical queries across large volumes of historical data. Modern cloud warehouses like Snowflake and BigQuery have redefined the space.",
        subtopics: [
          "OLAP vs OLTP",
          "Columnar Storage",
          "Partitioning & Clustering",
          "Snowflake / BigQuery / Redshift",
          "Lakehouse Architecture",
        ],
        relatedBooks: [],
      },
      {
        id: "streaming",
        title: "Stream Processing",
        description:
          "Real-time processing of continuous data streams. Enables low-latency analytics, event-driven architectures, and real-time ML feature computation.",
        subtopics: [
          "Apache Kafka",
          "Apache Flink",
          "Spark Structured Streaming",
          "Event Sourcing",
          "Exactly-Once Semantics",
        ],
        relatedBooks: [],
      },
      {
        id: "data-quality",
        title: "Data Quality & Observability",
        description:
          "Practices and tools to ensure data is accurate, complete, consistent, and timely. Data observability extends monitoring to detect anomalies and lineage issues proactively.",
        subtopics: [
          "Data Contracts",
          "Great Expectations / Soda",
          "Data Lineage",
          "Schema Evolution",
          "SLA Monitoring",
        ],
        relatedBooks: ["精益数据分析"],
      },
      {
        id: "cloud-infra",
        title: "Cloud Infrastructure",
        description:
          "Leveraging cloud platforms to build scalable, cost-efficient data infrastructure. Covers infrastructure-as-code, containerization, and managed services.",
        subtopics: [
          "AWS / GCP / Azure Data Services",
          "Terraform for Data Infra",
          "Docker & Kubernetes",
          "Serverless Data Processing",
          "Cost Optimization",
        ],
        relatedBooks: [],
      },
      {
        id: "data-governance",
        title: "Data Governance & Security",
        description:
          "Policies, processes, and standards that ensure data is managed as a strategic asset — covering ownership, access control, privacy compliance, and cataloging.",
        subtopics: [
          "Data Catalogs (DataHub, Amundsen)",
          "GDPR / CCPA Compliance",
          "Role-Based Access Control",
          "Data Classification",
          "Master Data Management",
        ],
        relatedBooks: [],
      },
      {
        id: "analytics-engineering",
        title: "Analytics Engineering",
        description:
          "The emerging discipline bridging data engineering and data analysis — using software engineering best practices to build reliable, tested, documented data models consumed by analysts.",
        subtopics: [
          "dbt (data build tool)",
          "Semantic Layer",
          "Metrics Definitions",
          "Documentation as Code",
          "CI/CD for Data",
        ],
        relatedBooks: ["精益数据分析"],
      },
    ],
    learningPaths: [
      {
        level: "Beginner",
        title: "Data Engineering Foundations",
        description:
          "Build a solid foundation in SQL, Python, and core data concepts before diving into distributed systems.",
        steps: [
          { title: "Master SQL", detail: "Window functions, CTEs, query optimization, and database design fundamentals." },
          { title: "Python for Data", detail: "Pandas, data manipulation, file formats (CSV, JSON, Parquet), and scripting." },
          { title: "Understand Data Modeling", detail: "Star schemas, normalization, and dimensional modeling basics." },
          { title: "Learn a Cloud Platform", detail: "AWS or GCP fundamentals — storage, compute, and managed databases." },
          { title: "Build Your First Pipeline", detail: "Create an end-to-end ETL pipeline using Python and a cloud data warehouse." },
        ],
      },
      {
        level: "Intermediate",
        title: "Modern Data Stack",
        description:
          "Learn the tools and patterns powering production data platforms at scale.",
        steps: [
          { title: "Apache Airflow", detail: "DAG authoring, scheduling, sensors, and production deployment patterns." },
          { title: "dbt Core", detail: "Modular SQL transformations, testing, documentation, and incremental models." },
          { title: "Cloud Data Warehousing", detail: "Deep dive into Snowflake or BigQuery — performance tuning and cost control." },
          { title: "Data Quality", detail: "Implement data contracts, automated testing with Great Expectations or Soda." },
          { title: "Streaming Basics", detail: "Kafka fundamentals, consumer/producer patterns, and stream-batch integration." },
        ],
      },
      {
        level: "Advanced",
        title: "Data Platform Engineering",
        description:
          "Design and operate enterprise-grade data platforms with high reliability and governance.",
        steps: [
          { title: "Lakehouse Architecture", detail: "Apache Iceberg / Delta Lake — ACID transactions on object storage." },
          { title: "Real-Time Streaming", detail: "Apache Flink or Spark Structured Streaming for complex event processing." },
          { title: "Data Mesh", detail: "Domain-oriented data ownership, data products, and federated governance." },
          { title: "Infrastructure as Code", detail: "Terraform, Pulumi — reproducible data infrastructure at scale." },
          { title: "Data Observability", detail: "Monte Carlo, Bigeye, or custom observability — lineage, anomaly detection, SLAs." },
        ],
      },
    ],
    resources: [
      // Tools
      { title: "Apache Airflow", description: "The leading open-source workflow orchestration platform for data pipelines.", type: "tool", url: "https://airflow.apache.org", tags: ["Orchestration", "Open Source"], free: true },
      { title: "dbt (data build tool)", description: "Transform data in your warehouse using SQL with software engineering best practices.", type: "tool", url: "https://www.getdbt.com", tags: ["Transformation", "Analytics Engineering"], free: true },
      { title: "Apache Kafka", description: "Distributed event streaming platform for high-throughput, fault-tolerant data pipelines.", type: "tool", url: "https://kafka.apache.org", tags: ["Streaming", "Open Source"], free: true },
      { title: "Apache Spark", description: "Unified analytics engine for large-scale data processing and ML workloads.", type: "tool", url: "https://spark.apache.org", tags: ["Processing", "Open Source"], free: true },
      { title: "Snowflake", description: "Cloud data platform with separation of storage and compute, enabling elastic scaling.", type: "tool", url: "https://www.snowflake.com", tags: ["Data Warehouse", "Cloud"], free: false },
      { title: "Great Expectations", description: "Open-source data quality and validation framework with rich documentation.", type: "tool", url: "https://greatexpectations.io", tags: ["Data Quality", "Open Source"], free: true },
      { title: "Airbyte", description: "Open-source ELT platform with 300+ pre-built connectors for data integration.", type: "tool", url: "https://airbyte.com", tags: ["ELT", "Connectors", "Open Source"], free: true },
      { title: "Apache Iceberg", description: "Open table format for huge analytic datasets — ACID transactions on object storage.", type: "tool", url: "https://iceberg.apache.org", tags: ["Lakehouse", "Open Source"], free: true },
      // Courses
      { title: "Data Engineering Zoomcamp", description: "Free 9-week bootcamp by DataTalks.Club covering the full modern data stack.", type: "course", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp", tags: ["Bootcamp", "Free", "Hands-on"], free: true },
      { title: "Fundamentals of Data Engineering (O'Reilly)", description: "Comprehensive book by Joe Reis & Matt Housley covering the full data engineering lifecycle.", type: "book", url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/", tags: ["Book", "Comprehensive"], free: false },
      { title: "dbt Courses", description: "Official dbt Learn courses — from fundamentals to advanced Jinja and testing.", type: "course", url: "https://courses.getdbt.com", tags: ["dbt", "Analytics Engineering"], free: true },
      { title: "Databricks Academy", description: "Free learning paths for Apache Spark, Delta Lake, and ML on Databricks.", type: "course", url: "https://www.databricks.com/learn/training", tags: ["Spark", "Lakehouse"], free: true },
      // Frameworks & Articles
      { title: "The Data Engineering Lifecycle", description: "Joe Reis's framework: Generation → Storage → Ingestion → Transformation → Serving.", type: "framework", url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/", tags: ["Framework", "Lifecycle"], free: true },
      { title: "Data Mesh Principles", description: "Zhamak Dehghani's foundational article on domain-oriented data ownership.", type: "article", url: "https://martinfowler.com/articles/data-mesh-principles.html", tags: ["Architecture", "Data Mesh"], free: true },
      { title: "Modern Data Stack Blog", description: "The go-to community resource for news, tutorials, and tool comparisons.", type: "community", url: "https://www.moderndatastack.xyz", tags: ["Community", "News"], free: true },
      { title: "Seattle Data Guy Newsletter", description: "Weekly newsletter on data engineering trends, tools, and career advice.", type: "article", url: "https://seattledataguy.substack.com", tags: ["Newsletter", "Career"], free: true },
      // Communities
      { title: "dbt Community Slack", description: "Active Slack community of 50,000+ analytics engineers and data practitioners.", type: "community", url: "https://www.getdbt.com/community/join-the-community", tags: ["Community", "Slack"], free: true },
      { title: "DataTalks.Club", description: "Free community for data practitioners — events, courses, and peer learning.", type: "community", url: "https://datatalks.club", tags: ["Community", "Free"], free: true },
      { title: "Locally Optimistic", description: "Blog and Slack community for analytics and data leaders at startups.", type: "community", url: "https://locallyoptimistic.com", tags: ["Community", "Analytics"], free: true },
      { title: "Awesome Data Engineering", description: "Curated GitHub list of data engineering resources, tools, and papers.", type: "article", url: "https://github.com/igorbarinov/awesome-data-engineering", tags: ["GitHub", "Curated List"], free: true },
    ],
    relatedReadingListParts: ["增长和流量", "如何做产品", "财务金融和法律"],
  },
  {
    id: "product-management",
    slug: "product-management",
    title: "Product Management",
    subtitle: "Build products people love through structured thinking",
    description: "Coming soon — a curated curriculum on product strategy, user research, roadmapping, and go-to-market execution, cross-linked with the Product and Marketing sections of the reading list.",
    icon: "Layers",
    color: "oklch(0.50 0.14 30)",
    status: "coming-soon",
    stats: [],
    concepts: [],
    learningPaths: [],
    resources: [],
    relatedReadingListParts: ["如何做产品", "营销和定位", "创业思维"],
  },
  {
    id: "startup-finance",
    slug: "startup-finance",
    title: "Startup Finance & Fundraising",
    subtitle: "Navigate cap tables, term sheets, and investor relations",
    description: "Coming soon — a structured guide to startup financial modeling, equity structuring, VC fundraising, and financial reporting, integrated with the Finance and Fundraising parts of the reading list.",
    icon: "TrendingUp",
    color: "oklch(0.48 0.13 145)",
    status: "coming-soon",
    stats: [],
    concepts: [],
    learningPaths: [],
    resources: [],
    relatedReadingListParts: ["财务金融和法律", "股份分配和融资", "创业思维"],
  },
  {
    id: "growth-marketing",
    slug: "growth-marketing",
    title: "Growth & Marketing",
    subtitle: "Acquire, retain, and monetize users at scale",
    description: "Coming soon — a practical curriculum on growth hacking, performance marketing, brand positioning, and community-led growth, tied to the Marketing and Growth sections of the reading list.",
    icon: "Megaphone",
    color: "oklch(0.52 0.15 310)",
    status: "coming-soon",
    stats: [],
    concepts: [],
    learningPaths: [],
    resources: [],
    relatedReadingListParts: ["营销和定位", "增长和流量", "如何做产品"],
  },
];

export function getDomainBySlug(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}
