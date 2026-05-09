import { useEffect, useRef } from 'react'
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
  },
  en: {
    supertitle: 'OPEN SOURCE',
    title: 'Open Source',
    subtitle: 'Open research outcomes to promote academic exchange and technology sharing',
  },
}

const sharedProjects = [
  {
    name: 'MuS-Polar3D',
    desc: 'MuS-Polar3D dataset repository, containing multiple SfP evaluation baselines, code for plotting error heatmaps, ORB algorithm code, and more.',
    tags: ['3D Reconstruction', 'Deep Learning', 'Polarization Imaging', 'PyTorch'],
    stars: 9,
    forks: 0,
    github: 'https://github.com/WangPuyun/MuS-Polar3D',
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

const projects = {
  zh: sharedProjects,
  en: sharedProjects,
}
export default function OpenSource() {
  const { lang } = useLanguage()
  const t = content[lang]
  const projs = projects[lang]

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
          {projs.map((proj, index) => (
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

              <div className="flex items-center gap-5" style={{ color: '#86868b' }}>
                <span className="flex items-center gap-1.5 text-xs">
                  <Star size={13} />
                  {proj.stars}
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <GitFork size={13} />
                  {proj.forks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

