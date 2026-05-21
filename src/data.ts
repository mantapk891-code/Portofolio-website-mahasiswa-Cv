/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme, ProfileData } from "./types";

export const THEMES: Theme[] = [
  {
    id: "midnight-slate",
    name: "Bold Typography (Zinc)",
    bg: "bg-zinc-950 text-white",
    cardBg: "bg-zinc-950 border border-zinc-800",
    borderColor: "border-zinc-800",
    textPrimary: "text-white font-black tracking-tighter uppercase",
    textSecondary: "text-zinc-500 tracking-[0.3em] uppercase text-[10px] font-bold",
    accent: "blue-600",
    accentBg: "bg-blue-600/10 text-blue-400",
    accentText: "text-blue-400",
    accentBorder: "border-zinc-800",
    isDark: true
  },
  {
    id: "warm-cream",
    name: "Warm Minimalist (Light)",
    bg: "bg-[#fcfaf2] text-[#2d2d2a]",
    cardBg: "bg-white/90 shadow-sm border border-orange-100",
    borderColor: "border-orange-100",
    textPrimary: "text-[#222521]",
    textSecondary: "text-[#625f54]",
    accent: "orange-600",
    accentBg: "bg-orange-50 text-orange-700 border border-orange-100",
    accentText: "text-orange-600",
    accentBorder: "border-orange-500/30",
    isDark: false
  },
  {
    id: "royal-blue",
    name: "Academic Prestige",
    bg: "bg-[#f8fafc] text-[#1e293b]",
    cardBg: "bg-[#ffffff] shadow-sm border border-slate-100",
    borderColor: "border-slate-100",
    textPrimary: "text-[#0f172a]",
    textSecondary: "text-[#475569]",
    accent: "blue-600",
    accentBg: "bg-blue-50 text-blue-700 border border-blue-100",
    accentText: "text-blue-600",
    accentBorder: "border-blue-500/30",
    isDark: false
  },
  {
    id: "dark-nebula",
    name: "Cosmic Indigo (Dark)",
    bg: "bg-[#0c0a21] text-[#e0e0fc]",
    cardBg: "bg-[#141235]/90 backdrop-blur-md border border-[#2b2767]/30",
    borderColor: "border-[#252254]",
    textPrimary: "text-[#f1f1ff]",
    textSecondary: "text-[#9b9bc8]",
    accent: "violet-500",
    accentBg: "bg-violet-950/40 text-violet-300",
    accentText: "text-violet-400",
    accentBorder: "border-violet-500/30",
    isDark: true
  }
];

export const INITIAL_PROFILE: ProfileData = {
  name: "Bagas Praditya",
  role: "Informatics & AI Enthusiast",
  university: "Universitas Gadjah Mada",
  major: "Teknik Informatika",
  semester: 6,
  gpa: "3.88",
  sks: 114,
  email: "bagas.praditya@mail.ugm.ac.id",
  linkedin: "linkedin.com/in/bagaspraditya",
  github: "github.com/bagaspraditya",
  avatarSeed: "bagas_ugm",
  photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80",
  bio: "Mahasiswa tahun ketiga S1 Teknik Informatika yang berfokus pada pengembangan website interaktif, Rekayasa Perangkat Lunak, dan Kecerdasan Buatan. Aktif di unit riset mahasiswa serta berpengalaman membangun sistem berbasis React.",
  projects: [
    {
      id: "proj_1",
      title: "EduPlan - AI Study Scheduler",
      description: "Sistem penjadwalan kuliah dan belajar mandiri adaptif untuk mahasiswa menggunakan estimasi beban SKS dan target lulus cepat.",
      tags: ["React", "TypeScript", "Tailwind", "LocalStorage"],
      category: "Web Dev",
      liveUrl: "https://eduplan-ugm.example.com",
      githubUrl: "https://github.com/bagaspraditya/eduplan-ai",
      status: "Selesai"
    },
    {
      id: "proj_2",
      title: "PeduliKampus Platform",
      description: "Aplikasi mobile-first untuk mahasiswa guna melaporkan kerusakan sarana prasarana kampus agar cepat ditanggapi oleh pengelola fakultas.",
      tags: ["React Native", "Tailwind", "Express", "Node.js"],
      category: "Mobile Core",
      liveUrl: "",
      githubUrl: "https://github.com/bagaspraditya/peduli-kampus",
      status: "Selesai"
    },
    {
      id: "proj_3",
      title: "Klasifikasi Citra Sampah Organik",
      description: "Model Deep Learning (CNN) berbasis TensorFlow untuk mengklasifikasikan jenis sampah kantin guna mendukung inisiatif Zero-Waste di kampus.",
      tags: ["Python", "TensorFlow", "Keras", "OpenCV"],
      category: "AI & Data Science",
      liveUrl: "https://huggingface.co/spaces/bagas/garbage-classifier",
      githubUrl: "https://github.com/bagaspraditya/trash-classifier",
      status: "Selesai"
    },
    {
      id: "proj_4",
      title: "Re-Design SIAKAD Portal",
      description: "Desain purwarupa (high-fidelity prototype) berorientasi pengguna untuk Sistem Informasi Akademik yang lebih cepat dan bebas stres saat pengisian KRS.",
      tags: ["Figma", "UI/UX", "User Research", "Prototyping"],
      category: "UI/UX Design",
      liveUrl: "https://figma.com/file/siakad-redesign-ugm",
      githubUrl: "",
      status: "Dalam Pengembangan"
    }
  ],
  education: [
    {
      id: "edu_1",
      degree: "S1 Teknik Informatika (Bachelor of Computer Science)",
      institution: "Universitas Gadjah Mada",
      gpa: "3.88 / 4.00",
      startYear: "2023",
      endYear: "Sekarang",
      notes: "Aktif di Kelompok Studi Linux (KSL) dan asisten praktikum Algoritma & Pemrograman."
    },
    {
      id: "edu_2",
      degree: "Peminatan Matematika & Ilmu Alam (MIPA)",
      institution: "SMA SMAN 1 Yogyakarta",
      gpa: "92.5 / 100",
      startYear: "2020",
      endYear: "2023",
      notes: "Perwakilan Olimpiade Komputer tingkat Kota, lulus peringkat 5 umum."
    }
  ],
  experiences: [
    {
      id: "exp_1",
      role: "Frontend Engineer Intern (Magang)",
      company: "RuangTekno Indonesia",
      period: "Februari 2025 - Sekarang",
      description: "Berkontribusi dalam pengembangan dashboard analisis kemajuan belajar siswa menggunakan React dan ChartJS. Mengoptimalkan performa halaman hingga 25%."
    },
    {
      id: "exp_2",
      role: "Asisten Praktikum Pemrograman Berorientasi Objek",
      company: "Departemen Ilmu Komputer & Elektronika UGM",
      period: "Agustus 2024 - Desember 2024",
      description: "Mengajar konsep OOP berbasis Java kepada 40+ mahasiswa baru, memberikan penilaian tugas mingguan, serta membimbing pengerjaan proyek akhir kelas."
    },
    {
      id: "exp_3",
      role: "Kepala Divisi Media & Informasi HMTI",
      company: "Himpunan Mahasiswa Teknologi Informasi UGM",
      period: "Desember 2023 - Desember 2024",
      description: "Mengkoordinatori tim kreatif beranggotakan 12 mahasiswa dalam memproduksi konten visual, pengelolaan media sosial, dan penayangan siaran pers kegiatan."
    }
  ],
  skills: [
    { id: "sk_1", name: "JavaScript / TypeScript", level: 90, category: "Coding & Tech" },
    { id: "sk_2", name: "React / Next.js", level: 85, category: "Coding & Tech" },
    { id: "sk_3", name: "Python / Data Science", level: 75, category: "Coding & Tech" },
    { id: "sk_4", name: "Tailwind CSS & Git", level: 95, category: "Coding & Tech" },
    { id: "sk_5", name: "Figma UI/UX Prototyping", level: 85, category: "Desain & Kreatif" },
    { id: "sk_6", name: "Desain Grafis / Ilustrasi", level: 70, category: "Desain & Kreatif" },
    { id: "sk_7", name: "Bahasa Inggris (TOEFL 580)", level: 80, category: "Bahasa & Komunikasi" },
    { id: "sk_8", name: "Bahasa Jepang (Dasar)", level: 40, category: "Bahasa & Komunikasi" },
    { id: "sk_9", name: "Project Management / Agile", level: 75, category: "Metodologi & Tools" },
    { id: "sk_10", name: "Visual Studio Code & Linux", level: 90, category: "Metodologi & Tools" }
  ],
  themeId: "midnight-slate"
};
