import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const archiveHref = (route: string) => route === '/media-network' ? '/search' : route

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const side = posts.slice(1, 3)
  return (
    <section className="press-grid border-b border-[#1a312c]/15 bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} py-8 lg:py-12`}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-[var(--slot4-dark-bg)] pb-4">
          <div><p className="press-kicker text-[var(--slot4-accent)]">The daily edition</p><h1 className="mt-2 text-4xl font-black tracking-[-.055em] sm:text-6xl">Stories in circulation.</h1></div>
          <p className="max-w-sm text-sm leading-6 text-[#1a312c]/65">Independent updates, public announcements, and useful perspectives from across the media landscape.</p>
        </div>
        {lead ? (
          <div className="grid gap-5 lg:grid-cols-[1.55fr_.7fr]">
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="press-card group relative min-h-[520px] overflow-hidden bg-[var(--slot4-dark-bg)] text-white">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(137,215,183,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(137,215,183,.18)_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="absolute right-[-8rem] top-[-8rem] h-96 w-96 rounded-full border-[64px] border-[var(--slot4-accent)]/25" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <span className="bg-[var(--slot4-accent-soft)] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[var(--slot4-dark-bg)]">Lead story</span>
                <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[.97] tracking-[-.055em] sm:text-6xl">{lead.title}</h2>
                {getEditableExcerpt(lead) ? <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">{getEditableExcerpt(lead, 190)}</p> : null}
              </div>
            </Link>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {side.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="press-card group grid min-h-[245px] grid-cols-[.8fr_1fr] overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] lg:grid-cols-1">
                <div className="overflow-hidden"><img src={getEditablePostImage(post)} alt={post.title || 'Story image'} className="h-full min-h-36 w-full object-cover" /></div>
                <div className="p-5"><p className="press-kicker text-[var(--slot4-accent)]">{index ? 'Across the desk' : 'In focus'}</p><h3 className="mt-3 text-xl font-black leading-tight tracking-[-.035em]">{post.title}</h3></div>
              </Link>)}
            </div>
          </div>
        ) : <div className="min-h-[420px] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-12"><p className="press-kicker text-[var(--slot4-accent-soft)]">Media distribution</p><h2 className="mt-5 max-w-3xl text-5xl font-black leading-none tracking-[-.06em]">A considered home for public stories and timely updates.</h2><Link href={archiveHref(primaryRoute)} className={`${dc.button.accent} mt-8`}>Browse the edition <ArrowRight className="h-4 w-4" /></Link></div>}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const stories = posts.slice(3, 10)
  if (!stories.length) return null
  return <section className="bg-[var(--slot4-surface-bg)]"><div className={`${dc.shell.section} py-12`}><div className="flex items-end justify-between border-b-2 border-[#1a312c] pb-4"><div><p className="press-kicker text-[var(--slot4-accent)]">Latest dispatches</p><h2 className="mt-2 text-4xl font-black tracking-[-.05em]">From the wire</h2></div><Link href={archiveHref(primaryRoute)} className="hidden items-center gap-2 text-xs font-black uppercase tracking-[.12em] sm:flex">All stories <ArrowRight className="h-4 w-4" /></Link></div><div className={`${dc.layout.rail} mt-6`}>{stories.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}</div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[8] || posts[0]
  const list = posts.slice(9, 14).length ? posts.slice(9, 14) : posts.slice(1, 6)
  if (!feature) return null
  return <section className="bg-[var(--slot4-page-bg)]"><div className={`${dc.shell.section} py-14 lg:py-20`}><div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
    <Link href={postHref(primaryTask, feature, primaryRoute)} className="press-card group grid overflow-hidden bg-[var(--slot4-dark-bg)] text-white sm:grid-cols-[1.05fr_.95fr]"><div className="overflow-hidden"><img src={getEditablePostImage(feature)} alt={feature.title || 'Editor selection'} className="h-full min-h-[430px] w-full object-cover" /></div><div className="flex flex-col justify-end p-7 sm:p-9"><p className="press-kicker text-[var(--slot4-accent-soft)]">Editor&apos;s selection</p><h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.055em]">{feature.title}</h2>{getEditableExcerpt(feature) ? <p className="mt-5 text-sm leading-7 text-white/65">{getEditableExcerpt(feature, 170)}</p> : null}<span className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em]">Continue reading <ArrowRight className="h-4 w-4" /></span></div></Link>
    <aside><div className="border-b-2 border-[#1a312c] pb-3"><p className="press-kicker text-[var(--slot4-accent)]">Most read</p><h2 className="mt-2 text-3xl font-black tracking-[-.05em]">The briefing</h2></div>{list.map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}</aside>
  </div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((item) => item.posts)
  const source = (collected.length ? collected : posts).slice(0, 6)
  if (!source.length) return null
  return <section className="border-y border-[#1a312c]/15 bg-[var(--slot4-panel-bg)]"><div className={`${dc.shell.section} py-14`}><div className="mb-7 flex items-end justify-between border-b-2 border-[#1a312c] pb-4"><div><p className="press-kicker text-[var(--slot4-accent)]">Explore by story</p><h2 className="mt-2 text-4xl font-black tracking-[-.05em]">The public record</h2></div></div><div className="grid gap-px overflow-hidden border border-[#1a312c]/20 bg-[#1a312c]/20 md:grid-cols-2 lg:grid-cols-3">{source.map((post, index) => <Link key={`${post.id || post.slug}-${index}`} href={postHref(primaryTask, post, primaryRoute)} className="group bg-[var(--slot4-surface-bg)] p-6 transition hover:bg-white"><p className="press-kicker text-[var(--slot4-accent)]">{getEditableCategory(post)}</p><h3 className="mt-4 text-2xl font-black leading-[1.05] tracking-[-.04em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3><p className="mt-4 line-clamp-3 text-sm leading-6 text-[#1a312c]/60">{getEditableExcerpt(post, 130) || 'Open this dispatch for the full story and publication details.'}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em]">Read dispatch <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div>
    <form action="/search" className="mt-10 grid gap-5 bg-[var(--slot4-dark-bg)] p-6 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"><div><h3 className="text-2xl font-black tracking-[-.04em]">Search the publication</h3><p className="mt-1 text-sm text-white/55">Find stories, topics, companies, and recent announcements.</p></div><label className="flex min-w-0 border border-white/30 bg-white text-[var(--slot4-dark-bg)] sm:min-w-[360px]"><Search className="ml-4 mt-4 h-4 w-4" /><input name="q" placeholder="Search stories" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" /><button className="bg-[var(--slot4-accent)] px-5 text-xs font-black uppercase tracking-[.12em] text-white">Search</button></label></form>
  </div></section>
}

export function EditableHomeCta() {
  return <section className="bg-[var(--slot4-surface-bg)]"><div className={`${dc.shell.section} grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20`}><div><p className="press-kicker text-[var(--slot4-accent)]">The open desk</p><h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-.055em] sm:text-5xl">Have a story that belongs in circulation?</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#1a312c]/65">Share a public update, announcement, or media release with the publication.</p></div><Link href="/contact" className={dc.button.primary}>Contact the desk <ArrowRight className="h-4 w-4" /></Link></div></section>
}
