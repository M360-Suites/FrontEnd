import { create } from "zustand";
import { persist } from "zustand/middleware";

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
          companyName: "",
          email: "",
          phoneNumber1: "",
          phoneNumber2: "",
          address: "",
          city: "",
          country: "",
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
          plan: null,
          billingCycle: null,
          nextBillingDate: null,
          paymentMethod: null,
          cardLast4: null,
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
        adsAndSocials: { connectedAccounts: [] },
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

      /**
       * Update local settings in the store (for UI state only — no API call here
       * since there is no generic "settings" endpoint; individual endpoints are
       * called directly from the settings components).
       */
      updateSettings: (category, data) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [category]: {
              ...state.settings[category],
              ...data,
            },
          },
        }));
        return { success: true, message: "Settings updated" };
      },

      // ============ SOCIAL SCHEDULER ============
      socialPosts: [],
      connectedSocialAccounts: [],

      /**
       * Initiate OAuth connection for a social platform.
       * Opens the backend-returned URL in a popup window.
       */
      connectSocialAccount: async (platform) => {
        try {
          const { initSocialAuth } = await import("../functions/authFunctions");
          const data = await initSocialAuth(platform);
          // The backend should return { url } — the popup is opened inside initSocialAuth
          return { success: true, data };
        } catch (error) {
          console.error("Connect Social Account Error:", error);
          throw error;
        }
      },

      disconnectSocialAccount: (accountId) => {
        set((state) => ({
          connectedSocialAccounts: state.connectedSocialAccounts.filter(
            (acc) => acc.id !== accountId
          ),
        }));
        return { success: true };
      },

      /**
       * Register a successfully connected account after OAuth callback completes.
       */
      addConnectedAccount: (accountData) => {
        set((state) => ({
          connectedSocialAccounts: [
            ...state.connectedSocialAccounts.filter(
              (a) => a.platform !== accountData.platform
            ),
            accountData,
          ],
        }));
      },

      /**
       * Post to a single social platform.
       */
      createSocialPost: async (postData) => {
        try {
          const { postToSinglePlatform } = await import(
            "../functions/socialFunctions"
          );
          const { platform, content } = postData;
          const result = await postToSinglePlatform(platform, content);
          const newPost = {
            id: result?._id || Date.now().toString(),
            ...postData,
            createdAt: new Date().toISOString(),
            status: postData.scheduledFor ? "scheduled" : "published",
          };
          set((state) => ({ socialPosts: [newPost, ...state.socialPosts] }));
          return { success: true, post: newPost };
        } catch (error) {
          console.error("Create Social Post Error:", error);
          throw error;
        }
      },

      /**
       * Broadcast to multiple platforms.
       */
      broadcastPost: async ({ content, platforms }) => {
        try {
          const { broadcastToMultiplePlatforms } = await import(
            "../functions/socialFunctions"
          );
          const result = await broadcastToMultiplePlatforms(content, platforms);
          return { success: true, result };
        } catch (error) {
          console.error("Broadcast Post Error:", error);
          throw error;
        }
      },

      updateSocialPost: (postId, updates) => {
        set((state) => ({
          socialPosts: state.socialPosts.map((post) =>
            post.id === postId ? { ...post, ...updates } : post
          ),
        }));
        return { success: true };
      },

      deleteSocialPost: (postId) => {
        set((state) => ({
          socialPosts: state.socialPosts.filter((post) => post.id !== postId),
        }));
        return { success: true };
      },

      // ============ EMAIL CAMPAIGNS ============
      emailCampaigns: [],
      emailSubscribers: [],
      emailTemplates: [],

      /**
       * Fetch campaigns from the API and update the store.
       */
      fetchEmailCampaigns: async () => {
        set({ isLoading: true });
        try {
          const { getAllCampaigns } = await import(
            "../functions/campaignFunctions"
          );
          const data = await getAllCampaigns();
          const campaigns = data?.data?.campaigns || data?.campaigns || data || [];
          set({ emailCampaigns: campaigns, isLoading: false });
          return { success: true, campaigns };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Create a campaign via the API and prepend to local state.
       */
      createEmailCampaign: async (campaignData) => {
        set({ isLoading: true });
        try {
          const { createCampaign } = await import(
            "../functions/campaignFunctions"
          );
          const data = await createCampaign(campaignData);
          const campaign = data?.data || data;
          set((state) => ({
            emailCampaigns: [campaign, ...state.emailCampaigns],
            isLoading: false,
          }));
          return { success: true, campaign };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Delete campaigns via the API.
       */
      deleteEmailCampaigns: async (ids) => {
        set({ isLoading: true });
        try {
          const { deleteCampaign } = await import(
            "../functions/campaignFunctions"
          );
          await deleteCampaign({ ids });
          set((state) => ({
            emailCampaigns: state.emailCampaigns.filter(
              (c) => !ids.includes(c._id)
            ),
            isLoading: false,
          }));
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      sendEmailCampaign: async () => {
        // No dedicated send endpoint in the API; campaigns are sent on creation.
        return { success: true };
      },

      /**
       * Fetch subscribers from the API.
       */
      fetchEmailSubscribers: async () => {
        set({ isLoading: true });
        try {
          const { fetchUserSubs } = await import(
            "../functions/campaignFunctions"
          );
          const data = await fetchUserSubs();
          const subscribers =
            data?.data?.subscribers || data?.subscribers || data || [];
          set({ emailSubscribers: subscribers, isLoading: false });
          return { success: true, subscribers };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Add subscribers via the API.
       */
      addEmailSubscriber: async (formData) => {
        set({ isLoading: true });
        try {
          const { addSubs } = await import("../functions/campaignFunctions");
          const data = await addSubs(formData);
          // Refresh subscribers list after adding
          const { fetchUserSubs } = await import(
            "../functions/campaignFunctions"
          );
          const refreshed = await fetchUserSubs();
          const subscribers =
            refreshed?.data?.subscribers ||
            refreshed?.subscribers ||
            refreshed ||
            [];
          set({ emailSubscribers: subscribers, isLoading: false });
          return { success: true, data };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Remove subscriber(s) via the API.
       */
      removeEmailSubscriber: async (ids) => {
        set({ isLoading: true });
        try {
          const { removeSubs } = await import("../functions/campaignFunctions");
          const idsArray = Array.isArray(ids) ? ids : [ids];
          await removeSubs({ ids: idsArray });
          set((state) => ({
            emailSubscribers: state.emailSubscribers.filter(
              (s) => !idsArray.includes(s._id)
            ),
            isLoading: false,
          }));
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      createEmailTemplate: async (templateData) => {
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
        set({ isLoading: true });
        try {
          const { getOrCreateCampaigns } = await import(
            "../functions/adsFunctions"
          );
          const ad = await getOrCreateCampaigns({
            platform: adData.platform || "google",
            data: adData,
            action: "create",
          });
          set((state) => ({
            adCampaigns: [ad, ...state.adCampaigns],
            isLoading: false,
          }));
          return { success: true, ad };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      launchAdCampaign: (adId) => {
        set((state) => ({
          adCampaigns: state.adCampaigns.map((ad) =>
            ad.id === adId ? { ...ad, status: "active" } : ad
          ),
        }));
        return { success: true };
      },

      pauseAdCampaign: (adId) => {
        set((state) => ({
          adCampaigns: state.adCampaigns.map((ad) =>
            ad.id === adId ? { ...ad, status: "paused" } : ad
          ),
        }));
        return { success: true };
      },

      deleteAdCampaign: (adId) => {
        set((state) => ({
          adCampaigns: state.adCampaigns.filter((ad) => ad.id !== adId),
        }));
        return { success: true };
      },

      // ============ SEO TOOLS ============
      seoData: {},

      analyzeDomain: async (domain) => {
        set({ isLoading: true });
        try {
          const { getSeoStats } = await import("../functions/seoFunctions");
          const data = await getSeoStats();
          set((state) => ({
            seoData: { ...state.seoData, [domain]: data },
            isLoading: false,
          }));
          return { success: true, data };
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getSEOData: (domain) => get().seoData[domain] || null,

      // ============ BILLING ============
      billingInfo: null,

      fetchBillingInfo: async (orgId) => {
        try {
          const { getBillingStatus } = await import(
            "../functions/paymentFunctions"
          );
          const data = await getBillingStatus(orgId);
          const billing = data?.data || data;
          set({ billingInfo: billing });
          return { success: true, billing };
        } catch (error) {
          console.error("Fetch Billing Info Error:", error);
          throw error;
        }
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
          billingInfo: null,
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
