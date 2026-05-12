import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Star, GitFork } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const content = {
  zh: {
    supertitle: 'OPEN SOURCE',
    title: '开源项目',
    subtitle: '开放研究成果，促进学术交流与技术共享',
    viewOnGithub: '在 GitHub 上查看',
  },
  en: {
    supertitle: 'OPEN SOURCE',
    title: 'Open Source',
    subtitle: 'Open research outcomes to promote academic exchange and technology sharing',
    viewOnGithub: 'View on GitHub',
  },
}

type Project = {
  name: string
  desc: string
  tags: string[]
  stars: number
  forks: number
  github: string
}

type RepoStats = {
  stars: number
  forks: number
}

const sharedProjects: Project[] = [
  {
    name: 'IceSfP',
    desc: 'Structure-Aware Consistency Priors for Shape from Polarization in Complex Media (ICML 2026). A dual-branch network integrating raw polarization features with physics-based priors for robust surface normal estimation.',
    tags: ['Polarization Imaging', '3D Reconstruction', 'ICML 2026', 'PyTorch'],
    stars: 0,
    forks: 0,
    github: 'https://github.com/ykmmm0/IceSfP',
  },
  {
    name: 'Polarization-3D-Imaging',
    desc: 'A comprehensive survey of data-driven polarization-based 3D imaging, from physics models to neural implicit representations, covering physics-based, data-driven, and implicit reconstruction methods.',
    tags: ['Polarization Imaging', '3D Reconstruction', 'Survey', 'Computer Vision'],
    stars: 6,
    forks: 0,
    github: 'https://github.com/ykmmm0/Polarization-3D-Imaging',
  },
  {
    name: 'MuS-Polar3D',
    desc: 'MuS-Polar3D dataset repository, containing multiple SfP evaluation baselines, code for plotting error heatmaps, ORB algorithm code, and more.',
    tags: ['3D Reconstruction', 'Deep Learning', 'Polarization Imaging', 'PyTorch'],
    stars: 9,
    forks: 0,
    github: 'https://github.com/WangPuyun/MuS-Polar3D',
  },
  {
    name: 'UD-SfPNet',
    desc: 'An Underwater Descattering Shape-from-Polarization Network for 3D Normal Reconstruction. A deep learning approach for robust surface normal estimation from underwater polarization images.',
    tags: ['Descattering', 'Underwater', '3D Reconstruction', 'PyTorch'],
    stars: 5,
    forks: 0,
    github: 'https://github.com/WangPuyun/UD-SfPNet',
  },
  {
    name: 'Mamba-SfP',
    desc: 'State-space model (Mamba) based architecture for Shape from Polarization. A novel approach leveraging selective structured state spaces for surface normal estimation.',
    tags: ['Polarization Imaging', '3D Reconstruction', 'Mamba', 'PyTorch'],
    stars: 2,
    forks: 0,
    github: 'https://github.com/WangPuyun/Mamba-SfP',
  },
  {
    name: 'SGuTA-SCubA',
    desc: 'Polarization video frame interpolation for 3D human pose reconstruction with attention mechanism. A novel approach for polarization-based 3D reconstruction.',
    tags: ['Polarization', '3D Reconstruction', 'Attention Mechanism', 'Computer Vision'],
    stars: 1,
    forks: 0,
    github: 'https://github.com/esthen-bit/SGuTA-SCubA',
  },
]

const projects: Record<'zh' | 'en', Project[]> = {
  zh: sharedProjects,
  en: sharedProjects,
}

// 自动获取 GitHub 仓库信息
function parseGitHubRepo(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname !== 'github.com') return null

    const segments = parsed.pathname.replace(/^\/+|\/+$/g, '').split('/')
    if (segments.length < 2) return null

    return {
      owner: segments[0],
      repo: segments[1].replace(/\.git$/, ''),
    }
  } catch {
    return null
  }
}

export default function OpenSource() {
  const { lang } = useLanguage()
  const t = content[lang]
  const projs = projects[lang]
  const [liveStats, setLiveStats] = useState<Record<string, RepoStats>>({})

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.querySelectorAll('.animate-in'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
          }
        )
      }
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.querySelectorAll('.os-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const uniqueRepos = Array.from(new Set(sharedProjects.map((p) => p.github)))

    const fetchRepoStats = async () => {
      const results = await Promise.allSettled(
        uniqueRepos.map(async (githubUrl) => {
          const repo = parseGitHubRepo(githubUrl)
          if (!repo) return null

          const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          })

          if (!response.ok) throw new Error(`GitHub API ${response.status}`)

          const data = await response.json()
          return {
            githubUrl,
            stars: Number(data.stargazers_count ?? 0),
            forks: Number(data.forks_count ?? 0),
          }
        })
      )

      const nextStats: Record<string, RepoStats> = {}
      for (const result of results) {
        if (result.status !== 'fulfilled' || !result.value) continue
        nextStats[result.value.githubUrl] = {
          stars: result.value.stars,
          forks: result.value.forks,
        }
      }

      if (Object.keys(nextStats).length > 0) {
        setLiveStats(nextStats)
      }
    }

    fetchRepoStats().catch(() => {
      // Keep static fallback values when request fails (rate limit/network).
    })

    return () => controller.abort()
  }, [])

  return (
    <section
      id="opensource"
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff', paddingTop: '160px', paddingBottom: '160px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 24px' }}>
        {/* Title Area */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="animate-in text-sm font-medium mb-3" style={{ color: '#86868b', letterSpacing: '0.05em' }}>
            {t.supertitle}
          </p>
          <h2
            className="animate-in font-semibold"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            {t.title}
          </h2>
          <p className="animate-in mt-4 text-lg" style={{ color: '#86868b', maxWidth: '520px', margin: '16px auto 0' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Project Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projs.map((proj, index) => {
            const stats = liveStats[proj.github]
            const stars = stats?.stars ?? proj.stars
            const forks = stats?.forks ?? proj.forks

            return (
              <div
                key={index}
                className="os-card group relative rounded-[24px] p-8 transition-all duration-500"
                style={{
                  backgroundColor: '#f5f7fa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f7fa'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#1d1d1f' }}>
                  <Github size={20} color="#ffffff" />
                </div>

                <h3 className="font-semibold mb-2" style={{ fontSize: '20px', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                  {proj.name}
                </h3>

                <p className="text-sm mb-6" style={{ color: '#86868b', lineHeight: 1.6 }}>
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#e8e8ed', color: '#424245' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5" style={{ color: '#86868b' }}>
                    <span className="flex items-center gap-1.5 text-xs">
                      <Star size={13} />
                      {stars}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <GitFork size={13} />
                      {forks}
                    </span>
                  </div>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{ backgroundColor: '#1d1d1f', color: '#ffffff' }}
                  >
                    <Github size={13} />
                    {t.viewOnGithub}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
