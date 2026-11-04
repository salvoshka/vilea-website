import React, { useEffect, useRef, useState } from "react";

// ==========================================
// KONFIGURASI NOMOR WHATSAPP & GAMBAR
// ==========================================
// Ubah nomor WhatsApp di bawah ini (gunakan awalan 62 tanpa tanda + atau spasi)
const WHATSAPP_NUMBER = "62895703081642";

const IMAGES = {
  heroPortrait:
    "/office.png",
  aboutStudio:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
  bentoCreative:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
  bentoTeam:
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
  service01:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  service02:
    "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?auto=format&fit=crop&w=800&q=80",
  service03:
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
  service04:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  service05:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
  service06:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  ctaBg:
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2000&q=85",
};

// ==========================================
// REUSABLE ANIMATION WRAPPER
// ==========================================
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// ROLLING DUAL-LAYER BUTTON
// ==========================================
interface RollingButtonProps {
  text: string;
  href?: string;
  className?: string;
  variant?: "white" | "rose" | "glass";
  size?: "sm" | "md" | "lg";
  isDark?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function RollingButton({
  text,
  href = "#kontak",
  className = "",
  variant = "white",
  size = "md",
  isDark = false,
  onClick,
}: RollingButtonProps) {
  const sizeClasses =
    size === "sm"
      ? "px-5 py-2 text-xs md:text-sm"
      : size === "lg"
      ? "px-7 py-3.5 text-sm"
      : "px-6 py-3 text-xs md:text-sm";

  const variantClasses =
    variant === "rose"
      ? "bg-gradient-to-r from-[#D91B5C] to-[#F43F5E] text-white shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:shadow-[0_12px_36px_rgba(225,29,72,0.5)]"
      : variant === "glass"
      ? isDark
        ? "border border-white/15 bg-white/[0.06] text-white backdrop-blur-md hover:border-pink-400/40 hover:bg-white/[0.1]"
        : "border border-slate-300/90 bg-white/80 text-slate-900 backdrop-blur-md hover:border-rose-400 hover:bg-rose-50/60 shadow-sm"
      : isDark
      ? "bg-white text-black hover:bg-pink-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className="relative block overflow-hidden leading-[1.25]">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        >
          {text}
        </span>
      </span>
    </a>
  );
}

export function PillBadge({
  children,
  isDark = false,
}: {
  children: React.ReactNode;
  isDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-tight backdrop-blur-md transition-colors duration-300 ${
        isDark
          ? "border-pink-500/25 bg-pink-500/[0.08] text-pink-200"
          : "border-rose-500/25 bg-rose-500/[0.08] text-[#D91B5C]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#F43F5E]" />
      {children}
    </span>
  );
}

// ==========================================
// VILEA BRAND LOGO SVG EMBLEM
// ==========================================
export function VileaLogo({
  size = "md",
  showLegal = false,
  isDark = false,
}: {
  size?: "sm" | "md" | "lg";
  showLegal?: boolean;
  isDark?: boolean;
}) {
  const iconDim = size === "lg" ? 42 : size === "sm" ? 26 : 32;

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_4px_14px_rgba(225,29,72,0.3)]"
      >
        <defs>
          <linearGradient
            id="vileaRightRibbon"
            x1="54"
            y1="10"
            x2="30"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#FDE8F1" : "#FBCFE8"} />
            <stop offset="45%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          <linearGradient
            id="vileaLeftBase"
            x1="10"
            y1="14"
            x2="34"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#9F1239" />
            <stop offset="55%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>

          <linearGradient
            id="vileaTopFold"
            x1="9"
            y1="10"
            x2="36"
            y2="46"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="55%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        <path
          d="M32.5 54.5C29.2 54.5 26.8 51.4 28.2 48.2L41.8 16.5C43.4 12.8 46.8 10.5 50.8 10.5H54.2C57.6 10.5 59.8 14.1 58.3 17.2L40.4 50.2C38.7 53.1 35.8 54.5 32.5 54.5Z"
          fill="url(#vileaRightRibbon)"
        />
        <path
          d="M5.8 16.8C4.4 13.8 6.6 10.5 10 10.5H19.4C23.2 10.5 26.6 12.7 28.2 16.2L39.6 41.8C42.1 47.4 38.2 54.5 32 54.5C27.5 54.5 23.5 51.8 21.6 47.8L5.8 16.8Z"
          fill="url(#vileaLeftBase)"
        />
        <path
          d="M6.2 14.5C5.5 12.3 7.2 10.5 9.6 10.5H19.8C23.5 10.5 26.8 12.7 28.4 16.1L38.8 39.2C39.6 41 39.9 43.1 39.5 45C36.2 38.4 27.6 31.8 17.8 25.8C11.9 22.1 7.6 18.4 6.2 14.5Z"
          fill="url(#vileaTopFold)"
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-bold leading-none tracking-[-0.04em] transition-colors duration-300 ${
            isDark ? "text-white" : "text-slate-900"
          } ${
            size === "lg"
              ? "text-2xl md:text-3xl"
              : size === "sm"
              ? "text-lg"
              : "text-xl"
          }`}
        >
          Vilea
        </span>
        {showLegal && (
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
              isDark ? "text-pink-200/70" : "text-[#D91B5C]"
            }`}
          >
            PT VILEA KREASI INDONESIA
          </span>
        )}
      </div>
    </span>
  );
}

// ==========================================
// DATA DEFINITIONS FROM PITCH DECK
// ==========================================
const PAIN_POINTS = [
  {
    number: "01",
    title: "Konten tidak konsisten",
    description:
      "Sulit menjaga jadwal publikasi saat fokus pada operasional bisnis.",
  },
  {
    number: "02",
    title: "Visual belum seragam",
    description:
      "Tampilan brand berubah-ubah sehingga kurang mudah dikenali.",
  },
  {
    number: "03",
    title: "Waktu dan tim terbatas",
    description:
      "Membuat ide, desain, caption, dan jadwal konten membutuhkan tenaga.",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Branding & Logo Design",
    description: "Logo sederhana, identitas visual, dan arahan warna brand.",
    image: IMAGES.service01,
    tag: "Visual Identity",
  },
  {
    number: "02",
    title: "Social Media Management",
    description: "Perencanaan, penjadwalan, dan publikasi konten.",
    image: IMAGES.service02,
    tag: "End-to-End Management",
  },
  {
    number: "03",
    title: "Social Media Content",
    description: "Desain single post, carousel, dan Instagram Story.",
    image: IMAGES.service03,
    tag: "Feed & Story Design",
  },
  {
    number: "04",
    title: "Reels & Short Video",
    description: "Video pendek untuk membantu menyampaikan pesan brand.",
    image: IMAGES.service04,
    tag: "Vertical Video (Maks. 30s)",
  },
  {
    number: "05",
    title: "Copywriting & Planning",
    description: "Ide konten, caption, dan kalender konten bulanan.",
    image: IMAGES.service05,
    tag: "Content Calendar & Copy",
  },
  {
    number: "06",
    title: "Digital Ads & Campaign",
    description: "Perencanaan kampanye dan pemantauan iklan digital.",
    image: IMAGES.service06,
    tag: "Add-on Service",
  },
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Diskusi kebutuhan",
    description:
      "Memahami bisnis, target audiens, tujuan, dan karakter brand.",
  },
  {
    number: "02",
    title: "Perencanaan konten",
    description:
      "Menyusun kalender, tema, pesan, dan kebutuhan materi.",
  },
  {
    number: "03",
    title: "Produksi kreatif",
    description:
      "Membuat desain, caption, dan video sesuai paket.",
  },
  {
    number: "04",
    title: "Review & revisi",
    description:
      "Klien meninjau materi dan memberikan masukan sesuai ketentuan.",
  },
  {
    number: "05",
    title: "Publikasi & evaluasi",
    description:
      "Konten dipublikasikan sesuai paket, lalu performa ditinjau.",
  },
];

const PRICING_TIERS = [
  {
    id: "Starter (Rp299.000/bulan)",
    name: "STARTER",
    price: "Rp299.000",
    period: "/ bulan",
    subtitle: "Mulai dari kebutuhan konten",
    features: [
      "10 desain single post",
      "5 desain carousel (maks. 5 slide/carousel)",
      "15 caption / copywriting",
      "Kalender konten bulanan",
      "1 platform media sosial",
      "Bonus laporan performa bulanan",
      "Bonus 1x revisi per materi",
    ],
  },
  {
    id: "Growth (Rp499.000/bulan)",
    name: "GROWTH",
    price: "Rp499.000",
    period: "/ bulan",
    subtitle: "Untuk bisnis yang ingin berkembang",
    popular: true,
    features: [
      "Logo sederhana (sekali di awal)",
      "Setup 1 akun Instagram",
      "10 desain single post + 5 carousel",
      "5 desain Instagram Story",
      "4 Reels sederhana (maks. 30 detik)",
      "Caption & kalender konten",
      "Posting dan penjadwalan Instagram",
      "Kunjungan lokasi untuk foto/video",
      "Bonus laporan & 1x revisi per materi",
    ],
  },
  {
    id: "Premium (Rp699.000/bulan)",
    name: "PREMIUM",
    price: "Rp699.000",
    period: "/ bulan",
    subtitle: "Untuk kebutuhan multi-platform",
    features: [
      "Logo sederhana (sekali di awal)",
      "Setup hingga 3 akun: IG, Facebook Page, TikTok",
      "12 desain single post + 6 carousel",
      "10 desain Instagram Story",
      "4 Reels sederhana (maks. 30 detik)",
      "Caption & kalender konten",
      "Posting dan penjadwalan platform yang disepakati",
      "Kunjungan lokasi untuk foto/video",
      "Bonus laporan & 1x revisi per materi",
    ],
  },
];

const PACKAGE_TERMS = [
  {
    q: "Materi & revisi",
    a: "Setiap materi mendapat 1x revisi sesuai brief awal. Perubahan konsep besar dapat dihitung sebagai pekerjaan tambahan.",
  },
  {
    q: "Carousel",
    a: "Maksimal 5 slide per desain carousel.",
  },
  {
    q: "Video Reels",
    a: "Maksimal 30 detik per video. Materi video dari klien digunakan kecuali pengambilan konten disepakati saat kunjungan.",
  },
  {
    q: "Kunjungan lokasi",
    a: "Khusus Growth dan Premium; jadwal, cakupan lokasi, dan kebutuhan produksi disepakati terlebih dahulu. Biaya transport di luar area dapat dikenakan.",
  },
  {
    q: "Biaya di luar paket",
    a: "Budget iklan, talent, properti, produksi khusus, dan biaya pihak ketiga tidak termasuk.",
  },
  {
    q: "Kuota desain",
    a: "Kuota desain merupakan total paket per bulan, bukan kuota terpisah untuk setiap platform.",
  },
];



export default function App() {
  // Default adalah false (Tema Terang). Saat tombol diklik menjadi true (Night Mode / Gelap).
  const [isDark, setIsDark] = useState<boolean>(false);

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [openTerm, setOpenTerm] = useState<number | null>(0);
  const [selectedPackage, setSelectedPackage] = useState<string>(
    "Growth (Rp499.000/bulan)"
  );
  const [brandName, setBrandName] = useState<string>("");
  const [businessNeeds, setBusinessNeeds] = useState<string>("");
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  useEffect(() => {
    document.title =
      "VILEA — Social Media & Creative Agency | PT Vilea Kreasi Indonesia";

    const href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    if (!document.head.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackage(pkgId);
    const contactEl = document.getElementById("kontak");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buildWhatsAppMessage = () => {
    const sender = brandName.trim() ? brandName.trim() : "Brand/Bisnis Saya";
    const note = businessNeeds.trim()
      ? `\nCatatan kebutuhan: ${businessNeeds.trim()}`
      : "";
    return `Halo Tim VILEA (PT Vilea Kreasi Indonesia)! Saya dari *${sender}* tertarik untuk berdiskusi mengenai layanan *${selectedPackage}*.${note}\n\nBoleh minta info jadwal konsultasi lebih lanjut?`;
  };

  const handleCopyBrief = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(buildWhatsAppMessage());
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    }
  };

  // Variabel kelas dinamis untuk mempersingkat transisi Tema Terang vs Night Mode
  const pageBg = isDark ? "bg-[#030712] text-white" : "bg-[#FAFAFC] text-slate-900";
  const cardBg = isDark
    ? "border-white/[0.08] bg-[#070913]"
    : "border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-white/70" : "text-slate-600";
  const textMuted = isDark ? "text-white/60" : "text-slate-500";
  const accentText = isDark ? "text-pink-300" : "text-[#D91B5C]";
  const accentNumber = isDark ? "text-pink-400" : "text-[#E11D48]";
  const dividerBorder = isDark ? "border-white/10" : "border-slate-200";

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        body {
          background-color: ${isDark ? "#030712" : "#FAFAFC"};
          color: ${isDark ? "#ffffff" : "#0f172a"};
          overflow-x: hidden;
          transition: background-color 0.35s ease, color 0.35s ease;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @keyframes vileaMarqueeX {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-x {
          display: flex;
          width: max-content;
          animation: vileaMarqueeX 28s linear infinite;
        }
        .animate-marquee-x:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={`min-h-screen transition-colors duration-300 selection:bg-[#E11D48] selection:text-white ${pageBg}`}
      >
        {/* ====================================================
            HERO SECTION
        ==================================================== */}
        <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src={IMAGES.heroPortrait}
              alt="VILEA Creative Agency"
              className={`h-full w-full object-cover object-[68%_22%] scale-105 transition-all duration-500 ${
                isDark
                  ? "brightness-90 contrast-105"
                  : "brightness-105 contrast-95"
              }`}
            />
            {isDark ? (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 76% 36%, rgba(225, 29, 72, 0.3) 0%, rgba(244, 114, 182, 0.12) 38%, rgba(3, 7, 18, 0.92) 85%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(3,7,18,0.9) 0%, rgba(3,7,18,0.55) 42%, rgba(3,7,18,0.15) 72%, rgba(3,7,18,0.45) 100%)",
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-56"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(3,7,18,0) 0%, rgba(3,7,18,0.88) 65%, #030712 100%)",
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 76% 36%, rgba(244, 114, 182, 0.22) 0%, rgba(251, 207, 232, 0.25) 42%, rgba(250, 250, 252, 0.94) 85%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(250,250,252,0.96) 0%, rgba(250,250,252,0.82) 45%, rgba(250,250,252,0.22) 74%, rgba(250,250,252,0.5) 100%)",
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-56"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(250,250,252,0) 0%, rgba(250,250,252,0.9) 65%, #FAFAFC 100%)",
                  }}
                />
              </>
            )}
          </div>

          {/* Floating Glass Navbar + Night Mode Toggle */}
          <header className="relative z-30 mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 pt-6 md:px-10">
            <nav
              aria-label="Navigasi Utama VILEA"
              className={`flex items-center gap-8 rounded-full border px-5 py-2.5 backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-[#070913]/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  : "border-slate-200/90 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              }`}
            >
              <a href="#" aria-label="VILEA Beranda">
                <VileaLogo size="sm" isDark={isDark} />
              </a>

              <div
                className={`hidden items-center gap-6 text-sm lg:flex ${
                  isDark ? "text-white/75" : "text-slate-600"
                }`}
              >
                <a
                  href="#tentang"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Tentang
                </a>
                <a
                  href="#layanan"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Layanan
                </a>
                <a
                  href="#keunggulan"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Keunggulan
                </a>
                <a
                  href="#cara-kerja"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Cara Kerja
                </a>
                <a
                  href="#paket"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Paket Harga
                </a>
                <a
                  href="#ketentuan"
                  className="transition-colors hover:text-[#E11D48]"
                >
                  Ketentuan
                </a>
              </div>
            </nav>

            <div
              className={`flex items-center gap-2.5 rounded-full border p-1.5 pl-3 backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-[#070913]/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  : "border-slate-200/90 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              }`}
            >
              {/* Tombol Sakelar Night Mode / Light Mode */}
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                aria-label={isDark ? "Aktifkan Mode Terang" : "Aktifkan Night Mode"}
                title={isDark ? "Kembali ke Tema Terang" : "Aktifkan Night Mode"}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 active:scale-95 ${
                  isDark
                    ? "border-pink-500/30 bg-pink-500/15 text-pink-200 hover:bg-pink-500/25"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:border-rose-300 hover:bg-rose-50 hover:text-[#D91B5C]"
                }`}
              >
                {isDark ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5 text-amber-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-3.5 w-3.5 text-[#D91B5C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span>Night Mode</span>
                  </>
                )}
              </button>

              <span
                className={`hidden text-xs font-medium md:inline ${
                  isDark ? "text-pink-200/75" : "text-slate-500"
                }`}
              >
                Depok, Jawa Barat
              </span>

              <RollingButton
                text="Konsultasi Gratis"
                href="#kontak"
                variant="rose"
                size="sm"
                isDark={isDark}
              />
            </div>
          </header>

          {/* Hero Main Content */}
          <div className="relative z-20 mx-auto w-full max-w-[1360px] px-6 pb-16 pt-32 md:px-10 md:pb-20">
            <Reveal>
              <PillBadge isDark={isDark}>
                SOCIAL MEDIA & CREATIVE AGENCY • DEPOK, JAWA BARAT
              </PillBadge>

              <h1
                className={`mt-5 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[4.65rem] ${textPrimary}`}
              >
                Your Brand,
                <br />
                <span
                  className={`bg-clip-text text-transparent ${
                    isDark
                      ? "bg-gradient-to-r from-white via-pink-100 to-[#F472B6]"
                      : "bg-gradient-to-r from-[#9F1239] via-[#D91B5C] to-[#F43F5E]"
                  }`}
                >
                  Our Creativity.
                </span>
              </h1>

              <p
                className={`mt-5 max-w-xl text-base font-normal leading-relaxed md:text-lg ${
                  isDark ? "text-white/80" : "text-slate-700"
                }`}
              >
                Social media & creative agency. Kami bantu brand tampil lebih
                menonjol dan profesional di dunia digital.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RollingButton
                  text="Lihat Paket Layanan"
                  href="#paket"
                  variant="rose"
                  size="lg"
                  isDark={isDark}
                />
                <RollingButton
                  text="Diskusi Kebutuhan"
                  href="#kontak"
                  variant="glass"
                  size="lg"
                  isDark={isDark}
                />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div
                className={`mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border px-6 py-4 backdrop-blur-xl transition-colors duration-300 md:flex-row md:items-center ${
                  isDark
                    ? "border-white/10 bg-[#070913]/75"
                    : "border-slate-200/90 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                      isDark
                        ? "bg-pink-500/15 text-pink-300"
                        : "bg-rose-100 text-[#D91B5C]"
                    }`}
                  >
                    OUR FOCUS
                  </span>
                  <span
                    className={`text-sm font-medium tracking-tight md:text-base ${textPrimary}`}
                  >
                    Creative.{" "}
                    <span className={accentNumber}>Consistent.</span>{" "}
                    Purposeful.
                  </span>
                </div>
                <p className={`text-xs md:text-sm ${textMuted}`}>
                  Membangun kehadiran digital yang lebih profesional dan
                  konsisten.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ====================================================
            SECTION 1 — TENTANG KAMI & TANTANGAN BISNIS
        ==================================================== */}
        <section
          id="tentang"
          className="relative mx-auto max-w-[1360px] px-6 py-24 md:px-10 md:py-32"
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full blur-[130px] ${
              isDark ? "bg-[#E11D48]/15" : "bg-rose-300/30"
            }`}
          />

          <Reveal>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <PillBadge isDark={isDark}>01 / Tentang Kami</PillBadge>
              </div>

              <div className="lg:col-span-9">
                <h2
                  className={`text-3xl font-medium leading-[1.16] tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem] ${textPrimary}`}
                >
                  VILEA adalah social media agency berbasis di Depok, Jawa
                  Barat, yang membantu UMKM dan berbagai jenis bisnis membangun
                  identitas brand yang kuat, menarik, dan profesional di dunia
                  digital.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
              <div className="hidden lg:col-span-3 lg:block" />

              <div className="lg:col-span-4">
                <div className="relative flex h-full min-h-[380px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-lg">
                  <img
                    src={IMAGES.aboutStudio}
                    alt="VILEA Creative Partner"
                    className="absolute inset-0 h-full w-full object-cover contrast-110 saturate-125 filter"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(225,29,72,0.32) 0%, rgba(244,114,182,0.18) 45%, rgba(3,7,18,0.92) 100%)",
                    }}
                  />

                  <div className="relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-300">
                      PT VILEA KREASI INDONESIA
                    </span>
                    <p className="mt-1 text-xl font-medium text-white">
                      Your Brand, Our Creativity.
                    </p>
                    <p className="mt-1 text-xs text-white/75">
                      Partner kreatif untuk kebutuhan branding dan pemasaran
                      digital bisnis Anda.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between py-1 lg:col-span-5 lg:pl-4">
                <div>
                  <p
                    className={`text-sm leading-relaxed md:text-base ${textSecondary}`}
                  >
                    Kami menghadirkan solusi mulai dari identitas visual, desain
                    konten, copywriting, perencanaan konten, hingga pengelolaan
                    media sosial. Setiap bisnis memiliki karakter berbeda—karena
                    itu, pendekatan kami dibuat fleksibel sesuai kebutuhan
                    brand.
                  </p>

                  <a
                    href="#cara-kerja"
                    className={`group mt-5 inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 ${accentText}`}
                  >
                    <span>Lihat cara kerja kami</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>

                <div
                  className={`mt-10 rounded-2xl border p-6 transition-colors duration-300 ${cardBg}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${accentNumber}`}
                    >
                      02 / Tantangan Bisnis
                    </span>
                    <span className={`text-xs ${textMuted}`}>
                      Media sosial aktif saja belum cukup
                    </span>
                  </div>

                  <p
                    className={`mb-5 text-sm font-medium ${
                      isDark ? "text-white/90" : "text-slate-800"
                    }`}
                  >
                    Brand membutuhkan konten yang terarah, konsisten, dan
                    relevan dengan audiens:
                  </p>

                  <div
                    className={`divide-y ${
                      isDark ? "divide-white/10" : "divide-slate-200"
                    }`}
                  >
                    {PAIN_POINTS.map((item) => (
                      <div
                        key={item.number}
                        className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                      >
                        <span
                          className={`mt-0.5 rounded-md px-2 py-0.5 text-xs font-semibold ${
                            isDark
                              ? "bg-pink-500/15 text-pink-300"
                              : "bg-rose-100 text-[#D91B5C]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <div>
                          <h3 className={`text-sm font-medium ${textPrimary}`}>
                            {item.title}
                          </h3>
                          <p
                            className={`mt-0.5 text-xs leading-relaxed ${textMuted}`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p
                    className={`mt-5 border-t pt-4 text-xs leading-relaxed ${dividerBorder} ${accentText}`}
                  >
                    ✦ VILEA membantu menyederhanakan proses kreatif agar bisnis
                    bisa lebih fokus pada pelanggan dan pertumbuhan.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ====================================================
            SECTION 2 — LAYANAN KAMI
        ==================================================== */}
        <section
          id="layanan"
          className="mx-auto max-w-[1360px] px-6 py-24 md:px-10"
        >
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <PillBadge isDark={isDark}>03 / Layanan Kami</PillBadge>
                <h2
                  className={`mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl ${textPrimary}`}
                >
                  Solusi kreatif dalam
                  <br />
                  satu partner
                </h2>
              </div>

              <p className={`max-w-xs text-sm leading-relaxed ${textSecondary}`}>
                Pilih layanan sesuai kebutuhan dan tahap perkembangan bisnis
                Anda.
              </p>
            </div>
          </Reveal>

          <div
            className={`relative divide-y border-b border-t ${
              isDark
                ? "divide-white/10 border-white/10"
                : "divide-slate-200 border-slate-200"
            }`}
            onMouseLeave={() => setHoveredService(null)}
          >
            {SERVICES.map((service, index) => {
              const isHovered = hoveredService === index;
              return (
                <div
                  key={service.number}
                  onMouseEnter={() => setHoveredService(index)}
                  onClick={() =>
                    setHoveredService(hoveredService === index ? null : index)
                  }
                  className="group relative flex cursor-pointer flex-col justify-between gap-4 py-8 transition-colors md:flex-row md:items-center md:py-10"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span
                      className={`w-8 text-sm font-semibold transition-colors ${accentNumber}`}
                    >
                      {service.number}
                    </span>
                    <div>
                      <h3
                        className={`text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 md:text-2xl ${textPrimary}`}
                      >
                        {service.title}
                      </h3>
                      <span
                        className={`mt-1 inline-block text-[11px] ${textMuted}`}
                      >
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className={`pointer-events-none z-20 hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isHovered
                        ? "scale-100 opacity-100 -rotate-6"
                        : "scale-90 opacity-0 rotate-0"
                    }`}
                  >
                    <div className="relative h-44 w-72 overflow-hidden rounded-2xl border border-pink-400/30 bg-[#070913] shadow-[0_25px_60px_rgba(225,29,72,0.3)]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(225,29,72,0.32) 0%, rgba(3,7,18,0.45) 100%)",
                        }}
                      />
                    </div>
                  </div>

                  <p
                    className={`max-w-sm text-sm leading-relaxed transition-colors md:text-right ${textSecondary}`}
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Reveal delay={140}>
            <div
              className={`mt-6 flex items-center justify-between rounded-xl border px-5 py-3.5 text-xs ${
                isDark
                  ? "border-pink-500/20 bg-pink-500/[0.05] text-pink-200/85"
                  : "border-rose-200 bg-rose-50/80 text-rose-900"
              }`}
            >
              <span>
                ✦ <strong>Digital Ads & Campaign:</strong> Dapat ditawarkan
                sebagai layanan tambahan sesuai kebutuhan dan anggaran klien.
              </span>
              <a
                href="#kontak"
                className={`shrink-0 font-semibold underline ${accentText}`}
              >
                Tanya Ads →
              </a>
            </div>
          </Reveal>
        </section>

        {/* ====================================================
            SECTION 3 — KENAPA PILIH VILEA (BENTO GRID)
        ==================================================== */}
        <section
          id="keunggulan"
          className="mx-auto max-w-[1360px] px-6 py-24 md:px-10"
        >
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <PillBadge isDark={isDark}>04 / Kenapa Pilih Vilea</PillBadge>
                <h2
                  className={`mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl ${textPrimary}`}
                >
                  Kreatif, terarah,
                  <br />
                  dan terjangkau
                </h2>
              </div>

              <p className={`max-w-xs text-sm leading-relaxed ${textSecondary}`}>
                Kami ingin menjadi partner yang membantu bisnis membangun
                kehadiran digital secara konsisten.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div
                className={`flex h-full flex-col justify-between rounded-2xl border p-6 transition-colors duration-300 ${cardBg}`}
              >
                <div>
                  <div
                    className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      isDark
                        ? "bg-pink-500/15 text-pink-400"
                        : "bg-rose-100 text-[#D91B5C]"
                    }`}
                  >
                    ✓
                  </div>
                  <h3
                    className={`mb-2 text-xl font-medium tracking-tight ${textPrimary}`}
                  >
                    Kreatif & profesional
                  </h3>
                  <p className={`text-sm leading-relaxed ${textSecondary}`}>
                    Visual dan konten mengikuti karakter brand. Dipadukan dengan{" "}
                    <strong className={textPrimary}>
                      layanan terintegrasi
                    </strong>{" "}
                    mulai dari identitas visual hingga pengelolaan media sosial.
                  </p>
                </div>

                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={IMAGES.bentoCreative}
                    alt="Kreatif dan profesional"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(225,29,72,0.38) 0%, transparent 50%, rgba(244,114,182,0.35) 100%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/65 px-3.5 py-2 text-xs backdrop-blur-md">
                    <span className="font-medium text-white">
                      ✓ Layanan terintegrasi
                    </span>
                    <span className="text-pink-300">End-to-End</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-5 lg:col-span-7">
              <Reveal delay={100}>
                <div
                  className={`flex flex-col items-start justify-between gap-6 rounded-2xl border p-6 transition-colors duration-300 sm:flex-row sm:items-center ${cardBg}`}
                >
                  <div className="flex flex-col justify-between">
                    <div
                      className={`mb-2 inline-flex items-center gap-2 text-xs font-medium ${accentText}`}
                    >
                      <span>✓ Harga ramah UMKM</span>
                      <span>•</span>
                      <span>✓ Partner fleksibel</span>
                    </div>
                    <h3 className={`text-lg font-medium ${textPrimary}`}>
                      Pilihan paket terjangkau & sesuai kebutuhan bisnis
                    </h3>
                    <p
                      className={`mt-1 max-w-md text-xs leading-relaxed ${textMuted}`}
                    >
                      Layanan dapat disesuaikan dengan tahap perkembangan bisnis
                      Anda tanpa membebani operasional.
                    </p>

                    <div className="mt-6 flex items-center gap-10">
                      <div>
                        <p
                          className={`text-2xl font-semibold tracking-tight md:text-3xl ${textPrimary}`}
                        >
                          Rp299rb
                        </p>
                        <p className={`mt-0.5 text-xs ${textMuted}`}>
                          Mulai dari / bulan
                        </p>
                      </div>

                      <div>
                        <p
                          className={`text-2xl font-semibold tracking-tight md:text-3xl ${accentNumber}`}
                        >
                          3 Paket
                        </p>
                        <p className={`mt-0.5 text-xs ${textMuted}`}>
                          Starter, Growth & Premium
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 sm:w-52">
                    <img
                      src={IMAGES.bentoTeam}
                      alt="Partner UMKM"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(225,29,72,0.35), rgba(3,7,18,0.4))",
                      }}
                    />
                  </div>
                </div>
              </Reveal>

              <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                <Reveal delay={160}>
                  <div
                    className={`flex h-full min-h-[220px] flex-col justify-between rounded-2xl border p-6 transition-colors duration-300 ${cardBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${textSecondary}`}>
                        Konten lebih terarah
                      </span>
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          isDark
                            ? "bg-pink-500/15 text-pink-400"
                            : "bg-rose-100 text-[#D91B5C]"
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                    <div>
                      <p
                        className={`text-3xl font-medium tracking-tight ${textPrimary}`}
                      >
                        Terjadwal
                      </p>
                      <p
                        className={`mt-1.5 text-xs leading-relaxed ${textMuted}`}
                      >
                        Kalender konten bulanan membantu menjaga konsistensi
                        publikasi brand Anda.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={220}>
                  <div
                    className={`flex h-full min-h-[220px] flex-col justify-between rounded-2xl border p-6 transition-colors duration-300 ${cardBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${textSecondary}`}>
                        Evaluasi performa
                      </span>
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          isDark
                            ? "bg-pink-500/15 text-pink-400"
                            : "bg-rose-100 text-[#D91B5C]"
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                    <div>
                      <p
                        className={`text-3xl font-medium tracking-tight ${textPrimary}`}
                      >
                        Laporan
                      </p>
                      <p
                        className={`mt-1.5 text-xs leading-relaxed ${textMuted}`}
                      >
                        Laporan bulanan membantu memahami hasil konten dan arah
                        pengembangan berikutnya.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            SECTION 4 — CARA KERJA
        ==================================================== */}
        <section
          id="cara-kerja"
          className="mx-auto max-w-[1360px] px-6 py-24 md:px-10"
        >
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <PillBadge isDark={isDark}>05 / Cara Kerja</PillBadge>
                <h2
                  className={`mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl ${textPrimary}`}
                >
                  Proses kerja yang
                  <br />
                  sederhana dan jelas
                </h2>
              </div>

              <p className={`max-w-xs text-sm leading-relaxed ${textSecondary}`}>
                Dari memahami kebutuhan sampai evaluasi konten bulanan.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WORKFLOW_STEPS.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 70}>
                <div
                  className={`group flex min-h-[235px] flex-col justify-between rounded-2xl border p-6 transition-all ${cardBg} ${
                    isDark
                      ? "hover:border-pink-500/35 hover:bg-[#0b0e1b]"
                      : "hover:border-rose-300 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-3xl font-medium tracking-tight transition-colors group-hover:text-[#E11D48] ${textPrimary}`}
                    >
                      {step.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#E11D48]/50 transition-transform group-hover:scale-125 group-hover:bg-[#E11D48]" />
                  </div>

                  <div>
                    <h3 className={`mb-2 text-base font-medium ${textPrimary}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${textMuted}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-col items-start gap-8 pt-4 md:flex-row md:items-center">
              <p
                className={`shrink-0 text-xs leading-snug md:text-sm ${textSecondary}`}
              >
                Output kreatif yang
                <br />
                kami kerjakan
              </p>

              <div className="relative flex-1 overflow-hidden">
                <div
                  className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent ${
                    isDark ? "from-[#030712]" : "from-[#FAFAFC]"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent ${
                    isDark ? "from-[#030712]" : "from-[#FAFAFC]"
                  }`}
                />

                <div className="animate-marquee-x flex items-center gap-10 py-2">
                  {[...Array(2)].map((_, groupIdx) => (
                    <div
                      key={groupIdx}
                      className={`flex shrink-0 items-center gap-10 text-sm font-medium ${textSecondary}`}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#E11D48]" />
                        Single Post Design
                      </span>
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#F472B6]" />
                        Carousel Interaktif (Maks. 5 Slide)
                      </span>
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#E11D48]" />
                        Instagram Story
                      </span>
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#F472B6]" />
                        Reels & Short Video (Maks. 30 Detik)
                      </span>
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#E11D48]" />
                        Copywriting & Kalender Konten
                      </span>
                      <span className="inline-flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#F472B6]" />
                        Logo & Visual Identity
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ====================================================
            SECTION 5 — PAKET LAYANAN
        ==================================================== */}
        <section
          id="paket"
          className="relative mx-auto max-w-[1360px] px-6 py-24 md:px-10"
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full blur-[140px] ${
              isDark ? "bg-[#E11D48]/15" : "bg-rose-300/30"
            }`}
          />

          <Reveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <PillBadge isDark={isDark}>06 / Paket Layanan</PillBadge>
              <h2
                className={`mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl ${textPrimary}`}
              >
                Pilih paket yang
                <br />
                sesuai kebutuhan
              </h2>
              <p className={`mt-4 text-sm md:text-base ${textSecondary}`}>
                Harga bulanan untuk membantu bisnis menjaga konten tetap
                konsisten.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier, idx) => {
              const isSelected = selectedPackage === tier.id;
              return (
                <Reveal key={tier.name} delay={idx * 100}>
                  <div
                    className={`relative flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${
                      tier.popular
                        ? isDark
                          ? "border-2 border-[#E11D48] bg-gradient-to-b from-[#1a0b14] via-[#070913] to-[#070913] shadow-[0_20px_60px_rgba(225,29,72,0.22)]"
                          : "border-2 border-[#E11D48] bg-gradient-to-b from-rose-50/90 via-white to-white shadow-[0_20px_50px_rgba(225,29,72,0.14)]"
                        : `${cardBg} hover:border-rose-300`
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#F43F5E] px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
                        PALING POPULER
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText}`}
                        >
                          {tier.name}
                        </span>
                        {isSelected && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                              isDark
                                ? "bg-pink-500/20 text-pink-300"
                                : "bg-rose-100 text-[#D91B5C]"
                            }`}
                          >
                            Dipilih
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span
                          className={`text-4xl font-semibold tracking-tight md:text-[2.65rem] ${textPrimary}`}
                        >
                          {tier.price}
                        </span>
                        <span className={`text-sm ${textMuted}`}>
                          {tier.period}
                        </span>
                      </div>

                      <p className={`mt-2 text-sm ${textSecondary}`}>
                        {tier.subtitle}
                      </p>

                      <div
                        className={`my-6 h-px w-full ${
                          isDark ? "bg-white/10" : "bg-slate-200"
                        }`}
                      />

                      <ul
                        className={`space-y-3.5 text-sm ${
                          isDark ? "text-white/80" : "text-slate-700"
                        }`}
                      >
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                                isDark
                                  ? "bg-pink-500/15 text-pink-400"
                                  : "bg-rose-100 text-[#D91B5C]"
                              }`}
                            >
                              •
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4">
                      <button
                        type="button"
                        onClick={() => handleSelectPackage(tier.id)}
                        className={`w-full rounded-full py-3.5 text-sm font-medium transition-all duration-300 active:scale-95 ${
                          tier.popular
                            ? "bg-gradient-to-r from-[#D91B5C] to-[#F43F5E] text-white shadow-[0_10px_25px_rgba(225,29,72,0.3)] hover:brightness-110"
                            : isDark
                            ? "bg-white text-black hover:bg-pink-50"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        Pilih Paket {tier.name}
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            SECTION 6 — KETENTUAN PAKET
        ==================================================== */}
        <section
          id="ketentuan"
          className="mx-auto max-w-[1160px] px-6 py-24 md:px-10"
        >
          <Reveal>
            <div className="mb-14 text-center">
              <PillBadge isDark={isDark}>07 / Ketentuan Paket</PillBadge>
              <h2
                className={`mt-4 text-4xl font-medium tracking-[-0.03em] md:text-5xl ${textPrimary}`}
              >
                Ekspektasi jelas, kerja sama nyaman
              </h2>
              <p className={`mx-auto mt-3 max-w-lg text-sm ${textMuted}`}>
                Ketentuan berikut membantu menjaga alur kerja dan hasil tetap
                sesuai kesepakatan.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {PACKAGE_TERMS.map((item, idx) => {
              const isOpen = openTerm === idx;
              return (
                <Reveal key={item.q} delay={idx * 60}>
                  <div
                    className={`overflow-hidden rounded-xl border transition-colors ${cardBg} hover:border-rose-400/40`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenTerm(isOpen ? null : idx)}
                      className={`flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium md:text-base ${textPrimary}`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={`ml-4 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base font-light transition-transform duration-300 ${
                          isDark
                            ? "bg-white/[0.06] text-pink-300"
                            : "bg-rose-50 text-[#D91B5C]"
                        } ${isOpen ? "rotate-45" : "rotate-0"}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`px-6 pb-5 text-sm leading-relaxed ${textMuted}`}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        

        {/* ====================================================
            SECTION 8 — LET'S BUILD YOUR BRAND (CTA)
        ==================================================== */}
        <section
          id="kontak"
          className="relative flex w-full items-center justify-center overflow-hidden px-6 py-28 md:py-36"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src={IMAGES.ctaBg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover scale-110 blur-[2px] saturate-150 filter"
            />
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? "linear-gradient(115deg, rgba(159,18,57,0.68) 0%, rgba(3,7,18,0.78) 50%, rgba(244,114,182,0.45) 100%)"
                  : "linear-gradient(115deg, rgba(225,29,72,0.18) 0%, rgba(250,250,252,0.88) 50%, rgba(244,114,182,0.25) 100%)",
              }}
            />
            <div
              className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent ${
                isDark ? "from-[#030712]" : "from-[#FAFAFC]"
              }`}
            />
            <div
              className={`absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t to-transparent ${
                isDark ? "from-[#030712]" : "from-[#FAFAFC]"
              }`}
            />
          </div>

          <Reveal className="relative z-10 mx-auto w-full max-w-4xl">
            <div
              className={`rounded-3xl border p-8 backdrop-blur-2xl transition-colors duration-300 md:p-12 ${
                isDark
                  ? "border-white/15 bg-[#070913]/85 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
                  : "border-slate-200/90 bg-white/90 shadow-[0_25px_80px_rgba(15,23,42,0.1)]"
              }`}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <PillBadge isDark={isDark}>
                      08 / LET&apos;S BUILD YOUR BRAND
                    </PillBadge>
                    <h2
                      className={`mt-4 text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl ${textPrimary}`}
                    >
                      Siap mengembangkan kehadiran digital bisnis Anda?
                    </h2>
                    <p
                      className={`mt-4 text-sm leading-relaxed ${textSecondary}`}
                    >
                      Diskusikan kebutuhan branding dan media sosial Anda
                      bersama VILEA. Kami siap membantu menemukan solusi kreatif
                      yang sesuai dengan tujuan bisnis.
                    </p>
                  </div>

                  <div
                    className={`mt-8 space-y-2 border-t pt-6 text-xs ${dividerBorder} ${textSecondary}`}
                  >
                    <p
                      className={`font-semibold uppercase tracking-wider ${accentText}`}
                    >
                      PT VILEA KREASI INDONESIA
                    </p>
                    <p>📍 Depok, Jawa Barat, Indonesia</p>
                    <p>💬 Konsultasi Gratis untuk UMKM & Bisnis Berkembang</p>
                  </div>
                </div>

                <div
                  className={`rounded-2xl border p-6 lg:col-span-6 ${
                    isDark
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-slate-200/80 bg-slate-50/70"
                  }`}
                >
                  <h3 className={`text-base font-medium ${textPrimary}`}>
                    Mulai Diskusi via WhatsApp
                  </h3>
                  <p className={`mt-1 text-xs ${textMuted}`}>
                    Isi singkat kebutuhan Anda untuk membuat pesan konsultasi
                    otomatis:
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        className={`mb-1.5 block text-xs ${textSecondary}`}
                      >
                        Nama Brand / Bisnis Anda
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Contoh: Kopi Senja Depok"
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:border-[#E11D48] focus:outline-none ${
                          isDark
                            ? "border-white/15 bg-[#030712] text-white placeholder-white/35"
                            : "border-slate-200 bg-white text-slate-900 placeholder-slate-400"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`mb-1.5 block text-xs ${textSecondary}`}
                      >
                        Paket / Layanan Pilihan
                      </label>
                      <select
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:border-[#E11D48] focus:outline-none ${
                          isDark
                            ? "border-white/15 bg-[#030712] text-white"
                            : "border-slate-200 bg-white text-slate-900"
                        }`}
                      >
                        <option value="Starter (Rp299.000/bulan)">
                          Paket STARTER — Rp299.000 / bulan
                        </option>
                        <option value="Growth (Rp499.000/bulan)">
                          Paket GROWTH — Rp499.000 / bulan (Paling Populer)
                        </option>
                        <option value="Premium (Rp699.000/bulan)">
                          Paket PREMIUM — Rp699.000 / bulan
                        </option>
                        <option value="Branding & Logo Design">
                          Layanan Branding & Logo Design
                        </option>
                        <option value="Digital Ads & Campaign">
                          Layanan Digital Ads & Campaign
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`mb-1.5 block text-xs ${textSecondary}`}
                      >
                        Catatan Tambahan (Opsional)
                      </label>
                      <textarea
                        rows={2}
                        value={businessNeeds}
                        onChange={(e) => setBusinessNeeds(e.target.value)}
                        placeholder="Target audiens, link IG saat ini, atau kebutuhan khusus..."
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:border-[#E11D48] focus:outline-none ${
                          isDark
                            ? "border-white/15 bg-[#030712] text-white placeholder-white/35"
                            : "border-slate-200 bg-white text-slate-900 placeholder-slate-400"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          buildWhatsAppMessage()
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D91B5C] to-[#F43F5E] px-5 py-3 text-xs font-medium text-white shadow-[0_10px_25px_rgba(225,29,72,0.3)] transition-all hover:brightness-110 md:text-sm"
                      >
                        <span>Kirim ke WhatsApp</span>
                        <span aria-hidden="true">↗</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className={`inline-flex items-center justify-center rounded-full border px-4 py-3 text-xs font-medium transition-colors ${
                          isDark
                            ? "border-white/15 bg-white/[0.06] text-white hover:bg-white/15"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {copiedBrief ? "✓ Pesan Disalin" : "Salin Pesan"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ====================================================
            FOOTER
        ==================================================== */}
        <footer
          className={`px-6 pb-12 pt-16 transition-colors duration-300 md:px-10 ${
            isDark ? "bg-[#030712]" : "bg-[#FAFAFC]"
          }`}
        >
          <div className="mx-auto max-w-[1360px]">
            <div
              className={`flex flex-col justify-between gap-12 border-b pb-16 md:flex-row ${dividerBorder}`}
            >
              <div className="max-w-sm">
                <a href="#" aria-label="VILEA Beranda">
                  <VileaLogo size="lg" showLegal isDark={isDark} />
                </a>
                <p
                  className={`mb-6 mt-4 text-sm leading-relaxed ${textSecondary}`}
                >
                  Social media & creative agency berbasis di Depok, Jawa Barat.
                  Membantu UMKM dan berbagai jenis bisnis membangun identitas
                  brand yang kuat, menarik, dan profesional.
                </p>

                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-pink-200/85"
                      : "border-rose-200 bg-rose-50 text-[#D91B5C]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#E11D48]" />
                  Your Brand, Our Creativity.
                </div>
              </div>

              <div className="flex flex-wrap gap-14 sm:gap-24">
                <div>
                  <h3 className={`mb-4 text-sm font-medium ${textPrimary}`}>
                    Navigasi
                  </h3>
                  <ul className={`space-y-3 text-sm ${textSecondary}`}>
                    <li>
                      <a
                        href="#tentang"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Tentang Kami
                      </a>
                    </li>
                    <li>
                      <a
                        href="#layanan"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Layanan Kami
                      </a>
                    </li>
                    <li>
                      <a
                        href="#keunggulan"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Kenapa Pilih Vilea
                      </a>
                    </li>
                    <li>
                      <a
                        href="#cara-kerja"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Cara Kerja
                      </a>
                    </li>
                    <li>
                      <a
                        href="#paket"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Paket Layanan
                      </a>
                    </li>
                    <li>
                      <a
                        href="#ketentuan"
                        className="transition-colors hover:text-[#E11D48]"
                      >
                        Ketentuan Paket
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`mb-4 text-sm font-medium ${textPrimary}`}>
                    Kontak & Lokasi
                  </h3>
                  <div className={`space-y-2.5 text-sm ${textSecondary}`}>
                    <p className={`font-medium ${textPrimary}`}>
                      PT Vilea Kreasi Indonesia
                    </p>
                    <p>Social Media & Creative Agency</p>
                    <p>Depok, Jawa Barat, Indonesia</p>
                    <a
                      href="#kontak"
                      className={`block pt-1 underline transition-colors ${accentText}`}
                    >
                      Mulai Konsultasi WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row ${textMuted}`}
            >
              <p>
                © {new Date().getFullYear()} PT Vilea Kreasi Indonesia. All
                rights reserved.
              </p>
              <p className="uppercase tracking-[0.16em]">
                VILEA | YOUR BRAND, OUR CREATIVITY
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
