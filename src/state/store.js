import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper function to simulate API delay
export const simulateDelay = (ms = 1000) =>
	new Promise((resolve) => setTimeout(resolve, ms));

// Generate random SEO data for a domain
const generateSEOData = (domain) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return {
		domain,
		lastAnalyzed: new Date().toISOString(),
		healthScore: Math.floor(Math.random() * 30) + 70, // 70-100

		// Domain Overview
		organicSearch: {
			traffic: Math.floor(Math.random() * 100000) + 10000,
			keywords: Math.floor(Math.random() * 5000) + 500,
			value: Math.floor(Math.random() * 50000) + 5000,
		},
		backlinks: {
			total: Math.floor(Math.random() * 50000) + 1000,
			referringDomains: Math.floor(Math.random() * 2000) + 100,
			authorityScore: Math.floor(Math.random() * 40) + 30,
			toxic: Math.floor(Math.random() * 500),
		},
		performance: {
			loadTime: (Math.random() * 2 + 0.5).toFixed(2) + "s",
			mobileScore: Math.floor(Math.random() * 30) + 60,
			desktopScore: Math.floor(Math.random() * 20) + 80,
		},

		// Traffic Analytics
		trafficAnalytics: {
			visits: Math.floor(Math.random() * 500000) + 50000,
			uniqueVisitors: Math.floor(Math.random() * 300000) + 30000,
			pagesPerVisit: (Math.random() * 5 + 1).toFixed(1),
			avgVisitDuration: `${
				Math.floor(Math.random() * 5) + 1
			}:${Math.floor(Math.random() * 60)
				.toString()
				.padStart(2, "0")}`,
			bounceRate: (Math.random() * 40 + 20).toFixed(2) + "%",
			history: months.map((month) => ({
				month,
				visits: Math.floor(Math.random() * 50000) + 10000,
				unique: Math.floor(Math.random() * 30000) + 5000,
			})),
			sources: {
				organic: Math.floor(Math.random() * 40) + 20,
				direct: Math.floor(Math.random() * 30) + 10,
				referral: Math.floor(Math.random() * 15) + 5,
				social: Math.floor(Math.random() * 10) + 5,
				paid: Math.floor(Math.random() * 5),
			},
			geo: [
				{
					country: "United States",
					percent: Math.floor(Math.random() * 40) + 20,
				},
				{
					country: "United Kingdom",
					percent: Math.floor(Math.random() * 20) + 5,
				},
				{
					country: "India",
					percent: Math.floor(Math.random() * 15) + 5,
				},
				{
					country: "Others",
					percent: Math.floor(Math.random() * 25) + 5,
				},
			],
		},

		// Keyword Overview
		keywordOverview: {
			totalKeywords: Math.floor(Math.random() * 10000) + 1000,
			distribution: {
				top3: Math.floor(Math.random() * 50),
				top10: Math.floor(Math.random() * 150),
				top100: Math.floor(Math.random() * 800),
			},
			intent: [
				{ type: "Informational", value: 45 },
				{ type: "Navigational", value: 25 },
				{ type: "Commercial", value: 15 },
				{ type: "Transactional", value: 15 },
			],
			topKeywords: Array.from({ length: 20 }, (_, i) => ({
				keyword: `keyword ${i + 1}`,
				position: Math.floor(Math.random() * 20) + 1,
				volume: Math.floor(Math.random() * 10000) + 100,
				difficulty: Math.floor(Math.random() * 100),
				cpc: (Math.random() * 5 + 0.5).toFixed(2),
				url: `/${domain}/page-${i + 1}`,
			})),
		},

		// Backlink Audit/Analytics
		backlinkProfile: {
			newBacklinks: Math.floor(Math.random() * 100) + 10,
			lostBacklinks: Math.floor(Math.random() * 20),
			anchors: [
				{ text: domain, percent: 30 },
				{ text: "click here", percent: 15 },
				{ text: "website", percent: 10 },
				{ text: "brand name", percent: 25 },
				{ text: "other", percent: 20 },
			],
			types: {
				text: 75,
				image: 20,
				form: 5,
			},
			attributes: {
				follow: 70,
				nofollow: 30,
				sponsored: 0,
				ugc: 0,
			},
		},

		// Site Audit
		siteAudit: {
			score: Math.floor(Math.random() * 20) + 80,
			crawledPages: Math.floor(Math.random() * 500) + 50,
			issues: {
				errors: Math.floor(Math.random() * 10),
				warnings: Math.floor(Math.random() * 50),
				notices: Math.floor(Math.random() * 100),
			},
			topIssues: [
				{
					type: "Error",
					message: "5 pages have duplicate title tags",
					count: 5,
				},
				{
					type: "Warning",
					message: "12 images missing alt text",
					count: 12,
				},
				{
					type: "Notice",
					message: "Low text-to-HTML ratio on 3 pages",
					count: 3,
				},
				{ type: "Error", message: "Broken internal links", count: 2 },
				{
					type: "Warning",
					message: "Slow page load speed (>2s)",
					count: 8,
				},
			],
			coreWebVitals: {
				lcp: (Math.random() * 2.5 + 0.5).toFixed(1) + "s",
				cls: (Math.random() * 0.1).toFixed(3),
				fid: Math.floor(Math.random() * 50) + "ms",
			},
		},
	};
};

const useStore = create(
	persist(
		(set, get) => ({
			// ============ SETTINGS ============
			settings: {
				general: {
					language: "English",
					timezone: "GMT +1",
					currency: "NGN",
					dateFormat: "dd/mm/yy",
				},
				teamMembers: [],
				account: {
					companyName: "M360",
					email: "thebloomingdesigner@gmail.com",
					phoneNumber1: "7019185751",
					phoneNumber2: "7019185751",
					address:
						"125, Boston close, off challenge, orifa challenge",
					city: "Ibadan",
					country: "Nigeria",
					profileImage: null,
				},
				notifications: {
					allowEmail: true,
					allowSMS: false,
					allowPush: true,
					types: {
						emailAutomation: true,
						socialScheduler: true,
						websiteBuilder: true,
						seoOptimization: false,
						communityManager: true,
					},
				},
				billing: {
					plan: "Premium",
					billingCycle: "Monthly",
					nextBillingDate: "2026-02-11",
					paymentMethod: "Credit Card",
					cardLast4: "4242",
				},
				domains: [],
				emailSettings: {
					smtpHost: "",
					smtpPort: "",
					smtpUsername: "",
					smtpPassword: "",
					fromEmail: "",
					fromName: "",
				},
				adsAndSocials: {
					connectedAccounts: [],
				},
				communitySettings: {
					moderationEnabled: true,
					autoApprove: false,
					allowGuestPosts: true,
				},
				security: {
					twoFactorEnabled: false,
					sessionTimeout: 30,
					loginNotifications: true,
				},
				advancedSettings: {
					apiKey: "",
					webhookUrl: "",
					customDomain: "",
				},
			},

			updateSettings: async (category, data) => {
				await simulateDelay(800);
				set((state) => ({
					settings: {
						...state.settings,
						[category]: {
							...state.settings[category],
							...data,
						},
					},
				}));
				return {
					success: true,
					message: "Settings updated successfully",
				};
			},

			// ============ SOCIAL SCHEDULER ============
			socialPosts: [],
			connectedSocialAccounts: [],

			connectSocialAccount: async (platform) => {
				await simulateDelay(1500);
				const newAccount = {
					id: Date.now().toString(),
					platform,
					username: `@${platform.toLowerCase()}_user`,
					connected: true,
					connectedAt: new Date().toISOString(),
					followers: Math.floor(Math.random() * 100000) + 1000,
				};
				set((state) => ({
					connectedSocialAccounts: [
						...state.connectedSocialAccounts,
						newAccount,
					],
				}));
				return { success: true, account: newAccount };
			},

			disconnectSocialAccount: async (accountId) => {
				await simulateDelay(800);
				set((state) => ({
					connectedSocialAccounts:
						state.connectedSocialAccounts.filter(
							(acc) => acc.id !== accountId
						),
				}));
				return { success: true };
			},

			createSocialPost: async (postData) => {
				await simulateDelay(1200);
				const newPost = {
					id: Date.now().toString(),
					...postData,
					createdAt: new Date().toISOString(),
					status: postData.scheduledFor ? "scheduled" : "published",
					engagement: {
						likes: 0,
						comments: 0,
						shares: 0,
						views: 0,
					},
				};
				set((state) => ({
					socialPosts: [newPost, ...state.socialPosts],
				}));
				return { success: true, post: newPost };
			},

			updateSocialPost: async (postId, updates) => {
				await simulateDelay(800);
				set((state) => ({
					socialPosts: state.socialPosts.map((post) =>
						post.id === postId ? { ...post, ...updates } : post
					),
				}));
				return { success: true };
			},

			deleteSocialPost: async (postId) => {
				await simulateDelay(600);
				set((state) => ({
					socialPosts: state.socialPosts.filter(
						(post) => post.id !== postId
					),
				}));
				return { success: true };
			},

			// ============ EMAIL CAMPAIGNS ============
			emailCampaigns: [],
			emailSubscribers: [],
			emailTemplates: [],

			createEmailCampaign: async (campaignData) => {
				await simulateDelay(1500);
				const newCampaign = {
					id: Date.now().toString(),
					...campaignData,
					createdAt: new Date().toISOString(),
					status: "draft",
					stats: {
						sent: 0,
						delivered: 0,
						opened: 0,
						clicked: 0,
						bounced: 0,
						unsubscribed: 0,
					},
				};
				set((state) => ({
					emailCampaigns: [newCampaign, ...state.emailCampaigns],
				}));
				return { success: true, campaign: newCampaign };
			},

			sendEmailCampaign: async (campaignId) => {
				await simulateDelay(2000);
				const subscribers = get().emailSubscribers.length;
				const sent = subscribers;
				const delivered = Math.floor(sent * 0.95);
				const opened = Math.floor(delivered * 0.35);
				const clicked = Math.floor(opened * 0.15);

				set((state) => ({
					emailCampaigns: state.emailCampaigns.map((campaign) =>
						campaign.id === campaignId
							? {
									...campaign,
									status: "sent",
									sentAt: new Date().toISOString(),
									stats: {
										sent,
										delivered,
										opened,
										clicked,
										bounced: sent - delivered,
										unsubscribed: Math.floor(sent * 0.01),
									},
							  }
							: campaign
					),
				}));
				return { success: true };
			},

			addEmailSubscriber: async (subscriberData) => {
				await simulateDelay(800);
				const newSubscriber = {
					id: Date.now().toString(),
					...subscriberData,
					subscribedAt: new Date().toISOString(),
					status: "active",
				};
				set((state) => ({
					emailSubscribers: [
						newSubscriber,
						...state.emailSubscribers,
					],
				}));
				return { success: true, subscriber: newSubscriber };
			},

			removeEmailSubscriber: async (subscriberId) => {
				await simulateDelay(600);
				set((state) => ({
					emailSubscribers: state.emailSubscribers.filter(
						(sub) => sub.id !== subscriberId
					),
				}));
				return { success: true };
			},

			createEmailTemplate: async (templateData) => {
				await simulateDelay(1000);
				const newTemplate = {
					id: Date.now().toString(),
					...templateData,
					createdAt: new Date().toISOString(),
				};
				set((state) => ({
					emailTemplates: [newTemplate, ...state.emailTemplates],
				}));
				return { success: true, template: newTemplate };
			},

			// ============ ADS MANAGER ============
			adCampaigns: [],

			createAdCampaign: async (adData) => {
				await simulateDelay(1500);
				const newAd = {
					id: Date.now().toString(),
					...adData,
					createdAt: new Date().toISOString(),
					status: "draft",
					stats: {
						impressions: 0,
						clicks: 0,
						conversions: 0,
						spent: 0,
						ctr: 0,
						cpc: 0,
						cpm: 0,
					},
				};
				set((state) => ({
					adCampaigns: [newAd, ...state.adCampaigns],
				}));
				return { success: true, ad: newAd };
			},

			launchAdCampaign: async (adId) => {
				await simulateDelay(2000);
				const impressions =
					Math.floor(Math.random() * 100000) + 10000;
				const clicks = Math.floor(
					impressions * (Math.random() * 0.05 + 0.01)
				);
				const conversions = Math.floor(
					clicks * (Math.random() * 0.1 + 0.02)
				);
				const spent = Math.floor(Math.random() * 5000) + 500;

				set((state) => ({
					adCampaigns: state.adCampaigns.map((ad) =>
						ad.id === adId
							? {
									...ad,
									status: "active",
									launchedAt: new Date().toISOString(),
									stats: {
										impressions,
										clicks,
										conversions,
										spent,
										ctr: ((clicks / impressions) * 100).toFixed(2),
										cpc: (spent / clicks).toFixed(2),
										cpm: ((spent / impressions) * 1000).toFixed(2),
									},
							  }
							: ad
					),
				}));
				return { success: true };
			},

			pauseAdCampaign: async (adId) => {
				await simulateDelay(800);
				set((state) => ({
					adCampaigns: state.adCampaigns.map((ad) =>
						ad.id === adId ? { ...ad, status: "paused" } : ad
					),
				}));
				return { success: true };
			},

			deleteAdCampaign: async (adId) => {
				await simulateDelay(600);
				set((state) => ({
					adCampaigns: state.adCampaigns.filter(
						(ad) => ad.id !== adId
					),
				}));
				return { success: true };
			},

			// ============ SEO TOOLS ============
			seoData: {},

			analyzeDomain: async (domain) => {
				await simulateDelay(2500);
				const data = generateSEOData(domain);
				set((state) => ({
					seoData: {
						...state.seoData,
						[domain]: data,
					},
				}));
				return { success: true, data };
			},

			getSEOData: (domain) => {
				return get().seoData[domain] || null;
			},

			// ============ LOADING STATES ============
			isLoading: false,
			setLoading: (loading) => set({ isLoading: loading }),

			// ============ RESET ============
			resetStore: () => {
				set({
					socialPosts: [],
					connectedSocialAccounts: [],
					emailCampaigns: [],
					emailSubscribers: [],
					emailTemplates: [],
					adCampaigns: [],
					seoData: {},
				});
			},
		}),
		{
			name: "m360-storage-v2",
			partialize: (state) => ({
				settings: state.settings,
				socialPosts: state.socialPosts,
				connectedSocialAccounts: state.connectedSocialAccounts,
				emailCampaigns: state.emailCampaigns,
				emailSubscribers: state.emailSubscribers,
				emailTemplates: state.emailTemplates,
				adCampaigns: state.adCampaigns,
				seoData: state.seoData,
			}),
		}
	)
);

export default useStore;
