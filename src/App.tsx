/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Clock, 
  Info,
  ChevronRight,
  Menu,
  Sliders,
  CheckCircle,
  FileText
} from "lucide-react";
import { ProfileData, ContactMessage, Theme } from "./types";
import { THEMES, INITIAL_PROFILE } from "./data";
import { ProfileCard } from "./components/ProfileCard";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { SkillsGrid } from "./components/SkillsGrid";
import { ContactSection } from "./components/ContactSection";
import { PortfolioEditor } from "./components/PortfolioEditor";
import { PrintResume } from "./components/PrintResume";

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("mahasiswa_portfolio_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback if JSON format is modified/broken
      }
    }
    return INITIAL_PROFILE;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("mahasiswa_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Seed 1 default exciting message
    return [
      {
        id: "msg_seed_1",
        senderName: "Hendra Wijaya (HR RuangTekno)",
        senderEmail: "hendra.recruitment@ruangtekno.id",
        message: "Halo Bagas! Kami sangat tertarik dengan rancangan proyek EduPlan buatanmu. Kami sedang membuka registrasi magang berbayar untuk posisi Frontend Web Developer. Silakan kirimkan CV format cetak milikmu ke email kami untuk jadwal wawancara teknis!",
        timestamp: "21 Mei 2026, 10:15 WIB"
      }
    ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("11:23:25 UTC");

  // Keep localStorage in sync with changes
  useEffect(() => {
    localStorage.setItem("mahasiswa_portfolio_data", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("mahasiswa_messages", JSON.stringify(messages));
  }, [messages]);

  // Keep a clean clock on screen
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const stringified = now.toUTCString().replace("GMT", "UTC");
      // Pick standard formats
      setCurrentTime(now.toLocaleTimeString("id-ID") + " WIB");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateProfile = (updatedData: Partial<ProfileData>) => {
    setProfile(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleResetDefaults = () => {
    if (confirm("Apakah Anda yakin ingin memulihkan semua data bawaan Portofolio Bagas Praditya? Perubahan kustom Anda akan terhapus.")) {
      setProfile(INITIAL_PROFILE);
      setIsEditing(false);
    }
  };

  const handleImportJSON = (imported: ProfileData) => {
    setProfile(imported);
    setIsEditing(false);
  };

  const handleSendMessage = (msg: Omit<ContactMessage, "id" | "timestamp">) => {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      timestamp: formatter.format(new Date()) + " WIB"
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const handleClearMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Triggers downloading the config file
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.name.toLowerCase().replace(/\s+/g, "_")}_portfolio_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Find corresponding active theme or fallback
  const activeTheme = THEMES.find(t => t.id === profile.themeId) || THEMES[0];

  // Render ATS Minimalist CV directly if activated
  if (isPrintMode) {
    return (
      <PrintResume 
        profile={profile} 
        onBack={() => setIsPrintMode(false)} 
      />
    );
  }

  return (
    <div id="cv-export-area" className={`min-h-screen ${activeTheme.bg} transition-colors duration-500 font-sans pb-16 relative overflow-hidden`}>
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full h-full">
        {/* Top Professional Banner Header */}
        <header className={`border-b ${activeTheme.borderColor} mb-6 bg-transparent pb-8`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-zinc-900 border ${activeTheme.borderColor} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                FR
              </div>
              
              <div className="text-left flex flex-col gap-1">
                <span className={`flex items-center gap-1.5 ${activeTheme.textSecondary}`}>
                  <span>Portfolio // 2024</span>
                </span>
                <h1 className={`text-2xl font-bold tracking-tight italic text-white leading-tight`}>
                  {profile.name}
                </h1>
              </div>
            </div>

            {/* Quick Header Utilities */}
            <div className="flex items-center gap-8 text-[11px] tracking-widest uppercase font-semibold text-zinc-400">
              <div className="hidden md:flex items-center gap-1.5">
                <span>{currentTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Primary Layout Container Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR PANEL: Profile Info (Always Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-6">
            <ProfileCard 
              profile={profile} 
              activeTheme={activeTheme}
              onEditToggle={() => setIsEditing(!isEditing)}
              isEditing={isEditing}
              onPrintMode={() => setIsPrintMode(true)}
              onDownloadJSON={handleDownloadJSON}
            />
          </div>

          {/* RIGHT VIEWPORT PANEL: Customizer OR Standard dynamic sections */}
          <div className="lg:col-span-8 space-y-6">
            {isEditing ? (
              <PortfolioEditor
                profile={profile}
                activeTheme={activeTheme}
                onUpdateProfile={handleUpdateProfile}
                onResetDefaults={handleResetDefaults}
                onImportJSON={handleImportJSON}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-6">
                
                {/* Introduction greeting or banner */}
                <div className={`p-6 ${activeTheme.cardBg} border ${activeTheme.borderColor} relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5`}>
                  <div className="space-y-1 md:max-w-md">
                    <div className="flex items-baseline gap-4 mb-2">
                       <span className="text-zinc-600 font-mono text-sm">01.</span>
                       <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase font-black tracking-tighter leading-[0.85] text-white">
                         Creative
                       </h2>
                    </div>
                    <div className="flex items-baseline gap-4 mb-4">
                       <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase font-black tracking-tighter leading-[0.85] text-white">
                         Designer
                       </h2>
                       <span className="text-zinc-600 font-mono text-sm">[{profile.major}]</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">
                      Saya adalah mahasiswa <strong className="text-white">{profile.major}</strong> di <strong className="text-white">{profile.university}</strong>. Di sini Anda dapat melihat katalog proyek dan kompetensi teknis saya.
                    </p>
                  </div>

                  <button 
                    id="intro-btn-edit"
                    onClick={() => setIsEditing(true)}
                    className={`py-2 px-4 rounded text-xs font-bold text-white bg-zinc-900 border border-zinc-700 hover:border-white transition-colors cursor-pointer w-full md:w-auto text-center font-mono uppercase tracking-widest`}
                  >
                    Edit
                  </button>
                </div>

                {/* Grid layout of showcase items */}
                <ProjectsSection projects={profile.projects} activeTheme={activeTheme} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-1">
                    <SkillsGrid skills={profile.skills} activeTheme={activeTheme} />
                  </div>
                  <div className="md:col-span-1">
                    <ExperienceTimeline 
                      education={profile.education} 
                      experiences={profile.experiences} 
                      activeTheme={activeTheme} 
                    />
                  </div>
                </div>

                <ContactSection 
                  activeTheme={activeTheme}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onClearMessage={handleClearMessage}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Footer Accent */}
      <footer className="mt-16 border-t border-zinc-800 pt-8 items-end max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-8">
          <span>Portofolio // 2024</span>
          <span>Crafted with React & Tailwind CSS</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
