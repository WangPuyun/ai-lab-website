import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Award, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const content = {
  zh: {
    supertitle: 'PUBLICATIONS',
    title: '学术成果',
    subtitle: '发表高水平论文与授权发明专利，推动领域理论创新与技术进步',
    detailLabel: { paper: '论文', patent: '专利' },
    viewDetails: '查看详情',
  },
  en: {
    supertitle: 'PUBLICATIONS',
    title: 'Publications & Patents',
    subtitle: 'Publishing high-impact papers and granted patents to advance the field',
    detailLabel: { paper: 'Paper', patent: 'Patent' },
    viewDetails: 'View Details',
  },
}

const publications = {
  zh: [
    { id: 1, type: 'paper' as const, title: 'Structure-Aware Consistency Priors for Shape from Polarization in Complex Media', authors: 'Kaimin Yu, Puyun Wang, Huayang He, Xianyu Wu*', venue: 'International Conference on Machine Learning (ICML)', year: '2026', abstract: '本文面向冰等复杂介质SfP难题，提出结构感知偏振一致性先验与双分支IceSfP网络，实现单视角高精度表面法线估计，并构建首个真实冰介质SfP数据集。', link: '#' },
  ],
  en: [
  ],
}

export default function Publications() {
  const { lang } = useLanguage()
  const t = content[lang]
  const pubs = publications[lang]

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState(0)

  useEffect(() => { setSelected(0) }, [lang])

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
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const selectedPub = pubs[selected]

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{ backgroundColor: '#f5f7fa', paddingTop: '160px', paddingBottom: '160px' }}
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
          <p className="animate-in mt-4 text-lg" style={{ color: '#86868b', maxWidth: '620px', margin: '16px auto 0' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-6">
          {/* Left: Detail Panel */}
          <div className="lg:w-[42%]">
            <div className="rounded-[24px] p-8 sticky top-24" style={{ backgroundColor: '#1d1d1f', color: '#f5f5f7' }}>
              <div className="flex items-center gap-2 mb-5">
                {selectedPub.type === 'paper' ? <FileText size={15} /> : <Award size={15} />}
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#86868b' }}>
                  {t.detailLabel[selectedPub.type]}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-3 leading-snug" style={{ letterSpacing: '-0.01em' }}>
                {selectedPub.title}
              </h3>

              <p className="text-xs mb-3" style={{ color: '#86868b' }}>
                {selectedPub.authors}
              </p>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  {selectedPub.venue}
                </span>
                <span className="text-xs" style={{ color: '#86868b' }}>
                  {selectedPub.year}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#a1a1a6', lineHeight: 1.7 }}>
                {selectedPub.abstract}
              </p>

              <a
                href={selectedPub.link}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
                style={{ color: '#2997ff' }}
              >
                {t.viewDetails}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: List */}
          <div className="lg:w-[58%]">
            <div className="flex flex-col gap-3">
              {pubs.map((pub, index) => (
                <div
                  key={pub.id}
                  className="flex items-start gap-4 rounded-[16px] p-5 cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: selected === index ? '#ffffff' : 'transparent',
                    borderLeft: selected === index ? '3px solid #1d1d1f' : '3px solid transparent',
                    boxShadow: selected === index ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
                  }}
                  onClick={() => setSelected(index)}
                  onMouseEnter={(e) => {
                    if (selected !== index) e.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    if (selected !== index) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1d1d1f' }}>
                    {pub.type === 'paper' ? <FileText size={16} color="#ffffff" /> : <Award size={16} color="#ffffff" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold mb-1 leading-snug" style={{ color: '#1d1d1f' }}>
                      {pub.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#86868b' }}>
                      <span>{pub.venue}</span>
                      <span>·</span>
                      <span>{pub.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
