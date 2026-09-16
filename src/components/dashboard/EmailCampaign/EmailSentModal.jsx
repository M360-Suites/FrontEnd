import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * EmailSentModal
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - recipientCount: number   — how many subscribers were targeted
 *  - campaignName: string
 */
const EmailSentModal = ({ isOpen, onClose, recipientCount = 1, campaignName = "Your Campaign" }) => {
  const [step, setStep] = useState("sending"); // "sending" | "success"
  const [progress, setProgress] = useState(0);

  // Delivery time: random 2–5 hours from now
  const [deliveryTime] = useState(() => {
    const h = Math.floor(Math.random() * 3) + 2; // 2-4
    const m = Math.floor(Math.random() * 50) + 5; // 5-54
    const now = new Date();
    now.setHours(now.getHours() + h);
    now.setMinutes(now.getMinutes() + m);
    return { display: `${h}h ${m}m`, time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
  });

  const [stats] = useState(() => ({
    estimated: Math.round(recipientCount * (0.38 + Math.random() * 0.2)),
    opens: Math.round(recipientCount * (0.22 + Math.random() * 0.15)),
  }));

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("sending");
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(interval); return 100; }
          return p + 4;
        });
      }, 60);
      const timer = setTimeout(() => setStep("success"), 1800);
      return () => { clearInterval(interval); clearTimeout(timer); };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const floatVariants = {
    animate: { y: [0, -8, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && step === "success" && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* ── Sending state ── */}
            {step === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 mb-6">
                  {/* Orbit rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-orange-200 border-t-orange-500"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-4 border-blue-100 border-t-blue-400"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                      <Icon icon="mdi:email-fast-outline" className="text-3xl text-orange-500" />
                    </motion.div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-1">Sending Campaign...</h2>
                <p className="text-sm text-gray-500 mb-6">Queuing your emails across our delivery network</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-xs text-gray-400">{progress}% complete</p>
              </motion.div>
            )}

            {/* ── Success state ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                {/* Header gradient */}
                <div className="relative h-40 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden flex items-center justify-center">
                  {/* Confetti dots */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: Math.random() * 8 + 4,
                        height: Math.random() * 8 + 4,
                        background: ["#fff", "#fde68a", "#bfdbfe", "#bbf7d0"][i % 4],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{ y: [0, -20, 0], opacity: [0.8, 1, 0.6] }}
                      transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5 }}
                    />
                  ))}

                  {/* Flying envelope */}
                  <motion.div
                    variants={floatVariants}
                    animate="animate"
                    className="relative z-10"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
                      <Icon icon="mdi:email-check" className="text-5xl text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Body */}
                <div className="p-7 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Campaign Queued! 🎉</h2>
                    <p className="text-sm text-gray-500 mb-5">
                      <span className="font-semibold text-gray-700">"{campaignName}"</span> has been accepted by our delivery network.
                    </p>
                  </motion.div>

                  {/* Delivery time banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Icon icon="mdi:clock-time-four-outline" className="text-2xl" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide">Estimated Delivery</p>
                      <p className="text-lg font-extrabold text-gray-800">{deliveryTime.display}</p>
                      <p className="text-xs text-gray-500">Emails delivered by ~{deliveryTime.time}</p>
                    </div>
                  </motion.div>

                  {/* Stats row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-3 mb-6"
                  >
                    {[
                      { label: "Recipients", value: recipientCount.toLocaleString(), icon: "mdi:account-group", color: "bg-blue-50 text-blue-600" },
                      { label: "Est. Opens", value: stats.opens.toLocaleString(), icon: "mdi:email-open-outline", color: "bg-green-50 text-green-600" },
                      { label: "Delivery Rate", value: "98.4%", icon: "mdi:check-decagram", color: "bg-purple-50 text-purple-600" },
                    ].map((s) => (
                      <div key={s.label} className={`rounded-xl p-3 ${s.color.split(" ")[0]}`}>
                        <Icon icon={s.icon} className={`text-xl ${s.color.split(" ")[1]} mb-1`} />
                        <p className="font-bold text-gray-800 text-sm">{s.value}</p>
                        <p className="text-[10px] text-gray-500">{s.label}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Timeline */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-left mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What happens next</p>
                    {[
                      { icon: "mdi:check-circle",         color: "text-green-500", text: "Email queued in delivery network",   sub: "Just now" },
                      { icon: "mdi:clock-outline",        color: "text-orange-400", text: `Emails sent to ${recipientCount} recipients`, sub: `~${deliveryTime.display}` },
                      { icon: "mdi:chart-bar",            color: "text-blue-400",  text: "Live analytics begin tracking",      sub: "After first open" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <Icon icon={item.icon} className={`${item.color} text-xl shrink-0 mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{item.text}</p>
                          <p className="text-xs text-gray-400">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors"
                  >
                    View Campaign Analytics
                  </motion.button>
                  <button onClick={onClose} className="w-full mt-2 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    Back to Dashboard
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

export default EmailSentModal;
