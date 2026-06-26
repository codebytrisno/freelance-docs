"use client";

import { useState, useEffect, useCallback } from "react";
import { DocumentType, saveDraft, getDraftInfo, deleteDraft } from "../lib/storage";

interface DraftControlsProps<T> {
  type: DocumentType;
  data: T;
  onReset?: () => void;
}

export default function DraftControls<T>({ type, data, onReset }: DraftControlsProps<T>) {
  const [status, setStatus] = useState<"saved" | "saving" | "idle">("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const info = getDraftInfo<T>(type);
    if (info?.timestamp) {
      setLastSaved(formatTime(info.timestamp));
      setStatus("saved");
    }
  }, [type]);

  const handleSave = useCallback(() => {
    setStatus("saving");
    const ok = saveDraft(type, data);
    setStatus(ok ? "saved" : "idle");
    if (ok) setLastSaved(formatTime(Date.now()));
  }, [type, data]);

  const handleReset = useCallback(() => {
    deleteDraft(type);
    setLastSaved(null);
    setStatus("idle");
    onReset?.();
  }, [type, onReset]);

  return (
    <div className="flex items-center gap-[8px]">
      <button
        onClick={handleSave}
        className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-lg transition-all text-[13px] font-semibold bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-sm"
      >
        <span className="material-symbols-outlined text-[16px]">
          {status === "saving" ? "hourglass_empty" : "save"}
        </span>
        {status === "saving" ? "Menyimpan..." : "Simpan"}
      </button>

      <button
        onClick={handleReset}
        className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-lg transition-all text-[13px] font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface-variant active:scale-95"
      >
        <span className="material-symbols-outlined text-[16px]">delete</span>
        Hapus
      </button>

      {lastSaved && (
        <span className="text-[11px] text-on-surface-variant flex items-center gap-[4px]">
          <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
          {lastSaved}
        </span>
      )}
    </div>
  );
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  if (diff < 60000) return "baru saja";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}j lalu`;

  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
