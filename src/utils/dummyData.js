export const notifications = [
  {
    body: "Your email campaign 'Spring Sale Promo' has been sent to 1000 subscribers.",
  },
  {
    body: "Your latest ad campaign is performing 20% better than last week. Check insights now!",
  },
  {
    body: "Your subscription is about to expire in 3 days. Renew now to avoid interruptions",
  },
  {
    body: "AK just signed up for your service. Check their profile now.",
  },
  {
    body: "Your latest ad campaign is performing 20% better than last week. Check insights now!",
  },
];
import {
  post1,
  post2,
  post3,
  post4,
  website1,
  website2,
  website3,
} from "../assets";
export const emailTemplates = [
  {
    title: "Simple Template",
    description: "Customize your email with this simple template",
    image: website1,
  },
  {
    title: "Modern Template",
    description: "Customize your email with this modern template",
    image: website2,
  },
  {
    title: "Professional Template",
    description: "Customize your email with this professional template",
    image: website3,
  },

  {
    title: "Modern Template",
    description: "Customize your email with this modern template",
    image: website2,
  },
  {
    title: "Modern Template",
    description: "Customize your email with this modern template",
    image: website2,
  },
];
export const userProfile = {
  name: "M360 Bakes",
  id: "ID-204-5089",
  email: "m360bakes@gmail.com",
  phone: "08134567890",
  address: "123 Main St, City, Country",
  image: "https://randomuser.me/api/portraits/men/4.jpg",
  tier: "2",
};

export const sampleStats = [
  {
    title: "Total emails sent",
    value: 12845,
    change: 12.5,
    trend: "up",
    fromText: "vs. previous 30 days",
  },
  {
    title: "Total reach",
    value: 3642,
    change: 8.2,
    trend: "up",
    fromText: "vs. previous campaign",
  },
  {
    title: "Social Engagement",
    value: 7891,
    change: 3.7,
    trend: "down",
    fromText: "vs. last week",
  },
  {
    title: "Conversion Rate",
    value: 2.4,
    change: 5.1,
    trend: "up",
    fromText: "vs. previous month",
  },
];

export const adsAnalytics = [
  {
    title: "Impression",
    count: "20,000",
    change: "-2.5%",
  },
  {
    title: "eCPM",
    count: "$1.86",
    change: "-12.67%",
  },
  {
    title: "Visibility",
    count: "58.5%",
    change: "+4.2%",
  },
];

export const dummyPosts = [
  {
    body: "Your future is created by what you do today, not tomorrow.Take that step!😎🔥",
    hashTag: "#KeepGoing",
    date: "2023-06-20",
    time: "12:30 PM",
    image: post1,
  },
  {
    body: "We're excited to announce that we've just launched our new website! Take a look and let us know what you think.👀👍",
    hashTag: "#NewWebsite",
    date: "2023-06-19",
    time: "10:15 AM",
    image: post2,
  },
  {
    body: "We're excited to announce that we've just launched our new website! Take a look and let us know what you think.👀👍",
    hashTag: "#NewWebsite",
    date: "2023-06-19",
    time: "10:15 AM",
    image: post3,
  },
  {
    body: "We're excited to announce that we've just launched our new website! Take a look and let us know what you think.👀👍",
    hashTag: "#NewWebsite",
    date: "2023-06-19",
    time: "10:15 AM",
    image: post3,
  },
  {
    body: "We're excited to announce that we've just launched our new website! Take a look and let us know what you think.👀👍",
    hashTag: "#NewWebsite",
    date: "2023-06-19",
    time: "10:15 AM",
    image: post4,
  },
  {
    body: "We're excited to announce that we've just launched our new website! Take a look and let us know what you think.👀👍",
    hashTag: "#NewWebsite",
    date: "2023-06-19",
    time: "10:15 AM",
    image: post3,
  },
];

export const liveAdspost = [
  {
    icon: "logos:facebook",
    title: "Marketing like a pro",
    body: "Market like a pro to stand out in the competitive world",
    image: post1,
    postedAt: "today at 10:00 AM",
    engagement: "2,000",
    views: "1,600",
    clicks: "100",
  },
  {
    icon: "logos:instagram-icon",
    title: "Art Of Engagement Capitalism",
    body: "Capitalism is the art of engagement",
    image: post2,
    postedAt: "today at 08:00 AM",
    engagement: "62,000",
    views: "19,000",
    clicks: "11,000",
  },
  {
    icon: "logos:linkedin-icon",
    title: "The Art of Engagement",
    body: "Engagement is the key to success",
    image: post3,
    postedAt: "today at 08:00 AM",
    engagement: "12,000",
    views: "1,000",
    clicks: "100",
  },
];

export const reports = [
  {
    name: "Unlock your potentials",
    totalSent: 100,
    delivered: 90,
    rate: 90,
    status: "Success",
  },
  {
    name: "Deals days",
    totalSent: 1040,
    delivered: 901,
    rate: 90,
    status: "Failed",
  },
  {
    name: "Brand potentials",
    totalSent: 1009,
    delivered: 90,
    rate: 30,
    status: "Active",
  },
  {
    name: "Trail Blaster",
    totalSent: 100,
    delivered: 90,
    rate: 20,
    status: "Failed",
  },
];

// Extended dummy data
import { e1, e2, e3, e4, e5, e7, e8 } from "../assets";

export const campaignsData = [
  {
    id: 1,
    name: "Sales Alert",
    type: "One-Time",
    totalSent: 100,
    totalDelivered: 80,
    openRate: 80,
    status: "Active",
    image: e1,
    date: "2023-10-15",
  },
  {
    id: 2,
    name: "Weekly Newsletter",
    type: "Drip Campaign",
    totalSent: 2500,
    totalDelivered: 2350,
    openRate: 65,
    status: "Active",
    image: e2,
    date: "2023-10-10",
  },
  {
    id: 3,
    name: "Product Launch",
    type: "One-Time",
    totalSent: 5000,
    totalDelivered: 4800,
    openRate: 72,
    status: "Completed",
    image: e3,
    date: "2023-09-28",
  },
  {
    id: 4,
    name: "Customer Feedback",
    type: "One-Time",
    totalSent: 1200,
    totalDelivered: 1150,
    openRate: 45,
    status: "Completed",
    image: e4,
    date: "2023-09-15",
  },
  {
    id: 5,
    name: "Onboarding Sequence",
    type: "Drip Campaign",
    totalSent: 350,
    totalDelivered: 340,
    openRate: 90,
    status: "Active",
    image: e5,
    date: "2023-10-05",
  },
  {
    id: 6,
    name: "Black Friday Promo",
    type: "One-Time",
    totalSent: 8000,
    totalDelivered: 7600,
    openRate: 68,
    status: "Failed",
    image: e7,
    date: "2023-08-20",
  },
  {
    id: 7,
    name: "Re-engagement",
    type: "Drip Campaign",
    totalSent: 3000,
    totalDelivered: 2850,
    openRate: 32,
    status: "Active",
    image: e8,
    date: "2023-10-01",
  },
];

export const campaignSubs = [
  {
    id: 1,
    email: "john.doe@example.com",
    source: "Imported",
    date: "2023-10-15",
    engagementRate: 85,
    status: "Active",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  }, 
  {
    id: 3,
    email: "michael.johnson@example.com",
    source: "Website",
    date: "2023-10-13",
    engagementRate: 92,
    status: "Active",
  },
    {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  }, 
    {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  },   {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  },   {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  },   {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  },   {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  },   {
    id: 2,
    email: "jane.smith@example.com",
    source: "Social Ads",
    date: "2023-10-14",
    engagementRate: 78,
    status: "Active",
  }, 

];


 export const auditResult = [
    {
      name: "Site health",
      percentage: 87,
      status: "Great",
      color: "text-green-600",
      icon: "mdi:heart-pulse"
    },
    {
      name: "Pages Crawled",
      percentage: 150,
      icon: "mdi:web-check"
    },
    {
      name: "Backlinks",
      percentage: 20,
      icon: "mdi:link-variant"
    },
    {
      name: "Organic Keywords",
      percentage: 17,
      icon: "mdi:magnify"
    },
    {
      name: "Monthly Traffic",
      percentage: 5,
      icon: "mdi:chart-line"
    },
    {
      name: "Internal Linking",
      percentage: 93,
      status: "Good",
      color: "text-blue-600",
      icon: "mdi:link"
    },
  ];

  export const issues = [
    {
      name: "4xx errors",
      status: "error",
      number: 4,
      icon: "mdi:alert-circle",
      color: "text-red-500"
    },
    {
      name: "Broken Internal links",
      status: "error",
      number: 12,
      icon: "mdi:link-off",
      color: "text-red-500"
    },
    {
      name: "Multiple Description",
      status: "warning",
      number: 41,
      icon: "mingcute:alert-fill",
      color: "text-yellow-500"
    },
    {
      name: "Missing H1",
      status: "error",
      number: 11,
      icon: "mdi:format-header-1",
      color: "text-red-500"
    },
    {
      name: "Duplicate <title> tags",
      status: "error",
      number: 12,
      icon: "mdi:content-duplicate",
      color: "text-red-500"
    },
  ];

  export const pagesCrawledData = [
    { date: "Jan", crawled: 120, indexed: 110 },
    { date: "Feb", crawled: 135, indexed: 125 },
    { date: "Mar", crawled: 140, indexed: 130 },
    { date: "Apr", crawled: 150, indexed: 140 },
    { date: "May", crawled: 160, indexed: 145 },
  ];