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
    const colors = ["#ff69b4", "#ffb6c1", "#ff1493", "#ffc0cb", "#ff85a2"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.floor((i / count) * 100) + (i % 7) * 1.3}%`,
      delay: `${(i * 0.37) % 8}s`,
      duration: `${6 + (i % 5) * 1.5}s`,
      size: 5 + (i % 4),
      color: colors[i % colors.length],
    }));
  }, [count]);
}

// ─── Price helpers ────────────────────────────────────────────────────────────

function inrPrice(usd: number): string {
  return Math.round(usd * 83).toString();
}

function formatDualPrice(usd: number): string {
  return `$${usd.toFixed(2)} / ₹${inrPrice(usd)}`;
}

function formatDualSalePrice(usd: number): string {
  const sale = Math.round(usd * 0.7 * 100) / 100;
  return `$${sale.toFixed(2)} / ₹${inrPrice(sale)}`;
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
    price: 0.99,
    emoji: "🌸",
    desc: "Starter boost for newbies",
    perks: [
      "Access to /kit starter",
      "Colored chat prefix [Noob+]",
      "2 extra homes",
      "/back on death",
      "Access to player warps",
      "15% sell shop bonus",
    ],
    glowColor: "#ff69b4",
    borderColor: "#ff69b4",
    badgeStyle: { background: "#ff69b4", color: "#fff" },
  },
  {
    name: "VIP",
    price: 4.49,
    emoji: "🌺",
    desc: "Monthly perks + priority queue",
    perks: [
      "Priority server queue (skip 10 players)",
      "/kit vip (weekly reset)",
      "5 extra homes",
      "Colored name + bold in chat [VIP]",
      "/nick nickname command",
      "Fly in your own claim",
      "Access to /craft anywhere",
      "25% sell shop bonus",
      "Monthly mystery crate key",
    ],
    glowColor: "#f48fb1",
    borderColor: "#f48fb1",
    badgeStyle: { background: "#f48fb1", color: "#1a0a0f" },
  },
  {
    name: "Fighter",
    price: 6.99,
    emoji: "⚔️",
    desc: "PvP boosts + kill effects",
    perks: [
      "Kill particles & lightning effects",
      "Custom death message",
      "/kit fighter (weekly Prot IV gear)",
      "Spectator mode on death",
      "10% PvP damage reduction",
      "Aura effect in PvP",
      "Access to /disguise",
      "3 /sethome slots extra",
      "Arena VIP lounge access",
      "35% sell shop bonus",
    ],
    glowColor: "#e91e8c",
    borderColor: "#e91e8c",
    badgeStyle: { background: "#e91e8c", color: "#fff" },
  },
  {
    name: "Dragon",
    price: 8.99,
    emoji: "🐉",
    desc: "Fly mounts + custom armor",
    perks: [
      "Dragon fly mount (permanent)",
      "Custom animated armor skin",
      "/kit dragon (Netherite chestplate)",
      "VIP queue bypass",
      "Dragon particle trail",
      "Dragon roar join/quit message",
      "Access to /speed 3",
      "Dragon egg cosmetic",
      "10 extra homes",
      "/enderchest anywhere",
      "50% sell shop bonus",
      "Exclusive Dragon rank tag",
    ],
    glowColor: "#c2185b",
    borderColor: "#c2185b",
    badgeStyle: { background: "#c2185b", color: "#fff" },
  },
  {
    name: "S+",
    price: 10.99,
    emoji: "⭐",
    desc: "Elite kits + /fly everywhere",
    perks: [
      "/fly on ALL worlds forever",
      "Elite weekly kit (full Netherite)",
      "Exclusive [S+] glowing prefix",
      "Private vault (54 slots)",
      "/god mode in claims",
      "Speed + Jump boost aura",
      "Access to /hat any item",
      "Particle wings cosmetic",
      "15 extra homes",
      "Double XP on all activities",
      "2x mcMMO gains",
      "60% sell shop bonus",
      "Priority staff support",
    ],
    glowColor: "#ff85a2",
    borderColor: "#ff85a2",
    badgeStyle: { background: "#ff85a2", color: "#1a0a0f" },
  },
  {
    name: "OG",
    price: 12.99,
    emoji: "🏆",
    desc: "Lifetime basics + exclusive chat",
    perks: [
      "Lifetime rank (never expires)",
      "OG exclusive private chat channel",
      "Cosmetic animated crown",
      "Founder badge (server-wide)",
      "Custom join title broadcast",
      "/heal & /feed commands",
      "Access to all cosmetics",
      "Exclusive OG-only events",
      "/invsee any player",
      "Full Netherite kit monthly",
      "75% sell shop bonus",
      "Reserved slot (always join even if full)",
      "Custom Discord OG role",
    ],
    glowColor: "#ffd700",
    borderColor: "#ffd700",
    badgeStyle: { background: "#ffd700", color: "#000" },
  },
  {
    name: "SGOD",
    price: 17.99,
    emoji: "👑",
    desc: "All perks + server god mode",
    perks: [
      "☠️ INCLUDES ALL RANK PERKS",
      "👑 Permanent /god mode",
      "⚡ Creative mode in your claims",
      "🌈 Animated rainbow name + tag",
      "💀 Custom kill effects (lightning + fireworks)",
      "🔥 Custom join/leave broadcast server-wide",
      "🛡️ Full immunity to lava, fall, explosion damage",
      "🚀 /speed 10 everywhere",
      "⭐ Staff-level /fly everywhere including spawn",
      "💎 Infinite /god kit (Netherite + enchants)",
      "🎭 Full /disguise as any mob",
      "💰 100% sell shop bonus (2x income)",
      "🏠 Unlimited /sethome",
      "🎁 Weekly SGOD legendary crate (exclusive items)",
      "🌀 Access to SGOD-only realm dimension",
      "📢 Server-wide announcements (/broadcast)",
      "🔱 Ban immunity (you cannot be banned by non-owner)",
      "👁️ Spectate any player anytime",
      "🎯 Custom death counter & KDR leaderboard",
      "🌟 Permanent top voter reward every month",
    ],
    glowColor: "#ffd700",
    borderColor: "#ffd700",
    badgeStyle: {
      background: "linear-gradient(135deg,#ffd700,#ff69b4,#e91e8c)",
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
    name: "Noob+ Kit",
    price: 0,
    cooldown: "24h",
    emoji: "🌸",
    color: "#ff69b4",
    items: [
      "Iron Sword (Sharpness I)",
      "Iron Helmet + Chestplate + Leggings + Boots",
      "Bow",
      "32x Arrows",
      "16x Cooked Beef",
      "5x Golden Apple",
      "Iron Pickaxe",
    ],
    desc: "Free starter gear to get new players off the ground.",
  },
  {
    name: "VIP Kit",
    price: 4.49,
    cooldown: "12h",
    emoji: "🌺",
    color: "#f48fb1",
    items: [
      "Diamond Sword (Sharp III, Fire Aspect I)",
      "Diamond Chestplate (Prot III)",
      "Diamond Leggings (Prot II)",
      "Diamond Helmet + Boots (Prot II)",
      "Bow (Power II, Punch I)",
      "64x Arrows",
      "16x Golden Apple",
      "Speed II Potion x2",
      "Ender Pearl x2",
    ],
    desc: "Full diamond PvP kit with fire aspect and speed potions.",
  },
  {
    name: "Fighter Kit",
    price: 3.49,
    cooldown: "12h",
    emoji: "⚔️",
    color: "#e91e8c",
    items: [
      "Bow (Power IV, Flame, Punch II, Infinity)",
      "Diamond Sword (Sharp II)",
      "Diamond Chestplate (Prot III)",
      "Iron Helmet + Leggings + Boots (Prot II)",
      "1x Arrow (Infinity)",
      "20x Golden Apple",
      "Speed II Potion x4",
      "Ender Pearl x3",
    ],
    desc: "Infinite arrows, flame shots, and speed — long-range destroyer.",
  },
  {
    name: "Dragon Kit",
    price: 6.99,
    cooldown: "8h",
    emoji: "🐉",
    color: "#c2185b",
    items: [
      "Diamond Sword (Sharp IV, Fire Aspect I, Looting II)",
      "Diamond Helmet (Prot III, Respiration I)",
      "Diamond Chestplate (Prot IV)",
      "Diamond Leggings (Prot III)",
      "Diamond Boots (Prot III, Feather Falling III)",
      "Bow (Power III, Flame, Punch I)",
      "64x Arrows",
      "32x Golden Apple",
      "Diamond Pickaxe (Eff IV, Unb II)",
      "Strength I Potion x2",
    ],
    desc: "Max diamond loadout — fully enchanted and ready to dominate.",
  },
  {
    name: "S+ Kit",
    price: 5.99,
    cooldown: "12h",
    emoji: "⭐",
    color: "#ff85a2",
    items: [
      "Diamond Sword (Sharp III, Fire Aspect I)",
      "Diamond Chestplate + Leggings (Prot III)",
      "Diamond Helmet + Boots (Prot II)",
      "Bow (Power III)",
      "32x Arrows",
      "Splash Potion of Harming II x4",
      "Splash Potion of Poison II x4",
      "Splash Potion of Weakness x4",
      "Strength II Potion x2",
      "Speed II Potion x4",
      "20x Golden Apple",
      "Ender Pearl x8",
    ],
    desc: "Potion-stacking S+ with a full splash arsenal.",
  },
  {
    name: "SGOD Kit",
    price: 12.99,
    cooldown: "6h",
    emoji: "👑",
    color: "#ffd700",
    items: [
      "⚡ Netherite Sword (Sharp V, Fire Aspect II, Looting III, Unb III)",
      "⚡ Netherite Helmet (Prot IV, Respiration III, Aqua Affinity, Unb III)",
      "⚡ Netherite Chestplate (Prot IV, Unb III, Mending)",
      "⚡ Netherite Leggings (Prot IV, Unb III)",
      "⚡ Netherite Boots (Prot IV, Feather Falling IV, Depth Strider III, Unb III)",
      "Bow (Power V, Flame, Punch II, Infinity, Unb III)",
      "1x Arrow",
      "⚡ Netherite Pickaxe (Eff V, Fortune III, Unb III, Mending)",
      "Shield (Unb III)",
      "64x Golden Apple",
      "Totem of Undying x3",
      "Ender Pearl x16",
      "Strength II Potion x4",
      "Speed II Potion x4",
      "Fire Resistance Potion x4",
      "Splash Potion of Harming II x8",
    ],
    desc: "Full Netherite, max enchants, 64 golden apples — the absolute top kit.",
    featured: true,
  },
  {
    name: "Titan Kit",
    price: 12.99,
    cooldown: "8h",
    emoji: "⚡",
    color: "#7c3aed",
    items: [
      "Netherite Sword — Sharpness V, Fire Aspect II, Looting III, Unbreaking III, Mending",
      "Netherite Axe — Sharpness V, Efficiency V, Unbreaking III, Mending",
      "Full Netherite Armor — Prot IV, Thorns III, Unbreaking III, Mending",
      "Netherite Helmet — Aqua Affinity, Respiration III",
      "Elytra — Unbreaking III, Mending",
      "32x Firework Rockets (speed 3)",
      "64x Golden Apples",
      "8x Totems of Undying",
      "Full Potion Stack (Strength II, Speed II, Regen II, Invis, Fire Resist)",
      "32x Ender Pearls",
      "Crossbow — Quick Charge III, Multishot, Piercing IV",
      "64x Arrows",
      "Shulker Box (full of supplies)",
    ],
    desc: "Unstoppable force — Titan-grade gear for elite warriors.",
  },
  {
    name: "Celestial Kit",
    price: 17.99,
    cooldown: "6h",
    emoji: "🌟",
    color: "#ffd700",
    items: [
      "Netherite Sword — Sharpness V, Fire Aspect II, Knockback II, Sweeping Edge III, Looting III, Unbreaking III, Mending",
      "Netherite Axe — Sharpness V, Efficiency V, Fortune III, Unbreaking III, Mending",
      "Full Netherite Armor — Prot IV, Thorns III, Feather Falling IV, Depth Strider III, Unbreaking III, Mending",
      "Netherite Helmet — Aqua Affinity, Respiration III, Blast Protection IV",
      "Elytra — Unbreaking III, Mending",
      "64x Firework Rockets (speed 3)",
      "64x Golden Apples",
      "16x Totems of Undying",
      "Full Elite Potion Stack (Strength III, Speed III, Regen III, Resistance II, Fire Resist, Invis)",
      "64x Ender Pearls",
      "Trident — Riptide III, Loyalty III, Channeling, Impaling V, Mending",
      "Bow — Power V, Flame I, Infinity, Punch II, Unbreaking III",
      "2x Shulker Boxes (full of rare loot)",
      "64x Obsidian",
      "Beacon (portable)",
      "Enchanted Golden Apple x4",
    ],
    desc: "Divine power — the rarest, most overpowered kit in the server.",
    featured: true,
  },
];

// ─── Sakura Blossom SVG face ──────────────────────────────────────────────────
function SakuraFace() {
  const px = 5;
  // Pixel art sakura blossom petals pattern
  const petals: [number, number, string][] = [
    [0, 4, "#ff69b4"],
    [0, 5, "#ff69b4"],
    [1, 3, "#ff69b4"],
    [1, 4, "#ffc0cb"],
    [1, 5, "#ffc0cb"],
    [1, 6, "#ff69b4"],
    [2, 2, "#ff85a2"],
    [2, 3, "#ffc0cb"],
    [2, 4, "#fff0f5"],
    [2, 5, "#fff0f5"],
    [2, 6, "#ffc0cb"],
    [2, 7, "#ff85a2"],
    [3, 1, "#ff69b4"],
    [3, 2, "#ffc0cb"],
    [3, 3, "#fff0f5"],
    [3, 4, "#e91e8c"],
    [3, 5, "#e91e8c"],
    [3, 6, "#fff0f5"],
    [3, 7, "#ffc0cb"],
    [3, 8, "#ff69b4"],
    [4, 0, "#ff85a2"],
    [4, 1, "#ff69b4"],
    [4, 2, "#ffc0cb"],
    [4, 3, "#e91e8c"],
    [4, 4, "#ffd700"],
    [4, 5, "#ffd700"],
    [4, 6, "#e91e8c"],
    [4, 7, "#ffc0cb"],
    [4, 8, "#ff69b4"],
    [4, 9, "#ff85a2"],
    [5, 0, "#ff85a2"],
    [5, 1, "#ff69b4"],
    [5, 2, "#ffc0cb"],
    [5, 3, "#e91e8c"],
    [5, 4, "#ffd700"],
    [5, 5, "#ffd700"],
    [5, 6, "#e91e8c"],
    [5, 7, "#ffc0cb"],
    [5, 8, "#ff69b4"],
    [5, 9, "#ff85a2"],
    [6, 1, "#ff69b4"],
    [6, 2, "#ffc0cb"],
    [6, 3, "#fff0f5"],
    [6, 4, "#e91e8c"],
    [6, 5, "#e91e8c"],
    [6, 6, "#fff0f5"],
    [6, 7, "#ffc0cb"],
    [6, 8, "#ff69b4"],
    [7, 2, "#ff85a2"],
    [7, 3, "#ffc0cb"],
    [7, 4, "#fff0f5"],
    [7, 5, "#fff0f5"],
    [7, 6, "#ffc0cb"],
    [7, 7, "#ff85a2"],
    [8, 3, "#ff69b4"],
    [8, 4, "#ffc0cb"],
    [8, 5, "#ffc0cb"],
    [8, 6, "#ff69b4"],
    [9, 4, "#ff69b4"],
    [9, 5, "#ff69b4"],
  ];
  return (
    <svg
      role="img"
      width={10 * px}
      height={10 * px}
      viewBox={`0 0 ${10 * px} ${10 * px}`}
      aria-labelledby="sakura-title"
    >
      <title id="sakura-title">ArcBoundMc Sakura blossom pixel art</title>
      {petals.map(([r, c, fill]) => (
        <rect
          key={`r${r}c${c}`}
          x={c * px}
          y={r * px}
          width={px}
          height={px}
          fill={fill}
        />
      ))}
    </svg>
  );
}

// ─── LIMITED TIME SALE Banner ─────────────────────────────────────────────────
function SaleBanner() {
  return (
    <div
      className="sale-banner w-full py-3 px-4 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(90deg, #1a0010, #4a0028, #e91e8c 30%, #ff69b4 50%, #e91e8c 70%, #4a0028, #1a0010)",
        borderTop: "2px solid #e91e8c",
        borderBottom: "2px solid #e91e8c",
        boxShadow: "0 0 30px #e91e8c66, 0 4px 20px #c2185b33",
      }}
      aria-label="Limited time sale announcement"
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,200,220,0.12) 50%, transparent 100%)",
          animation: "shimmerSale 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="flex items-center justify-center gap-3 flex-wrap"
        style={{ animation: "salePulse 1.5s ease-in-out infinite" }}
      >
        <span
          className="pixel-font text-[10px] md:text-xs text-white tracking-widest"
          style={{ textShadow: "0 0 15px #ffc0cb, 0 0 30px #e91e8c" }}
        >
          🌸🌺 LIMITED TIME SALE — UP TO 65% OFF! ENDS SOON 🌺🌸
        </span>
        <span
          className="px-3 py-1 rounded pixel-font text-[9px] font-bold"
          style={{
            background: "linear-gradient(135deg, #ffd700, #ff69b4)",
            color: "#1a0010",
            boxShadow: "0 0 12px #ffd70088",
            animation: "badgeBounce 1s ease-in-out infinite",
          }}
        >
          🛒 BUY NOW
        </span>
      </div>
    </div>
  );
}

// ─── Section Banner component ─────────────────────────────────────────────────
function SectionBanner({
  title,
  color,
  subtitle,
  icons,
  decorChar = "✿",
}: {
  title: string;
  color: string;
  subtitle?: string;
  icons?: string;
  decorChar?: string;
}) {
  return (
    <div className="text-center mb-12">
      {/* Corner decorations row */}
      <div
        className="flex items-center justify-center gap-3 mb-3"
        style={{ color: `${color}66` }}
        aria-hidden="true"
      >
        <span className="pixel-font text-[8px] tracking-widest">🌸🌺🌸</span>
        <span className="text-lg">{icons ?? decorChar}</span>
        <span className="pixel-font text-[8px] tracking-widest">🌸🌺🌸</span>
      </div>

      {/* Top separator line */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}88, ${color})`,
          }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          aria-hidden="true"
        />
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88, transparent)`,
          }}
        />
      </div>

      {/* Title */}
      <h2
        className="pixel-font text-lg md:text-2xl mb-3 section-title-glow"
        style={{
          color,
          textShadow: `0 0 20px ${color}, 0 0 40px ${color}88, 0 0 60px ${color}44`,
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-pink-200/60 text-sm max-w-xl mx-auto mb-4">
          {subtitle}
        </p>
      )}

      {/* Bottom separator line */}
      <div className="flex items-center gap-3 mt-3">
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}44)`,
          }}
        />
        <div
          className="pixel-font text-[7px]"
          style={{ color: `${color}88` }}
          aria-hidden="true"
        >
          {decorChar} {decorChar} {decorChar}
        </div>
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(90deg, ${color}44, transparent)`,
          }}
        />
      </div>
    </div>
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

  const salePriceFmt = formatDualSalePrice(rank.price);
  const origPriceFmt = formatDualPrice(rank.price);

  return (
    <article
      data-ocid={`rank.item.${index + 1}`}
      className={`glass-card relative rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer group ${
        rank.featured ? "rainbow-border scale-105" : ""
      }`}
      style={cardStyle}
    >
      {/* 30% OFF badge */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold pixel-font"
        style={{
          background: "#e91e8c",
          color: "#fff",
          boxShadow: "0 0 8px #e91e8c99",
        }}
      >
        30% OFF
      </div>

      {/* Price badge */}
      <div
        className="absolute top-3 right-3 flex flex-col items-end gap-0.5"
        data-ocid={`rank.${rank.name.toLowerCase()}.price`}
      >
        <span
          className="text-[9px] pixel-font line-through"
          style={{ color: "#6b7280" }}
        >
          {origPriceFmt}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-bold pixel-font"
          style={rank.badgeStyle}
        >
          {salePriceFmt}
        </span>
      </div>

      {rank.name === "SGOD" && (
        <div className="flex justify-center mt-1">
          <img
            src="/assets/generated/sgod-cherry-crown.dim_200x200.png"
            alt="SGOD crown"
            className="w-12 h-12 object-contain"
          />
        </div>
      )}

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
      <p className="text-pink-200/70 text-xs text-center font-body">
        {rank.desc}
      </p>
      <ul className="flex flex-col gap-1 flex-1">
        {rank.perks.map((perk) => (
          <li
            key={perk}
            className="text-pink-100/60 text-xs flex items-start gap-2"
          >
            <span
              style={{ color: rank.glowColor }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ✿
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
            ? "linear-gradient(135deg, #e91e8c, #ffd700, #ff69b4)"
            : `${rank.glowColor}22`,
          color: rank.rainbow ? "#fff" : rank.glowColor,
          border: `1px solid ${rank.glowColor}`,
          boxShadow: `0 0 10px ${rank.glowColor}44`,
        }}
        aria-label={`Buy ${rank.name} rank — ${salePriceFmt} (was ${origPriceFmt})`}
      >
        BUY NOW
      </a>
    </article>
  );
}

// ─── Kit Card ────────────────────────────────────────────────────────────────
function KitCard({ kit, index }: { kit: Kit; index: number }) {
  const isFree = kit.price === 0;
  const salePriceFmt = isFree ? "FREE" : formatDualSalePrice(kit.price);
  const origPriceFmt = isFree ? "" : formatDualPrice(kit.price);

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

      {isFree ? (
        <div
          className="absolute top-8 left-3 px-2 py-0.5 rounded text-[9px] font-bold pixel-font"
          style={{
            background: "#ff69b4",
            color: "#fff",
            boxShadow: "0 0 10px #ff69b499, 0 0 20px #ff69b444",
          }}
        >
          ✿ FREE
        </div>
      ) : (
        <div
          className="absolute top-8 left-3 px-2 py-0.5 rounded text-[9px] font-bold pixel-font"
          style={{
            background: "#e91e8c",
            color: "#fff",
            boxShadow: "0 0 8px #e91e8c99",
          }}
        >
          30% OFF
        </div>
      )}

      {/* Price badge */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-0.5">
        {!isFree && (
          <span
            className="text-[9px] pixel-font line-through"
            style={{ color: "#6b7280" }}
          >
            {origPriceFmt}
          </span>
        )}
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-bold pixel-font"
          style={{
            background: isFree ? "#ff69b4" : kit.color,
            color: "#fff",
            boxShadow: isFree ? "0 0 12px #ff69b466" : undefined,
          }}
        >
          {salePriceFmt}
        </span>
      </div>

      <div className="text-5xl text-center mt-4" aria-hidden="true">
        {kit.emoji}
      </div>
      <h3
        className="pixel-font text-sm text-center"
        style={{ color: kit.color, textShadow: `0 0 15px ${kit.color}` }}
      >
        {kit.name}
      </h3>
      <p className="text-pink-200/70 text-xs text-center">{kit.desc}</p>
      <ul className="flex flex-col gap-1 flex-1">
        {kit.items.map((item) => (
          <li
            key={item}
            className="text-pink-100/60 text-xs flex items-start gap-2"
          >
            <span
              style={{ color: kit.color }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ✿
            </span>
            {item}
          </li>
        ))}
      </ul>
      <a
        href="#checkout"
        data-ocid={`kit.item.${index + 1}.button`}
        className="w-full mt-2 py-3 rounded-md pixel-font text-xs font-bold transition-all duration-300 group-hover:scale-105 text-center block"
        style={{
          background: isFree ? "#ff69b422" : `${kit.color}22`,
          color: isFree ? "#ff69b4" : kit.color,
          border: `1px solid ${isFree ? "#ff69b4" : kit.color}`,
          boxShadow: `0 0 10px ${isFree ? "#ff69b444" : `${kit.color}44`}`,
        }}
        aria-label={
          isFree
            ? `Claim ${kit.name} for free`
            : `Buy ${kit.name} — ${salePriceFmt} (was ${origPriceFmt})`
        }
      >
        {isFree ? "CLAIM FREE" : "BUY KIT"}
      </a>
    </article>
  );
}

// ─── Checkout Section ─────────────────────────────────────────────────────────
function CheckoutSection() {
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

  return (
    <section
      id="checkout"
      className="py-16 px-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(233,30,140,0.10) 0%, rgba(26,10,15,1) 50%, rgba(194,24,91,0.08) 100%)",
        borderTop: "1px solid #e91e8c44",
      }}
      aria-label="Checkout and payment"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <SectionBanner
          title="🌸 CHECKOUT / PAYMENT 🌸"
          color="#e91e8c"
          subtitle="Complete your purchase securely using PhonePe. Scan the QR code below."
          icons="🔒 🌸 🔒"
        />

        {/* PhonePe Card */}
        <div
          className="glass-card rounded-xl p-8 mb-8"
          style={{
            border: "2px solid #e91e8c",
            boxShadow:
              "0 0 40px #e91e8c55, 0 0 80px #c2185b22, inset 0 0 30px #e91e8c08",
            animation: "pulseGlowPinkBox 3s ease-in-out infinite",
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
                color: "#e91e8c",
                textShadow: "0 0 20px #e91e8c, 0 0 40px #c2185b",
              }}
            >
              PhonePe
            </span>
          </div>

          {/* QR Code image */}
          <div className="flex flex-col items-center mb-8">
            <p className="text-pink-300/70 text-xs pixel-font mb-4 tracking-widest">
              🌸 SCAN TO PAY 🌸
            </p>
            <div
              className="relative p-2 rounded-xl"
              style={{
                background: "#fff",
                border: "3px solid #e91e8c",
                boxShadow: "0 0 30px #e91e8c88, 0 0 60px #c2185b55",
                maxWidth: "280px",
              }}
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-21-at-22.10.45-1.jpeg"
                alt="PhonePe QR code for Athiksh_YT_"
                style={{
                  width: "100%",
                  maxWidth: "260px",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <p
                className="pixel-font text-sm"
                style={{
                  color: "#f48fb1",
                  textShadow: "0 0 15px #e91e8c",
                }}
              >
                Athiksh_YT_
              </p>
              <p className="text-pink-300/50 text-[10px] mt-1">
                PhonePe UPI Payment
              </p>
            </div>
          </div>

          {/* Coupon Code */}
          <div
            className="rounded-lg p-6 mb-6"
            style={{
              background: "rgba(233,30,140,0.08)",
              border: "1px solid #e91e8c44",
            }}
          >
            <h4
              className="pixel-font text-xs mb-4"
              style={{ color: "#e91e8c" }}
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
                  background: "#0d0508",
                  border: `1px solid ${couponApplied ? "#ff69b4" : "#e91e8c"}`,
                  color: "#fce4ec",
                  boxShadow: couponApplied ? "0 0 10px #ff69b444" : "none",
                }}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={couponApplied}
                data-ocid="checkout.submit_button"
                className="px-4 py-2 rounded-lg pixel-font text-xs font-bold transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: couponApplied ? "#ff69b433" : "#e91e8c33",
                  border: `1px solid ${couponApplied ? "#ff69b4" : "#e91e8c"}`,
                  color: couponApplied ? "#ff69b4" : "#f48fb1",
                  boxShadow: couponApplied
                    ? "0 0 15px #ff69b455"
                    : "0 0 15px #e91e8c55",
                }}
              >
                {couponApplied ? "✅ APPLIED" : "APPLY"}
              </button>
            </div>
            {couponApplied && (
              <div
                className="mt-3 px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-2"
                style={{
                  background: "#ff69b418",
                  border: "1px solid #ff69b4",
                  color: "#ff69b4",
                  boxShadow: "0 0 20px #ff69b444",
                }}
              >
                🌸 Coupon applied! You get 35% OFF
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
              background: "rgba(233,30,140,0.08)",
              border: "1px solid #e91e8c44",
            }}
          >
            <h4
              className="pixel-font text-xs mb-4"
              style={{ color: "#e91e8c" }}
            >
              HOW TO PAY
            </h4>
            <ol className="flex flex-col gap-3">
              {[
                "Open PhonePe app on your phone",
                'Tap "Scan QR Code" from the home screen',
                "Scan the QR code shown above",
                "Enter the exact amount for your rank/kit (see prices above)",
                "Add your Minecraft username in the note/remarks",
                "Send payment and take a screenshot",
                "Share screenshot in our Discord for rank/kit activation",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-pink-100/70 text-xs"
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold pixel-font"
                    style={{ background: "#e91e8c", color: "#fff" }}
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
            { icon: "🔒", text: "Secure QR Payment" },
            { icon: "✅", text: "Manual Verification" },
            { icon: "⚡", text: "Fast Activation" },
            { icon: "💬", text: "Discord Support" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs pixel-font"
              style={{
                background: "rgba(233,30,140,0.08)",
                border: "1px solid #e91e8c33",
                color: "#f48fb1",
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
            background: "rgba(233,30,140,0.06)",
            border: "1px solid #e91e8c33",
          }}
        >
          <p className="text-pink-300/60 text-xs leading-relaxed">
            🌸 Payments go directly and securely to the server admin. Always
            include your{" "}
            <span style={{ color: "#fce4ec" }}>Minecraft username</span> in the
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

  const sakuraBg: React.CSSProperties = {
    background:
      "linear-gradient(135deg, #1a0a12 0%, #2d0a1f 30%, #1a0520 60%, #0d0a1a 100%)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#1a0a0f", fontFamily: "Inter, sans-serif" }}
    >
      {/* Scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(26,10,15,0.95)",
          borderBottom: "1px solid #e91e8c22",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="pixel-font text-sm md:text-base leading-tight"
            style={{
              color: "#e91e8c",
              textShadow:
                "0 0 20px #e91e8c, 0 0 40px #e91e8c66, 0 0 60px #e91e8c33",
            }}
          >
            🌸 ArcBoundMcStore
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
              className="pixel-font text-[9px] md:text-xs text-pink-200/70 hover:text-white transition-colors px-1 md:px-2 py-1"
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
              background: "#e91e8c22",
              border: "1px solid #e91e8c",
              color: "#f48fb1",
            }}
          >
            Discord Join
          </a>
        </nav>
      </header>

      {/* ── LIMITED TIME SALE BANNER ── */}
      <SaleBanner />

      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={sakuraBg}
        aria-label="Hero banner"
      >
        {/* Pink overlay glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #e91e8c55 0%, #c2185b22 40%, transparent 70%)," +
              "radial-gradient(ellipse 60% 40% at 20% 80%, #ad145744 0%, transparent 50%)," +
              "radial-gradient(ellipse 60% 40% at 80% 80%, #88094433 0%, transparent 50%)",
            opacity: 0.4,
          }}
          aria-hidden="true"
        />
        {/* Sakura branch decoration */}
        <div
          className="absolute top-0 right-0 pointer-events-none opacity-30"
          aria-hidden="true"
        >
          <img
            src="/assets/generated/sakura-branch-deco.dim_400x300.png"
            alt=""
            className="w-64 h-auto"
          />
        </div>
        <div
          className="absolute bottom-0 left-0 pointer-events-none opacity-20"
          aria-hidden="true"
          style={{ transform: "scaleX(-1) scaleY(-1)" }}
        >
          <img
            src="/assets/generated/sakura-branch-deco.dim_400x300.png"
            alt=""
            className="w-48 h-auto"
          />
        </div>

        {/* Petal particles */}
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
              color: "#e91e8c",
              textShadow:
                "0 0 30px #e91e8c, 0 0 60px #e91e8c66, 0 0 100px #e91e8c33",
            }}
          >
            ARCBOUNDMC STORE
          </div>

          {/* Sakura subtitle */}
          <div
            className="pixel-font text-xs md:text-sm mb-4 tracking-widest"
            style={{
              color: "#ff69b4",
              textShadow: "0 0 15px #ff69b4, 0 0 30px #e91e8c66",
              animation: "salePulse 2s ease-in-out infinite",
            }}
          >
            🌸 BEST MINECRAFT SERVER STORE 🌸
          </div>

          <h1
            className="pixel-font text-base md:text-xl lg:text-2xl text-white mb-6 leading-loose"
            style={{ textShadow: "0 0 20px rgba(255,105,180,0.3)" }}
          >
            Unlock Epic Ranks &amp; Kits!
            <br />
            <span className="text-sm md:text-base text-pink-200/70">
              Support the Server &amp; Dominate Worlds
            </span>
          </h1>
          <p className="text-pink-200/60 text-sm md:text-base mb-10 max-w-xl mx-auto">
            Join thousands of players with premium ranks, exclusive kits, and
            powerful loadouts. Support ArcBoundMc and rise to the top of every
            leaderboard.
          </p>

          {/* Sakura blossom pixel art */}
          <div className="flex justify-center mb-8">
            <SakuraFace />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#ranks"
              data-ocid="hero.buy_now.button"
              className="pixel-font text-xs md:text-sm px-8 py-4 rounded-md font-bold neon-glow-green transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                color: "#fff",
                display: "inline-block",
              }}
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
                background: "#e91e8c11",
                border: "1px solid #e91e8c",
                color: "#f48fb1",
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
          <SectionBanner
            title="🌸 CHOOSE YOUR RANK 🌸"
            color="#e91e8c"
            subtitle="Select a rank that suits your playstyle. All ranks are permanent unless otherwise noted. Pay via PhonePe QR."
            icons="👑 🌸 ⚔️ 🌺 👑"
          />

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
                className="flex items-center gap-2 text-pink-200/60 text-xs pixel-font"
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
            "linear-gradient(135deg, rgba(233,30,140,0.06) 0%, rgba(0,0,0,0) 50%, rgba(194,24,91,0.06) 100%)",
          borderTop: "1px solid #e91e8c22",
          borderBottom: "1px solid #c2185b22",
        }}
        aria-label="Kit store"
      >
        <div className="max-w-6xl mx-auto">
          {/* Kit icon decoration */}
          <div className="flex justify-center mb-2">
            <img
              src="/assets/generated/kit-cherry-icon.dim_200x200.png"
              alt=""
              className="w-16 h-16 object-contain opacity-80"
              aria-hidden="true"
            />
          </div>
          <SectionBanner
            title="🎒 CHOOSE YOUR KIT 🎒"
            color="#ff69b4"
            subtitle="Max-tier 1.9-style kits from Netherite to Starter. Each kit has a cooldown — dominate your enemies."
            icons="🌸 ⚔️ 🐉 ⭐ 👑"
          />

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

      {/* ── BUNDLES SECTION ── */}
      <section
        className="py-16 px-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(233,30,140,0.04) 0%, rgba(194,24,91,0.06) 50%, rgba(255,215,0,0.04) 100%)",
          borderTop: "1px solid #e91e8c22",
          borderBottom: "1px solid #c2185b22",
        }}
        aria-label="Bundles"
      >
        <div className="max-w-7xl mx-auto">
          {/* Bundle icon decoration */}
          <div className="flex justify-center mb-2">
            <img
              src="/assets/generated/bundle-cherry-icon.dim_200x200.png"
              alt=""
              className="w-16 h-16 object-contain opacity-80"
              aria-hidden="true"
            />
          </div>
          <SectionBanner
            title="💎 BUNDLES & COMBOS 💎"
            color="#ffd700"
            subtitle="Stack ranks and kits together for the ultimate advantage and best value."
            icons="💎 🌸 💎"
            decorChar="✿"
          />

          {/* Sub-info row */}
          <div
            className="text-center mb-10 px-4 py-3 rounded-lg mx-auto max-w-2xl"
            style={{
              background: "rgba(255,215,0,0.06)",
              border: "1px solid #ffd70033",
            }}
          >
            <p
              className="text-xs pixel-font"
              style={{ color: "#ffd700", textShadow: "0 0 8px #ffd70088" }}
            >
              ⚡ Bundle = Rank + Kit + Bonus Items &nbsp;|&nbsp; Save up to 30%
              vs buying separately ⚡
            </p>
          </div>

          {/* Bundle cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. NOOB+ BUNDLE */}
            <div
              data-ocid="noobplus_bundle.card"
              className="glass-card rounded-xl p-6 relative flex flex-col transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid #ff69b466",
                boxShadow: "0 0 30px #ff69b422, 0 0 60px #ff69b411",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs pixel-font font-bold"
                style={{ background: "#ff69b4", color: "#fff" }}
              >
                BEGINNER PICK
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🌸</span>
                <div>
                  <h3
                    className="pixel-font text-xs font-bold"
                    style={{ color: "#ff69b4", textShadow: "0 0 10px #ff69b4" }}
                  >
                    NOOB+ BUNDLE
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#ff69b422",
                        border: "1px solid #ff69b455",
                        color: "#ff69b4",
                      }}
                    >
                      Noob+ Rank
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#00000044",
                        border: "1px solid #ffffff33",
                        color: "#aaa",
                      }}
                    >
                      FREE Kit
                    </span>
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-1 mb-5 flex-1 list-none p-0">
                {[
                  "Noob+ Kit (FREE)",
                  "x2 Vote Keys",
                  "x1 Common Key",
                  "500 Coins",
                  '"Newbie" tag',
                  "Instant delivery",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1 text-xs text-pink-100/70"
                  >
                    <span style={{ color: "#ff69b4" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xs mr-2">
                  $1.99 / ₹166
                </span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#ff69b4", textShadow: "0 0 8px #ff69b4" }}
                >
                  $1.39 / ₹116
                </span>
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "#ff69b422",
                    border: "1px solid #ff69b455",
                    color: "#ff69b4",
                  }}
                >
                  SAVE 30%
                </span>
              </div>
              <a
                href="#checkout"
                data-ocid="noobplus_bundle.button"
                className="w-full py-2 rounded-lg pixel-font text-xs font-bold text-center transition-all duration-200 hover:opacity-80 hover:shadow-lg block"
                style={{
                  background: "linear-gradient(135deg, #ff69b4, #e91e8c)",
                  color: "#fff",
                }}
              >
                BUY NOW
              </a>
            </div>

            {/* 2. VIP BUNDLE */}
            <div
              data-ocid="vip_bundle.card"
              className="glass-card rounded-xl p-6 relative flex flex-col transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid #f48fb166",
                boxShadow: "0 0 30px #f48fb122, 0 0 60px #f48fb111",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs pixel-font font-bold"
                style={{ background: "#f48fb1", color: "#1a0a0f" }}
              >
                POPULAR
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🌺</span>
                <div>
                  <h3
                    className="pixel-font text-xs font-bold"
                    style={{ color: "#f48fb1", textShadow: "0 0 10px #f48fb1" }}
                  >
                    VIP BUNDLE
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#f48fb122",
                        border: "1px solid #f48fb155",
                        color: "#f48fb1",
                      }}
                    >
                      VIP Rank
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#00000044",
                        border: "1px solid #ffffff33",
                        color: "#aaa",
                      }}
                    >
                      VIP Kit
                    </span>
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-1 mb-5 flex-1 list-none p-0">
                {[
                  "VIP Kit",
                  "x3 Vote Keys",
                  "x1 Rare Key",
                  "1500 Coins",
                  '"VIP" tag',
                  "x16 Steak",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1 text-xs text-pink-100/70"
                  >
                    <span style={{ color: "#f48fb1" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xs mr-2">
                  $5.99 / ₹498
                </span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#f48fb1", textShadow: "0 0 8px #f48fb1" }}
                >
                  $4.19 / ₹349
                </span>
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "#f48fb122",
                    border: "1px solid #f48fb155",
                    color: "#f48fb1",
                  }}
                >
                  SAVE 30%
                </span>
              </div>
              <a
                href="#checkout"
                data-ocid="vip_bundle.button"
                className="w-full py-2 rounded-lg pixel-font text-xs font-bold text-center transition-all duration-200 hover:opacity-80 hover:shadow-lg block"
                style={{
                  background: "linear-gradient(135deg, #f48fb1, #e91e8c)",
                  color: "#fff",
                }}
              >
                BUY NOW
              </a>
            </div>

            {/* 3. FIGHTER BUNDLE */}
            <div
              data-ocid="fighter_bundle.card"
              className="glass-card rounded-xl p-6 relative flex flex-col transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid #e91e8c66",
                boxShadow: "0 0 30px #e91e8c22, 0 0 60px #e91e8c11",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs pixel-font font-bold"
                style={{ background: "#e91e8c", color: "#fff" }}
              >
                TOP SELLER
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚔️</span>
                <div>
                  <h3
                    className="pixel-font text-xs font-bold"
                    style={{ color: "#e91e8c", textShadow: "0 0 10px #e91e8c" }}
                  >
                    FIGHTER BUNDLE
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#e91e8c22",
                        border: "1px solid #e91e8c55",
                        color: "#e91e8c",
                      }}
                    >
                      Fighter Rank
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#00000044",
                        border: "1px solid #ffffff33",
                        color: "#aaa",
                      }}
                    >
                      Fighter Kit
                    </span>
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-1 mb-5 flex-1 list-none p-0">
                {[
                  "Fighter Kit",
                  "x5 Vote Keys",
                  "x2 Rare Keys",
                  "3000 Coins",
                  '"Fighter" tag',
                  "x32 Golden Apples",
                  "x1 Fly Potion",
                  "/fly perm",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1 text-xs text-pink-100/70"
                  >
                    <span style={{ color: "#e91e8c" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xs mr-2">
                  $12.99 / ₹1081
                </span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#e91e8c", textShadow: "0 0 8px #e91e8c" }}
                >
                  $9.09 / ₹757
                </span>
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "#e91e8c22",
                    border: "1px solid #e91e8c55",
                    color: "#e91e8c",
                  }}
                >
                  SAVE 30%
                </span>
              </div>
              <a
                href="#checkout"
                data-ocid="fighter_bundle.button"
                className="w-full py-2 rounded-lg pixel-font text-xs font-bold text-center transition-all duration-200 hover:opacity-80 hover:shadow-lg block"
                style={{
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  color: "#fff",
                }}
              >
                BUY NOW
              </a>
            </div>

            {/* 4. DRAGON BUNDLE */}
            <div
              data-ocid="dragon_bundle.card"
              className="glass-card rounded-xl p-6 relative flex flex-col transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid #ffd70066",
                boxShadow: "0 0 40px #ffd70033, 0 0 80px #ffd70011",
                animation: "rainbow-glow 3s linear infinite",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs pixel-font font-bold"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #e91e8c)",
                  color: "#fff",
                }}
              >
                ✨ BEST VALUE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🐉</span>
                <div>
                  <h3
                    className="pixel-font text-xs font-bold"
                    style={{
                      color: "#ffd700",
                      textShadow: "0 0 12px #ffd700, 0 0 24px #ffd70088",
                    }}
                  >
                    DRAGON BUNDLE
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#ffd70022",
                        border: "1px solid #ffd70055",
                        color: "#ffd700",
                      }}
                    >
                      Dragon Rank
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "#00000044",
                        border: "1px solid #ffffff33",
                        color: "#aaa",
                      }}
                    >
                      Dragon Kit
                    </span>
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-1 mb-5 flex-1 list-none p-0">
                {[
                  "Dragon Kit",
                  "x10 Vote Keys",
                  "x3 Epic Keys",
                  "7500 Coins",
                  '"Dragon" tag',
                  "x64 Golden Apples",
                  "x2 Totems",
                  "x3 Fly Potions",
                  "7-day VIP Chat",
                  "Priority Support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1 text-xs text-pink-100/70"
                  >
                    <span style={{ color: "#ffd700" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xs mr-2">
                  $22.99 / ₹1913
                </span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#ffd700", textShadow: "0 0 8px #ffd700" }}
                >
                  $16.09 / ₹1340
                </span>
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "#ffd70022",
                    border: "1px solid #ffd70055",
                    color: "#ffd700",
                  }}
                >
                  SAVE 30%
                </span>
              </div>
              <a
                href="#checkout"
                data-ocid="dragon_bundle.button"
                className="w-full py-2 rounded-lg pixel-font text-xs font-bold text-center transition-all duration-200 hover:opacity-80 hover:shadow-lg block"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #e91e8c)",
                  color: "#fff",
                }}
              >
                BUY NOW
              </a>
            </div>

            {/* 5. SGOD ULTIMATE BUNDLE — spans 2 cols on md+ */}
            <div
              data-ocid="sgod_bundle.card"
              className="glass-card rounded-xl p-6 relative flex flex-col transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-2"
              style={{
                border: "2px solid transparent",
                background:
                  "linear-gradient(#1a0a0f, #1a0a0f) padding-box, linear-gradient(135deg, #ff69b4, #ffd700, #e91e8c, #ff85a2, #ffc0cb, #e91e8c, #ff69b4) border-box",
                boxShadow: "0 0 50px rgba(255,105,180,0.15)",
                animation: "rainbow-glow 3s linear infinite",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs pixel-font font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #ff69b4, #ffd700, #e91e8c, #ff85a2)",
                  color: "#fff",
                  animation: "salePulse 1.5s ease-in-out infinite",
                }}
              >
                ULTIMATE ⚡
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">👑</span>
                  <div>
                    <h3
                      className="pixel-font text-sm font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff69b4, #ffd700, #e91e8c, #ff85a2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 10px rgba(255,105,180,0.5))",
                      }}
                    >
                      SGOD ULTIMATE BUNDLE
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #ff69b4, #e91e8c)",
                          color: "#fff",
                        }}
                      >
                        ⚡ SGOD Rank
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: "#00000044",
                          border: "1px solid #ffffff33",
                          color: "#aaa",
                        }}
                      >
                        SGOD Kit
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:ml-auto text-right">
                  <div className="text-gray-500 line-through text-xs mb-1">
                    $29.99 / ₹2499
                  </div>
                  <div
                    className="font-bold text-base pixel-font"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #ffd700)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    $20.99 / ₹1745
                  </div>
                  <div
                    className="mt-1 px-3 py-0.5 rounded-full text-xs pixel-font font-bold inline-block"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #e91e8c)",
                      color: "#fff",
                    }}
                  >
                    SAVE 30%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mb-6 flex-1">
                {[
                  "SGOD Kit (Netherite)",
                  "ALL Ranks included",
                  "x20 Vote Keys",
                  "x5 Legendary Keys",
                  "15000 Coins",
                  '"SGOD" rainbow tag',
                  "x128 Golden Apples",
                  "x5 Totems of Undying",
                  "x10 Fly Potions",
                  "Permanent /fly",
                  "Custom join message",
                  "Staff-level commands",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1 text-xs text-pink-100/70"
                  >
                    <span style={{ color: "#ff69b4" }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <a
                href="#checkout"
                data-ocid="sgod_bundle.button"
                className="w-full py-3 rounded-lg pixel-font text-sm font-bold text-center transition-all duration-200 hover:opacity-90 hover:shadow-lg block"
                style={{
                  background:
                    "linear-gradient(135deg, #ff69b4, #ffd700, #e91e8c)",
                  color: "#fff",
                  boxShadow: "0 0 20px #ff69b455, 0 0 40px #e91e8c33",
                }}
              >
                🌸 GET SGOD ULTIMATE 🌸
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHECKOUT ── */}
      <CheckoutSection />

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-6 text-center"
        style={{
          background: "rgba(26,10,15,0.98)",
          borderTop: "1px solid #e91e8c22",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span
            className="pixel-font text-xs"
            style={{
              color: "#e91e8c",
              textShadow: "0 0 15px #e91e8c",
            }}
          >
            🌸 ArcBoundMcStore
          </span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://discord.gg/PfgZ3Gpz"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.discord.button"
              className="text-pink-300/60 hover:text-pink-200 transition-colors text-xs pixel-font"
            >
              Discord
            </a>
            <a
              href="#ranks"
              data-ocid="footer.ranks.link"
              className="text-pink-300/60 hover:text-pink-200 transition-colors text-xs pixel-font"
            >
              Ranks
            </a>
            <a
              href="#kits"
              data-ocid="footer.kits.link"
              className="text-pink-300/60 hover:text-pink-200 transition-colors text-xs pixel-font"
            >
              Kits
            </a>
            <a
              href="#checkout"
              data-ocid="footer.checkout.link"
              className="text-pink-300/60 hover:text-pink-200 transition-colors text-xs pixel-font"
            >
              Checkout
            </a>
          </div>
          <p className="text-pink-300/40 text-xs">
            © {new Date().getFullYear()} ArcBoundMC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
