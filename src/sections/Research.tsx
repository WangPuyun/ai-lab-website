import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const content = {
  zh: {
    supertitle: 'RESEARCH',
    title: '研究方向',
    subtitle: '在光学成像与计算感知的交叉领域，开展前沿科学研究',
    areas: [
      { title: '精密光学成像', titleLine2: '与测量仪器', desc: '超精密干涉测量、三维形貌重构与纳米级检测技术，面向半导体制造与精密工程的先进测量系统。' },
      { title: '计算光谱', titleLine2: '/ 偏振成像', desc: '压缩感知光谱重建、计算偏振成像与多维度光场获取，突破传统光学系统的物理信息维度限制。' },
      { title: '视觉信息检测', titleLine2: '与人工智能', desc: '融合深度学习与物理光学先验，研究低质量图像增强、缺陷检测与端到端计算成像算法。' },
      { title: '神经形态', titleLine2: '视觉传感', desc: '类脑视觉传感器、事件驱动成像与脉冲神经网络，探索面向边缘智能的新一代仿生感知架构。' },
    ],
  },
  en: {
    supertitle: 'RESEARCH',
    title: 'Research Directions',
    subtitle: 'Conducting frontier research at the intersection of optical imaging and computational perception',
    areas: [
      { title: 'Precision Optical', titleLine2: 'Imaging & Metrology', desc: 'Ultra-precision interferometry, 3D topography reconstruction, and nanoscale detection for semiconductor manufacturing.' },
      { title: 'Computational', titleLine2: 'Spectral / Polarization', desc: 'Compressed sensing spectral reconstruction, computational polarization imaging, and multi-dimensional light field acquisition.' },
      { title: 'Visual Detection', titleLine2: '& Artificial Intelligence', desc: 'Deep learning with physical optics priors for low-quality image enhancement, defect detection, and end-to-end computational imaging.' },
      { title: 'Neuromorphic', titleLine2: 'Vision Sensing', desc: 'Brain-inspired vision sensors, event-driven imaging, and spiking neural networks for edge intelligence.' },
    ],
  },
}

const images = [
  `${import.meta.env.BASE_URL}images/research-1.jpg`,
  `${import.meta.env.BASE_URL}images/research-2.jpg`,
  `${import.meta.env.BASE_URL}images/research-3.jpg`,
  `${import.meta.env.BASE_URL}images/research-4.jpg`,
]

export default function Research() {
  const { lang } = useLanguage()
  const t = content[lang]

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
        const cards = cardsRef.current.querySelectorAll('.research-card')
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="research"
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
          <p className="animate-in mt-4 text-lg" style={{ color: '#86868b', maxWidth: '560px', margin: '16px auto 0' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Grid Cards - Apple style */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.areas.map((area, index) => (
            <div
              key={index}
              className="research-card group rounded-[24px] overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: '#f5f7fa',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image Area */}
              <div className="relative overflow-hidden" style={{ height: '240px' }}>
                <img
                  src={images[index]}
                  alt={area.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)', transition: 'filter 0.8s ease, transform 0.8s ease' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
                  <ArrowUpRight size={18} color="#1d1d1f" />
                </div>
              </div>

              {/* Text Area */}
              <div style={{ padding: '28px 32px 32px' }}>
                <h3
                  className="font-semibold"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#1d1d1f', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  {area.title}
                  <br />
                  {area.titleLine2}
                </h3>
                <p className="text-sm mt-3" style={{ color: '#86868b', lineHeight: 1.6 }}>
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
