import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, PenLine, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="grid overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] shadow-[0_18px_55px_rgba(26,49,44,.07)] lg:grid-cols-[.85fr_1.15fr]">
            <aside className="relative overflow-hidden bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-9 lg:p-10">
              <div className="absolute right-[-6rem] top-[-6rem] h-64 w-64 rounded-full border-[50px] border-[var(--slot4-accent)]/25" />
              <div className="relative flex h-full flex-col">
                <span className="flex h-10 w-10 items-center justify-center border border-white/20 text-[var(--slot4-accent-soft)]"><PenLine className="h-4 w-4" /></span>
                <p className="press-kicker mt-8 text-[var(--slot4-accent-soft)]">{pagesContent.auth.signup.badge}</p>
                <h1 className="mt-3 max-w-md text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-5xl">Create your publishing account.</h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Join the publication workspace to prepare and submit stories through one focused account.</p>
                <div className="mt-10 border-t border-white/15 pt-5 lg:mt-auto"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-white/40"><ShieldCheck className="h-3.5 w-3.5" /> Local account access</p></div>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="press-kicker text-[var(--slot4-accent)]">Create account</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.05em] sm:text-4xl">{pagesContent.auth.signup.formTitle}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#1a312c]/55">Add your details below to create an account and enter the publishing workspace.</p>
              <EditableLocalSignupForm />
              <p className="mt-5 border-t border-[#1a312c]/15 pt-5 text-sm text-[#1a312c]/60">Already have an account? <Link href="/login" className="inline-flex items-center gap-1 font-black text-[var(--slot4-accent)] hover:text-[var(--slot4-dark-bg)]">{pagesContent.auth.signup.loginCta} <ArrowRight className="h-3.5 w-3.5" /></Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
