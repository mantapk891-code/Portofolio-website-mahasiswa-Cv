/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Code, Palette, Languages, Library } from "lucide-react";
import { Skill, Theme } from "../types";

interface SkillsGridProps {
  skills: Skill[];
  activeTheme: Theme;
}

export function SkillsGrid({ skills, activeTheme }: SkillsGridProps) {
  // Group skills by category
  const categories = {
    "Coding & Tech": {
      icon: <Code size={16} className="text-emerald-500" />,
      items: skills.filter(s => s.category === "Coding & Tech")
    },
    "Desain & Kreatif": {
      icon: <Palette size={16} className="text-pink-500" />,
      items: skills.filter(s => s.category === "Desain & Kreatif")
    },
    "Bahasa & Komunikasi": {
      icon: <Languages size={16} className="text-blue-500" />,
      items: skills.filter(s => s.category === "Bahasa & Komunikasi")
    },
    "Metodologi & Tools": {
      icon: <Library size={16} className="text-violet-500" />,
      items: skills.filter(s => s.category === "Metodologi & Tools")
    }
  };

  const getShorterProficiencyLabel = (level: number) => {
    if (level >= 90) return "Mastery";
    if (level >= 80) return "Lancar";
    if (level >= 60) return "Menengah";
    return "Dasar";
  };

  return (
    <div className={`p-6 border-t border-zinc-800 shadow-md flex flex-col h-full bg-transparent`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 border border-zinc-800 text-white rounded">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className={`text-2xl font-black uppercase tracking-tighter text-white`}>Keahlian & Kompetensi</h2>
          <p className="text-[10px] tracking-widest uppercase text-zinc-500">Katalog kompetensi diri yang terukur</p>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 gap-8 flex-grow">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((catName) => {
          const group = categories[catName];
          if (group.items.length === 0) return null;

          return (
            <div 
              key={catName} 
              className="border-b border-zinc-800 pb-6 transition group"
            >
              <h3 className={`text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em] flex items-center gap-2 mb-4`}>
                <span>{catName}</span>
              </h3>

              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                      <span className={`font-bold text-white text-sm`}>{skill.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {getShorterProficiencyLabel(skill.level)} ({skill.level}%)
                      </span>
                    </div>

                    {/* Minimalist Linear Progress Bar */}
                    <div className="w-full h-1 bg-zinc-900 overflow-hidden">
                      <div 
                        className={`h-full bg-white transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
