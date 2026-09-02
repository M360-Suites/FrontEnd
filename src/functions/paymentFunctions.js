import authAxios from "./authFunctions";

// ─── Payment Functions ────────────────────────────────────────────────────────

/**
 * Get the billing/subscription status for an organization.
 * @param {string} orgId
 */
export const getBillingStatus = async (orgId) => {
  try {
    const res = await authAxios.get(`/payment/status/${orgId}`);
    return res.data;
  } catch (error) {
    console.error("Get Billing Status Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Capture card details — initiates the card-capture flow.
 * @param {string[]} features - e.g. ["email_automation", "social_scheduler"]
 */
export const captureCard = async (features) => {
  try {
    const res = await authAxios.post(`/payment/capture-card`, { features });
    return res.data;
  } catch (error) {
    console.error("Capture Card Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Complete the card-capture flow using the Paystack reference.
 * @param {string} reference
 */
export const completeCaptureCard = async (reference) => {
  try {
    const res = await authAxios.post(`/payment/capture-card/complete`, {
      reference,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Complete Capture Card Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Initialize a subscription.
 * @param {string[]} features
 */
export const initializeSubscription = async (features) => {
  try {
    const res = await authAxios.post(`/payment/subscribe`, { features });
    return res.data;
  } catch (error) {
    console.error(
      "Initialize Subscription Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Upgrade current subscription.
 * @param {string[]} features - new expanded feature list
 */
export const upgradeSubscription = async (features) => {
  try {
    const res = await authAxios.post(`/payment/upgrade`, { features });
    return res.data;
  } catch (error) {
    console.error(
      "Upgrade Subscription Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Downgrade current subscription.
 * @param {string[]} features - new reduced feature list
 */
export const downgradeSubscription = async (features) => {
  try {
    const res = await authAxios.post(`/payment/downgrade`, { features });
    return res.data;
  } catch (error) {
    console.error(
      "Downgrade Subscription Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Initiate a one-time payment transaction.
 * @param {object} params - { email, amount, metadata }
 */
export const initiatePayment = async ({ email, amount, metadata = {} }) => {
  try {
    const res = await authAxios.post(`/payment`, { email, amount, metadata });
    return res.data;
  } catch (error) {
    console.error("Initiate Payment Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Verify a payment using its reference string.
 * @param {string} reference
 */
export const verifyPayment = async (reference) => {
  try {
    const res = await authAxios.get(`/payment/verify/${reference}`);
    return res.data;
  } catch (error) {
    console.error("Verify Payment Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * List all payment transactions.
 */
export const listTransactions = async () => {
  try {
    const res = await authAxios.get(`/payment/transaction`);
    return res.data;
  } catch (error) {
    console.error("List Transactions Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get details of a specific transaction.
 * @param {string} transactionId
 */
export const getTransaction = async (transactionId) => {
  try {
    const res = await authAxios.get(`/payment/transaction/${transactionId}`);
    return res.data;
  } catch (error) {
    console.error("Get Transaction Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * List available subscription plans.
 */
export const listPlans = async () => {
  try {
    const res = await authAxios.get(`/payment/plans`);
    return res.data;
  } catch (error) {
    console.error("List Plans Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Sync subscription plans with the payment provider.
 */
export const syncPlans = async () => {
  try {
    const res = await authAxios.get(`/payment/plans/sync`);
    return res.data;
  } catch (error) {
    console.error("Sync Plans Error:", error.response?.data || error.message);
    throw error;
  }
};
