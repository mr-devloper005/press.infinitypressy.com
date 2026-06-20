'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session } = useEditableLocalAuthSession()
  const pages = [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Search', href: '/search' }, { label: session ? 'Publish' : 'Author account', href: session ? '/create' : '/login' }]
  return (
    <footer className="bg-[var(--slot4-dark-bg)] text-white">
      <div className="h-2 bg-[var(--slot4-accent-soft)]" />
      <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden border border-white/15 bg-white"><img src="/favicon.png" alt="" className="absolute inset-0 h-full w-full object-cover" /></span>
              <span className="editorial-brand text-4xl font-black sm:text-5xl">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <form action="/signup" className="mt-8 flex max-w-lg border-b border-white/45">
              <input name="email" type="email" placeholder="Your email for the weekly edition" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-white/40" />
              <button className="text-[11px] font-black uppercase tracking-[.16em] text-[var(--slot4-accent-soft)]">Subscribe</button>
            </form>
          </div>
          <div>
            <h3 className="press-kicker border-b border-white/20 pb-4 text-[var(--slot4-accent-soft)]">Publication</h3>
            <div className="mt-3 grid">
              {pages.map((item) => <Link key={item.href} href={item.href} className="border-b border-white/10 py-3 text-sm text-white/80 hover:text-white">{item.label}</Link>)}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-5 text-center text-[10px] font-bold uppercase tracking-[.16em] text-white/45">© {year} {SITE_CONFIG.name}. All rights reserved.</div>
    </footer>
  )
}
