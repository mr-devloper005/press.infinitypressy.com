import Link from 'next/link'
import { ArrowRight, BookOpen, Layers3, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcons = [BookOpen, Layers3, ShieldCheck]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] shadow-[0_18px_55px_rgba(26,49,44,.07)]">
            <header className="grid lg:grid-cols-[.78fr_1.22fr]">
              <div className="relative overflow-hidden bg-[var(--slot4-dark-bg)] p-6 text-white sm:p-8">
                <div className="absolute right-[-5rem] top-[-5rem] h-52 w-52 rounded-full border-[42px] border-[var(--slot4-accent)]/25" />
                <div className="relative">
                  <p className="press-kicker text-[var(--slot4-accent-soft)]">{pagesContent.about.badge}</p>
                  <h1 className="mt-3 max-w-md text-3xl font-black leading-[.98] tracking-[-.055em] sm:text-4xl">Independent media, built for clear stories.</h1>
                  <p className="mt-5 text-[10px] font-black uppercase tracking-[.16em] text-white/35">{SITE_CONFIG.name}</p>
                </div>
              </div>
              <div className="flex items-center p-6 sm:p-8">
                <div>
                  <p className="press-kicker text-[var(--slot4-accent)]">About the publication</p>
                  <p className="mt-4 max-w-2xl text-xl font-black leading-[1.35] tracking-[-.035em] sm:text-2xl">{pagesContent.about.description}</p>
                </div>
              </div>
            </header>

            <div className="grid border-t border-[#1a312c]/15 lg:grid-cols-[1.18fr_.82fr]">
              <article className="border-b border-[#1a312c]/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between border-b-2 border-[#1a312c] pb-3">
                  <h2 className="text-xl font-black tracking-[-.04em]">Our approach</h2>
                  <span className="press-kicker text-[var(--slot4-accent)]">The editorial note</span>
                </div>
                <div className="mt-5 max-w-[640px] space-y-5 text-sm leading-7 text-[#1a312c]/70 sm:text-base sm:leading-8">
                  {pagesContent.about.paragraphs.map((paragraph, index) => (
                    <p key={paragraph} className={index === 0 ? 'font-semibold text-[#1a312c]/85' : ''}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-7 border-l-4 border-[var(--slot4-accent)] bg-[var(--slot4-panel-bg)] px-5 py-4">
                  <p className="text-sm font-bold leading-6">Good publishing should make useful information easier to find, understand, and continue exploring.</p>
                </div>
              </article>

              <aside className="bg-[var(--slot4-panel-bg)]">
                {pagesContent.about.values.map((value, index) => {
                  const Icon = valueIcons[index] || BookOpen
                  return (
                    <div key={value.title} className="grid grid-cols-[36px_1fr_auto] gap-3 border-b border-[#1a312c]/15 px-6 py-5 last:border-b-0 sm:px-7">
                      <span className="flex h-9 w-9 items-center justify-center border border-[#1a312c]/20 bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)]"><Icon className="h-4 w-4" /></span>
                      <div><h2 className="text-base font-black leading-tight tracking-[-.025em]">{value.title}</h2><p className="mt-2 text-xs leading-5 text-[#1a312c]/60">{value.description}</p></div>
                      <span className="pt-1 text-[9px] font-black tracking-[.14em] text-[#1a312c]/30">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  )
                })}
              </aside>
            </div>

            <div className="flex flex-col gap-5 border-t border-[#1a312c]/15 bg-[var(--slot4-dark-bg)] px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div><p className="press-kicker text-[var(--slot4-accent-soft)]">Continue reading</p><h2 className="mt-2 text-xl font-black tracking-[-.035em] sm:text-2xl">Discover the latest stories in circulation.</h2></div>
              <Link href="/search" className="inline-flex w-fit items-center gap-2 bg-[var(--slot4-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[.15em] text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]">Explore the archive <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
