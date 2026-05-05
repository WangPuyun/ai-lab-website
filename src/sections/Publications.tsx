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
    { id: 1, type: 'paper' as const, title: 'Deep-Learning-Enhanced Computational Polarization Imaging via End-to-End Optimization', authors: '张明远, 李思远*, 王晓峰, 陈思琪', venue: 'Nature Photonics', year: '2024', abstract: '提出了一种端到端优化的计算偏振成像框架，将物理光学模型与深度神经网络深度融合，实现了在低信噪比条件下的高精度偏振信息重建。', link: '#' },
    { id: 2, type: 'patent' as const, title: '一种基于压缩感知的高光谱成像系统及其重建方法', authors: '李思远, 张明远, 刘宇航', venue: '国家知识产权局', year: '2024', abstract: '本发明公开了一种基于压缩感知的高光谱成像系统，通过编码孔径与深度学习重建算法的协同设计，实现了快照式高光谱成像。', link: '#' },
    { id: 3, type: 'paper' as const, title: 'Event-Driven Neuromorphic Vision Sensor for High-Speed Dynamic Scene Capture', authors: '王晓峰, 赵文博, 李思远*', venue: 'IEEE TPAMI', year: '2023', abstract: '设计了一种新型事件驱动神经形态视觉传感器，采用自适应时间对比度阈值机制，在高速动态场景捕获中实现了比传统相机高100倍的时间分辨率。', link: '#' },
    { id: 4, type: 'paper' as const, title: 'Physics-Informed Neural Network for Sub-wavelength Nanostructure Metrology', authors: '陈思琪, 李思远*, 张明远', venue: 'Light: S&A', year: '2023', abstract: '将物理信息神经网络引入亚波长纳米结构测量领域，通过嵌入电磁散射物理约束，实现了对复杂纳米结构几何参数的高精度反演测量。', link: '#' },
    { id: 5, type: 'patent' as const, title: '基于物理先验深度学习的低光照图像增强方法', authors: '刘宇航, 李思远, 王晓峰', venue: '国家知识产权局', year: '2023', abstract: '本发明提出了一种融合物理成像先验的深度学习低光照图像增强方法，通过显式建模噪声统计特性与光照退化物理过程。', link: '#' },
    { id: 6, type: 'paper' as const, title: 'Multi-modal Computational Imaging with Co-designed Optics and Algorithms: A Survey', authors: '李思远*, 赵文博, 张明远, 王晓峰', venue: 'Optica', year: '2023', abstract: '全面综述了多模态计算成像领域中共设计光学与算法的最新进展，提出了统一的数学框架。', link: '#' },
  ],
  en: [
    { id: 1, type: 'paper' as const, title: 'Deep-Learning-Enhanced Computational Polarization Imaging via End-to-End Optimization', authors: 'M. Zhang, S. Li*, X. Wang, S. Chen', venue: 'Nature Photonics', year: '2024', abstract: 'An end-to-end optimized computational polarization imaging framework integrating physical optics with deep neural networks for high-precision reconstruction under low SNR.', link: '#' },
    { id: 2, type: 'patent' as const, title: 'Hyperspectral Imaging System Based on Compressed Sensing', authors: 'S. Li, M. Zhang, Y. Liu', venue: 'CNIPA', year: '2024', abstract: 'A snapshot hyperspectral imaging system based on compressed sensing with co-designed coded aperture and deep learning reconstruction.', link: '#' },
    { id: 3, type: 'paper' as const, title: 'Event-Driven Neuromorphic Vision Sensor for High-Speed Dynamic Scenes', authors: 'X. Wang, W. Zhao, S. Li*', venue: 'IEEE TPAMI', year: '2023', abstract: 'A novel event-driven neuromorphic vision sensor with adaptive temporal contrast threshold, achieving 100x temporal resolution over conventional cameras.', link: '#' },
    { id: 4, type: 'paper' as const, title: 'Physics-Informed Neural Network for Sub-wavelength Nanostructure Metrology', authors: 'S. Chen, S. Li*, M. Zhang', venue: 'Light: S&A', year: '2023', abstract: 'Introducing physics-informed neural networks into sub-wavelength nanostructure metrology with electromagnetic scattering constraints for <1nm accuracy.', link: '#' },
    { id: 5, type: 'patent' as const, title: 'Low-Light Image Enhancement via Physics-Prior Deep Learning', authors: 'Y. Liu, S. Li, X. Wang', venue: 'CNIPA', year: '2023', abstract: 'A deep learning low-light enhancement method with physical imaging priors through explicit noise and degradation modeling.', link: '#' },
    { id: 6, type: 'paper' as const, title: 'Multi-modal Computational Imaging: Co-designed Optics and Algorithms Survey', authors: 'S. Li*, W. Zhao, M. Zhang, X. Wang', venue: 'Optica', year: '2023', abstract: 'A comprehensive review of co-designed optics and algorithms for multi-modal computational imaging with a unified mathematical framework.', link: '#' },
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
