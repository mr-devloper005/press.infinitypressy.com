'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const utilityLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const deskLinks = [
  { label: 'Latest', href: '/updates' },
  { label: 'Business', href: '/updates?category=business' },
  { label: 'News Media', href: '/updates?category=news-media' },
  { label: 'Press Releases', href: '/updates?category=press-release' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="relative z-50 bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)] shadow-[0_12px_35px_rgba(26,49,44,.06)]">
      <div className="border-b border-[#1a312c]/10 bg-white/60">
        <div className="mx-auto flex min-h-11 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <nav className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-[.12em] md:flex">
            {utilityLinks.map((item) => <Link key={item.href} href={item.href} className="hover:text-[var(--slot4-accent)]">{item.label}</Link>)}
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#1a312c]/55">Independent media distribution</p>
          <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-[.12em]">
            {session ? <><Link href="/create" className="hidden sm:block">Submit</Link><button type="button" onClick={logout} className="hidden sm:block">Logout</button></> : <Link href="/login" className="hidden sm:block">Author account</Link>}
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[110px] max-w-[1180px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group min-w-0">
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-16 shrink-0 overflow-hidden border border-[#1a312c]/15 bg-white">
              <img src="/favicon.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </span>
            <span className="editorial-brand truncate text-3xl font-black sm:text-4xl">{SITE_CONFIG.name}</span>
          </div>
          <span className="ml-[4.75rem] mt-1 hidden text-[9px] font-black uppercase tracking-[.28em] text-[var(--slot4-accent)] sm:block">Stories in circulation</span>
        </Link>
        <form action="/search" className="hidden w-full max-w-[310px] border-b border-[#1a312c]/35 md:flex">
          <input name="q" type="search" placeholder="Search the publication" className="min-w-0 flex-1 bg-transparent px-1 py-3 text-xs outline-none placeholder:text-[#1a312c]/45" />
          <button aria-label="Search" className="px-3"><Search className="h-4 w-4" /></button>
        </form>
        <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center border border-[#1a312c]/25 md:hidden" aria-label="Toggle navigation">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-[#1a312c]/20 bg-[var(--slot4-surface-bg)] p-4 md:hidden">
          <form action="/search" className="mb-3 flex border border-[#1a312c]/25 bg-white"><input name="q" placeholder="Search" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" /><button className="px-4"><Search className="h-4 w-4" /></button></form>
          <nav className="grid grid-cols-2 border-l border-t border-[#1a312c]/15">
            {[...deskLinks, ...utilityLinks, { label: session ? 'Publish' : 'Author account', href: session ? '/create' : '/login' }].map((item) => <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="border-b border-r border-[#1a312c]/15 bg-white px-4 py-3 text-xs font-black uppercase tracking-[.08em]">{item.label}</Link>)}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
