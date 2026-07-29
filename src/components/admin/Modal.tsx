"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { uploadMedia } from "@/lib/client/api";

export const inputCls =
    "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-650 focus:ring-2 focus:ring-emerald-100";

interface ModalProps {
    open: boolean;
    title: string;
    subtitle?: string;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Modal({ open, title, subtitle, onClose, children, footer }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
            <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
                <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
                    <div>
                        <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900">{title}</h2>
                        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                    </div>
                    <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-stone-100 hover:text-slate-700" aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
                {footer && <div className="flex justify-end gap-3 border-t border-stone-100 bg-stone-50/60 px-6 py-4">{footer}</div>}
            </div>
        </div>
    );
}

export function Field({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) {
    return (
        <div className={full ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">{label}</label>
            {children}
        </div>
    );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chooseFile = async (file: File | undefined) => {
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            const uploaded = await uploadMedia(file, "greengrow/content");
            onChange(uploaded.secure_url);
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : "Unable to upload image.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">{label}</label>
            <div className="flex items-center gap-4">
                <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 disabled:opacity-60">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value} alt="preview" className="h-full w-full object-cover" />
                    ) : uploading ? <LoaderCircle className="h-6 w-6 animate-spin text-emerald-650" /> : <ImagePlus className="h-6 w-6 text-slate-300" />}
                </button>
                <div className="min-w-0 flex-1">
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => void chooseFile(event.target.files?.[0])} />
                    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Cloudinary URL or /assets/hero_1.jpeg" className={inputCls} />
                    <p className="mt-1 text-xs text-slate-400">Click the preview to upload through Cloudinary, or paste an existing URL.</p>
                    {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export function SaveFooter({ onClose, isEdit, onSave }: { onClose: () => void; isEdit: boolean; onSave: () => void | Promise<void> }) {
    return (
        <>
            <button type="button" onClick={onClose} className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-stone-50">Cancel</button>
            <button type="button" onClick={() => void onSave()} className="rounded-xl bg-emerald-650 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750">{isEdit ? "Update" : "Save"}</button>
        </>
    );
}
