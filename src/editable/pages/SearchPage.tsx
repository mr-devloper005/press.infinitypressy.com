import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/search', title: pagesContent.search.metadata.title, description: pagesContent.search.metadata.description })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const featured = index === 0

  return (
    <Link href={href} className={`press-card group grid min-w-0 overflow-hidden border-b border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] transition hover:bg-white ${featured ? 'sm:grid-cols-[220px_1fr]' : image ? 'grid-cols-[112px_1fr] sm:grid-cols-[150px_1fr]' : ''}`}>
      {image ? <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${featured ? 'min-h-[190px]' : 'min-h-[150px]'}`}><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div> : null}
      <div className="min-w-0 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 text-[9px] font-black uppercase tracking-[.18em] text-[var(--slot4-accent)]"><span>{taskLabel}</span><span className="text-[#1a312c]/35">{String(index + 1).padStart(2, '0')}</span></div>
        <h2 className={`mt-3 line-clamp-3 font-black leading-[1.07] tracking-[-0.035em] text-[var(--slot4-page-text)] ${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-2 text-xs leading-6 text-[#1a312c]/60 sm:text-sm">{summary}</p> : null}
        <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#1a312c]/55 group-hover:text-[var(--slot4-accent)]">Open result <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="overflow-hidden border border-[#1a312c]/15 bg-[var(--slot4-surface-bg)] shadow-[0_18px_55px_rgba(26,49,44,.07)]">
            <div className="grid lg:grid-cols-[.78fr_1.22fr]">
              <div className="bg-[var(--slot4-dark-bg)] p-6 text-white sm:p-8">
                <p className="press-kicker text-[var(--slot4-accent-soft)]">{pagesContent.search.hero.badge}</p>
                <h1 className="mt-3 text-3xl font-black leading-none tracking-[-0.055em] sm:text-4xl">Search the publication</h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/60">Find stories, public updates, and media releases across every active section.</p>
              </div>
              <form action="/search" className="self-center p-5 sm:p-7">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 border border-[#1a312c]/25 bg-white px-4 py-3"><Search className="h-4 w-4 opacity-45" /><input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" /></label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="flex items-center gap-2 border border-[#1a312c]/25 bg-white px-4 py-3"><Filter className="h-4 w-4 opacity-45" /><input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" /></label>
                  <select name="task" defaultValue={task} className="min-w-0 border border-[#1a312c]/25 bg-white px-4 py-3 text-sm font-bold outline-none"><option value="">All content types</option>{enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select>
                </div>
                <button className="mt-2 inline-flex h-11 w-full items-center justify-center bg-[var(--slot4-accent)] px-6 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[var(--slot4-dark-bg)]" type="submit">Search</button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#1a312c] px-1 py-6 sm:py-7">
            <div><p className="press-kicker text-[var(--slot4-accent)]">{results.length} results</p><h2 className="mt-2 text-2xl font-black tracking-[-0.045em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2></div>
            <Link href="/article" className="inline-flex items-center gap-2 border border-[#1a312c]/25 bg-[var(--slot4-surface-bg)] px-4 py-2.5 text-[10px] font-black uppercase tracking-[.12em] hover:bg-white">Browse latest <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>

          {results.length ? <div className="grid border-x border-[#1a312c]/15 lg:grid-cols-2 lg:[&>*:first-child]:col-span-2">{results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}</div> : <div className="border border-dashed border-[#1a312c]/35 bg-[var(--slot4-surface-bg)] p-8 text-center sm:p-10"><Search className="mx-auto h-6 w-6 text-[var(--slot4-accent)]" /><p className="mt-4 text-xl font-black tracking-[-0.04em]">No matching posts found.</p><p className="mt-2 text-sm text-[#1a312c]/60">Try a different keyword, content type, or category.</p></div>}
        </section>
      </main>
    </EditableSiteShell>
  )
}
