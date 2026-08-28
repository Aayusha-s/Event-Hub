"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page = 1, totalPages = 1, onPageChange = () => undefined }: { page?: number; totalPages?: number; onPageChange?: (page: number) => void }) {
    if (totalPages <= 1) return null;
    return <nav aria-label="Pagination" className="flex items-center justify-center gap-3"><button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="rounded-lg border border-border p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={18} /></button><span className="text-sm text-text-light">Page {page} of {totalPages}</span><button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="rounded-lg border border-border p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={18} /></button></nav>;
}
