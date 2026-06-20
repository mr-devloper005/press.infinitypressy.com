'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Distribution, syndication, collaborations, and campaign enquiries.' },
  { icon: Mail, title: 'General support', body: 'Account, publishing, and general site assistance.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] shadow-[0_18px_55px_rgba(26,49,44,.07)]">
            <div className="grid lg:grid-cols-[.82fr_1.18fr]">
              <aside className="bg-[var(--slot4-dark-bg)] text-white">
                <div className="p-6 sm:p-8">
                  <p className="press-kicker text-[var(--slot4-accent-soft)]">{pagesContent.contact.eyebrow}</p>
                  <h1 className="mt-3 text-3xl font-black leading-[.98] tracking-[-.055em] sm:text-4xl">Let&apos;s put your story in the right hands.</h1>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/60">Share what you are publishing, fixing, or planning. Your message will reach the most relevant desk.</p>
                </div>
                <div className="border-t border-white/15">
                  {desks.map((desk, index) => (
                    <div key={desk.title} className="grid grid-cols-[36px_1fr_auto] gap-3 border-b border-white/15 px-6 py-4 last:border-b-0 sm:px-8">
                      <span className="flex h-8 w-8 items-center justify-center border border-white/20 text-[var(--slot4-accent-soft)]"><desk.icon className="h-4 w-4" /></span>
                      <div><h2 className="text-sm font-black tracking-[-.02em]">{desk.title}</h2><p className="mt-1 text-xs leading-5 text-white/50">{desk.body}</p></div>
                      <span className="pt-1 text-[9px] font-black tracking-[.14em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5 sm:p-7 lg:p-8">
                <div className="border-b-2 border-[#1a312c] pb-4">
                  <p className="press-kicker text-[var(--slot4-accent)]">Send a message</p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-.045em] sm:text-3xl">{pagesContent.contact.formTitle}</h2>
                  <p className="mt-2 text-xs leading-5 text-[#1a312c]/55">Complete the form and include enough detail for us to route your request.</p>
                </div>
                <EditableContactLeadForm />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#1a312c]/20 pt-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#1a312c]/50 sm:flex-row">
            <span>Editorial and publication enquiries</span><span>Messages are reviewed by the relevant desk</span>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
