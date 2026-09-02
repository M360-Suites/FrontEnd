import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

// ─── Block definitions ─────────────────────────────────────────────────────
const BLOCK_TYPES = [
  { type: "header",  label: "Header",    icon: "mdi:format-header-1",    color: "bg-purple-100 text-purple-600" },
  { type: "text",    label: "Text",      icon: "mdi:text",               color: "bg-blue-100 text-blue-600" },
  { type: "image",   label: "Image",     icon: "mdi:image",              color: "bg-green-100 text-green-600" },
  { type: "button",  label: "Button",    icon: "mdi:button-cursor",      color: "bg-orange-100 text-orange-600" },
  { type: "divider", label: "Divider",   icon: "mdi:minus",              color: "bg-gray-100 text-gray-500" },
  { type: "spacer",  label: "Spacer",    icon: "mdi:arrow-expand-vertical", color: "bg-indigo-100 text-indigo-500" },
  { type: "social",  label: "Social",    icon: "mdi:share-variant",      color: "bg-pink-100 text-pink-600" },
  { type: "footer",  label: "Footer",    icon: "mdi:page-layout-footer", color: "bg-teal-100 text-teal-600" },
];

const defaultBlock = (type) => {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const base = { id, type };
  switch (type) {
    case "header":  return { ...base, content: "Your Email Headline", subtext: "Supporting tagline goes here", bgColor: "#1e3a8a", textColor: "#ffffff" };
    case "text":    return { ...base, content: "Write your email body content here. Keep it concise and engaging.", align: "left" };
    case "image":   return { ...base, src: "", alt: "Email image", caption: "", align: "center" };
    case "button":  return { ...base, label: "Click Here", url: "#", bgColor: "#f97316", textColor: "#ffffff", align: "center" };
    case "divider": return { ...base, color: "#e5e7eb", thickness: 1 };
    case "spacer":  return { ...base, height: 24 };
    case "social":  return { ...base, links: { twitter: "#", linkedin: "#", instagram: "#", facebook: "#" } };
    case "footer":  return { ...base, companyName: "Your Company", address: "123 Main St, City, Country", unsubscribe: true };
    default:        return base;
  }
};

// ─── Pre-built templates ────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "blank",
    name: "Blank Canvas",
    description: "Start from scratch",
    category: "Basic",
    thumbnail: null,
    blocks: [],
  },
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Warm onboarding email for new users",
    category: "Onboarding",
    thumbnail: "👋",
    blocks: [
      { id: "h1", type: "header",  content: "Welcome to the Family! 👋",    subtext: "We're so excited to have you on board.", bgColor: "#1e3a8a", textColor: "#ffffff" },
      { id: "t1", type: "text",    content: "Hi there,\n\nThank you for signing up. We built this platform to help you grow faster and smarter.", align: "left" },
      { id: "b1", type: "button",  label: "Get Started →", url: "#", bgColor: "#f97316", textColor: "#ffffff", align: "center" },
      { id: "d1", type: "divider", color: "#e5e7eb", thickness: 1 },
      { id: "f1", type: "footer",  companyName: "Your Company", address: "123 Main St, City", unsubscribe: true },
    ],
  },
  {
    id: "promo",
    name: "Promotional Offer",
    description: "Flash sale or limited-time discount",
    category: "Marketing",
    thumbnail: "🔥",
    blocks: [
      { id: "h1", type: "header",  content: "🔥 Limited Time Offer!", subtext: "Don't miss out — ends in 48 hours.", bgColor: "#991b1b", textColor: "#ffffff" },
      { id: "t1", type: "text",    content: "Get 30% off your next purchase. Use code SAVE30 at checkout.", align: "center" },
      { id: "b1", type: "button",  label: "Claim My Discount", url: "#", bgColor: "#dc2626", textColor: "#ffffff", align: "center" },
      { id: "s1", type: "spacer",  height: 16 },
      { id: "d1", type: "divider", color: "#fca5a5", thickness: 1 },
      { id: "f1", type: "footer",  companyName: "Your Company", address: "123 Main St, City", unsubscribe: true },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Weekly digest or content roundup",
    category: "Content",
    thumbnail: "📰",
    blocks: [
      { id: "h1", type: "header",  content: "Weekly Digest 📰", subtext: "Your curated roundup for this week.", bgColor: "#0f172a", textColor: "#f8fafc" },
      { id: "t1", type: "text",    content: "Here's what happened this week in your industry...", align: "left" },
      { id: "d1", type: "divider", color: "#e2e8f0", thickness: 1 },
      { id: "t2", type: "text",    content: "🚀 Top Story: Your headline goes here\n\nA brief summary of this week's most important story.", align: "left" },
      { id: "b1", type: "button",  label: "Read Full Story", url: "#", bgColor: "#0f172a", textColor: "#ffffff", align: "left" },
      { id: "s1", type: "spacer",  height: 20 },
      { id: "sc", type: "social",  links: { twitter: "#", linkedin: "#", instagram: "#", facebook: "#" } },
      { id: "f1", type: "footer",  companyName: "Your Company", address: "123 Main St, City", unsubscribe: true },
    ],
  },
  {
    id: "reengagement",
    name: "Re-engagement",
    description: "Win back inactive subscribers",
    category: "Marketing",
    thumbnail: "💌",
    blocks: [
      { id: "h1", type: "header",  content: "We Miss You 💌", subtext: "It's been a while — we have something special for you.", bgColor: "#4c1d95", textColor: "#ffffff" },
      { id: "t1", type: "text",    content: "We noticed you haven't been around lately. Here's a little something to bring you back:", align: "center" },
      { id: "b1", type: "button",  label: "Come Back & Save 20%", url: "#", bgColor: "#7c3aed", textColor: "#ffffff", align: "center" },
      { id: "d1", type: "divider", color: "#ddd6fe", thickness: 1 },
      { id: "f1", type: "footer",  companyName: "Your Company", address: "123 Main St, City", unsubscribe: true },
    ],
  },
];

// ─── Block Renderer (canvas view) ─────────────────────────────────────────
const BlockPreview = ({ block }) => {
  switch (block.type) {
    case "header":
      return (
        <div style={{ background: block.bgColor, color: block.textColor }} className="p-6 text-center rounded-t">
          <h1 className="text-2xl font-extrabold leading-tight">{block.content}</h1>
          {block.subtext && <p className="text-sm mt-1 opacity-80">{block.subtext}</p>}
        </div>
      );
    case "text":
      return (
        <div className={`px-6 py-4 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap text-${block.align}`}>
          {block.content}
        </div>
      );
    case "image":
      return (
        <div className={`px-6 py-4 flex flex-col items-${block.align}`}>
          {block.src ? (
            <img src={block.src} alt={block.alt} className="max-w-full rounded-lg border border-gray-200" />
          ) : (
            <div className="w-full h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 gap-2">
              <Icon icon="mdi:image-outline" className="text-2xl" />
              <span className="text-sm">Image placeholder</span>
            </div>
          )}
          {block.caption && <p className="text-xs text-gray-500 mt-1">{block.caption}</p>}
        </div>
      );
    case "button":
      return (
        <div className={`px-6 py-4 flex justify-${block.align}`}>
          <span
            style={{ background: block.bgColor, color: block.textColor }}
            className="inline-block px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer shadow-md"
          >
            {block.label}
          </span>
        </div>
      );
    case "divider":
      return <div className="px-6 py-2"><hr style={{ borderColor: block.color, borderWidth: block.thickness }} /></div>;
    case "spacer":
      return <div style={{ height: block.height }} />;
    case "social":
      return (
        <div className="px-6 py-4 flex justify-center gap-4">
          {Object.entries(block.links).map(([net]) => {
            const icons = { twitter: "mdi:twitter", linkedin: "mdi:linkedin", instagram: "mdi:instagram", facebook: "mdi:facebook" };
            return (
              <div key={net} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                <Icon icon={icons[net] || "mdi:link"} className="text-sm" />
              </div>
            );
          })}
        </div>
      );
    case "footer":
      return (
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-400 rounded-b space-y-1">
          <p className="font-semibold text-gray-600">{block.companyName}</p>
          <p>{block.address}</p>
          {block.unsubscribe && <p className="underline cursor-pointer">Unsubscribe</p>}
        </div>
      );
    default:
      return <div className="px-6 py-2 text-xs text-gray-400 italic">Unknown block</div>;
  }
};

// ─── Block Editor Sidebar ──────────────────────────────────────────────────
const BlockEditor = ({ block, onChange, onClose }) => {
  if (!block) return null;

  const field = (label, key, type = "text", extra = {}) => (
    <div key={key} className="mb-4">
      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none"
          rows={4}
          value={block[key] ?? ""}
          onChange={(e) => onChange({ ...block, [key]: e.target.value })}
          {...extra}
        />
      ) : type === "color" ? (
        <div className="flex items-center gap-2">
          <input type="color" value={block[key] ?? "#000000"} onChange={(e) => onChange({ ...block, [key]: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-gray-200" />
          <span className="text-xs text-gray-500">{block[key]}</span>
        </div>
      ) : type === "select" ? (
        <select className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" value={block[key] ?? ""} onChange={(e) => onChange({ ...block, [key]: e.target.value })}>
          {extra.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "number" ? (
        <input type="number" className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" value={block[key] ?? ""} onChange={(e) => onChange({ ...block, [key]: Number(e.target.value) })} {...extra} />
      ) : (
        <input type={type} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" value={block[key] ?? ""} onChange={(e) => onChange({ ...block, [key]: e.target.value })} {...extra} />
      )}
    </div>
  );

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 capitalize">{block.type} Block</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><Icon icon="mdi:close" /></button>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {block.type === "header"  && <>{field("Headline", "content", "textarea")}{field("Subtext", "subtext")}{field("Background Color", "bgColor", "color")}{field("Text Color", "textColor", "color")}</>}
        {block.type === "text"    && <>{field("Content", "content", "textarea")}{field("Alignment", "align", "select", { options: ["left", "center", "right"] })}</>}
        {block.type === "image"   && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Upload Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => onChange({ ...block, src: ev.target.result });
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer" 
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            {field("Image URL", "src")}
            {field("Alt Text", "alt")}
            {field("Caption", "caption")}
            {field("Alignment", "align", "select", { options: ["start", "center", "end"] })}
          </>
        )}
        {block.type === "button"  && <>{field("Button Label", "label")}{field("URL / Link", "url")}{field("Background Color", "bgColor", "color")}{field("Text Color", "textColor", "color")}{field("Alignment", "align", "select", { options: ["start", "center", "end"] })}</>}
        {block.type === "divider" && <>{field("Color", "color", "color")}{field("Thickness (px)", "thickness", "number", { min: 1, max: 8 })}</>}
        {block.type === "spacer"  && field("Height (px)", "height", "number", { min: 8, max: 80 })}
        {block.type === "social"  && <>{Object.keys(block.links).map((net) => field(`${net.charAt(0).toUpperCase() + net.slice(1)} URL`, `links.${net}`, "url"))}</>}
        {block.type === "footer"  && <>{field("Company Name", "companyName")}{field("Address", "address")}</>}
      </div>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────
const EmailBuilder = ({ onBack, onSave }) => {
  const [stage, setStage]               = useState("pick");   // "pick" | "build"
  const [selectedTemplate, setSelected] = useState(null);
  const [blocks, setBlocks]             = useState([]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [dragOverIdx, setDragOverIdx]   = useState(null);
  const [preview, setPreview]           = useState(false);
  const [emailMeta, setEmailMeta]       = useState({ subject: "", fromName: "" });
  const draggingBlock                   = useRef(null);  // block type from palette
  const draggingExistingIdx             = useRef(null);  // index of existing block

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  // ── Palette drag start ──
  const onPaletteDragStart = (type) => { draggingBlock.current = type; draggingExistingIdx.current = null; };
  // ── Existing block drag start ──
  const onBlockDragStart   = (idx)  => { draggingExistingIdx.current = idx; draggingBlock.current = null; };

  const onCanvasDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggingBlock.current) {
      // Insert new block from palette
      const nb = defaultBlock(draggingBlock.current);
      const updated = [...blocks];
      updated.splice(targetIdx, 0, nb);
      setBlocks(updated);
      setActiveBlockId(nb.id);
    } else if (draggingExistingIdx.current !== null) {
      // Reorder existing
      const from = draggingExistingIdx.current;
      const updated = [...blocks];
      const [moved] = updated.splice(from, 1);
      updated.splice(targetIdx, 0, moved);
      setBlocks(updated);
    }
    draggingBlock.current        = null;
    draggingExistingIdx.current  = null;
    setDragOverIdx(null);
  };

  const updateBlock = (updated) => {
    // Handle nested social links e.g. "links.twitter"
    setBlocks((prev) => prev.map((b) => b.id === updated.id ? updated : b));
  };

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (activeBlockId === id) setActiveBlockId(null);
  };

  const duplicateBlock = (idx) => {
    const clone = { ...blocks[idx], id: `${blocks[idx].type}-${Date.now()}` };
    const updated = [...blocks];
    updated.splice(idx + 1, 0, clone);
    setBlocks(updated);
  };

  const useTemplate = (tpl) => {
    setSelected(tpl);
    setBlocks(tpl.blocks.map((b) => ({ ...b })));
    setStage("build");
  };

  // ── Template picker ──────────────────────────────────────────────────────
  if (stage === "pick") {
    const categories = ["All", ...new Set(TEMPLATES.map((t) => t.category))];
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
              <Icon icon="mdi:arrow-left" className="text-xl" />
            </button>
            <div>
              <h1 className="font-bold text-gray-800 text-lg">Choose a Template</h1>
              <p className="text-xs text-gray-500">Select a starting point for your email</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Category filter */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((tpl) => (
              <motion.div
                key={tpl.id}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer group transition-all"
                onClick={() => useTemplate(tpl)}
              >
                {/* Thumbnail */}
                <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl border-b border-gray-100 relative overflow-hidden">
                  {tpl.thumbnail ? (
                    <span>{tpl.thumbnail}</span>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <Icon icon="mdi:file-outline" className="text-5xl" />
                      <span className="text-sm">Blank</span>
                    </div>
                  )}
                  {/* Mini preview bars */}
                  <div className="absolute bottom-3 left-4 right-4 space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {tpl.blocks.slice(0, 3).map((b) => (
                      <div key={b.id} className={`h-2 rounded-full ${b.type === "header" ? "bg-blue-300 w-full" : b.type === "button" ? "bg-orange-300 w-24" : "bg-gray-300 w-3/4"}`} />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{tpl.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{tpl.description}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full shrink-0 ml-2">{tpl.category}</span>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-xl bg-orange-50 text-orange-600 font-semibold text-sm hover:bg-orange-500 hover:text-white transition-colors">
                    Use Template →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Builder ────────────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setStage("pick")} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <Icon icon="mdi:arrow-left" className="text-xl" />
          </button>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{selectedTemplate?.name || "Email Builder"}</p>
            <p className="text-[10px] text-gray-400">{blocks.length} block{blocks.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="hidden md:block border border-gray-200 rounded-lg px-3 py-1.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 w-52"
            placeholder="Email subject line..."
            value={emailMeta.subject}
            onChange={(e) => setEmailMeta((p) => ({ ...p, subject: e.target.value }))}
          />
          <button onClick={() => setPreview((p) => !p)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${preview ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            <Icon icon={preview ? "mdi:pencil" : "mdi:eye"} />
            <span className="hidden sm:inline">{preview ? "Edit" : "Preview"}</span>
          </button>
          <button
            onClick={() => onSave?.({ blocks, meta: emailMeta })}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow transition-colors"
          >
            <Icon icon="mdi:content-save" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Block Palette */}
        {!preview && (
          <aside className="w-48 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-2">Blocks</p>
            <div className="px-2 pb-4 space-y-1">
              {BLOCK_TYPES.map(({ type, label, icon, color }) => (
                <div
                  key={type}
                  draggable
                  onDragStart={() => onPaletteDragStart(type)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors select-none"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                    <Icon icon={icon} className="text-sm" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Canvas */}
        <main className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar" onDragOver={(e) => e.preventDefault()}>
          <div className="max-w-[620px] mx-auto">
            {/* Subject line meta strip */}
            {!preview && (
              <div className="mb-4 bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3">
                <Icon icon="mdi:email-outline" className="text-gray-400" />
                <input
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Subject: Enter your email subject..."
                  value={emailMeta.subject}
                  onChange={(e) => setEmailMeta((p) => ({ ...p, subject: e.target.value }))}
                />
              </div>
            )}

            {/* Email body */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[500px]">
              {blocks.length === 0 && !preview && (
                <div
                  className="h-[400px] flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-200 m-4 rounded-xl transition-colors"
                  onDrop={(e) => onCanvasDrop(e, 0)}
                  onDragOver={(e) => { e.preventDefault(); setDragOverIdx(0); }}
                  onDragLeave={() => setDragOverIdx(null)}
                >
                  <Icon icon="mdi:drag" className="text-5xl mb-3" />
                  <p className="font-semibold">Drag blocks here</p>
                  <p className="text-sm mt-1">or click a template to start</p>
                </div>
              )}

              {blocks.map((block, idx) => (
                <div key={block.id}>
                  {/* Drop zone above block */}
                  {!preview && (
                    <div
                      className={`h-2 transition-all ${dragOverIdx === idx ? "h-8 bg-orange-100 border-2 border-dashed border-orange-300 rounded-lg mx-4 my-1" : ""}`}
                      onDrop={(e) => onCanvasDrop(e, idx)}
                      onDragOver={(e) => { e.preventDefault(); setDragOverIdx(idx); }}
                      onDragLeave={() => setDragOverIdx(null)}
                    />
                  )}

                  {/* Block wrapper */}
                  <div
                    className={`relative group ${!preview ? "cursor-pointer" : ""} ${activeBlockId === block.id && !preview ? "ring-2 ring-orange-400 ring-inset" : ""}`}
                    onClick={() => !preview && setActiveBlockId(block.id)}
                    draggable={!preview}
                    onDragStart={() => onBlockDragStart(idx)}
                  >
                    <BlockPreview block={block} />

                    {/* Hover controls */}
                    {!preview && (
                      <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-md px-1.5 py-1">
                        <button title="Move" className="p-1 text-gray-400 hover:text-gray-600 cursor-grab"><Icon icon="mdi:drag-vertical" /></button>
                        <button title="Duplicate" onClick={(e) => { e.stopPropagation(); duplicateBlock(idx); }} className="p-1 text-gray-400 hover:text-blue-500"><Icon icon="mdi:content-copy" /></button>
                        <button title="Delete" onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} className="p-1 text-gray-400 hover:text-red-500"><Icon icon="mdi:delete-outline" /></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Drop zone at end */}
              {!preview && blocks.length > 0 && (
                <div
                  className={`h-3 m-3 rounded-xl transition-all ${dragOverIdx === blocks.length ? "h-10 bg-orange-100 border-2 border-dashed border-orange-300" : "border-2 border-dashed border-transparent"}`}
                  onDrop={(e) => onCanvasDrop(e, blocks.length)}
                  onDragOver={(e) => { e.preventDefault(); setDragOverIdx(blocks.length); }}
                  onDragLeave={() => setDragOverIdx(null)}
                >
                  {dragOverIdx === blocks.length && <p className="text-center text-xs text-orange-400 pt-2">Drop here</p>}
                </div>
              )}
            </div>

            {/* Add block buttons row */}
            {!preview && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {BLOCK_TYPES.slice(0, 5).map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => {
                      const nb = defaultBlock(type);
                      setBlocks((p) => [...p, nb]);
                      setActiveBlockId(nb.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors shadow-sm"
                  >
                    <Icon icon={icon} />
                    + {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Properties panel */}
        {!preview && (
          <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto shrink-0 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeBlock ? (
                <BlockEditor
                  key={activeBlock.id}
                  block={activeBlock}
                  onChange={updateBlock}
                  onClose={() => setActiveBlockId(null)}
                />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                  <Icon icon="mdi:cursor-default-click" className="text-4xl mb-3" />
                  <p className="text-sm font-medium">Click any block</p>
                  <p className="text-xs mt-1">to edit its properties</p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        )}
      </div>
    </div>
  );
};

export default EmailBuilder;
