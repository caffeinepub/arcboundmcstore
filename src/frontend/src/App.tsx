import { useMemo, useState } from "react";

// ─── Particle config ──────────────────────────────────────────────────────────
interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  color: string;
}

function useParticles(count: number): Particle[] {
  return useMemo(() => {
    const colors = ["#00ff88", "#a855f7", "#37d7ff", "#ff5a3c", "#f6c64a"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.floor((i / count) * 100) + (i % 7) * 1.3}%`,
      delay: `${(i * 0.37) % 8}s`,
      duration: `${6 + (i % 5) * 1.5}s`,
      size: 3 + (i % 3),
      color: colors[i % colors.length],
    }));
  }, [count]);
}

// ─── Rank data ────────────────────────────────────────────────────────────────
interface Rank {
  name: string;
  price: number;
  emoji: string;
  desc: string;
  perks: string[];
  glowColor: string;
  borderColor: string;
  badgeStyle: React.CSSProperties;
  featured?: boolean;
  rainbow?: boolean;
}

const RANKS: Rank[] = [
  {
    name: "Noob+",
    price: 1,
    emoji: "🗡️",
    desc: "Starter boost for newbies",
    perks: ["Access to /kit starter", "Colored chat prefix", "1 extra home"],
    glowColor: "#00ff88",
    borderColor: "#00ff88",
    badgeStyle: { background: "#00ff88", color: "#000" },
  },
  {
    name: "VIP",
    price: 5,
    emoji: "⚔️",
    desc: "Monthly perks + priority queue",
    perks: [
      "Priority server queue",
      "/kit vip monthly",
      "3 extra homes",
      "Colored name in chat",
    ],
    glowColor: "#f6c64a",
    borderColor: "#f6c64a",
    badgeStyle: { background: "#f6c64a", color: "#000" },
  },
  {
    name: "Fighter",
    price: 8,
    emoji: "🪓",
    desc: "PvP boosts + kill effects",
    perks: [
      "Kill particles & effects",
      "PvP damage boost",
      "/kit fighter",
      "Spectator mode",
    ],
    glowColor: "#ff5a3c",
    borderColor: "#ff5a3c",
    badgeStyle: { background: "#ff5a3c", color: "#fff" },
  },
  {
    name: "Dragon",
    price: 10,
    emoji: "🐉",
    desc: "Fly mounts + custom armor",
    perks: [
      "Dragon fly mount",
      "Custom armor skins",
      "/kit dragon",
      "VIP queue bypass",
    ],
    glowColor: "#a855f7",
    borderColor: "#a855f7",
    badgeStyle: { background: "#a855f7", color: "#fff" },
  },
  {
    name: "S+",
    price: 12,
    emoji: "⭐",
    desc: "Elite kits + /fly everywhere",
    perks: [
      "/fly on all worlds",
      "Elite monthly kit",
      "Exclusive S+ prefix",
      "Private vault",
    ],
    glowColor: "#37d7ff",
    borderColor: "#37d7ff",
    badgeStyle: { background: "#37d7ff", color: "#000" },
  },
  {
    name: "OG",
    price: 15,
    emoji: "🏆",
    desc: "Lifetime basics + exclusive chat",
    perks: [
      "Lifetime rank (no expiry)",
      "OG exclusive chat channel",
      "Cosmetic crown",
      "Founder badge",
    ],
    glowColor: "#f59e0b",
    borderColor: "#f59e0b",
    badgeStyle: { background: "#f59e0b", color: "#000" },
  },
  {
    name: "SGOD",
    price: 20,
    emoji: "👑",
    desc: "All perks + server god mode",
    perks: [
      "ALL ranks included",
      "God mode invincibility",
      "Custom join message",
      "Staff-level commands",
      "Rainbow name effect",
    ],
    glowColor: "#ffd700",
    borderColor: "#ffd700",
    badgeStyle: {
      background: "linear-gradient(135deg,#ffd700,#ff0080,#a855f7)",
      color: "#fff",
    },
    featured: true,
    rainbow: true,
  },
];

// ─── Kit data ─────────────────────────────────────────────────────────────────
interface Kit {
  name: string;
  price: number;
  cooldown: string;
  emoji: string;
  color: string;
  items: string[];
  desc: string;
  featured?: boolean;
}

const KITS: Kit[] = [
  {
    name: "Starter Kit",
    price: 2,
    cooldown: "24h",
    emoji: "🎒",
    color: "#37d7ff",
    items: [
      "Iron Sword",
      "Iron Chestplate",
      "10x Cooked Beef",
      "5x Golden Apple",
      "Iron Pickaxe",
      "32x Arrows",
    ],
    desc: "Perfect for new players to get a solid start.",
  },
  {
    name: "Fighter Kit",
    price: 5,
    cooldown: "12h",
    emoji: "⚔️",
    color: "#ff5a3c",
    items: [
      "Diamond Sword (Sharp II)",
      "Diamond Chestplate (Prot II)",
      "Diamond Leggings",
      "16x Golden Apple",
      "Bow (Power II)",
      "64x Arrows",
    ],
    desc: "Dominate PvP fights with sharp gear.",
  },
  {
    name: "Archer Kit",
    price: 4,
    cooldown: "12h",
    emoji: "🏹",
    color: "#a855f7",
    items: [
      "Bow (Power III, Infinity)",
      "Diamond Sword",
      "Iron Armor",
      "32x Golden Apple",
      "1x Arrow",
      "Speed Potion II",
    ],
    desc: "Long-range domination with infinite arrows.",
  },
  {
    name: "Diamond Kit",
    price: 8,
    cooldown: "8h",
    emoji: "💎",
    color: "#00bfff",
    items: [
      "Diamond Sword (Sharp III)",
      "Full Diamond Armor (Prot III)",
      "32x Golden Apple",
      "Bow (Power III)",
      "64x Arrows",
      "Diamond Pickaxe (Eff III)",
    ],
    desc: "Full diamond loadout, ready to rule.",
  },
  {
    name: "Mage Kit",
    price: 7,
    cooldown: "12h",
    emoji: "🧙",
    color: "#f6c64a",
    items: [
      "Enchanted Book (Sharp IV)",
      "Splash Potions x8",
      "Diamond Sword",
      "Prot III Armor",
      "Golden Apple x20",
      "Ender Pearl x4",
    ],
    desc: "Potion-powered warrior with enchantment edge.",
  },
  {
    name: "God Kit",
    price: 15,
    cooldown: "6h",
    emoji: "👑",
    color: "#ffd700",
    items: [
      "Diamond Sword (Sharp IV, Fire I)",
      "Full Diamond Armor (Prot IV)",
      "64x Golden Apple",
      "Bow (Power IV, Flame)",
      "64x Arrows",
      "Totem of Undying x2",
      "Diamond Pickaxe (Eff IV, Unb III)",
    ],
    desc: "The ultimate PvP loadout — unstoppable force.",
    featured: true,
  },
];

// ─── Creeper SVG (static pixel art with stable keys) ───────────────────────────
const CREEPER_RECTS: [number, number][] = [
  [0, 1],
  [0, 7],
  [1, 0],
  [1, 1],
  [1, 7],
  [1, 8],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 1],
  [4, 2],
  [4, 6],
  [4, 7],
  [5, 1],
  [5, 7],
  [6, 2],
  [6, 3],
  [6, 5],
  [6, 6],
  [7, 2],
  [7, 6],
];

function CreeperFace() {
  const px = 5;
  return (
    <svg
      role="img"
      width={10 * px}
      height={8 * px}
      viewBox={`0 0 ${10 * px} ${8 * px}`}
      aria-labelledby="creeper-title"
    >
      <title id="creeper-title">ArcBoundMc Creeper face pixel art</title>
      {CREEPER_RECTS.map(([r, c]) => (
        <rect
          key={`r${r}c${c}`}
          x={c * px}
          y={r * px}
          width={px}
          height={px}
          fill="#00ff88"
        />
      ))}
    </svg>
  );
}

// ─── Rank Card ───────────────────────────────────────────────────────────────
function RankCard({ rank, index }: { rank: Rank; index: number }) {
  const cardStyle: React.CSSProperties = rank.rainbow
    ? {}
    : {
        border: `2px solid ${rank.borderColor}`,
        boxShadow: `0 0 18px ${rank.glowColor}55, 0 0 40px ${rank.glowColor}22, inset 0 0 20px ${rank.glowColor}08`,
      };

  return (
    <article
      data-ocid={`rank.item.${index + 1}`}
      className={`glass-card relative rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer group ${
        rank.featured ? "rainbow-border scale-105" : ""
      }`}
      style={cardStyle}
    >
      <div
        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold pixel-font"
        style={rank.badgeStyle}
        data-ocid={`rank.${rank.name.toLowerCase()}.price`}
      >
        ${rank.price}
      </div>
      <div className="text-5xl text-center mt-2" aria-hidden="true">
        {rank.emoji}
      </div>
      <h3
        className="pixel-font text-sm text-center"
        style={{
          color: rank.glowColor,
          textShadow: `0 0 15px ${rank.glowColor}`,
        }}
      >
        {rank.name}
      </h3>
      <p className="text-gray-300 text-xs text-center font-body">{rank.desc}</p>
      <ul className="flex flex-col gap-1 flex-1">
        {rank.perks.map((perk) => (
          <li
            key={perk}
            className="text-gray-400 text-xs flex items-start gap-2"
          >
            <span
              style={{ color: rank.glowColor }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ▶
            </span>
            {perk}
          </li>
        ))}
      </ul>
      <a
        href="#checkout"
        data-ocid={`rank.${rank.name.toLowerCase().replace("+", "plus")}.button`}
        className="w-full mt-2 py-3 rounded-md pixel-font text-xs font-bold transition-all duration-300 group-hover:scale-105 text-center block"
        style={{
          background: rank.rainbow
            ? "linear-gradient(135deg, #ff0080, #ffd700, #a855f7)"
            : `${rank.glowColor}22`,
          color: rank.rainbow ? "#fff" : rank.glowColor,
          border: `1px solid ${rank.glowColor}`,
          boxShadow: `0 0 10px ${rank.glowColor}44`,
        }}
        aria-label={`Buy ${rank.name} rank for $${rank.price}`}
      >
        BUY NOW
      </a>
    </article>
  );
}

// ─── Kit Card ────────────────────────────────────────────────────────────────
function KitCard({ kit, index }: { kit: Kit; index: number }) {
  return (
    <article
      data-ocid={`kit.item.${index + 1}`}
      className={`glass-card relative rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer group ${
        kit.featured ? "scale-105" : ""
      }`}
      style={{
        border: `2px solid ${kit.color}${kit.featured ? "" : "88"}`,
        boxShadow: `0 0 ${kit.featured ? 30 : 18}px ${kit.color}${kit.featured ? "88" : "44"}, 0 0 40px ${kit.color}22`,
      }}
    >
      {/* Cooldown badge */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] pixel-font"
        style={{
          background: `${kit.color}22`,
          border: `1px solid ${kit.color}66`,
          color: kit.color,
        }}
      >
        ⏱ {kit.cooldown}
      </div>

      {/* Price badge */}
      <div
        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold pixel-font"
        style={{ background: kit.color, color: "#000" }}
      >
        ${kit.price}
      </div>

      {/* Emoji */}
      <div className="text-5xl text-center mt-4" aria-hidden="true">
        {kit.emoji}
      </div>

      {/* Name */}
      <h3
        className="pixel-font text-sm text-center"
        style={{ color: kit.color, textShadow: `0 0 15px ${kit.color}` }}
      >
        {kit.name}
      </h3>

      {/* Desc */}
      <p className="text-gray-300 text-xs text-center">{kit.desc}</p>

      {/* Items */}
      <ul className="flex flex-col gap-1 flex-1">
        {kit.items.map((item) => (
          <li
            key={item}
            className="text-gray-400 text-xs flex items-start gap-2"
          >
            <span
              style={{ color: kit.color }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ▶
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* Buy button */}
      <a
        href="#checkout"
        data-ocid={`kit.item.${index + 1}.button`}
        className="w-full mt-2 py-3 rounded-md pixel-font text-xs font-bold transition-all duration-300 group-hover:scale-105 text-center block"
        style={{
          background: `${kit.color}22`,
          color: kit.color,
          border: `1px solid ${kit.color}`,
          boxShadow: `0 0 10px ${kit.color}44`,
        }}
        aria-label={`Buy ${kit.name} for $${kit.price}`}
      >
        BUY KIT
      </a>
    </article>
  );
}

// ─── Checkout Section ─────────────────────────────────────────────────────────
function CheckoutSection() {
  const [copied, setCopied] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const VALID_COUPON = "ArcBoundTheBezt";
  const handleApplyCoupon = () => {
    if (couponInput === VALID_COUPON) {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  };
  const upiNumber = "7093037207";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select text
    }
  };

  return (
    <section
      id="checkout"
      className="py-16 px-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(109,40,217,0.10) 0%, rgba(7,7,15,1) 50%, rgba(109,40,217,0.08) 100%)",
        borderTop: "1px solid #6d28d944",
      }}
      aria-label="Checkout and payment"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            className="pixel-font text-lg md:text-2xl mb-4"
            style={{ color: "#a855f7", textShadow: "0 0 20px #a855f7" }}
          >
            CHECKOUT / PAYMENT
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Complete your purchase securely using PhonePe UPI. All payments are
            processed securely.
          </p>
          <div
            className="w-32 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, #6d28d9, #a855f7, #6d28d9)",
            }}
          />
        </div>

        {/* PhonePe Card */}
        <div
          className="glass-card rounded-xl p-8 mb-8"
          style={{
            border: "1px solid #6d28d9",
            boxShadow:
              "0 0 40px #6d28d955, 0 0 80px #6d28d922, inset 0 0 30px #6d28d908",
          }}
          data-ocid="checkout.panel"
        >
          {/* PhonePe branding */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl" aria-hidden="true">
              📱
            </span>
            <span
              className="pixel-font text-xl md:text-2xl"
              style={{
                color: "#a855f7",
                textShadow: "0 0 20px #a855f7, 0 0 40px #6d28d9",
              }}
            >
              PhonePe
            </span>
          </div>

          {/* UPI Number */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-xs pixel-font mb-2">
              UPI / MOBILE NUMBER
            </p>
            <div
              className="inline-block px-6 py-3 rounded-lg text-3xl md:text-4xl font-bold tracking-widest"
              style={{
                background: "rgba(109,40,217,0.20)",
                border: "2px solid #a855f7",
                color: "#e9d5ff",
                textShadow: "0 0 20px #a855f7",
                fontFamily: "monospace",
              }}
            >
              {upiNumber}
            </div>
          </div>

          {/* Copy button */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={handleCopy}
              data-ocid="checkout.copy.button"
              className="px-6 py-3 rounded-lg pixel-font text-xs font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                background: copied ? "#00ff8833" : "#6d28d933",
                border: `1px solid ${copied ? "#00ff88" : "#a855f7"}`,
                color: copied ? "#00ff88" : "#d8b4fe",
                boxShadow: copied ? "0 0 15px #00ff8855" : "0 0 15px #6d28d955",
              }}
            >
              {copied ? "✅ Copied!" : "📋 Copy UPI Number"}
            </button>
          </div>

          {/* Coupon Code */}
          <div
            className="rounded-lg p-6 mb-6"
            style={{
              background: "rgba(109,40,217,0.10)",
              border: "1px solid #6d28d944",
            }}
          >
            <h4
              className="pixel-font text-xs mb-4"
              style={{ color: "#a855f7" }}
            >
              COUPON CODE
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError(false);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && !couponApplied && handleApplyCoupon()
                }
                disabled={couponApplied}
                placeholder="Enter coupon code..."
                data-ocid="checkout.input"
                className="flex-1 px-4 py-2 rounded-lg text-sm font-mono outline-none transition-all duration-300"
                style={{
                  background: "#0a0a1a",
                  border: `1px solid ${couponApplied ? "#00ff88" : "#6d28d9"}`,
                  color: "#e9d5ff",
                  boxShadow: couponApplied ? "0 0 10px #00ff8844" : "none",
                }}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={couponApplied}
                data-ocid="checkout.submit_button"
                className="px-4 py-2 rounded-lg pixel-font text-xs font-bold transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: couponApplied ? "#00ff8833" : "#6d28d933",
                  border: `1px solid ${couponApplied ? "#00ff88" : "#a855f7"}`,
                  color: couponApplied ? "#00ff88" : "#d8b4fe",
                  boxShadow: couponApplied
                    ? "0 0 15px #00ff8855"
                    : "0 0 15px #6d28d955",
                }}
              >
                {couponApplied ? "✅ APPLIED" : "APPLY"}
              </button>
            </div>
            {couponApplied && (
              <div
                className="mt-3 px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-2"
                style={{
                  background: "#00ff8818",
                  border: "1px solid #00ff88",
                  color: "#00ff88",
                  boxShadow: "0 0 20px #00ff8844",
                }}
              >
                🎉 Coupon applied! You get 35% OFF
              </div>
            )}
            {couponError && !couponApplied && (
              <div
                className="mt-3 px-4 py-2 rounded-lg text-xs flex items-center gap-2"
                style={{
                  background: "#ff003322",
                  border: "1px solid #ff3366",
                  color: "#ff6688",
                }}
              >
                ❌ Invalid coupon code
              </div>
            )}
          </div>

          {/* Payment steps */}
          <div
            className="rounded-lg p-6 mb-6"
            style={{
              background: "rgba(109,40,217,0.10)",
              border: "1px solid #6d28d944",
            }}
          >
            <h4
              className="pixel-font text-xs mb-4"
              style={{ color: "#a855f7" }}
            >
              HOW TO PAY
            </h4>
            <ol className="flex flex-col gap-3">
              {[
                "Open PhonePe app",
                'Go to "Send Money" → "To Mobile Number"',
                `Enter UPI number: ${upiNumber}`,
                "Enter the exact amount for your rank/kit",
                "Add your Minecraft username in the note/remarks",
                "Send payment and take a screenshot",
                "Share screenshot in our Discord for rank/kit activation",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-gray-300 text-xs"
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold pixel-font"
                    style={{ background: "#6d28d9", color: "#e9d5ff" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Discord activation button */}
          <div className="flex justify-center">
            <a
              href="https://discord.gg/PfgZ3Gpz"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="checkout.discord.button"
              className="flex items-center gap-2 px-6 py-3 rounded-lg pixel-font text-xs font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "#5865f222",
                border: "1px solid #5865f2",
                color: "#c3c9f7",
                boxShadow: "0 0 15px #5865f244",
              }}
            >
              <svg
                role="img"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#5865f2"
                aria-labelledby="checkout-discord-title"
              >
                <title id="checkout-discord-title">Discord</title>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.004.024.018.047.038.065a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              ACTIVATE ON DISCORD
            </a>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {[
            { icon: "🔒", text: "Secure UPI Payment" },
            { icon: "✅", text: "Manual Verification" },
            { icon: "⚡", text: "Fast Activation" },
            { icon: "💬", text: "Discord Support" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs pixel-font"
              style={{
                background: "rgba(109,40,217,0.10)",
                border: "1px solid #6d28d933",
                color: "#c4b5fd",
              }}
            >
              <span aria-hidden="true">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>

        {/* Notice */}
        <div
          className="rounded-lg p-4 text-center"
          style={{
            background: "rgba(109,40,217,0.08)",
            border: "1px solid #6d28d933",
          }}
        >
          <p className="text-gray-400 text-xs leading-relaxed">
            💜 Payments go directly and securely to the server admin. Always
            include your{" "}
            <span style={{ color: "#e9d5ff" }}>Minecraft username</span> in the
            payment note.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const particles = useParticles(30);

  const netherBg: React.CSSProperties = {
    background:
      "radial-gradient(ellipse 80% 60% at 50% 100%, #5c0a0a 0%, #2d0606 30%, #0a0a0f 70%)," +
      "radial-gradient(ellipse 40% 30% at 20% 80%, #7a1a00 0%, transparent 60%)," +
      "radial-gradient(ellipse 40% 30% at 80% 90%, #6b1200 0%, transparent 60%)," +
      "radial-gradient(ellipse 60% 40% at 50% 110%, #ff460022 0%, transparent 50%)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#07070f", fontFamily: "Inter, sans-serif" }}
    >
      {/* Scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(7,7,15,0.95)",
          borderBottom: "1px solid #00ff8822",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="pixel-font text-sm md:text-base leading-tight"
            style={{
              color: "#00ff88",
              textShadow:
                "0 0 20px #00ff88, 0 0 40px #00ff8866, 0 0 60px #00ff8833",
            }}
          >
            ArcBoundMcStore
          </span>
        </div>

        <nav
          className="flex items-center gap-1 md:gap-4"
          aria-label="Main navigation"
        >
          {[
            { label: "Home", href: "/" },
            { label: "Ranks", href: "#ranks" },
            { label: "Kits", href: "#kits" },
            { label: "Checkout", href: "#checkout" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-ocid={`nav.${item.label.toLowerCase()}.link`}
              className="pixel-font text-[9px] md:text-xs text-gray-300 hover:text-white transition-colors px-1 md:px-2 py-1"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://discord.gg/PfgZ3Gpz"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.discord.button"
            className="pixel-font text-[9px] md:text-xs px-3 md:px-4 py-2 rounded-md ml-1 md:ml-2 neon-glow-purple transition-all duration-300 hover:scale-105"
            style={{
              background: "#a855f722",
              border: "1px solid #a855f7",
              color: "#e9d5ff",
            }}
          >
            Discord Join
          </a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={netherBg}
        aria-label="Hero banner"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 50% at 50% 100%, #ff460033 0%, transparent 60%)",
            animation: "lavaFlow 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #c0392b44, #ff690022, transparent)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                bottom: "-10px",
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                animationDelay: p.delay,
                animationDuration: p.duration,
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="pixel-font text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{
              color: "#00ff88",
              textShadow:
                "0 0 30px #00ff88, 0 0 60px #00ff8866, 0 0 100px #00ff8833",
            }}
          >
            ARCBOUNDMC STORE
          </div>
          <h1
            className="pixel-font text-base md:text-xl lg:text-2xl text-white mb-6 leading-loose"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          >
            Unlock Epic Ranks &amp; Kits!
            <br />
            <span className="text-sm md:text-base text-gray-300">
              Support the Server &amp; Dominate Worlds
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-xl mx-auto">
            Join thousands of players with premium ranks, exclusive kits, and
            powerful loadouts. Support ArcBoundMc and rise to the top of every
            leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#ranks"
              data-ocid="hero.buy_now.button"
              className="pixel-font text-xs md:text-sm px-8 py-4 rounded-md text-black font-bold neon-glow-green transition-all duration-300 hover:scale-110"
              style={{ background: "#00ff88", display: "inline-block" }}
            >
              BUY NOW
            </a>
            <a
              href="https://discord.gg/PfgZ3Gpz"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.discord.button"
              className="pixel-font text-xs md:text-sm px-8 py-4 rounded-md transition-all duration-300 hover:scale-105"
              style={{
                background: "#a855f711",
                border: "1px solid #a855f7",
                color: "#d8b4fe",
                display: "inline-block",
              }}
            >
              JOIN DISCORD
            </a>
          </div>
        </div>
      </section>

      {/* ── RANKS ── */}
      <section id="ranks" className="py-16 px-6" aria-label="Rank store">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="pixel-font text-lg md:text-2xl mb-4"
              style={{ color: "#00ff88", textShadow: "0 0 20px #00ff88" }}
            >
              CHOOSE YOUR RANK
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Select a rank that suits your playstyle. All ranks are permanent
              unless otherwise noted. Pay via PhonePe UPI.
            </p>
            <div
              className="w-32 h-1 mx-auto mt-6 rounded-full"
              style={{ background: "linear-gradient(90deg, #00ff88, #a855f7)" }}
            />
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="rank.list"
          >
            {RANKS.map((rank, i) => (
              <RankCard key={rank.name} rank={rank} index={i} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: "🔒", text: "Secure Payments" },
              { icon: "⚡", text: "Fast Activation" },
              { icon: "🎮", text: "10k+ Players" },
              { icon: "💬", text: "24/7 Support" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-gray-400 text-xs pixel-font"
              >
                <span className="text-lg" aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KITS SECTION ── */}
      <section
        id="kits"
        className="py-16 px-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(55,215,255,0.06) 0%, rgba(0,0,0,0) 50%, rgba(168,85,247,0.06) 100%)",
          borderTop: "1px solid #37d7ff22",
          borderBottom: "1px solid #a855f722",
        }}
        aria-label="Kit store"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="pixel-font text-lg md:text-2xl mb-4"
              style={{ color: "#37d7ff", textShadow: "0 0 20px #37d7ff" }}
            >
              CHOOSE YOUR KIT
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Powerful 1.9-style kits with top-tier gear, potions, and weapons.
              Each kit has a cooldown — choose wisely.
            </p>
            <div
              className="w-32 h-1 mx-auto mt-6 rounded-full"
              style={{ background: "linear-gradient(90deg, #37d7ff, #a855f7)" }}
            />
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="kit.list"
          >
            {KITS.map((kit, i) => (
              <KitCard key={kit.name} kit={kit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BUNDLES TEASER ── */}
      <section
        className="py-12 px-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(168,85,247,0.05) 100%)",
          borderTop: "1px solid #00ff8822",
          borderBottom: "1px solid #a855f722",
        }}
        aria-label="Bundles"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "💎",
                title: "BUNDLES",
                desc: "Save more with curated rank + kit bundles.",
                color: "#00ff88",
                ocid: "bundles.card",
              },
              {
                emoji: "🏆",
                title: "GOD BUNDLE",
                desc: "SGOD rank + God Kit — the ultimate combo for total domination.",
                color: "#ffd700",
                ocid: "god_bundle.card",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-ocid={item.ocid}
                className="glass-card rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${item.color}33`,
                  boxShadow: `0 0 20px ${item.color}11`,
                }}
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {item.emoji}
                </div>
                <h3
                  className="pixel-font text-xs mb-2"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs mb-4">{item.desc}</p>
                <a
                  href="#checkout"
                  data-ocid={`${item.title.toLowerCase().replace(" ", "_")}.button`}
                  className="inline-block mt-2 px-4 py-2 rounded text-xs pixel-font transition-all duration-200 hover:opacity-80"
                  style={{
                    background: `${item.color}22`,
                    border: `1px solid ${item.color}55`,
                    color: item.color,
                  }}
                >
                  VIEW BUNDLE
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKOUT ── */}
      <CheckoutSection />

      {/* ── FOOTER ── */}
      <footer
        className="px-6 py-10"
        style={{
          background: "rgba(4,4,10,0.98)",
          borderTop: "1px solid #00ff8822",
        }}
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div
              className="pixel-font text-sm"
              style={{ color: "#00ff88", textShadow: "0 0 15px #00ff8888" }}
            >
              ArcBoundMcStore
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://discord.gg/PfgZ3Gpz"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.discord.button"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-xs pixel-font transition-all duration-300 hover:scale-105"
                style={{
                  background: "#a855f722",
                  border: "1px solid #a855f766",
                  color: "#d8b4fe",
                  boxShadow: "0 0 10px #a855f744",
                }}
              >
                <svg
                  role="img"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#a855f7"
                  aria-labelledby="discord-icon-title"
                >
                  <title id="discord-icon-title">Discord</title>
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.004.024.018.047.038.065a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                DISCORD
              </a>
              <a
                href="https://x.com/arcboundmc"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.twitter.button"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-xs pixel-font transition-all duration-300 hover:scale-105"
                style={{
                  background: "#00ff8811",
                  border: "1px solid #00ff8844",
                  color: "#6ee7b7",
                  boxShadow: "0 0 10px #00ff8822",
                }}
              >
                <svg
                  role="img"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#00ff88"
                  aria-labelledby="twitter-icon-title"
                >
                  <title id="twitter-icon-title">Twitter / X</title>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                TWITTER
              </a>
            </div>

            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <CreeperFace />
            </div>
          </div>

          <div
            className="h-px w-full mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00ff8844, #a855f744, transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <p className="text-gray-500 text-xs">
              🔒 Secure Payments via PhonePe UPI &nbsp;|&nbsp; Prices in USD
              &nbsp;|&nbsp; Join Discord:{" "}
              <a
                href="https://discord.gg/PfgZ3Gpz"
                style={{ color: "#a855f7" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                discord.gg/PfgZ3Gpz
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs">
              <a
                href="/tos"
                data-ocid="footer.tos.link"
                style={{ color: "#6b7280" }}
                className="hover:text-gray-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                data-ocid="footer.privacy.link"
                style={{ color: "#6b7280" }}
                className="hover:text-gray-400 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-700 text-xs">
              © {new Date().getFullYear()} ArcBoundMc. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00ff8866" }}
                className="hover:opacity-80 transition-opacity"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
