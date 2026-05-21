/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { toPng, toJpeg, toCanvas } from "html-to-image";
import jsPDF from "jspdf";
import { ArrowLeft, Printer, Globe, Mail, Linkedin, Github, Download } from "lucide-react";
import { ProfileData } from "../types";

interface PrintResumeProps {
  profile: ProfileData;
  onBack: () => void;
}

export function PrintResume({ profile, onBack }: PrintResumeProps) {
  const triggerPrint = () => {
    window.print();
  };

  const getExportOptions = () => ({
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    filter: (node: any) => {
      if (node?.classList?.contains("print:hidden")) return false;
      return true;
    }
  });

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById("cv-print-area");
      if (!element) return;
      const canvas = await toCanvas(element, getExportOptions());
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${profile.name.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh PDF. Pastikan gambar profil menggunakan file lokal/upload, bukan URL web, atau coba format lain.");
    }
  };

  const handleDownloadJPG = async () => {
    try {
      const element = document.getElementById("cv-print-area");
      if (!element) return;
      const dataUrl = await toJpeg(element, { ...getExportOptions(), quality: 1.0 });
      const link = document.createElement("a");
      link.download = `${profile.name.replace(/\s+/g, "_")}_CV.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh JPG. Pastikan gambar profil menggunakan file lokal/upload, bukan URL web.");
    }
  };

  const handleDownloadPNG = async () => {
    try {
      const element = document.getElementById("cv-print-area");
      if (!element) return;
      const dataUrl = await toPng(element, getExportOptions());
      const link = document.createElement("a");
      link.download = `${profile.name.replace(/\s+/g, "_")}_CV.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh PNG. Pastikan gambar profil menggunakan file lokal/upload, bukan URL web.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-12 font-sans select-text">
      {/* Top utility menu bar (hidden during print) */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-2xl print:hidden">
        <button 
          id="btn-back-portfolio"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownloadJPG}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:text-slate-900 transition py-2 px-3 rounded border border-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            <Download size={14} /> JPG
          </button>
          <button 
            onClick={handleDownloadPNG}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:text-slate-900 transition py-2 px-3 rounded border border-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            <Download size={14} /> PNG
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:text-slate-900 transition py-2 px-3 rounded border border-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            <Download size={14} /> PDF
          </button>
          <button 
            id="print-action"
            onClick={triggerPrint}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition py-2 px-4 rounded cursor-pointer ml-2"
          >
            <Printer size={14} />
            <span>Cetak Default</span>
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div id="cv-print-area" className="max-w-3xl mx-auto bg-white p-6 sm:p-10 border border-slate-200 shadow-sm print:p-0 print:border-none print:shadow-none">
        {/* Header Block */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center gap-6">
          {profile.photoUrl && (
            <div className="w-24 h-24 rounded border border-slate-300 overflow-hidden flex-shrink-0">
              <img src={profile.photoUrl} alt="Profil" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">
              {profile.name || "NAMA MAHASISWA"}
            </h1>
            <p className="text-sm font-semibold text-slate-700 tracking-[0.2em] mt-1 uppercase">
              {profile.role || "Informatics Student"}
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600 font-mono tracking-tight">
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} />
                  <span>{profile.email}</span>
                </span>
              )}
              {profile.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin size={12} />
                  <span>{profile.linkedin.replace(/https?:\/\//, "")}</span>
                </span>
              )}
              {profile.github && (
                <span className="flex items-center gap-1">
                  <Github size={12} />
                  <span>{profile.github.replace(/https?:\/\//, "")}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ringkasan Profesional (Bio) */}
        {profile.bio && (
          <div className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-350 pb-1 mb-2">
              Tentang Saya / Ringkasan Profesional
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Pendidikan (Education) */}
        {profile.education && profile.education.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-350 pb-1 mb-2">
              Riwayat Pendidikan
            </h2>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.degree}</span>
                    <span className="font-mono text-[11px]">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-700 font-semibold italic">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span className="font-mono text-[11px]">IPK / Nilai: {edu.gpa}</span>}
                  </div>
                  {edu.notes && <p className="text-slate-600 mt-1 pl-2 border-l border-slate-200">{edu.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pengalaman kerja/organisasi (Experiences) */}
        {profile.experiences && profile.experiences.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-350 pb-1 mb-2">
              Pengalaman Kerja & Organisasi
            </h2>
            <div className="space-y-4">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>
                      {exp.role} 
                      <span className="font-normal text-slate-600"> @ {exp.company}</span>
                    </span>
                    <span className="font-mono text-[11px] font-bold">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-1 text-justify leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyek Terpilih (Selected Projects) */}
        {profile.projects && profile.projects.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-350 pb-1 mb-2">
              Proyek Pengembangan Perangkat Lunak & Riset
            </h2>
            <div className="space-y-4">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{proj.title} <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase italic">({proj.category})</span></span>
                    <span className="font-mono text-[10px] font-semibold text-slate-500">Tag: {proj.tags.join(", ")}</span>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed text-justify">{proj.description}</p>
                  {(proj.liveUrl || proj.githubUrl) && (
                    <div className="mt-1 flex gap-3 text-[10px] font-mono text-slate-500">
                      {proj.githubUrl && <span>GitHub: {proj.githubUrl}</span>}
                      {proj.liveUrl && <span>Live: {proj.liveUrl}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills List */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-350 pb-1 mb-2">
              Keahlian Teknis & Sertifikasi
            </h2>
            <div className="text-xs leading-relaxed text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                <div>
                  <span className="font-bold text-slate-900 block">Coding, Frameworks & Tech:</span>
                  <span>
                    {profile.skills
                      .filter(s => s.category === "Coding & Tech")
                      .map(s => `${s.name} (${s.level}%)`)
                      .join(", ") || "-"}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Metodologi & Tools Kerja:</span>
                  <span>
                    {profile.skills
                      .filter(s => s.category === "Metodologi & Tools")
                      .map(s => `${s.name} (${s.level}%)`)
                      .join(", ") || "-"}
                  </span>
                </div>
                <div className="sm:col-span-2 mt-1.5">
                  <span className="font-bold text-slate-900 block">Desain, Komunikasi & Lainnya:</span>
                  <span>
                    {profile.skills
                      .filter(s => s.category !== "Coding & Tech" && s.category !== "Metodologi & Tools")
                      .map(s => `${s.name} (${s.level}%)`)
                      .join(", ") || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer (For printable) */}
        <div className="mt-8 border-t border-slate-250 pt-3 text-center text-[10px] text-slate-400 font-mono">
          <span>Ditayangkan secara interaktif di: {window.location.origin}</span>
        </div>
      </div>
    </div>
  );
}
