/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  History, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  BookOpen 
} from "lucide-react";
import { Education, Experience, Theme } from "../types";

interface ExperienceTimelineProps {
  education: Education[];
  experiences: Experience[];
  activeTheme: Theme;
}

export function ExperienceTimeline({ 
  education, 
  experiences, 
  activeTheme 
}: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState<"semua" | "pengalaman" | "pendidikan">("semua");

  return (
    <div className={`p-6 border-t border-zinc-800 shadow-md flex flex-col h-full bg-transparent`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-2 border border-zinc-800 text-white rounded">
            <History size={20} />
          </div>
          <div>
            <h2 className={`text-2xl font-black uppercase tracking-tighter text-white`}>Riwayat Hidup</h2>
            <p className="text-[10px] tracking-widest uppercase text-zinc-500">Pendidikan akademik & jejak profesional</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex bg-transparent border border-zinc-800 p-1 rounded self-start sm:self-auto">
          {(["semua", "pengalaman", "pendidikan"] as const).map((tab) => (
            <button
              key={tab}
              id={`timeline-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded transition duration-150 cursor-pointer ${
                activeTab === tab 
                  ? "bg-white text-zinc-950 shadow-sm" 
                  : "text-zinc-600 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12 flex-grow">
        {/* Experience Timeline */}
        {(activeTab === "semua" || activeTab === "pengalaman") && experiences.length > 0 && (
          <div className="relative">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-2`}>
              <span>Pengalaman & Organisasi</span>
            </h3>

            {/* Vertical timeline bar helper */}
            <div className="absolute left-[3px] top-10 bottom-3 w-[1px] bg-zinc-800" />

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 group/item">
                  {/* custom timeline marker */}
                  <div className={`absolute left-0 top-1.5 w-2 h-2 rounded bg-zinc-600 border border-zinc-800 group-hover/item:bg-white transition duration-200 z-10`} />

                  <div>
                    <span className="inline-block text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">
                      {exp.period}
                    </span>
                    <h4 className={`text-sm font-bold uppercase tracking-widest text-white`}>
                      {exp.role} 
                      <span className="text-xs font-normal text-zinc-500"> @ {exp.company}</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Timeline */}
        {(activeTab === "semua" || activeTab === "pendidikan") && education.length > 0 && (
          <div className="relative pt-2">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-2`}>
              <span>Pendidikan & Akademis</span>
            </h3>

            {/* Vertical timeline bar helper */}
            <div className="absolute left-[3px] top-10 bottom-3 w-[1px] bg-zinc-800" />

            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 group/item">
                  {/* custom timeline marker */}
                  <div className={`absolute left-0 top-1.5 w-2 h-2 rounded bg-zinc-600 border border-zinc-800 group-hover/item:bg-white transition duration-200 z-10`} />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        {edu.startYear} - {edu.endYear}
                      </span>
                      {edu.gpa && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 border border-zinc-800 text-zinc-400 uppercase tracking-widest">
                          IPK: {edu.gpa}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm font-bold uppercase tracking-widest text-white`}>
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono mt-1">
                      {edu.institution}
                    </p>
                    
                    {edu.notes && (
                      <p className="text-xs text-zinc-400 mt-2 italic flex items-start gap-1 leading-relaxed">
                        <span className="text-zinc-600 font-serif">"</span>
                        {edu.notes}
                        <span className="text-zinc-600 font-serif">"</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
