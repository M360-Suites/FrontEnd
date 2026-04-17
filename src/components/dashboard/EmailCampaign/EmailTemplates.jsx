import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import EmailBuilder from "./EmailBuilder";
import SendTemplateModal from "./SendTemplateModal";

const EmailTemplates = () => {
  const [inBuilder, setInBuilder] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const navigate = useNavigate();

  if (inBuilder) {
    return (
      <>
        <EmailBuilder
          onBack={() => setInBuilder(false)}
          onSave={(data) => {
            setTemplateData(data);
            setShowSendModal(true);
          }}
        />
        <SendTemplateModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
          templateData={templateData}
        />
      </>
    );
  }

  return (
    <div className="p-4">
      <div className="p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <Icon icon="eva:arrow-back-fill" className="text-xl" />
          </button>
          <div>
            <span className="font-semibold text-xl">Email Templates</span>
            <p className="text-gray-500 text-sm">
              Browse, pick a template, and build your email visually
            </p>
          </div>
        </div>

        <button
          onClick={() => setInBuilder(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
        >
          <Icon icon="mdi:pencil-ruler" />
          Open Email Builder
        </button>
      </div>

      {/* Quick-start tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 px-4">
        {[
          { emoji: "🚀", title: "Start from Scratch",   desc: "Blank canvas — total creative freedom",    color: "from-blue-50 to-indigo-50 border-blue-100" },
          { emoji: "📰", title: "Newsletter",           desc: "Weekly digest or content round-up",        color: "from-gray-50 to-slate-50 border-gray-200" },
          { emoji: "🔥", title: "Promotional Offer",    desc: "Flash sale or limited-time discount",      color: "from-red-50 to-orange-50 border-red-100" },
          { emoji: "👋", title: "Welcome Email",        desc: "Warm onboarding for new subscribers",     color: "from-green-50 to-emerald-50 border-green-100" },
          { emoji: "💌", title: "Re-engagement",        desc: "Win back inactive subscribers",            color: "from-purple-50 to-fuchsia-50 border-purple-100" },
          { emoji: "🎉", title: "Event Invitation",     desc: "Drive attendance to your next event",      color: "from-yellow-50 to-amber-50 border-yellow-100" },
        ].map((t) => (
          <button
            key={t.title}
            onClick={() => setInBuilder(true)}
            className={`text-left p-5 rounded-2xl border bg-gradient-to-br ${t.color} hover:shadow-md transition-all group`}
          >
            <span className="text-3xl block mb-3">{t.emoji}</span>
            <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{t.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
            <div className="mt-4 flex items-center gap-1 text-orange-500 text-xs font-semibold">
              Use template <Icon icon="mdi:arrow-right" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplates;
