/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { 
  User, 
  Settings, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  FolderGit2, 
  GraduationCap, 
  Award, 
  FileJson, 
  Upload, 
  AlertCircle,
  X,
  PlusCircle,
  HelpCircle
} from "lucide-react";
import { ProfileData, Project, Education, Experience, Skill, Theme } from "../types";
import { THEMES } from "../data";

interface PortfolioEditorProps {
  profile: ProfileData;
  activeTheme: Theme;
  onUpdateProfile: (updated: Partial<ProfileData>) => void;
  onResetDefaults: () => void;
  onImportJSON: (imported: ProfileData) => void;
  onClose: () => void;
}

type EditorTab = "profil" | "proyek" | "riwayat" | "keahlian" | "sistem";

export function PortfolioEditor({
  profile,
  activeTheme,
  onUpdateProfile,
  onResetDefaults,
  onImportJSON,
  onClose
}: PortfolioEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>("profil");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper inside editing to quickly handle state updates for arrays
  const updateProjectField = (index: number, field: keyof Project, value: any) => {
    const updated = [...profile.projects];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProfile({ projects: updated });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: "Proyek Baru",
      description: "Tuliskan deskripsi singkat, rincian teknis, dan sasaran proyek buatanmu di sini.",
      tags: ["React", "CSS"],
      category: "Web Dev",
      liveUrl: "",
      githubUrl: "",
      status: "Dalam Pengembangan"
    };
    onUpdateProfile({ projects: [...profile.projects, newProj] });
  };

  const removeProject = (id: string) => {
    onUpdateProfile({ projects: profile.projects.filter(p => p.id !== id) });
  };

  // Education Helpers
  const updateEduField = (index: number, field: keyof Education, value: any) => {
    const updated = [...profile.education];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProfile({ education: updated });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      degree: "S1 Gelar Baru",
      institution: "Universitas Indonesia",
      gpa: "4.00",
      startYear: "2024",
      endYear: "Sekarang",
      notes: ""
    };
    onUpdateProfile({ education: [...profile.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    onUpdateProfile({ education: profile.education.filter(e => e.id !== id) });
  };

  // Experience Helpers
  const updateExpField = (index: number, field: keyof Experience, value: any) => {
    const updated = [...profile.experiences];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProfile({ experiences: updated });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: "Peran Organisasi / Magang",
      company: "Nama Organisasi / Lokasi Kerja",
      period: "2025 - Sekarang",
      description: "Menjelaskan tanggung jawab utama dan keberhasilan kontribusi Anda selama menjabat."
    };
    onUpdateProfile({ experiences: [...profile.experiences, newExp] });
  };

  const removeExperience = (id: string) => {
    onUpdateProfile({ experiences: profile.experiences.filter(e => e.id !== id) });
  };

  // Skill Helpers
  const updateSkillField = (index: number, field: keyof Skill, value: any) => {
    const updated = [...profile.skills];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProfile({ skills: updated });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `sk_${Date.now()}`,
      name: "Skill Baru",
      level: 70,
      category: "Coding & Tech"
    };
    onUpdateProfile({ skills: [...profile.skills, newSkill] });
  };

  const removeSkill = (id: string) => {
    onUpdateProfile({ skills: profile.skills.filter(s => s.id !== id) });
  };

  // File drag & drop file handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processJsonFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.name && Array.isArray(json.projects) && Array.isArray(json.skills)) {
          onImportJSON(json as ProfileData);
          showNotification("Selamat! Berhasil memuat riwayat data portofolio kustom kamu.", "success");
        } else {
          showNotification("Peringatan: Format file JSON tidak sesuai standar portofolio!", "error");
        }
      } catch (err) {
        showNotification("Gagal memproses file JSON: Format rusak.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processJsonFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processJsonFile(e.target.files[0]);
    }
  };

  return (
    <div className={`p-6 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.borderColor} shadow-xl flex flex-col h-full animate-fade-in relative`}>
      {/* Top Close Button */}
      <button 
        id="btn-close-editor"
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        title="Tutup editor"
      >
        <X size={18} />
      </button>

      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <Settings className={`animate-spin-slow ${activeTheme.accentText}`} size={20} />
        <div>
          <h2 className={`text-lg font-bold ${activeTheme.textPrimary}`}>Editor Portofolio Mahasiswa</h2>
          <p className="text-xs text-slate-400">Atur konten portofolio Anda secara waktu-nyata.</p>
        </div>
      </div>

      {notification && (
        <div className={`p-3 rounded-xl mb-4 flex items-center justify-between text-xs font-semibold animate-fade-in ${
          notification.type === "success" 
            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/20" 
            : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-[#ff8080] border border-rose-200 dark:border-rose-800/20"
        }`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600 transition">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Editor Inner Navigation */}
      <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-1 rounded-xl mb-6 overflow-x-auto gap-0.5 scrollbar-none">
        {(["profil", "proyek", "riwayat", "keahlian", "sistem"] as EditorTab[]).map(tab => (
          <button
            key={tab}
            id={`editor-tab-${tab}`}
            onClick={() => setDragActive(false) || setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 capitalize cursor-pointer ${
              activeTab === tab 
                ? `${activeTheme.accentBg} ${activeTheme.accentText} font-bold shadow-xs` 
                : "text-slate-500 hover:text-slate-850 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-5 scrollbar-thin max-h-[500px]">
        {/* TAB 1: PROFILE / PERSONAL DATA */}
        {activeTab === "profil" && (
          <div className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
              <User size={13} />
              <span>Informasi Personal Utama</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">NAMA LENGKAP</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => onUpdateProfile({ name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono flex items-center justify-between">
                  <span>FOTO PROFIL (JPG/PNG)</span>
                  {profile.photoUrl && (
                    <button 
                      onClick={() => onUpdateProfile({ photoUrl: "" })}
                      className="text-[9px] text-rose-500 hover:text-rose-600 transition"
                    >
                      Hapus Foto
                    </button>
                  )}
                </label>
                <div className="flex items-center gap-3">
                  {profile.photoUrl && (
                    <img 
                      src={profile.photoUrl} 
                      alt="Preview" 
                      className="w-9 h-9 rounded border border-slate-200 dark:border-slate-800 object-cover flex-shrink-0" 
                    />
                  )}
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          onUpdateProfile({ photoUrl: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none file:mr-3 file:py-1 file:px-3 file:cursor-pointer file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 dark:file:bg-slate-800 dark:file:text-slate-300 dark:hover:file:bg-slate-700 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">PERAN / TAGLINE</label>
                <input 
                  type="text" 
                  value={profile.role} 
                  onChange={(e) => onUpdateProfile({ role: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">UNIVERSITAS</label>
                <input 
                  type="text" 
                  value={profile.university} 
                  onChange={(e) => onUpdateProfile({ university: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">PROGRAM STUDI / JURUSAN</label>
                <input 
                  type="text" 
                  value={profile.major} 
                  onChange={(e) => onUpdateProfile({ major: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">SEMESTER</label>
                <input 
                  type="number" 
                  min={1} 
                  max={14}
                  value={profile.semester} 
                  onChange={(e) => onUpdateProfile({ semester: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">IPK TERKINI</label>
                <input 
                  type="text" 
                  value={profile.gpa} 
                  onChange={(e) => onUpdateProfile({ gpa: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">SKS SELESAI</label>
                <input 
                  type="number" 
                  min={0}
                  value={profile.sks} 
                  onChange={(e) => onUpdateProfile({ sks: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 font-mono">BIOGRAFI SINGKAT (DENGAN REAKSI MENARIK)</label>
              <textarea 
                value={profile.bio} 
                rows={3}
                onChange={(e) => onUpdateProfile({ bio: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">EMAIL</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => onUpdateProfile({ email: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">LINKEDIN URL (TANPA HTTPS://)</label>
                <input 
                  type="text" 
                  placeholder="linkedin.com/in/username"
                  value={profile.linkedin} 
                  onChange={(e) => onUpdateProfile({ linkedin: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">GITHUB USERNAME (TANPA HTTPS://)</label>
                <input 
                  type="text" 
                  placeholder="github.com/username"
                  value={profile.github} 
                  onChange={(e) => onUpdateProfile({ github: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 font-mono">SEED AVATAR (MENGUBAH AKTOR DESAIN)</label>
                <input 
                  type="text" 
                  value={profile.avatarSeed} 
                  onChange={(e) => onUpdateProfile({ avatarSeed: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === "proyek" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
                <FolderGit2 size={13} />
                <span>Pengaturan Daftar Proyek ({profile.projects.length})</span>
              </h3>
              
              <button 
                id="btn-add-project"
                onClick={addProject}
                className={`py-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 text-white bg-slate-900 hover:bg-slate-800`}
              >
                <Plus size={12} />
                <span>Tambah Baru</span>
              </button>
            </div>

            <div className="space-y-4">
              {profile.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/80 space-y-3 relative group/item">
                  <button 
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-3 right-3 text-slate-300 hover:text-rose-500 p-1 rounded-lg hover:bg-white dark:hover:bg-slate-900 transition"
                    title="Hapus proyek"
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 font-mono">JUDUL PROYEK</label>
                      <input 
                        type="text" 
                        value={proj.title} 
                        onChange={(e) => updateProjectField(idx, "title", e.target.value)}
                        className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 font-mono">KATEGORI</label>
                        <select 
                          value={proj.category} 
                          onChange={(e) => updateProjectField(idx, "category", e.target.value)}
                          className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none"
                        >
                          <option value="Web Dev">Web Dev</option>
                          <option value="Mobile Core">Mobile Core</option>
                          <option value="AI & Data Science">AI & Data Science</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 font-mono">STATUS</label>
                        <select 
                          value={proj.status} 
                          onChange={(e) => updateProjectField(idx, "status", e.target.value)}
                          className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none"
                        >
                          <option value="Selesai">Selesai</option>
                          <option value="Dalam Pengembangan">In Progress</option>
                          <option value="Rencana">Ide/Rencana</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 font-mono">TAG (PISAH DENGAN KOMA)</label>
                    <input 
                      type="text" 
                      value={proj.tags.join(", ")} 
                      onChange={(e) => updateProjectField(idx, "tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                      placeholder="React, TypeScript, Tailwind"
                      className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 font-mono">DESKRIPSI PROYEK</label>
                    <textarea 
                      value={proj.description} 
                      rows={2}
                      onChange={(e) => updateProjectField(idx, "description", e.target.value)}
                      className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 font-mono">GITHUB REPOSITORY URL</label>
                      <input 
                        type="text" 
                        value={proj.githubUrl || ""} 
                        onChange={(e) => updateProjectField(idx, "githubUrl", e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 font-mono">LIVE DEMO URL</label>
                      <input 
                        type="text" 
                        value={proj.liveUrl || ""} 
                        onChange={(e) => updateProjectField(idx, "liveUrl", e.target.value)}
                        placeholder="https://myproject.com"
                        className="w-full text-[11px] p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TIMELINE (EDUCATION & EXPERIENCES) */}
        {activeTab === "riwayat" && (
          <div className="space-y-6">
            {/* Pendidikan */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
                  <GraduationCap size={13} />
                  <span>Daftar Riwayat Pendidikan</span>
                </h3>
                
                <button 
                  id="btn-add-edu"
                  onClick={addEducation}
                  className={`py-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 text-white bg-slate-800 hover:bg-slate-700`}
                >
                  <Plus size={11} />
                  <span>Tambah Edukasi</span>
                </button>
              </div>

              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <div key={edu.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-200/40 dark:border-slate-800 relative space-y-2">
                    <button 
                      onClick={() => removeEducation(edu.id)}
                      className="absolute top-2.5 right-2.5 text-slate-300 hover:text-rose-500 transition p-1"
                    >
                      <Trash2 size={12} />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">GELAR / PROGRAM STUDI</label>
                        <input 
                          type="text" 
                          value={edu.degree} 
                          onChange={(e) => updateEduField(idx, "degree", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">INSTITUSI / SEKOLAH</label>
                        <input 
                          type="text" 
                          value={edu.institution} 
                          onChange={(e) => updateEduField(idx, "institution", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">TAHUN MULAI</label>
                        <input 
                          type="text" 
                          value={edu.startYear} 
                          onChange={(e) => updateEduField(idx, "startYear", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">HAL SEKARANG (BERAKHIR)</label>
                        <input 
                          type="text" 
                          value={edu.endYear} 
                          onChange={(e) => updateEduField(idx, "endYear", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">IPK / NILAI</label>
                        <input 
                          type="text" 
                          value={edu.gpa || ""} 
                          onChange={(e) => updateEduField(idx, "gpa", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">CATATAN PENCAPAIAN</label>
                      <input 
                        type="text" 
                        value={edu.notes || ""} 
                        onChange={(e) => updateEduField(idx, "notes", e.target.value)}
                        placeholder="Aktif olimpiade, dsb."
                        className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pengalaman kerja/organisasi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
                  <Award size={13} />
                  <span>Daftar Pengalaman & Organisasi</span>
                </h3>
                
                <button 
                  id="btn-add-exp"
                  onClick={addExperience}
                  className={`py-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 text-white bg-slate-800 hover:bg-slate-700`}
                >
                  <Plus size={11} />
                  <span>Tambah Pengalaman</span>
                </button>
              </div>

              <div className="space-y-3">
                {profile.experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-200/40 dark:border-slate-800 relative space-y-2">
                    <button 
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-2.5 right-2.5 text-slate-300 hover:text-rose-500 transition p-1"
                    >
                      <Trash2 size={12} />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">NAMA PERAN / POSISI</label>
                        <input 
                          type="text" 
                          value={exp.role} 
                          onChange={(e) => updateExpField(idx, "role", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 font-mono block">PERUSAHAAN / ORGANISASI</label>
                        <input 
                          type="text" 
                          value={exp.company} 
                          onChange={(e) => updateExpField(idx, "company", e.target.value)}
                          className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">DURASI / PERIODE</label>
                      <input 
                        type="text" 
                        value={exp.period} 
                        onChange={(e) => updateExpField(idx, "period", e.target.value)}
                        placeholder="Agustus 2024 - Sekarang"
                        className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">DESKRIPSI TANGGUNG JAWAB & PENCAPAIAN</label>
                      <textarea 
                        value={exp.description} 
                        rows={2}
                        onChange={(e) => updateExpField(idx, "description", e.target.value)}
                        className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 resize-none font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPREHENSIVE SKILL CONTROLS */}
        {activeTab === "keahlian" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
                <Award size={13} />
                <span>Pengaturan Peringkat Keahlian ({profile.skills.length})</span>
              </h3>
              
              <button 
                id="btn-add-skill"
                onClick={addSkill}
                className={`py-1 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 text-white bg-slate-900 hover:bg-slate-800`}
              >
                <Plus size={11} />
                <span>Tambah Keahlian</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {profile.skills.map((skill, idx) => (
                <div key={skill.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-250/30 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
                  <button 
                    onClick={() => removeSkill(skill.id)}
                    className="absolute top-2 sm:static right-2 text-slate-350 hover:text-rose-500 transition p-1 order-last"
                  >
                    <Trash2 size={12} />
                  </button>

                  <div className="grid grid-cols-2 gap-2 flex-grow sm:mr-3">
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">NAMA KEMAMPUAN</label>
                      <input 
                        type="text" 
                        value={skill.name} 
                        onChange={(e) => updateSkillField(idx, "name", e.target.value)}
                        className="w-full text-[11px] p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">KATEGORI UTAMA</label>
                      <select 
                        value={skill.category} 
                        onChange={(e) => updateSkillField(idx, "category", e.target.value)}
                        className="w-full text-[11px] p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                      >
                        <option value="Coding & Tech">Coding & Tech</option>
                        <option value="Desain & Kreatif">Desain & Kreatif</option>
                        <option value="Bahasa & Communication">Bahasa & Komunikasi</option>
                        <option value="Metodologi & Tools">Metodologi & Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full sm:w-36 shrink-0 flex items-center gap-2">
                    <div className="flex-grow">
                      <label className="text-[8px] font-bold text-slate-400 font-mono block">TINGKATAN ({skill.level}%)</label>
                      <input 
                        type="range" 
                        min={10} 
                        max={100} 
                        step={5} 
                        value={skill.level}
                        onChange={(e) => updateSkillField(idx, "level", parseInt(e.target.value))}
                        className={`w-full accent-emerald-500 cursor-pointer h-1.5`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM AND FILE UPLOAD / IMPORT */}
        {activeTab === "sistem" && (
          <div className="space-y-5">
            {/* Theme Select section */}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono mb-3`}>
                <Sparkles size={13} />
                <span>Ubah Palet Warna & Tema Desain</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    id={`theme-btn-${t.id}`}
                    onClick={() => onUpdateProfile({ themeId: t.id })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left ${
                      profile.themeId === t.id 
                        ? `border-${t.accent} bg-slate-50 dark:bg-slate-900 border-2`
                        : "border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-${t.accent}`} />
                      <span className={activeTheme.textPrimary}>{t.name}</span>
                    </div>
                    {profile.themeId === t.id && (
                      <span className={`text-[10px] uppercase font-mono font-bold ${activeTheme.accentText}`}>Aktif</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Import JSON File area (Usability Pattern compliant Drag & Drop + Click picker) */}
            <div className="space-y-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono`}>
                <FileJson size={13} />
                <span>Impor & Pulihkan Profil dari JSON</span>
              </h3>

              <div 
                onDragEnter={handleDrag} 
                onDragOver={handleDrag} 
                onDragLeave={handleDrag} 
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center ${
                  dragActive 
                    ? `border-${activeTheme.accent} bg-slate-50 dark:bg-slate-900` 
                    : "border-slate-300 dark:border-slate-800 hover:border-slate-450 dark:hover:border-slate-700 bg-transparent"
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden" 
                />
                
                <Upload size={24} className="text-slate-400 mb-2 stroke-1" />
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tarik & lepas file <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.json</code> kesini
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">
                  Atau klik untuk memilih file dari penyimpanan komputer kamu
                </p>
              </div>
            </div>

            {/* Fast Reset Factory Settings */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">Kembalikan Data Semula</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Menghapus kustomisasi dan memulihkan profil asli Bagas Praditya.</p>
              </div>

              <button 
                id="btn-reset-default"
                onClick={onResetDefaults}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-transparent hover:border-rose-200 flex items-center justify-center gap-1 cursor-pointer transition self-start sm:self-auto"
              >
                <RotateCcw size={12} />
                <span>Pulihkan Bawaan</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer message */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800/40 pt-3 text-center text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
        <AlertCircle size={10} className="text-amber-500" />
        <span>Perubahan langsung tersimpan otomatis di browser lokal kamu.</span>
      </div>
    </div>
  );
}
