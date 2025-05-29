// onboarding header links
export const onboardingHeaderLinks = [
  {
    name: "Pricing",
    path: "/",
    dropdownItems: [
      { name: "Basic Plan", path: "/" },
      { name: "Premium Plan", path: "/" },
      { name: "Enterprise", path: "/" },
    ],
  },
  {
    name: "Products",
    path: "/",
    dropdownItems: [
      { name: "CRM", path: "/" },
      { name: "Inventory", path: "/" },
      { name: "Analytics", path: "/" },
    ],
  },
  {
    name: "Resources",
    path: "/",
    dropdownItems: [
      { name: "Documentation", path: "/" },
      { name: "Blog", path: "/" },
      { name: "Support", path: "/" },
    ],
  },
  {
    name: "Demo",
    path: "/",
    dropdownItems: [
      { name: "Live Demo", path: "/" },
      { name: "Request Demo", path: "/" },
    ],
  },
];

export const sideBarData = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "pixelarticons:dashbaord",
  },
  {
    name: "Create Website",
    path: "/create-website",
    dropdownItems: [
      { name: "Website", path: "/create-website" },
      { name: "Templates", path: "/create-website/templates" },
      { name: "Website Analytics", path: "/create-website/analytics" },
    ],
    icon: "carbon:create-link",
  },
  {
    name: "Social Scheduler",
    path: "/social-scheduler",
    icon: "healthicons:i-schedule-school-date-time",
    dropdownItems: [
      { name: "Dashboard", path: "/social-scheduler" },
      { name: "Create Post", path: "/social-scheduler/post" },
      { name: "All Posts", path: "/social-scheduler/all-posts" },
      { name: "Channels", path: "/social-scheduler/channels" },
    ],
  },
  {
    name: "Email Campaigns",
    path: "/email-campaigns",
    dropdownItems: [
      { name: "Analytics", path: "/email-campaigns/analytics" },
      { name: "Templates", path: "/email-campaigns/templates" },
      { name: "Campaigns", path: "/email-campaigns/campaigns" },
      { name: "Subscribers", path: "/email-campaigns/subscribers" },
    ],
    icon: "material-symbols:campaign-outline",
  },
  {
    name: "Ads Manager",
    path: "/ads-manager",
    icon: "material-symbols:ads-click",
  },
  {
    name: "Community Hub",
    path: "/community-hub",
    icon: "fluent:people-community-24-filled",
  },
  {
    name: "SEO Tools",
    path: "/seo-tools",
    icon: "ri:seo-fill",
    dropdownItems: [
      { name: "SEO Dashboard", path: "/seo-tools" },
      { name: "Site Audit", path: "/seo-tools/site-audit" },
      { name: "Domain Overview", path: "/seo-tools/domain-overview" },
      { name: "Traffic Analytics", path: "/seo-tools/traffic-analytics" },
      { name: "Keyword overview", path: "/seo-tools/keyword-overview" },
      { name: "Backlink Audit", path: "/seo-tools/backlink-audit" },
      { name: "Backlink Analytic", path: "/seo-tools/backlink-analytic" },
    ],
  },
  {
    name: "Support",
    path: "/support",
    icon: "fluent:person-support-24-filled",
  },
];

import { ads, mail, post, web } from "../assets";

export const dashBoardCardsData = [
  {
    icon: web,
    title: "Create Website",
    body: "Create a personalized website for your brand. Help your brand stand out",
    link: "/create-website",
  },
  {
    icon: mail,
    title: "Create Campaign",
    body: "Reach wide audience with a single customized email. Get global",
    link: "/email-campaigns/analytics",
  },
  {
    icon: post,
    title: "Create Post",
    body: "Manage your social media platforms in one place. Post on all socials at the same time",
    link: "/social-scheduler",
  },
  {
    icon: ads,
    title: "Create Ads",
    body: "Create Ads that reach wide audience with just one click. Create Ads that converts",
    link: "/ads-manager",
  },
];

export const socialAccounts = [
  {
    name: "Facebook",
    icon: "logos:facebook",
    ad: "Image, videos, stories & reels ads",
  },
  {
    name: "Instagram",
    icon: "logos:instagram-icon",
    ad: "Image, videos, stories & reels ads",
  },
  {
    name: "X (Formerly Twitter)",
    icon: "ri:twitter-x-line",
    ad: "promoted tweets, promoted accounts, promoted hashtags, promoted trends, promoted keywords, and more",
  },
  {
    name: "LinkedIn",
    icon: "logos:linkedin-icon",
    ad: "promoted posts, promoted accounts, promoted hashtags, promoted trends, promoted keywords, and more",
  },
  // {
  //   name: "YouTube",
  //   icon: "logos:youtube-icon",
  //   ad: "skippable & non-skippable video ads, sponsored content, and more",
  // },
  // {
  //   name: "TikTok",
  //   icon: "logos:tiktok-icon",
  //   ad: "in-feed ads, top view ads, and more",
  // },
  // {
  //   name: "Pinterest",
  //   icon: "logos:pinterest",
  //   ad: "promoted pins, promoted collections, and more",
  // },
];
