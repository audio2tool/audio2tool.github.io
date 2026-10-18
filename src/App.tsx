import { useState, useRef } from 'react'
import { Database, FileText, Github, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { PlayerArea } from './components/PlayerArea'
import { FiguresSection } from './components/FiguresSection'
import { TaxonomySection } from './components/TaxonomySection'
import { TIER_CONFIGS } from './types'

const ABSTRACT = `Voice assistants increasingly rely on Speech Language Models (SpeechLMs) to interpret spoken queries and execute complex tasks, yet existing benchmarks lack domain breadth, acoustic diversity, and compositional reasoning complexity to evaluate tool-calling performance. We introduce Audio2Tool, a large-scale dataset comprising approximately 30,000 queries designed to assess tool-calling capabilities of SpeechLMs across three primary domains: Smart Car, Smart Home, and Wearables. Our benchmark features a multi-tier complexity hierarchy, ranging from simple direct commands to complex multi-intent and needle-in-a-haystack extraction to isolate distinct failure modes. To ensure realism, we employ zero-shot voice cloning text-to-speech synthesis and diverse noise profiles to simulate in-the-wild conditions. Evaluations of state-of-the-art SpeechLMs and ASR-LLM pipelines show strong performance on simple commands but significant degradation under compositional and acoustic challenges.`

interface Author {
  name: string
  /** Marked with a dagger (†) as an equal-contribution author. */
  equal?: boolean
  /** Marked with a star (★) as the research lead. */
  researchLead?: boolean
}

const AUTHORS: Author[] = [
  { name: 'Ramit Pahwa', equal: true, researchLead: true },
  { name: 'Apoorva Beedu', equal: true },
  { name: 'Parivesh Priye' },
  { name: 'Rutu Gandhi' },
  { name: 'Saloni Takawale' },
  { name: 'Aruna Baijal' },
  { name: 'Zengli Yang' },
]
const AFFILIATION = 'Rivian and Volkswagen Group Technologies'
const CONFERENCE = 'Interspeech 2026'
const PROCEEDINGS = 'https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.html'
const PDF = 'https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.pdf'
const DOI = '10.21437/Interspeech.2026-2857'
const BIBTEX = `@inproceedings{pahwa26_interspeech,
  title     = {{Audio2Tool: Speak, Call, Act - A Dataset for Benchmarking Speech Tool Use}},
  author    = {Ramit Pahwa and Apoorva Beedu and Parivesh Priye and Rutu Gandhi and Saloni Takawale and Aruna Baijal and Zengli Yang},
  year      = {2026},
  booktitle = {{Interspeech 2026}},
  pages     = {3453--3457},
  doi       = {10.21437/Interspeech.2026-2857},
  issn      = {2958-1796},
  url       = {https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.html}
}`

/**
 * External resources shown in the hero, nav, and footer.
 * Set `code` and `leaderboard` to their URLs once available; while `null`
 * they render as disabled "Soon" buttons so the layout is already in place.
 */
const LINKS: Record<'paper' | 'dataset' | 'code' | 'leaderboard', string | null> = {
  paper: PROCEEDINGS,
  dataset: 'https://huggingface.co/datasets/RVtech/Audio2Tool',
  code: 'https://github.com/audio2tool/Audio2Tool',
  leaderboard: 'https://huggingface.co/spaces/RVtech/Audio2ToolLeaderboard',
}

interface ResourceLinkProps {
  href: string | null
  icon: LucideIcon
  label: string
}

function ResourceLink({ href, icon: Icon, label }: ResourceLinkProps) {
  const base = 'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium'
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title={`${label} coming soon`}
        className={`${base} cursor-not-allowed border-zinc-200 bg-zinc-50 text-zinc-400`}
      >
        <Icon className="h-4 w-4" />
        {label}
        <span className="ml-1 rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
          Soon
        </span>
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  )
}

interface NavLinkProps {
  href: string | null
  label: string
}

function NavLink({ href, label }: NavLinkProps) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title={`${label} coming soon`}
        className="text-sm font-medium text-zinc-400 cursor-not-allowed"
      >
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
    >
      {label}
    </a>
  )
}

export default function App() {
  const [selectedTierId, setSelectedTierId] = useState(1)
  const datasetSectionRef = useRef<HTMLElement>(null)
  const selectedTier = TIER_CONFIGS.find((t) => t.id === selectedTierId) ?? TIER_CONFIGS[0]
  const hasEqualContribution = AUTHORS.some((a) => a.equal)

  const scrollToDataset = () => {
    datasetSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      {/* Sticky nav — CVPR/ECCV style */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <a href="#" className="text-xl font-bold text-zinc-900 tracking-tight hover:text-zinc-700">
            Audio2Tool
          </a>
          <nav className="flex flex-wrap items-center gap-6">
            <a href="#overview" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Overview
            </a>
            <a href="#citation" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Citation
            </a>
            <button
              type="button"
              onClick={scrollToDataset}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Samples
            </button>
            <NavLink href={LINKS.paper} label="Paper" />
            <NavLink href={LINKS.dataset} label="Dataset" />
            <NavLink href={LINKS.code} label="Code" />
            <NavLink href={LINKS.leaderboard} label="Leaderboard" />
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Audio2Tool
            <span className="mt-2 block text-lg font-normal text-zinc-600 tracking-normal">
              Speak, Call, Act — A Dataset for Benchmarking Speech Tool Use
            </span>
          </h1>
          <p className="mt-4 text-sm text-zinc-700 max-w-2xl mx-auto">
            {AUTHORS.map((author, i) => (
              <span key={author.name}>
                <span className="whitespace-nowrap">
                  {author.researchLead && <><sup title="Research lead">★</sup>{' '}</>}
                  {author.name}
                  {author.equal && <sup>†</sup>}
                </span>
                {i < AUTHORS.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p className="mt-1 text-sm text-zinc-500">{AFFILIATION}</p>
          {AUTHORS.some((author) => author.researchLead) && (
            <p className="mt-1 text-xs text-zinc-400">
              <sup>★</sup> Research lead
            </p>
          )}
          {hasEqualContribution && (
            <p className="mt-1 text-xs text-zinc-400">
              <sup>†</sup> Equal contribution
            </p>
          )}
          <p className="mt-2 text-sm font-medium text-zinc-700">
            {CONFERENCE} · pp. 3453–3457
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            DOI:{' '}
            <a href={`https://doi.org/${DOI}`} className="text-blue-600 underline underline-offset-2">
              {DOI}
            </a>
          </p>
          <p className="mt-5 text-zinc-700 max-w-2xl mx-auto">
            A benchmark for speech function calling and audio-native tool use across smart car,
            smart home, and wearable APIs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ResourceLink href={LINKS.paper} icon={FileText} label="Paper" />
            <ResourceLink href={PDF} icon={FileText} label="PDF" />
            <ResourceLink href={LINKS.dataset} icon={Database} label="Dataset" />
            <ResourceLink href={LINKS.code} icon={Github} label="Code" />
            <ResourceLink href={LINKS.leaderboard} icon={Trophy} label="Leaderboard" />
            <button
              type="button"
              onClick={scrollToDataset}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Explore the samples
            </button>
          </div>
        </section>

        {/* Overview: Abstract then Taxonomy */}
        <section id="overview" className="border-t border-zinc-100 bg-zinc-50/50">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Abstract</h2>
            <p className="text-zinc-700 leading-relaxed max-w-3xl">
              {ABSTRACT}
            </p>
            <div className="mt-8 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
              <h2 className="text-2xl font-bold text-zinc-900">Benchmark scope</h2>
              <p>
                Audio2Tool evaluates spoken tool selection and argument grounding. It supports
                comparisons of Speech Language Models (SpeechLMs) and speech recognition plus
                language model (ASR–LLM) pipelines on structured tool-call prediction.
              </p>
              <p>
                The eight tiers test direct commands, parameter extraction, multiple intents,
                implicit requests, distracting context, self-corrections, multi-turn dialogue,
                and overlapping foreground and background speech. Speech is synthesized using
                reference voices; noise and intent blending probe acoustic robustness.
                Predicted tool calls do not establish successful execution in a live environment.
              </p>
              <p className="text-sm text-zinc-600">
                Earlier preprint title: “Audio2Tool: Bridging Spoken Language Understanding and
                Function Calling.” The preprint is available as{' '}
                <a href="https://arxiv.org/abs/2604.22821" className="text-blue-600 underline underline-offset-2">
                  arXiv:2604.22821
                </a>.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 pb-16">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Tool Taxonomy</h2>
            <TaxonomySection />
          </div>
        </section>

        {/* Dataset: tier samples (current benchmark UI) */}
        <section
          id="dataset"
          ref={datasetSectionRef}
          className="border-t border-zinc-200 bg-white min-h-[80vh]"
        >
          <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Dataset & Samples</h2>
            <p className="text-zinc-600 mb-3 max-w-2xl">
              Explore representative audio samples and ground-truth tool calls for each complexity tier. Select a tier and play samples with transcripts.
            </p>
            {LINKS.dataset && (
              <p className="text-sm text-zinc-600 mb-8">
                Dataset files and release documentation are available on{' '}
                <a
                  href={LINKS.dataset}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2"
                >
                  Hugging Face
                </a>
                . The paper reports benchmark-level counts; see the dataset card for release contents and subset statistics.
              </p>
            )}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-left border-collapse">
                <caption className="text-left text-base font-semibold text-zinc-800 mb-3">
                  Eight evaluation tiers
                </caption>
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th scope="col" className="py-2 pr-4">Tier</th>
                    <th scope="col" className="py-2 pr-4">Task</th>
                    <th scope="col" className="py-2">Challenge</th>
                  </tr>
                </thead>
                <tbody>
                  {TIER_CONFIGS.map((tier) => (
                    <tr key={tier.id} className="border-b border-zinc-200">
                      <th scope="row" className="py-2 pr-4 font-medium">{tier.id}. {tier.name}</th>
                      <td className="py-2 pr-4">{tier.subtitle}</td>
                      <td className="py-2">{tier.challenge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex border-t border-zinc-200">
            <Sidebar
              tiers={TIER_CONFIGS}
              selectedTierId={selectedTierId}
              onSelectTier={setSelectedTierId}
            />
            <div className="flex-1 min-w-0">
              <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="mb-6">
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Tier {selectedTier.id}
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-900 mt-1">{selectedTier.name}</h3>
                  <p className="text-sm text-zinc-600 mt-0.5">{selectedTier.subtitle}</p>
                  <p className="text-xs text-zinc-500 mt-2">
                    Key challenge: {selectedTier.challenge}
                  </p>
                </div>
                <PlayerArea tier={selectedTier} />
              </div>
            </div>
          </div>
        </section>

        {/* Key Results: figures */}
        <section className="border-t border-zinc-200 bg-zinc-50/50">
          <div className="max-w-4xl mx-auto px-6 py-12 pb-16">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Key Results</h2>
            <FiguresSection />
          </div>
        </section>

        <section id="citation" className="border-t border-zinc-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Citation</h2>
            <p className="text-zinc-700 leading-relaxed">
              Pahwa, R., Beedu, A., Priye, P., Gandhi, R., Takawale, S., Baijal, A., and Yang, Z.
              (2026). Audio2Tool: Speak, Call, Act - A Dataset for Benchmarking Speech Tool Use.
              Interspeech 2026, 3453–3457.{' '}
              <a href={`https://doi.org/${DOI}`} className="text-blue-600 underline underline-offset-2">
                doi: {DOI}
              </a>.
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              <a href={`${import.meta.env.BASE_URL}citation.bib`} download className="text-blue-600 underline underline-offset-2">
                Download BibTeX
              </a>
              {' · '}
              <a href={PROCEEDINGS} className="text-blue-600 underline underline-offset-2">Official proceedings record</a>
              {' · '}
              <a href="https://arxiv.org/abs/2604.22821" className="text-blue-600 underline underline-offset-2">arXiv preprint</a>
            </p>
            <pre className="mt-5 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed"><code>{BIBTEX}</code></pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
          <p>Audio2Tool — Benchmark for Speech Tool Use. {CONFERENCE}.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <NavLink href={LINKS.paper} label="Interspeech proceedings" />
            <NavLink href={LINKS.dataset} label="Dataset on Hugging Face" />
            <NavLink href={LINKS.code} label="Code" />
            <NavLink href={LINKS.leaderboard} label="Leaderboard" />
          </p>
        </footer>
      </main>
    </div>
  )
}
