/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Check, 
  ShieldAlert, 
  Trash2,
  Clock
} from "lucide-react";
import { ContactMessage, Theme } from "../types";

interface ContactSectionProps {
  activeTheme: Theme;
  messages: ContactMessage[];
  onSendMessage: (msg: Omit<ContactMessage, "id" | "timestamp">) => void;
  onClearMessage: (id: string) => void;
}

export function ContactSection({ 
  activeTheme, 
  messages, 
  onSendMessage, 
  onClearMessage 
}: ContactSectionProps) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    onSendMessage({
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      message: messageText.trim()
    });

    setSenderName("");
    setSenderEmail("");
    setMessageText("");
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className={`p-6 border-t border-zinc-800 shadow-md flex flex-col h-full bg-transparent`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 border border-zinc-800 text-white rounded">
          <MessageSquare size={20} />
        </div>
        <div>
          <h2 className={`text-2xl font-black uppercase tracking-tighter text-white`}>Hubungi Saya</h2>
          <p className="text-[10px] tracking-widest uppercase text-zinc-500">Kirim pesan langsung ke inbox lokal saya</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-grow">
        {/* Contact Form Block */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="input-name" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Nama Pengunjung
              </label>
              <input 
                id="input-name"
                type="text" 
                placeholder="Randi Pangestu"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full text-xs p-3 border-b border-zinc-800 bg-transparent text-white focus:outline-none focus:border-white transition uppercase tracking-widest"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="input-email" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Alamat Email
              </label>
              <input 
                id="input-email"
                type="email" 
                placeholder="randi@company.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full text-xs p-3 border-b border-zinc-800 bg-transparent text-white focus:outline-none focus:border-white transition uppercase tracking-widest"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="input-message" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Pesan / Penawaran Kerja
            </label>
            <textarea 
              id="input-message"
              placeholder="Halo Bagas! Tertarik mendiskusikan peluang internship..."
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full text-xs p-3 border-b border-zinc-800 bg-transparent text-zinc-400 focus:outline-none focus:border-white transition resize-none uppercase tracking-widest"
              required
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button 
              id="btn-send-message"
              type="submit" 
              className={`py-3 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition duration-200 cursor-pointer text-zinc-950 bg-white hover:bg-zinc-200`}
            >
              <Send size={13} />
              <span>Kirim Pesan</span>
            </button>

            {status === "success" && (
               <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                 <Check size={14} /> Pesan terkirim!
               </div>
            )}
            {status === "error" && (
               <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                 <ShieldAlert size={14} /> Lengkapi kolom!
               </div>
            )}
          </div>
        </form>

        {/* Visitor Inbox Messages Display (Very satisfying interactivity!) */}
        <div className="lg:col-span-2 flex flex-col border border-zinc-800 p-4 overflow-hidden h-[300px]">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Mail size={13} />
              Inbox ({messages.length})
            </span>
          </h3>

          <div className="space-y-4 overflow-y-auto pr-1 flex-grow scrollbar-thin">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="p-4 border border-zinc-800 flex items-start gap-2.5 relative group/msg transition hover:border-white"
                >
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <span className={`text-xs font-bold leading-none select-none truncate text-white uppercase tracking-widest`}>
                        {msg.senderName}
                      </span>
                      <button 
                        onClick={() => onClearMessage(msg.id)}
                        className="text-zinc-600 hover:text-white p-0.5 transition opacity-0 group-hover/msg:opacity-100"
                        title="Hapus pesan"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                      {msg.senderEmail}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed break-words">
                      {msg.message}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-[8px] text-zinc-600 font-mono uppercase tracking-widest">
                      <Clock size={8} />
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-6 text-zinc-600">
                <Mail size={24} className="mb-2 stroke-1" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest">Kosong</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
