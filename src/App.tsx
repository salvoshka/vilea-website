import React, { useState, useEffect } from 'react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const [clientName, setClientName] = useState('');
  const [clientBrand, setClientBrand] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('Starter (Rp299.000)');
  const [clientNotes, setClientNotes] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: "01",
      title: "Branding & Logo Design",
      desc: "Logo sederhana, identitas visual, dan arahan warna brand yang kuat dan mudah dikenali.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Social Media Management",
      desc: "Perencanaan, penjadwalan, dan publikasi konten konsisten untuk membangun audiens loyal.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Social Media Content",
      desc: "Desain single post, carousel interaktif (maks 5 slide), dan Instagram Story yang estetis.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "04",
      title: "Reels & Short Video",
      desc: "Video pendek kreatif berdurasi maksimal 30 detik untuk menyampaikan pesan brand secara dinamis.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "05",
      title: "Copywriting & Planning",
      desc: "Penyusunan ide konten, caption interaktif, dan kalender konten bulanan yang terarah.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "06",
      title: "Digital Ads & Campaign",
      desc: "Perencanaan kampanye dan pemantauan iklan digital untuk akselerasi pertumbuhan bisnis.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const packages = [
    {
      name: "STARTER",
      price: "Rp299.000",
      period: "/ bulan",
      desc: "Mulai dari kebutuhan konten harian yang konsisten",
      popular: false,
      features: [
        "10 desain single post",
        "5 desain carousel (maks. 5 slide)",
        "15 caption / copywriting",
        "Kalender konten bulanan",
        "1 platform media sosial",
        "Bonus laporan performa bulanan",
        "Bonus 1x revisi per materi"
      ]
    },
    {
      name: "GROWTH",
      price: "Rp499.000",
      period: "/ bulan",
      desc: "Untuk bisnis yang ingin berkembang pesat di IG",
      popular: true,
      features: [
        "Logo sederhana (sekali di awal)",
        "Setup 1 akun Instagram",
        "10 desain single post + 5 carousel",
        "5 desain Instagram Story",
        "4 Reels sederhana (maks. 30 detik)",
        "Caption & kalender konten",
        "Posting & penjadwalan Instagram",
        "Kunjungan lokasi untuk foto/video",
        "Bonus laporan & 1x revisi per materi"
      ]
    },
    {
      name: "PREMIUM",
      price: "Rp699.000",
      period: "/ bulan",
      desc: "Solusi lengkap untuk kebutuhan multi-platform",
      popular: false,
      features: [
        "Logo sederhana (sekali di awal)",
        "Setup hingga 3 akun: IG, FB Page, TikTok",
        "12 desain single post + 6 carousel",
        "10 desain Instagram Story",
        "4 Reels sederhana (maks. 30 detik)",
        "Caption & kalender konten",
        "Posting & penjadwalan platform disepakati",
        "Kunjungan lokasi untuk foto/video",
        "Bonus laporan & 1x revisi per materi"
      ]
    }
  ];

  const team = [
    {
      name: "Erik",
      role: "Creative Strategy & Growth",
      desc: "Content planning, KOL coordination, creative support, CRO, sales support."
    },
    {
      name: "Ivan",
      role: "Director & Business Advisor",
      desc: "Business direction, strategic planning, project coordination, operational support."
    },
    {
      name: "Riffa",
      role: "Lead Designer & Sales",
      desc: "Visual identity, lead sales, client relations, client visits, KOL coordination."
    },
    {
      name: "Diva",
      role: "Creative & Content Support",
      desc: "Design support, content planning support, sales support, administration."
    }
  ];

  const faqs = [
    {
      q: "Bagaimana sistem revisi materi di Vilea?",
      a: "Setiap materi mendapatkan 1x revisi sesuai brief awal. Perubahan konsep besar di luar brief awal dapat dihitung sebagai pekerjaan tambahan."
    },
    {
      q: "Apakah ada batasan untuk slide carousel dan video Reels?",
      a: "Ya, carousel maksimal 5 slide per desain dan video Reels maksimal 30 detik per video."
    },
    {
      q: "Bagaimana sistem kunjungan lokasi untuk paket Growth & Premium?",
      a: "Jadwal, cakupan lokasi, dan kebutuhan produksi disepakati terlebih dahulu. Biaya transport di luar area Depok dapat dikenakan."
    },
    {
      q: "Apakah biaya iklan digital atau talent sudah termasuk dalam paket?",
      a: "Belum. Budget iklan (Ads), talent, properti, produksi khusus, dan biaya pihak ketiga tidak termasuk dalam harga paket bulanan."
    }
  ];

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "6281288889999";
    const text = `Halo Vilea, saya ingin konsultasi & memesan layanan.\n\nNama: ${clientName || '-'}\nNama Brand: ${clientBrand || '-'}\nPaket Pilihan: ${selectedPackage}\nCatatan/Kebutuhan: ${clientNotes || '-'}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-white selection:bg-rose-600 selection:text-white font-sans">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#05070e]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold text-white tracking-tighter">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none">VILEA</span>
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-medium mt-1">Creative Agency</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#tentang" className="hover:text-white transition-colors">Tentang Kami</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#paket" className="hover:text-white transition-colors">Paket Harga</a>
            <a href="#tim" className="hover:text-white transition-colors">Tim Kami</a>
          </div>

          <a href="#kontak" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-sm font-medium text-white shadow-lg shadow-rose-600/25 hover:opacity-95 transition-all">
            Mulai Konsultasi
          </a>
        </div>
      </nav>

      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-widest text-rose-400 mb-6 backdrop-blur-md">
            <span>Depok, Jawa Barat</span>
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            <span>Social Media & Creative Agency</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            Your Brand, <span className="font-serif italic font-normal text-rose-400">Our Creativity.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Kami bantu brand Anda tampil lebih menonjol. Partner kreatif terpercaya untuk kebutuhan branding dan pemasaran digital bisnis Anda di Depok dan seluruh Indonesia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#paket" className="px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition-colors shadow-xl">
              Lihat Paket Harga
            </a>
            <a href="#kontak" className="px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md">
              Hubungi Kami via WhatsApp
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-white">Creative.</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Inovatif</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-white">Consistent.</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Terarah</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-white">Purposeful.</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Berdampak</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-24 px-6 md:px-12 border-t border-white/10 relative bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">01 / Tentang Kami</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3 mb-6 leading-tight">
              Sederhanakan proses kreatif bisnis Anda.
            </h2>
            <p className="text-gray-300 font-light leading-relaxed mb-6">
              VILEA adalah social media agency berbasis di Depok, Jawa Barat, yang membantu UMKM dan berbagai jenis bisnis membangun identitas brand yang kuat, menarik, dan profesional di dunia digital.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Kami menghadirkan solusi mulai dari identitas visual, desain konten, copywriting, perencanaan konten, hingga pengelolaan media sosial secara menyeluruh.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-bold text-rose-400 tracking-widest">01</span>
              <div className="my-8">
                <h3 className="text-lg font-medium mb-2">Konten Konsisten</h3>
                <p className="text-sm text-gray-400 font-light">Jadwal publikasi terjaga rapi tanpa mengganggu operasional bisnis.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-bold text-rose-400 tracking-widest">02</span>
              <div className="my-8">
                <h3 className="text-lg font-medium mb-2">Visual Seragam</h3>
                <p className="text-sm text-gray-400 font-light">Identitas brand kuat dan mudah dikenali oleh target audiens.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-bold text-rose-400 tracking-widest">03</span>
              <div className="my-8">
                <h3 className="text-lg font-medium mb-2">Efisiensi Tim</h3>
                <p className="text-sm text-gray-400 font-light">Ide, desain, dan caption ditangani penuh oleh tim kreatif profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">03 / Layanan Kami</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3">Solusi kreatif dalam satu partner.</h2>
            </div>
            <p className="text-gray-400 font-light max-w-md mt-4 md:mt-0 text-sm">
              Pilih layanan yang sesuai dengan kebutuhan dan tahap perkembangan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              {services.map((service, idx) => (
                <div 
                  key={service.id}
                  onMouseEnter={() => setActiveService(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${activeService === idx ? 'bg-white/10 border-rose-500/50 shadow-xl' : 'bg-[#0a0a0a] border-white/10 hover:border-white/20'}`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-rose-400">{service.id}</span>
                    <div>
                      <h3 className="text-lg font-medium text-white">{service.title}</h3>
                      <p className="text-sm text-gray-400 font-light mt-1">{service.desc}</p>
                    </div>
                  </div>
                  <span className={`text-xl transition-transform ${activeService === idx ? 'translate-x-1 text-rose-400' : 'text-gray-600'}`}>→</span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 relative h-[450px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              {services.map((service, idx) => (
                <div 
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${activeService === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <span className="text-xs font-bold text-rose-400 mb-1">LAYANAN {service.id}</span>
                    <h3 className="text-2xl font-medium text-white">{service.title}</h3>
                    <p className="text-sm text-gray-300 font-light mt-2">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="paket" className="py-24 px-6 md:px-12 border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">06 / Paket Layanan</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3 mb-4">Pilih paket sesuai kebutuhan Anda.</h2>
            <p className="text-gray-400 font-light">Harga bulanan transparan untuk membantu bisnis menjaga konten tetap konsisten dan profesional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`rounded-3xl p-8 flex flex-col justify-between border relative transition-all ${pkg.popular ? 'bg-gradient-to-b from-rose-950/30 to-[#0a0a0a] border-rose-500/50 shadow-2xl shadow-rose-950/50 scale-105 z-10' : 'bg-[#0a0a0a] border-white/10'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-600 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    Paling Populer
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-medium tracking-tight mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-400 font-light mb-6">{pkg.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                    <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">{pkg.price}</span>
                    <span className="text-sm text-gray-400">{pkg.period}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-sm text-gray-300">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="text-rose-400 font-bold">✓</span>
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#kontak"
                  onClick={() => setSelectedPackage(`${pkg.name} (${pkg.price}/bulan)`)}
                  className={`w-full py-3.5 rounded-xl text-center font-medium transition-all ${pkg.popular ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  Pilih Paket Ini
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tim" className="py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">08 / Tim Kami</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3">Tim kreatif yang saling melengkapi.</h2>
            </div>
            <p className="text-gray-400 font-light max-w-md mt-4 md:mt-0 text-sm">
              Strategi, desain, koordinasi klien, dan dukungan operasional dalam satu tim solid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-lg mb-4">
                    {member.name[0]}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{member.name}</h3>
                  <p className="text-xs font-medium text-rose-400 mb-4">{member.role}</p>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">07 / Ketentuan & FAQ</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mt-3">Ekspektasi jelas, kerja sama nyaman.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-medium text-white hover:text-rose-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`transform transition-transform ${activeFaq === idx ? 'rotate-180 text-rose-400' : 'text-gray-500'}`}>↓</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="py-24 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 to-black pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">09 / Let's Build Your Brand</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3 mb-4">Siap mengembangkan kehadiran digital bisnis Anda?</h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto">Isi formulir singkat di bawah ini untuk langsung terhubung dengan tim VILEA via WhatsApp.</p>
          </div>

          <form onSubmit={handleWhatsAppOrder} className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a] border border-white/15 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Nama Anda</label>
                <input 
                  type="text" 
                  required
                  placeholder="cth. Budi Santoso"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Nama Brand / Bisnis</label>
                <input 
                  type="text" 
                  required
                  placeholder="cth. Kopi Senja Depok"
                  value={clientBrand}
                  onChange={(e) => setClientBrand(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Pilih Paket Layanan</label>
                <select 
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-rose-500 text-sm"
                >
                  <option value="Starter (Rp299.000/bulan)">Starter - Rp299.000 / bulan</option>
                  <option value="Growth (Rp499.000/bulan)">Growth (Paling Populer) - Rp499.000 / bulan</option>
                  <option value="Premium (Rp699.000/bulan)">Premium - Rp699.000 / bulan</option>
                  <option value="Custom Branding / Lainnya">Konsultasi / Layanan Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Catatan / Kebutuhan Khusus</label>
                <input 
                  type="text" 
                  placeholder="cth. Butuh fokus di Instagram & TikTok"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium hover:opacity-95 transition-all shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              <span>Kirim Brief ke WhatsApp VILEA</span>
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-black text-xs text-gray-500 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="text-white font-semibold tracking-tight text-sm">PT VILEA KREASI INDONESIA</span>
          </div>
          <p>© 2026 Vilea Creative Agency. Depok, Jawa Barat, Indonesia.</p>
          <div className="flex gap-6">
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#paket" className="hover:text-white transition-colors">Paket</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
