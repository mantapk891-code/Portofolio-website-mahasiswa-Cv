/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Layers, 
  CheckCircle2, 
  Clock, 
  BookOpen 
} from "lucide-react";
import { Project, Theme } from "../types";

interface ProjectsSectionProps {
  projects: Project[];
  activeTheme: Theme;
}

type ProjectCategoryFilter = "Semua" | "Web Dev" | "Mobile Core" | "AI & Data Science" | "UI/UX Design" | "Lainnya";

export function ProjectsSection({ projects, activeTheme }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryFilter>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: ProjectCategoryFilter[] = [
    "Semua", 
    "Web Dev", 
    "Mobile Core", 
    "AI & Data Science", 
    "UI/UX Design", 
    "Lainnya"
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "Semua" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Selesai":
        return {
          label: "Selesai",
          class: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
          icon: <CheckCircle2 size={12} />
        };
      case "Dalam Pengembangan":
        return {
          label: "In Progress",
          class: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
          icon: <Clock size={12} />
        };
      default: // "Rencana"
        return {
          label: "Ide/Rencana",
          class: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40",
          icon: <BookOpen size={12} />
        };
    }
  };

  return (
    <div className={`p-6 border-t border-zinc-800 shadow-md flex flex-col h-full bg-transparent`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 border border-zinc-800 text-white rounded">
            <FolderGit2 size={20} />
          </div>
          <div>
            <h2 className={`text-2xl font-black uppercase tracking-tighter text-white`}>Showcase Proyek</h2>
            <p className="text-[10px] tracking-widest uppercase text-zinc-500">Proyek akademik & independen terpilih</p>
          </div>
        </div>

        {/* Modular Search Bar */}
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
            <Search size={14} />
          </span>
          <input 
            id="search-projects"
            type="text" 
            placeholder="Cari judul, tag, atau tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border-b border-zinc-800 bg-transparent text-white focus:outline-none focus:border-white transition-colors uppercase tracking-widest"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-zinc-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-tab-${cat.replace(/\s+/g, "-")}`}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[10px] uppercase tracking-widest font-bold transition duration-200 cursor-pointer ${
              selectedCategory === cat 
                ? `text-white border-b border-white pb-1` 
                : "text-zinc-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const status = getStatusBadge(project.status);
            return (
              <div 
                key={project.id} 
                className="p-4 bg-transparent border-b border-zinc-800 hover:border-white transition-colors duration-300 flex flex-col justify-between group/card relative cursor-pointer"
              >
                <div>
                  {/* Category & Status Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                      <span>{status.label}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tighter text-white mb-2`}>
                    {project.title || "Proyek Tanpa Judul"}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description || "Tidak ada deskripsi singkat."}
                  </p>
                </div>

                {/* Bottom Segment (Tags & Outgoing Links) */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-[10px] tracking-widest uppercase px-2 py-0.5 border border-zinc-800 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 text-xs">
                    <span className="text-[10px] tracking-widest uppercase text-zinc-600 font-mono">
                      ID: {project.id}
                    </span>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 rounded text-zinc-500 hover:text-white transition"
                          title="GitHub Repository"
                        >
                          <Github size={15} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 rounded text-zinc-500 hover:text-white transition flex items-center gap-1 font-semibold text-[11px] uppercase tracking-widest"
                          title="Live Demo"
                        >
                          <span>Live</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-12 text-center">
            <span className="text-3xl mb-2">🔍</span>
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Tidak ada proyek ditemukan</h4>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau kategori filter kamu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
