import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'

const content = {
  zh: {
    supertitle: 'AOCI Lab',
    title: '先进光学成像',
    titleLine2: '与计算感知实验室',
    subtitle: '探索人工智能、计算成像与类脑视觉的下一代感知范式',
    cta1: '了解团队',
    cta2: '研究方向',
  },
  en: {
    supertitle: 'AOCI Lab',
    title: 'Advanced Optical',
    titleLine2: '& Computational Imaging',
    subtitle: 'Exploring next-generation perception paradigms from precision metrology to brain-inspired vision',
    cta1: 'Meet the Team',
    cta2: 'Research',
  },
}

export default function HeroBanner() {
  const { lang } = useLanguage()
  const t = content[lang]
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = textRef.current?.querySelectorAll('.hero-animate')
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.2,
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '85vh',
        paddingTop: '100px',
        background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 60%)',
      }}
    >
      <div ref={textRef} className="max-w-4xl px-6">
        {/* Supertitle */}
        <p
          className="hero-animate text-sm font-medium mb-4"
          style={{ color: '#86868b', letterSpacing: '0.05em' }}
        >
          {t.supertitle}
        </p>

        {/* Main Title */}
        <h1
          className="hero-animate font-semibold tracking-tight"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: '#1d1d1f',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          {t.title}
          <br />
          {t.titleLine2}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-animate mt-6 mx-auto"
          style={{
            fontSize: 'clamp(17px, 2vw, 21px)',
            color: '#86868b',
            lineHeight: 1.5,
            maxWidth: '580px',
            fontWeight: 400,
          }}
        >
          {t.subtitle}
        </p>

        {/* Apple-style CTAs */}
        <div className="hero-animate flex items-center justify-center gap-4 mt-10 flex-wrap">
          <a
            href="#team"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center px-7 py-2.5 text-sm font-normal rounded-full transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: '#1d1d1f',
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            {t.cta1}
          </a>
          <a
            href="#research"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center px-7 py-2.5 text-sm font-normal rounded-full transition-all duration-300 hover:bg-black hover:text-white"
            style={{
              backgroundColor: 'transparent',
              color: '#1d1d1f',
              border: '1.5px solid #d2d2d7',
              letterSpacing: '-0.01em',
            }}
          >
            {t.cta2}
          </a>
        </div>
      </div>
    </section>
  )
}
