import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Newspaper } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="grid overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] shadow-[0_18px_55px_rgba(26,49,44,.07)] lg:grid-cols-[.85fr_1.15fr]">
            <aside className="relative overflow-hidden bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-9 lg:p-10">
              <div className="absolute right-[-6rem] top-[-6rem] h-64 w-64 rounded-full border-[50px] border-[var(--slot4-accent)]/25" />
              <div className="relative flex h-full flex-col">
                <span className="flex h-10 w-10 items-center justify-center border border-white/20 text-[var(--slot4-accent-soft)]"><LockKeyhole className="h-4 w-4" /></span>
                <p className="press-kicker mt-8 text-[var(--slot4-accent-soft)]">{pagesContent.auth.login.badge}</p>
                <h1 className="mt-3 max-w-md text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-5xl">Welcome back to the publication.</h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Sign in to manage submissions and continue working with the publishing desk.</p>
                <div className="mt-10 border-t border-white/15 pt-5 lg:mt-auto"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-white/40"><Newspaper className="h-3.5 w-3.5" /> Stories in circulation</p></div>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="press-kicker text-[var(--slot4-accent)]">Member access</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.05em] sm:text-4xl">{pagesContent.auth.login.formTitle}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#1a312c]/55">Enter the email and password associated with your account.</p>
              <EditableLocalLoginForm />
              <p className="mt-5 border-t border-[#1a312c]/15 pt-5 text-sm text-[#1a312c]/60">New here? <Link href="/signup" className="inline-flex items-center gap-1 font-black text-[var(--slot4-accent)] hover:text-[var(--slot4-dark-bg)]">{pagesContent.auth.login.createCta} <ArrowRight className="h-3.5 w-3.5" /></Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
