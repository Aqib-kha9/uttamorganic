"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    title: string;
    subtitle?: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    maxWidth?: string;
}

export default function Modal({
    open,
    title,
    subtitle,
    onClose,
    children,
    footer,
    maxWidth = "max-w-2xl",
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
            <div
                className={`flex max-h-[92vh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl`}
            >
                <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
                    <div>
                        <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900">
                            {title}
                        </h2>
                        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-stone-100 hover:text-slate-700"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

                {footer && (
                    <div className="flex items-center justify-end gap-3 border-t border-stone-100 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export const inputCls =
    "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-650 focus:ring-2 focus:ring-emerald-100";

export function Field({
    label,
    children,
    full,
}: {
    label: string;
    children: ReactNode;
    full?: boolean;
}) {
    return (
        <div className={full ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                {label}
            </label>
            {children}
        </div>
    );
}

export function ImageField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                {label}
            </label>
            <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-[10px] text-slate-300">No image</span>
                    )}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="/assets/hero_1.jpeg or URL"
                    className={inputCls}
                />
            </div>
        </div>
    );
}

export function SaveFooter({
    onClose,
    isEdit,
    onSave,
}: {
    onClose: () => void;
    isEdit: boolean;
    onSave: () => void;
}) {
    return (
        <>
            <button
                onClick={onClose}
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-stone-50"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="rounded-xl bg-emerald-650 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750"
            >
                {isEdit ? "Update" : "Save"}
            </button>
        </>
    );
}
