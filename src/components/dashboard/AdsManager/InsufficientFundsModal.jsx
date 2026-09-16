import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * InsufficientFundsModal
 * Fires after user attempts to launch an ad.
 * Shows a realistic "payment failed / insufficient funds" UX with an upgrade CTA.
 */
const InsufficientFundsModal = ({ isOpen, onClose, platform = "Meta", budget = "500" }) => {
  const [step, setStep] = useState("checking"); // "checking" | "failed"
  const [checkProgress, setCheckProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("topup"); // "topup" | "plan"

  useEffect(() => {
    if (isOpen) {
      setStep("checking");
      setCheckProgress(0);
      const iv = setInterval(() => setCheckProgress((p) => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 5;
      }), 80);
      const t = setTimeout(() => setStep("failed"), 1800);
      return () => { clearInterval(iv); clearTimeout(t); };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const platformIcons = {
    Facebook: "logos:facebook",
    Instagram: "skill-icons:instagram",
    Twitter: "ri:twitter-x-fill",
    X: "ri:twitter-x-fill",
    LinkedIn: "logos:linkedin-icon",
    TikTok: "logos:tiktok-icon",
    Google: "logos:google-ads",
  };

  const platformColors = {
    Facebook: "from-blue-600 to-blue-700",
    Instagram: "from-pink-500 to-purple-600",
    Twitter: "from-gray-800 to-black",
    X: "from-gray-800 to-black",
    LinkedIn: "from-blue-500 to-blue-600",
    TikTok: "from-gray-900 to-black",
    Google: "from-red-500 to-orange-500",
  };

  const gradClass = platformColors[platform] || "from-orange-500 to-orange-600";

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && step === "failed" && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* ── Checking/connecting state ── */}
            {step === "checking" && (
              <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradClass} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon icon={platformIcons[platform] || "mdi:web"} className="text-4xl text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Connecting to {platform} Ads</h2>
                <p className="text-sm text-gray-500 mb-6">Verifying your account & payment method...</p>

                {/* Steps */}
                <div className="w-full space-y-3 mb-6 text-left">
                  {[
                    { label: "Authenticating account",    done: checkProgress > 25 },
                    { label: "Verifying campaign details", done: checkProgress > 55 },
                    { label: "Checking payment method",   done: checkProgress > 85 },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${s.done ? "bg-green-500" : "bg-gray-200"}`}>
                        {s.done
                          ? <Icon icon="mdi:check" className="text-white text-xs" />
                          : <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full" />
                        }
                      </div>
                      <span className={`text-sm ${s.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div className={`h-full bg-gradient-to-r ${gradClass} rounded-full`} style={{ width: `${checkProgress}%` }} />
                </div>
              </motion.div>
            )}

            {/* ── Insufficient funds state ── */}
            {step === "failed" && (
              <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Red header */}
                <div className="relative bg-gradient-to-br from-red-500 to-rose-600 px-6 pt-8 pb-10 text-center overflow-hidden">
                  <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                    <Icon icon="mdi:close" />
                  </button>
                  {/* Pulse rings */}
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30" />
                  </motion.div>
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/30"
                    >
                      <Icon icon="mdi:credit-card-off-outline" className="text-3xl text-white" />
                    </motion.div>
                    <h2 className="text-xl font-extrabold text-white mb-1">Payment Failed</h2>
                    <p className="text-sm text-red-100">Insufficient funds on your account</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Error summary card */}
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon icon={platformIcons[platform] || "mdi:web"} className="text-xl" />
                        <span className="font-semibold text-gray-800 text-sm">{platform} Ads</span>
                      </div>
                      <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Icon icon="mdi:close-circle" className="text-xs" /> Declined
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Campaign Budget</p>
                        <p className="font-bold text-gray-800">${budget}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Available Funds</p>
                        <p className="font-bold text-red-500">$0.00</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Shortfall</p>
                        <p className="font-bold text-red-600">${budget}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Error Code</p>
                        <p className="font-mono text-xs text-gray-500">ERR_INSUF_FUNDS</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex rounded-xl border border-gray-200 p-1 mb-4 gap-1">
                    {[{ id: "topup", label: "Top Up Funds", icon: "mdi:wallet-plus" }, { id: "plan", label: "Upgrade Plan", icon: "mdi:crown" }].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === t.id ? "bg-orange-500 text-white shadow" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <Icon icon={t.icon} />
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === "topup" && (
                      <motion.div key="topup" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="space-y-3 mb-5">
                        {[
                          { amount: "$50",  bonus: null,    popular: false },
                          { amount: "$100", bonus: "+5%",   popular: false },
                          { amount: "$250", bonus: "+10%",  popular: true  },
                          { amount: "$500", bonus: "+15%",  popular: false },
                        ].map((opt) => (
                          <button key={opt.amount} className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all hover:border-orange-400 hover:bg-orange-50 ${opt.popular ? "border-orange-400 bg-orange-50" : "border-gray-200"}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                <Icon icon="mdi:currency-usd" />
                              </div>
                              <span className="font-bold text-gray-800">{opt.amount}</span>
                              {opt.bonus && <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">{opt.bonus} Bonus</span>}
                            </div>
                            {opt.popular && <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Popular</span>}
                          </button>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === "plan" && (
                      <motion.div key="plan" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="space-y-3 mb-5">
                        {[
                          { name: "Starter",    price: "$29/mo",  ads: "$200",  color: "border-gray-200" },
                          { name: "Growth",     price: "$79/mo",  ads: "$750",  color: "border-orange-400 bg-orange-50" },
                          { name: "Pro",        price: "$149/mo", ads: "Unlimited", color: "border-purple-400 bg-purple-50" },
                        ].map((plan) => (
                          <button key={plan.name} className={`w-full flex justify-between items-center p-4 rounded-xl border-2 ${plan.color} hover:shadow-md transition-all`}>
                            <div className="text-left">
                              <p className="font-bold text-gray-800">{plan.name}</p>
                              <p className="text-xs text-gray-500">Ad budget: {plan.ads}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-orange-600">{plan.price}</p>
                              <p className="text-[10px] text-gray-400">billed monthly</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon icon={activeTab === "topup" ? "mdi:wallet-plus" : "mdi:crown"} />
                    {activeTab === "topup" ? "Add Funds & Launch Ad" : "Upgrade & Launch Ad"}
                  </motion.button>
                  <button onClick={onClose} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors">
                    Maybe later
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InsufficientFundsModal;
