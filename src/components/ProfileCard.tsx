/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Github, 
  Award, 
  BookOpen, 
  FileText, 
  Sparkles, 
  Share2, 
  CheckCircle,
  FileDown
} from "lucide-react";
import { ProfileData, Theme } from "../types";

interface ProfileCardProps {
  profile: ProfileData;
  activeTheme: Theme;
  onEditToggle: () => void;
  isEditing: boolean;
  onPrintMode: () => void;
  onDownloadJSON: () => void;
  onDownloadPDF?: () => void;
  onDownloadJPG?: () => void;
  onDownloadPNG?: () => void;
}

export function ProfileCard({ 
  profile, 
  activeTheme, 
  onEditToggle, 
  isEditing,
  onPrintMode,
  onDownloadJSON,
  onDownloadPDF,
  onDownloadJPG,
  onDownloadPNG
}: ProfileCardProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Calculate profile completeness score
  const getCompleteness = () => {
    let score = 0;
    const total = 9;
    
    if (profile.name) score += 1;
    if (profile.bio && profile.bio.length > 20) score += 1;
    if (profile.email) score += 1;
    if (profile.linkedin || profile.github) score += 1;
    if (profile.projects && profile.projects.length >= 3) score += 1;
    if (profile.education && profile.education.length >= 1) score += 1;
    if (profile.experiences && profile.experiences.length >= 2) score += 1;
    if (profile.skills && profile.skills.length >= 5) score += 1;
    if (profile.avatarSeed) score += 1;

    return Math.round((score / total) * 100);
  };

  const completeness = getCompleteness();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Simple avatar generator utilizing the seed for colors
  const stringToRGB = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "from-rose-400 to-pink-600",
      "from-orange-400 to-amber-600",
      "from-emerald-400 to-teal-600",
      "from-blue-400 to-indigo-600",
      "from-violet-400 to-fuchsia-600",
      "from-cyan-400 to-blue-600"
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const avatarGradient = stringToRGB(profile.avatarSeed || profile.name);

  // Pick leading icon based on seed length or text
  const getAvatarEmoji = () => {
    const emojis = ["🎓", "💻", "🎨", "🚀", "📝", "📊", "🧠", "✨"];
    const hash = profile.avatarSeed.length % emojis.length;
    return emojis[hash] || "🎓";
  };

  return (
    <div className={`p-6 ${activeTheme.cardBg} border-r border-zinc-800 relative overflow-hidden transition-all duration-300 group flex flex-col h-full bg-transparent`}>
      {/* Profile Header Block */}
      <div className="flex gap-4 mt-4 mb-2">
        {profile.photoUrl && (
          <div className="w-24 h-24 md:w-28 md:h-28 rounded border border-zinc-800 bg-zinc-900 overflow-hidden flex-shrink-0">
            <img src={profile.photoUrl} alt="Profil" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-col min-w-0 justify-center">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white break-words">
            {profile.name || "Nama"}
          </h1>
          
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-bold mt-1 mb-2 truncate">
            {profile.role || "Peran"}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest truncate">
            <GraduationCap size={14} className="flex-shrink-0" />
            <span className="truncate">{profile.university || "Universitas"}</span>
          </div>
          <p className="text-[9px] tracking-widest uppercase text-zinc-600 mt-1 font-mono font-medium truncate">
            {profile.major || "Program Studi"}
          </p>
        </div>
      </div>

      {/* Decorative Stats Grid */}
      <div className="grid grid-cols-3 gap-2 py-6 my-2 border-y border-zinc-800 text-left">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">IPK</span>
          <span className={`text-base font-bold text-white`}>{profile.gpa || "0.0"}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">SMS</span>
          <span className={`text-base font-bold text-white`}>{profile.semester || "-"}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">SKS</span>
          <span className={`text-base font-bold text-white`}>{profile.sks || "0"}</span>
        </div>
      </div>

      {/* Bio Description */}
      <div className="my-6 text-sm leading-relaxed text-zinc-400 flex-grow">
        <p>
          {profile.bio || "Tulis biografi singkatmu lewat panel edit profil di sebelah kanan."}
        </p>
      </div>

      {/* Profile Completeness Gauge */}
      <div className="space-y-2 mb-8 mt-4 pt-6 border-t border-zinc-800">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-1 text-zinc-500 font-bold">
            <span>Kelengkapan Profil</span>
          </div>
          <span className={`font-mono font-black text-white`}>{completeness}%</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-500`}
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* Social / Direct Contacts */}
      <div className="space-y-4 mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 border-b border-zinc-800 pb-2">
          Hubungi Saya
        </div>
        
        {profile.email && (
          <button 
            id="btn-copy-email"
            onClick={handleCopyEmail}
            className="flex items-center justify-between w-full py-2 hover:px-2 transition-all duration-200 border-b border-zinc-800 group/item text-left hover:border-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 group-hover/item:text-white transition-colors">
                <Mail size={14} />
              </span>
              <span className="truncate max-w-[150px] font-mono font-medium text-zinc-400 group-hover/item:text-white transition-colors text-xs">
                {profile.email}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover/item:text-white transition-colors">
              {copiedEmail ? "Disalin" : "Salin"}
            </span>
          </button>
        )}

        {profile.linkedin && (
          <a 
            id="link-linkedin"
            href={`https://${profile.linkedin.replace(/https?:\/\//, "")}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-2 hover:px-2 transition-all duration-200 border-b border-zinc-800 text-left hover:border-white group/item"
          >
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 group-hover/item:text-white transition-colors">
                <Linkedin size={14} />
              </span>
              <span className="truncate max-w-[170px] font-mono font-medium text-zinc-400 group-hover/item:text-white transition-colors text-xs">
                LinkedIn
              </span>
            </div>
            <Share2 size={12} className="text-zinc-500 group-hover/item:text-white" />
          </a>
        )}

        {profile.github && (
          <a 
            id="link-github"
            href={`https://${profile.github.replace(/https?:\/\//, "")}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-2 hover:px-2 transition-all duration-200 border-b border-zinc-800 text-left hover:border-white group/item"
          >
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 group-hover/item:text-white transition-colors">
                <Github size={14} />
              </span>
              <span className="truncate max-w-[170px] font-mono font-medium text-zinc-400 group-hover/item:text-white transition-colors text-xs">
                GitHub
              </span>
            </div>
            <Share2 size={12} className="text-zinc-500 group-hover/item:text-white" />
          </a>
        )}
      </div>

      {/* Actions Panel */}
      <div className="space-y-3 mt-auto pt-6 border-t border-zinc-800" data-html2canvas-ignore="true">
        <button 
          id="btn-edit-mode"
          onClick={onEditToggle} 
          className={`w-full py-3 px-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition duration-200 border cursor-pointer border-zinc-800 text-white bg-transparent hover:border-white`}
        >
          <span>{isEditing ? "Tutup Panel" : "Edit Profil"}</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            id="btn-print-cv"
            onClick={onPrintMode} 
            className="py-3 px-3 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition duration-200 cursor-pointer text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-white"
          >
            <FileText size={14} />
            <span>Format ATS</span>
          </button>
          
          <button 
            id="btn-export-json"
            onClick={onDownloadJSON} 
            className="py-3 px-3 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition duration-200 cursor-pointer text-zinc-400 bg-zinc-900 border border-zinc-800 hover:text-white"
          >
            <FileDown size={14} />
            <span>JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
