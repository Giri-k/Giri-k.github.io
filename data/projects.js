/* ==========================================================================
   data/projects.js — the single source of truth for site content.
   Edit text and numbers here; index.html and every projects/<slug>.html
   render from this object, so no markup changes are needed.

   Project fields:
     plain / stat / statLabel   home-page card (everyday words + one headline number)
     problemPlain / problem     "The problem" section (plain first, then technical)
     how: [{title, text, tech}] "How it works" steps (tech = "Under the hood")
     metrics, resultsText, results, bars, images   "Results" section
     anim                       which animation in assets/js/anims.js to show
   ========================================================================== */

window.SITE = {
  "profile": {
    "name": "Girishkaushik Karthikeyan",
    "short": "Girish",
    "role": "ML researcher & software engineer",
    "tagline": "I post-train AI agents that reason over long videos, and I build distributed systems that keep running when things break.",
    "location": "Austin, TX",
    "email": "girishk1999@utexas.edu",
    "github": "https://github.com/Giri-k",
    "linkedin": "https://www.linkedin.com/in/girishkaushik-karthikeyan-79579416b/",
    "interests": [
      "RL post-training of vision-language models (GRPO)",
      "Long-video understanding & agentic retrieval",
      "LLM systems: RAG, routing, caching, tool-using agents",
      "Distributed systems & API infrastructure"
    ]
  },
  "education": [
    {
      "school": "The University of Texas at Austin",
      "degree": "M.S. Information Science",
      "when": "Aug 2025 – May 2027",
      "note": "GPA 4.0 / 4.0",
      "courses": "Intro to ML · Deep Learning · Post-Training LLMs · Agentic AI · AI in Health · DBMS"
    },
    {
      "school": "National Institute of Technology, Tiruchirappalli",
      "degree": "B.Tech Production Engineering, Minor in Computer Applications",
      "when": "Jul 2018 – May 2022",
      "note": "GPA 8.94 / 10",
      "courses": "DSA · DBMS · OS · Data Analytics · Web Technology · Information Security · Operations Research"
    }
  ],
  "experience": [
    {
      "hash": "a1f3c9e",
      "org": "Swarm Lab, UT Austin",
      "role": "Graduate Research Assistant",
      "when": "Jun 2026 – present",
      "where": "Austin, TX",
      "tag": "HEAD -> research",
      "note": "Advised by Prof. Sandeep Chinchali",
      "summary": "I train AI models that can watch long videos and point to the exact moment that answers a question — and study which design choices make them work.",
      "highlights": [
        "Reinforcement learning",
        "Vision-language models",
        "Multi-GPU training"
      ],
      "bullets": [
        "Post-training long-video search agents (Qwen3-VL-4B) with GRPO on multi-GPU H200 nodes using verl.",
        "Designed an evidence-grounded temporal reward that teaches the agent to find the clip that supports its answer, not just the answer.",
        "Leading a controlled study of agent harnesses — search strategy × retriever × reward — to derive design principles for video agents."
      ],
      "link": "projects/video-agents.html"
    },
    {
      "type": "edu",
      "org": "The University of Texas at Austin",
      "role": "M.S. Information Science",
      "when": "Aug 2025 – May 2027",
      "where": "Austin, TX",
      "summary": "Graduate study in machine learning and AI systems.",
      "highlights": [
        "GPA 4.0 / 4.0"
      ],
      "bullets": [
        "Coursework: Intro to ML, Deep Learning, Post-Training LLMs, Agentic AI, AI in Health, DBMS."
      ]
    },
    {
      "hash": "7c2b8d1",
      "org": "Standard Chartered Bank",
      "role": "Software Development Engineer",
      "when": "Jul 2022 – Jul 2025",
      "where": "Chennai, India",
      "summary": "Built and secured the gateway and caching layers behind the bank's APIs — making them faster, safer and cheaper to run.",
      "highlights": [
        "60% faster APIs",
        "$3M+ saved per year",
        "Tool used by 100+ engineers",
        "36 h/month less downtime"
      ],
      "tag": "tag: v3.0",
      "bullets": [
        "Cut API latency 60% across 20+ microservices at 600 TPS by redesigning the Hazelcast caching layer; extended Kong API Gateway with custom Lua plugins.",
        "Saved $3M+/yr by replacing a legacy SiteMinder auth agent with an in-house session solution and moving Kong from Cassandra to DB-less mode.",
        "Built an internal CLI scaffolding tool (Webpack, Babel, test pipelines) adopted by 100+ engineers across 5 teams — 2 weeks faster project setup.",
        "Eliminated 36+ hours/month of non-prod downtime with CI/CD test automation and Prometheus alerting.",
        "Hardened mobile registration with cookie-based validation via Aspect-Oriented Programming, cutting security flags 60%."
      ]
    },
    {
      "hash": "3e9a0f4",
      "org": "Juspay Technologies",
      "role": "Front-end Developer Intern",
      "when": "Jul 2021 – Sep 2021",
      "where": "Bangalore, India",
      "summary": "Built the web front-end of a platform that helps small businesses get loans.",
      "highlights": [
        "New pages in 2 days instead of a week"
      ],
      "bullets": [
        "Built the front-end of a loan facilitation platform for MSMEs in PureScript; a reusable component library cut new-page development from 1 week to 2 days."
      ]
    },
    {
      "type": "edu",
      "org": "National Institute of Technology, Tiruchirappalli",
      "role": "B.Tech Production Engineering, Minor in Computer Applications",
      "when": "Jul 2018 – May 2022",
      "where": "Trichy, India",
      "highlights": [
        "GPA 8.94 / 10"
      ],
      "bullets": [
        "Coursework: DSA, DBMS, OS, Data Analytics, Web Technology, Information Security, Operations Research."
      ]
    }
  ],
  "skills": {
    "Languages": "Python, Java, C++, JavaScript, SQL, Lua, Shell",
    "ML / AI": "PyTorch, verl, TRL, Hugging Face, PEFT/QLoRA, vLLM, scikit-learn",
    "LLM systems": "RAG, ChromaDB, BM25, rerankers, RAGAS, agents & tool use",
    "Backend": "Spring Boot, FastAPI, gRPC, Redis, Hazelcast, Kong",
    "Infra": "Docker, Kubernetes, Jenkins, Prometheus, Nginx, SLURM",
    "Front-end": "React, Node.js, Webpack, PureScript"
  },
  "projects": [
    {
      "slug": "video-agents",
      "plain": "Teaching an AI to watch hours of video and point to the exact moment that answers a question.",
      "stat": null,
      "statLabel": "Ongoing research",
      "featured": true,
      "kind": "research",
      "title": "Post-Training Long-Video Agents",
      "oneliner": "Teaching a vision-language agent to search hours of video for evidence — and figuring out which design choices actually matter.",
      "year": "2026 – now",
      "tags": [
        "GRPO",
        "Qwen3-VL",
        "verl",
        "H200"
      ],
      "anim": "fanout",
      "problem": "Long videos are far too long to feed a vision-language model all at once. An agent must decide where to look: call a retriever, inspect frames, then answer. Agent “harnesses” differ in search strategy (one step at a time vs. many clips in parallel), in retriever, and in the reward used during RL post-training — but nobody knew which of these choices really drives accuracy.",
      "how": [
        {
          "title": "Look, search, look again",
          "text": "The agent reads the question, asks a search tool for moments that might be relevant, inspects those frames, and repeats until it is confident.",
          "tech": "Qwen3-VL-4B agent calling a temporal-retrieval tool over multiple turns."
        },
        {
          "title": "Learn by trial and reward",
          "text": "Instead of copying worked examples, the agent makes several attempts at each question and is rewarded for the good ones. This is reinforcement learning.",
          "tech": "GRPO post-training with verl on multi-GPU H200 nodes."
        },
        {
          "title": "Reward the proof, not just the answer",
          "text": "I designed a reward that checks whether the agent found the clip that actually supports its answer, so lucky guesses don't count.",
          "tech": "Evidence-grounded temporal reward, verified by overlap with annotated evidence windows."
        },
        {
          "title": "Test every combination",
          "text": "We trained agents with different search styles, search tools and rewards, then tested every agent with every setup on several long-video benchmarks.",
          "tech": "Search strategy × retriever × reward; evaluated on in- and out-of-domain long-video QA benchmarks."
        }
      ],
      "results": [
        {
          "label": "Finding",
          "text": "How the agent searches matters more than which search tool it uses. The best search tool on its own does not make the best agent."
        },
        {
          "label": "Finding",
          "text": "A trained agent can switch search tools later, but not its search style. The style has to be chosen before training."
        },
        {
          "label": "Finding",
          "text": "Rewarding the agent for finding proof makes it much better at locating the right moment, especially when it searches one step at a time."
        }
      ],
      "stack": [
        "Python",
        "PyTorch",
        "verl",
        "GRPO",
        "Qwen3-VL-4B",
        "vLLM",
        "SLURM / H200"
      ],
      "status": "Manuscript in preparation — details shared after review.",
      "links": [
        {
          "label": "Swarm Lab",
          "href": "https://utaustin-swarmlab.github.io/"
        }
      ],
      "problemPlain": "Ask an AI “when does the cyclist fall?” about an hour-long video and it struggles: today's vision-language models can only look at a limited number of frames at once. So instead of watching everything, an AI agent has to search. It jumps to promising moments, looks closer, and decides when it has enough evidence. There are many ways to build such an agent, and nobody knew which design choices actually matter.",
      "resultsText": "The study turned into practical design principles for anyone building video agents:"
    },
    {
      "slug": "distributed-cache",
      "plain": "A data store spread across many servers that keeps working even when servers crash.",
      "stat": "99.9%",
      "statLabel": "of requests served while servers were being killed",
      "featured": true,
      "kind": "systems",
      "title": "Self-Healing Distributed Cache",
      "oneliner": "A leaderless, sharded key-value cache that keeps serving while nodes are killed every few seconds.",
      "year": "2026",
      "tags": [
        "Java 21",
        "gRPC",
        "SWIM gossip",
        "Consistent hashing"
      ],
      "anim": "ring",
      "problem": "A cache cluster has to stay available and consistent when nodes crash, with no single coordinator to fail.",
      "problemPlain": "When you open an app, much of what you see comes from a cache: a fast copy of data kept in memory, split across many servers. But servers crash. If the one holding your data disappears, the app slows to a crawl or breaks. I wanted a cache with no single point of failure, where the surviving servers notice a crash on their own and take over its work automatically, within seconds.",
      "how": [
        {
          "title": "Spread the data around a ring",
          "text": "Every piece of data gets a position on a circle, and each server owns a few slices of that circle. Data belongs to the next server clockwise, so when a server leaves, only its own slices need a new home.",
          "tech": "SHA-1 consistent hashing with 150 virtual nodes per physical node; a membership change moves only ~1/N of keys."
        },
        {
          "title": "Keep a backup copy",
          "text": "Every write is copied to a second server before it is confirmed, so no single crash can lose data.",
          "tech": "Leaderless: any node accepts a request and forwards to the primary; synchronous replication (RF = 2) with version checks."
        },
        {
          "title": "Notice crashes by gossiping",
          "text": "Every second, each server checks in on a random neighbour. If one stops answering, others double-check, and after about five seconds the group agrees it is down. No central boss is needed.",
          "tech": "SWIM gossip protocol with direct and indirect probes; suspect → dead after ~5 s; all traffic over gRPC."
        },
        {
          "title": "Heal automatically",
          "text": "While a server is down, its backup copies answer instead. When it comes back, it receives just the data it missed and rejoins.",
          "tech": "Replica read fallback during handoff; targeted key-range streaming on rejoin; lazy + periodic TTL expiry."
        }
      ],
      "metrics": [
        {
          "value": 99.91,
          "suffix": "%",
          "label": "of requests succeeded while servers were being killed",
          "decimals": 2
        },
        {
          "value": 2,
          "suffix": " ms",
          "label": "response time for 99% of requests"
        },
        {
          "value": 864,
          "suffix": "K",
          "label": "requests in the chaos test"
        },
        {
          "value": 5,
          "suffix": " s",
          "label": "to recover from a crash",
          "prefix": "≤"
        }
      ],
      "resultsText": "To test it, I wrote a chaos script that killed a random server every 10 to 15 seconds while 10 clients hammered the cluster with reads and writes. Over 864,374 requests, 99.91% succeeded and 99% finished within 2 ms. The cluster recovered from each crash within 5 seconds.",
      "stack": [
        "Java 21",
        "Spring Boot 3.5",
        "gRPC / Protobuf",
        "Docker Compose",
        "Maven"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/Self-healing-distributed-cache"
        }
      ]
    },
    {
      "slug": "ai-gateway",
      "plain": "A middle layer that makes apps built on ChatGPT-style models cheaper and faster by reusing answers it has already seen.",
      "stat": "345×",
      "statLabel": "faster replies for repeated questions",
      "featured": true,
      "kind": "llm",
      "title": "AI Gateway",
      "oneliner": "An OpenAI-compatible reverse proxy that cuts LLM spend with prompt compression, semantic caching and model routing.",
      "year": "2026",
      "tags": [
        "FastAPI",
        "Redis KNN",
        "Embeddings",
        "Routing"
      ],
      "anim": "gateway",
      "problem": "Teams pay frontier-model prices for repeated and easy prompts. API gateways solved this kind of problem for microservices (I built Kong plugins at Standard Chartered) — this applies the same idea to LLM traffic.",
      "how": [
        {
          "title": "Trim the prompt",
          "text": "Extra spaces and filler are squeezed out before a request is sent, so fewer words are billed.",
          "tech": "Normalization/whitespace compression stage."
        },
        {
          "title": "Remember similar questions",
          "text": "Each question becomes a “meaning fingerprint”. If a question with almost the same meaning was answered before, the saved answer comes back instantly.",
          "tech": "all-MiniLM-L6-v2 embeddings (384-d) + Redis KNN vector search; cache hit at cosine ≥ 0.95."
        },
        {
          "title": "Pick the right model",
          "text": "Easy questions go to a small, cheap model and hard ones to a large model. A trained classifier for this decision is in progress.",
          "tech": "Heuristic complexity router (local Llama via Ollama vs GPT-4o); RouteLLM-style fine-tuned BERT router under evaluation."
        },
        {
          "title": "Drop-in and measurable",
          "text": "It speaks the same language as OpenAI's API, so an app switches by changing one URL, and every response reports what was saved.",
          "tech": "OpenAI-compatible /v1/chat/completions on FastAPI + httpx; X-Gateway-* headers; /v1/stats."
        }
      ],
      "metrics": [
        {
          "value": 345,
          "suffix": "×",
          "label": "faster on cache hits"
        },
        {
          "value": 56,
          "suffix": "%",
          "label": "cache hit rate (benchmark)"
        },
        {
          "value": 12.6,
          "suffix": " ms",
          "label": "cache hit latency",
          "decimals": 1
        },
        {
          "value": 8.7,
          "suffix": "%",
          "label": "tokens saved by compression",
          "decimals": 1
        }
      ],
      "stack": [
        "Python",
        "FastAPI",
        "Redis Stack",
        "sentence-transformers",
        "httpx",
        "Docker"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/AIGateway"
        }
      ],
      "problemPlain": "Apps built on AI models like GPT-4 pay for every word sent and received, and the same questions get asked again and again. Each repeat costs money and takes seconds. Companies solved a similar problem for ordinary web traffic with API gateways; I built plugins for one at Standard Chartered. This project puts a smart gateway in front of AI models.",
      "resultsText": "In a benchmark that sent the same set of prompts twice, 56% of requests were answered from the cache in about 12.6 ms instead of about 4.3 seconds, which is 345× faster. Compression cut another 8.7% of tokens."
    },
    {
      "slug": "sec-10k-rag",
      "plain": "Ask questions about a company's annual reports and get answers backed by the exact passage they came from.",
      "stat": "93.7%",
      "statLabel": "of retrieved passages were relevant",
      "featured": true,
      "kind": "llm",
      "title": "RAG over SEC 10-K Filings",
      "oneliner": "A local ReAct agent that answers financial questions over five years of 10-K filings with hybrid retrieval and reranking.",
      "year": "2026",
      "tags": [
        "RAG",
        "BM25 + dense",
        "Cross-encoder",
        "RAGAS"
      ],
      "anim": "funnel",
      "problem": "10-K filings are long, repetitive and section-structured. Pure vector search misses exact financial terms, and LLMs hallucinate numbers without grounding.",
      "how": [
        {
          "title": "Read and slice the reports",
          "text": "Five years of filings are downloaded, cleaned, and cut into short passages, each tagged with the section it came from (like “Risk Factors”).",
          "tech": "sec-edgar-downloader + BeautifulSoup; 1,000-char chunks with 200 overlap and ITEM-section metadata (~42K chunks for AAPL)."
        },
        {
          "title": "Search two ways at once",
          "text": "Keyword search catches exact terms like “iPhone revenue”; meaning search catches paraphrases. Using both finds more of the right passages.",
          "tech": "BM25 top-20 + dense MiniLM embeddings in ChromaDB top-20, merged."
        },
        {
          "title": "Keep the best five",
          "text": "A second, more careful model re-reads the candidates and keeps the five most relevant.",
          "tech": "Cross-encoder reranker (ms-marco-MiniLM)."
        },
        {
          "title": "Answer with evidence",
          "text": "The AI reasons step by step, searches again if it needs to, and writes an answer grounded in those passages.",
          "tech": "ReAct loop on Llama 3.1 via Ollama; Gradio UI; evaluated with RAGAS."
        }
      ],
      "metrics": [
        {
          "value": 93.7,
          "suffix": "%",
          "label": "context precision",
          "decimals": 1
        },
        {
          "value": 75.8,
          "suffix": "%",
          "label": "faithfulness (from 64.9%)",
          "decimals": 1
        },
        {
          "value": 42,
          "suffix": "K",
          "label": "chunks indexed (AAPL)"
        }
      ],
      "stack": [
        "Python",
        "ChromaDB",
        "rank_bm25",
        "sentence-transformers",
        "Ollama",
        "Gradio",
        "RAGAS"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/10-k-filings-analyzer"
        }
      ],
      "problemPlain": "Every year, public companies file a long annual report called a 10-K: hundreds of pages of risks, revenue and legal detail. Finding one fact means a lot of reading, and asking a chatbot is risky because AI models will confidently invent numbers. I wanted answers that come with the exact passages they are based on.",
      "resultsText": "Evaluated with RAGAS on Apple's filings, 93.7% of retrieved passages were relevant to the question (context precision). Tightening the prompt to stick to the evidence raised faithfulness, the share of each answer backed by the passages, from 64.9% to 75.8%."
    },
    {
      "slug": "op-us-agent",
      "plain": "An AI customer-support assistant that can't issue a refund unless a human approves it.",
      "stat": "2×",
      "statLabel": "more tickets resolved correctly than a basic chatbot",
      "featured": true,
      "kind": "llm",
      "title": "OP-US: Safe Support-Ticket Agent",
      "oneliner": "An LLM agent that triages and resolves e-commerce tickets — where Python owns every permission and the model only proposes.",
      "year": "2026",
      "tags": [
        "Agents",
        "Tool use",
        "Guardrails",
        "Team of 3"
      ],
      "anim": "state",
      "problem": "Support agents that can issue refunds are dangerous: a prompt-injected ticket or a hallucinated “I refunded you” costs real money and trust.",
      "how": [
        {
          "title": "Read and route",
          "text": "The agent reads the ticket, decides what kind it is, and sends it to the right team's queue.",
          "tech": "7 categories mapped to 4 queues."
        },
        {
          "title": "Look up the rules",
          "text": "It finds the store policies that apply, so every reply quotes a real policy.",
          "tech": "Embedding retrieval with BM25 fallback over 20 versioned policies (Hit@3 0.864)."
        },
        {
          "title": "Propose, don't decide",
          "text": "The AI can only suggest actions. Plain code checks each suggestion against budgets and permissions, and a refund needs a human's approval for that exact order and amount.",
          "tech": "Python dispatcher with call/tool budgets, retry limits and idempotency keys; tools check their own permissions; text inside a ticket can never grant one."
        },
        {
          "title": "Finish in a safe state",
          "text": "Every ticket ends in one of six clear outcomes: resolved, closed, waiting on the customer, waiting for approval, escalated, or safely stopped. It can pause for approval and resume later.",
          "tech": "JSON state store, approval/resume flow, JSONL traces of every step."
        }
      ],
      "metrics": [
        {
          "value": 63.5,
          "suffix": "%",
          "label": "end-to-end success (baseline 31.3%)",
          "decimals": 1
        },
        {
          "value": 92.2,
          "suffix": "%",
          "label": "routing accuracy (baseline 76.5%)",
          "decimals": 1
        },
        {
          "value": 0,
          "suffix": "",
          "label": "unauthorized refunds executed"
        }
      ],
      "stack": [
        "Python",
        "FastAPI",
        "React",
        "Embeddings + BM25",
        "JSONL tracing"
      ],
      "credit": "Team project with Haren Shylak and Disha Kulkarni (UT Agentic AI, Fall 2026).",
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/Agentic_AI_Project"
        }
      ],
      "problemPlain": "Online stores get thousands of support tickets: refunds, cancellations, late orders. An AI assistant could handle many of them, but one that can issue refunds is dangerous. A cleverly worded ticket (“the manager says refund me $500”) or an AI that claims it refunded someone when it didn't costs real money and trust.",
      "resultsText": "On 115 held-out test tickets, the agent handled 63.5% fully correctly versus 31.3% for a single-pass chatbot, and routed 92.2% correctly versus 76.5%. Most importantly, no unauthorized refunds were executed: every attempt was blocked by the code-level checks."
    },
    {
      "slug": "ratemaster",
      "plain": "Keeps any single user from overloading a website by fairly limiting how often they can send requests.",
      "stat": "≤5 ms",
      "statLabel": "added to each request",
      "featured": true,
      "kind": "systems",
      "title": "RateMaster",
      "oneliner": "A distributed rate limiter with token-bucket, sliding-window and fixed-window algorithms as atomic Redis Lua scripts.",
      "year": "2026",
      "tags": [
        "Redis Lua",
        "FastAPI",
        "Kong",
        "Prometheus"
      ],
      "anim": "bucket",
      "problem": "Rate limits must be exact across many API replicas. Read-then-write in application code races; the check must be atomic and shared.",
      "how": [
        {
          "title": "One shared scoreboard",
          "text": "All servers check the same counters in Redis, a fast shared memory store, so the limit holds no matter which server you reach.",
          "tech": "Redis 7 as the shared store across API replicas."
        },
        {
          "title": "Check and update in one move",
          "text": "Each check runs as a tiny script inside Redis, so two requests arriving at the same instant can't both sneak through.",
          "tech": "Atomic Lua scripts executed with EVALSHA."
        },
        {
          "title": "The right rule for each door",
          "text": "Search uses a “token bucket” that allows short bursts, login uses a strict sliding window to stop password guessing, and status pages use a cheap fixed window.",
          "tech": "Token bucket 20/min, sliding-window log (sorted set) 5/min, fixed window 100/min."
        },
        {
          "title": "Polite refusals, live dashboards",
          "text": "Blocked requests get a clear “slow down, try again in N seconds”, and dashboards show what is happening in real time.",
          "tech": "429 + Retry-After and X-RateLimit-* headers; fails open if Redis is down; Prometheus + Grafana; optional Kong plugin."
        }
      ],
      "metrics": [
        {
          "value": 5,
          "suffix": " ms",
          "label": "avg latency under load",
          "prefix": "≤"
        },
        {
          "value": 0,
          "suffix": "",
          "label": "5xx errors at 50 users"
        },
        {
          "value": 3,
          "suffix": "",
          "label": "algorithms, one API"
        }
      ],
      "stack": [
        "FastAPI",
        "Redis 7",
        "Lua",
        "Kong",
        "Prometheus",
        "Grafana",
        "Locust"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/RateMaster"
        }
      ],
      "problemPlain": "Every public website has to protect itself from someone, or some bot, sending thousands of requests a second, whether by accident or as an attack. A rate limiter decides who gets through. The hard part is doing it fairly and exactly when the website runs on many servers at once.",
      "resultsText": "Load-tested with Locust at 50 concurrent users for 60 seconds, every algorithm added only about 4–5 ms of latency, with zero server errors."
    },
    {
      "slug": "austin-traffic",
      "plain": "Predicts how fast traffic will move on Austin roads up to an hour ahead.",
      "stat": "3.2 mph",
      "statLabel": "average error, 15 minutes ahead",
      "kind": "ml",
      "title": "Austin Traffic Speed Forecasting",
      "oneliner": "Encoder-decoder LSTM forecasting road speed at 10 Austin sensors, benchmarked against ARIMA and a zero-shot foundation model.",
      "year": "2026",
      "tags": [
        "PyTorch",
        "LSTM",
        "Time series",
        "Team"
      ],
      "anim": "forecast",
      "problem": "Predict traffic speed 15, 30 and 60 minutes ahead from the past hour of sensor data — and test whether weather and city events help.",
      "how": [
        {
          "title": "Gather 18 months of road sensors",
          "text": "Speed, volume and occupancy every 5 minutes from 10 Austin radar sensors, about 1.6 million readings, plus weather and 31 major events.",
          "tech": "Apr 2020 – Sep 2021; Open-Meteo weather; chronological train / validation / test split."
        },
        {
          "title": "Learn from the past hour",
          "text": "The model reads the last 60 minutes and predicts the next 15, 30 and 60 minutes in one go.",
          "tech": "Encoder-decoder LSTM in PyTorch; Huber loss; AdamW."
        },
        {
          "title": "Compare fairly",
          "text": "We tested it against a classic statistics model and a large pre-trained forecasting model used without extra training.",
          "tech": "5-model ablation: ARIMA(2,1,2), zero-shot Chronos-T5-Base (200M), LSTM sensor-only / + weather / + weather & events."
        },
        {
          "title": "Explain the patterns",
          "text": "Splitting the data into trend and daily rhythm revealed unusual periods such as the COVID lockdown, Winter Storm Uri and holidays. A dashboard lets you try “what-if” scenarios.",
          "tech": "STL decomposition; Streamlit dashboard."
        }
      ],
      "metrics": [
        {
          "value": 3.17,
          "suffix": " mph",
          "label": "MAE @ 15 min",
          "decimals": 2
        },
        {
          "value": 8,
          "suffix": "%",
          "label": "better than Chronos-T5"
        },
        {
          "value": 7.1,
          "suffix": "%",
          "label": "better than ARIMA @ 60 min",
          "decimals": 1
        }
      ],
      "bars": {
        "title": "MAE (mph) at 15 / 30 / 60 min — lower is better",
        "series": [
          {
            "name": "LSTM (sensors)",
            "vals": [
              3.17,
              3.37,
              3.64
            ]
          },
          {
            "name": "ARIMA",
            "vals": [
              3.28,
              3.54,
              3.91
            ]
          },
          {
            "name": "Chronos-T5 zero-shot",
            "vals": [
              3.45,
              3.65,
              4.1
            ]
          }
        ]
      },
      "images": [
        {
          "src": "../assets/img/speed_overview.png",
          "caption": "Speed across sensors over 18 months"
        },
        {
          "src": "../assets/img/stl_decomposition.png",
          "caption": "STL decomposition — trend, seasonality, residual"
        }
      ],
      "stack": [
        "Python",
        "PyTorch",
        "statsmodels",
        "Chronos",
        "Streamlit"
      ],
      "credit": "Team project with Harenshylak M.K., Nikhilesh Selvam and Disha Kulkarni (UT Deep Learning).",
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/harenshylak/austin-traffic-prediction-DL"
        }
      ],
      "problemPlain": "Austin traffic changes minute to minute. If you could predict how fast a road will be moving 15 minutes to an hour from now, navigation apps and city planners could act before jams form. We wanted to know how well deep learning predicts this, and whether adding weather and city events helps.",
      "resultsText": "The sensor-only LSTM was the most accurate at every horizon, with a 3.17 mph average error 15 minutes ahead, beating ARIMA and the zero-shot foundation model. Surprisingly, adding weather and events made it slightly worse."
    },
    {
      "slug": "medical-agents",
      "plain": "AI-powered practice patients, so medical trainees can rehearse diagnosing lung disease.",
      "stat": "4",
      "statLabel": "AI agents in every simulation",
      "kind": "llm",
      "title": "Multi-Agent Medical Diagnosis Sims",
      "oneliner": "A 4-agent LLM patient simulator for training doctors on lung disease, plus a streaming API & UI for an open-source diagnostic panel.",
      "year": "2026",
      "tags": [
        "Multi-agent",
        "FastAPI",
        "React",
        "SSE"
      ],
      "anim": "agents",
      "problem": "Diagnostic reasoning is learned by asking the right questions and ordering the right tests — expensive to practice on real patients.",
      "how": [
        {
          "title": "A patient who only answers what you ask",
          "text": "An AI plays the patient and reveals symptoms and history only when the trainee asks the right question.",
          "tech": "Patient agent (GPT-4o) with case-scoped disclosure."
        },
        {
          "title": "Tests with real results and real costs",
          "text": "Ordering a test returns realistic results, including real chest CT scans, and adds its real-world price to the bill.",
          "tech": "Test Result agent; HRCT images; US test pricing; 3 cases (IPF, sarcoidosis, hypersensitivity pneumonitis)."
        },
        {
          "title": "Hints, at a price",
          "text": "Stuck trainees can ask for a hint, but it costs points.",
          "tech": "Hint agent (−15 points per hint)."
        },
        {
          "title": "A judge grades the reasoning",
          "text": "At the end, an AI judge scores the diagnosis and how efficiently it was reached.",
          "tech": "Judge agent: accuracy 1–5, plus information gathering, reasoning, cost-effectiveness and test appropriateness (0–100 each)."
        }
      ],
      "stack": [
        "FastAPI",
        "OpenAI",
        "React",
        "Vite",
        "framer-motion",
        "SSE"
      ],
      "credit": "MAI-DxO is a fork of The Swarm Corporation's open-source implementation; my contribution is the streaming API and front-end.",
      "images": [
        {
          "src": "https://raw.githubusercontent.com/Giri-k/ILD-AI-Trainer/main/backend/images/ild_004_hrct_axial_1.png",
          "caption": "HRCT scan served to trainees by the Test agent"
        }
      ],
      "links": [
        {
          "label": "ILD-AI-Trainer",
          "href": "https://github.com/Giri-k/ILD-AI-Trainer"
        },
        {
          "label": "MAI-DxO API",
          "href": "https://github.com/Giri-k/Open-MAI-Dx-Orchestrator"
        },
        {
          "label": "React UI",
          "href": "https://github.com/Giri-k/react-seq-diagnosis"
        }
      ],
      "problemPlain": "Doctors learn to diagnose by asking the right questions and ordering the right tests, skills that are hard to practise without real patients. Lung diseases like idiopathic pulmonary fibrosis are especially tricky because they look alike at first.",
      "resultsText": "The trainer runs end-to-end as a FastAPI + React app. Separately, my streaming API and React UI let anyone watch the eight-agent MAI-DxO diagnostic panel debate a case live."
    },
    {
      "slug": "gepa-grpo",
      "plain": "Comparing two ways of making an AI better at writing code that works on the first try.",
      "stat": null,
      "statLabel": "Experiment in progress",
      "kind": "ml",
      "title": "GEPA × GRPO for Code Generation",
      "oneliner": "Does prompt optimization, RL post-training, or both make Qwen3-4B write correct code on the first try?",
      "year": "2026 – now",
      "tags": [
        "GRPO",
        "LoRA",
        "Prompt optimization",
        "In progress"
      ],
      "anim": "grid2x2",
      "problem": "Prompt optimization (GEPA) and RL fine-tuning (GRPO) both claim gains on reasoning tasks, but rarely get compared head-to-head on the same model and budget.",
      "how": [
        {
          "title": "A fair 2×2 test",
          "text": "Four versions of the same model: plain, better prompt only, extra training only, and both.",
          "tech": "Qwen3-4B; base vs GRPO+LoRA weights × original vs GEPA-optimized prompt (conditions C1–C4)."
        },
        {
          "title": "Real coding problems",
          "text": "500 programming puzzles at three difficulty levels, each checked by hidden tests.",
          "tech": "Fixed APPS split: 150 intro / 300 interview / 50 competition; deduplicated against TACO."
        },
        {
          "title": "Run the code safely",
          "text": "Every answer is actually executed in a locked-down sandbox, and the score is the share of tests it passes.",
          "tech": "vLLM generation → code extraction → Docker / Apptainer sandbox with resource limits on TACC."
        },
        {
          "title": "Train on that score",
          "text": "For the training conditions, the pass rate becomes the reward.",
          "tech": "GRPO via TRL with LoRA; SLURM jobs on TACC."
        }
      ],
      "metrics": [
        {
          "value": 35.8,
          "suffix": "%",
          "label": "baseline pass@1 (C1)",
          "decimals": 1
        },
        {
          "value": 500,
          "suffix": "",
          "label": "APPS problems"
        }
      ],
      "stack": [
        "Python",
        "TRL",
        "vLLM",
        "LoRA",
        "Docker / Apptainer",
        "TACC SLURM"
      ],
      "status": "In progress — baseline complete, GEPA and GRPO arms running.",
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/gepa-grpo-codegen"
        }
      ],
      "problemPlain": "There are two popular ways to make an AI model better at a task without making it bigger: rewrite the instructions you give it (prompt optimization), or train it further with rewards (reinforcement learning). Both claim big gains, but they are rarely compared fairly on the same model and the same problems. This project does that for writing code.",
      "resultsText": "The baseline is done: the plain model solves 35.8% of problems on the first try (61% of introductory, 28% of interview and 6% of competition problems). The prompt-optimization and training conditions are running now."
    },
    {
      "slug": "llama-price",
      "plain": "Taught a small open-source AI model to guess a product's price from its description.",
      "stat": "4×",
      "statLabel": "more accurate than before training",
      "kind": "ml",
      "title": "Fine-Tuning Llama 3.1 for Price Prediction",
      "oneliner": "QLoRA fine-tune of an 8B model that reads a product description and predicts its price.",
      "year": "2024",
      "tags": [
        "QLoRA",
        "PEFT",
        "4-bit",
        "Llama 3.1"
      ],
      "anim": "shrink",
      "problem": "Can a small open model, fine-tuned cheaply, learn to price products from text?",
      "how": [
        {
          "title": "Shrink the model",
          "text": "The 8-billion-parameter model is stored with 4-bit numbers instead of 16-bit, cutting it from 32 GB to about 4.9 GB so it fits on one GPU.",
          "tech": "bitsandbytes NF4 4-bit quantization."
        },
        {
          "title": "Train a small add-on",
          "text": "Instead of retraining the whole model, a small add-on of about 27 MB learns the new skill.",
          "tech": "QLoRA: rank-8 LoRA adapters on the q/k/v/o projections via PEFT."
        },
        {
          "title": "Grade only the price",
          "text": "It reads 400K+ product descriptions and is scored only on the price it writes.",
          "tech": "Completion-only collator: loss computed only after “Price is $”."
        }
      ],
      "metrics": [
        {
          "value": 85,
          "prefix": "$",
          "suffix": "",
          "label": "mean error (base: $360)"
        },
        {
          "value": 4.9,
          "suffix": " GB",
          "label": "model size (from 32.1 GB)",
          "decimals": 1
        }
      ],
      "stack": [
        "PyTorch",
        "Hugging Face",
        "PEFT",
        "bitsandbytes",
        "Colab"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/Fine-tuning-llama-for-price-prediction"
        }
      ],
      "problemPlain": "Can a small, free AI model learn a skill you'd normally expect from a huge commercial one, like guessing what a product costs just from its description? And can it be trained cheaply, on a single GPU?",
      "resultsText": "On test products, the average pricing error fell from $360 for the untrained model to $85 after fine-tuning, about 4× more accurate."
    },
    {
      "slug": "brain-mri",
      "plain": "AI that spots brain tumors in MRI scans and highlights the part of the image it relied on.",
      "stat": "~98%",
      "statLabel": "accuracy on validation scans",
      "kind": "ml",
      "title": "Brain Tumor MRI Classification",
      "oneliner": "Benchmarking CNN, ResNet50, VGG16 and ViT on four-class brain MRI — with Grad-CAM to show where the model looks.",
      "year": "2025",
      "tags": [
        "PyTorch",
        "ViT",
        "ResNet",
        "Grad-CAM"
      ],
      "anim": "scan",
      "problem": "Classify MRIs into glioma, meningioma, pituitary tumor or no tumor — and make the prediction explainable to a clinician.",
      "how": [
        {
          "title": "Start simple",
          "text": "A small network trained from scratch sets the baseline.",
          "tech": "3-block CNN; 224 px inputs; Adam 1e-4; 10 epochs."
        },
        {
          "title": "Borrow knowledge",
          "text": "Large models pre-trained on millions of everyday photos are fine-tuned on the MRIs.",
          "tech": "ResNet50 (layer4 unfrozen), VGG16, ViT-Base."
        },
        {
          "title": "Augment safely",
          "text": "Training images are flipped and rotated, but never recolored, since color changes could alter how tissue looks.",
          "tech": "Flips, rotation and affine transforms; no color jitter."
        },
        {
          "title": "Show where it looked",
          "text": "Heatmaps highlight the part of the scan that drove each prediction.",
          "tech": "Grad-CAM."
        }
      ],
      "metrics": [
        {
          "value": 98,
          "suffix": "%",
          "label": "ResNet50 validation acc.",
          "prefix": "~"
        },
        {
          "value": 94.7,
          "suffix": "%",
          "label": "baseline CNN test acc.",
          "decimals": 1
        }
      ],
      "stack": [
        "PyTorch",
        "torchvision",
        "timm",
        "Grad-CAM"
      ],
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/Giri-k/brain-tumor-classifier-using-vit-and-cnn"
        }
      ],
      "problemPlain": "Reading brain MRI scans for tumors takes trained specialists. AI can help flag scans, but doctors won't trust a model that can't show its reasoning. The goal was to sort scans into four groups (glioma, meningioma, pituitary tumor or no tumor) and show where the model looked.",
      "resultsText": "ResNet50 reached about 98% accuracy on validation scans, and even the simple baseline CNN scored 94.7% on the test set. Grad-CAM heatmaps showed the models focusing on the tumor region."
    }
  ]
};
