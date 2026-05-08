import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const content = {
  zh: {
    supertitle: 'TEAM',
    title: '团队介绍',
    subtitle: '由资深教授领衔，汇聚优秀的博士与硕士研究生',
    piName: '吴衔誉',
    piTitle: '教授 / 博士生导师 ',
    eduLabel: '教育背景',
    researchLabel: '研究方向',
    achievementLabel: '学术成就',
    bioLabel: '个人简介',
    // emailLabel: '发送邮件',
  },
  en: {
    supertitle: 'TEAM',
    title: 'Our Team',
    subtitle: 'Led by senior professors, bringing together outstanding PhD and master students',
    piName: 'Prof. Xianyu Wu',
    piTitle: 'Professor / PhD Supervisor ',
    eduLabel: 'Education',
    researchLabel: 'Research Interests',
    achievementLabel: 'Achievements',
    bioLabel: 'Biography',
    // emailLabel: 'Send Email',
  },
}

const piInfo = {
  education: {
    zh: [
      '北卡罗莱纳州立大学 硕士、博士（2012-2018）',
      '普渡大学 电子与计算机工程 硕士（2011-2012）',
      '电子科技大学 机械电子工程学院 学士（2007-2011）',
    ],
    en: [
      'M.S. and Ph.D. in Mechanical Engineering, North Carolina State University (2012-2018)',
      'M.S. in Electrical and Computer Engineering, Purdue University (2011-2012)',
      'B.S. in Mechatronic Engineering, University of Electronic Science and Technology of China (2007-2011)',
    ],
  },
  research: {
    zh: ['计算成像', '光学测量', '机器视觉', '神经形态计算'],
    en: ['Computational Imaging', 'Optical Metrology', 'Machine Vision', 'Neuromorphic Computing'],
  },
  achievements: {
    zh: [
      '福建省高层次人才（B类）',
      '福州大学旗山学者',
      'IEEE / OPTICA Member',
    ],
    en: [
      'National Science Fund for Distinguished Young Scholars',
      '120+ SCI papers, 6000+ citations',
      '30+ granted invention patents',
      'IEEE / OPTICA Member',
    ],
  },
  bio: {
    zh: '长期从事智能计算成像、精密仪器与测量、神经形态视觉传感系统构建与计算等前沿领域的研究。作为项目负责人，承担国家级重点项目课题及多项国家级、部委和省级科研项目，近五年发表高水平学术论文三十余篇。',
    en: 'His research focuses on frontier areas such as intelligent computational imaging, precision instrumentation and metrology, and neuromorphic vision sensing systems and computing. As a principal investigator, he has led key national research projects and multiple national-, ministerial-, and provincial-level research programs, and has published over 30 high-impact academic papers in the past five years.',
  },
}

const teamMembers = {
  zh: [
    { name: '陈雅婷', year: '2018级博士', research: '超分辨率成像' },
    { name: '王雪松', year: '2021级博士', research: '超分辨率成像' },
    { name: '余凯敏', year: '2025级博士', research: '偏振三维成像' },
    { name: '林鹏', year: '2019级硕士', research: '超分辨率成像' },
    { name: '周斌', year: '2019级硕士', research: '超分辨率成像' },
    { name: '林家财', year: '2022级硕士', research: '图像融合' },
    { name: '刘浩', year: '2022级硕士', research: '计算光谱成像' },
    { name: '许启鋆', year: '2022级硕士', research: '双棱镜目标跟踪' },
    { name: '陈江涛', year: '2022级硕士', research: '偏振三维成像' },
    { name: '林仁楠', year: '2023级硕士', research: '低照度目标识别' },
    { name: '林建伟', year: '2023级硕士', research: '超分辨率成像' },
    { name: '刘鸿辉', year: '2023级硕士', research: '超分辨率成像' },
    { name: '王朴匀', year: '2024级硕士', research: '偏振三维成像' },
    { name: '许嘉华', year: '2024级硕士', research: '计算光谱成像' },
    { name: '肖钦', year: '2024级硕士', research: '计算光谱成像' },
  ],
  en: [
    { name: 'Yating Chen', year: 'PhD 2018', research: 'Super-Resolution Imaging' },
    { name: 'Xuesong Wang', year: 'PhD 2021', research: 'Super-Resolution Imaging' },
    { name: 'Kaimin Yu', year: 'PhD 2025', research: 'Polarization 3D Imaging' },
    { name: 'Peng Lin', year: 'Master 2019', research: 'Super-Resolution Imaging' },
    { name: 'Bin Zhou', year: 'Master 2019', research: 'Super-Resolution Imaging' },
    { name: 'Jiacai Lin', year: 'Master 2022', research: 'Image Fusion' },
    { name: 'Hao Liu', year: 'Master 2022', research: 'Computational Spectral Imaging' },
    { name: 'Qiyun Xu', year: 'Master 2022', research: 'Bi-Prism Target Tracking' },
    { name: 'Jiangtao Chen', year: 'Master 2022', research: 'Polarization 3D Imaging' },
    { name: 'Rennan Lin', year: 'Master 2023', research: 'Low-Light Target Recognition' },
    { name: 'Jianwei Lin', year: 'Master 2023', research: 'Super-Resolution Imaging' },
    { name: 'Honghui Liu', year: 'Master 2023', research: 'Super-Resolution Imaging' },
    { name: 'Puyun Wang', year: 'Master 2024', research: 'Polarization 3D Imaging' },
    { name: 'Jiahua Xu', year: 'Master 2024', research: 'Computational Spectral Imaging' },
    { name: 'Qin Xiao', year: 'Master 2024', research: 'Computational Spectral Imaging' },
  ],
}

export default function Team() {
  const { lang } = useLanguage()
  const t = content[lang]
  const members = teamMembers[lang]

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const piRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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
      if (piRef.current) {
        gsap.fromTo(piRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: piRef.current, start: 'top 80%', once: true },
          }
        )
      }
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll('.member-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="team"
      ref={sectionRef}
      style={{ backgroundColor: '#f5f7fa', paddingTop: '160px', paddingBottom: '160px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 24px' }}>
        {/* Title Area */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="animate-in text-sm font-medium mb-3" style={{ color: '#86868b', letterSpacing: '0.05em' }}>
            {t.supertitle}
          </p>
          <h2
            className="animate-in font-semibold"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            {t.title}
          </h2>
          <p className="animate-in mt-4 text-lg" style={{ color: '#86868b', maxWidth: '500px', margin: '16px auto 0' }}>
            {t.subtitle}
          </p>
        </div>

        {/* PI Card - Apple style */}
        <div
          ref={piRef}
          className="rounded-[28px] overflow-hidden mb-14"
          style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Photo */}
            <div className="lg:w-[360px] flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/pi-photo.jpg`}
                alt={t.piName}
                className="w-full h-full object-cover"
                style={{ minHeight: '320px', maxHeight: '420px' }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-8 lg:p-12">
              <h3
                className="font-semibold"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#1d1d1f', letterSpacing: '-0.02em' }}
              >
                {t.piName}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#86868b' }}>
                {t.piTitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#86868b' }}>
                    {t.eduLabel}
                  </h4>
                  <ul className="space-y-2">
                    {piInfo.education[lang].map((edu, i) => (
                      <li key={i} className="text-sm" style={{ color: '#424245', lineHeight: 1.5 }}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#86868b' }}>
                    {t.researchLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {piInfo.research[lang].map((r) => (
                      <span
                        key={r}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: '#f5f7fa', color: '#424245' }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#86868b' }}>
                    {t.achievementLabel}
                  </h4>
                  <ul className="space-y-2">
                    {piInfo.achievements[lang].map((ach, i) => (
                      <li key={i} className="text-sm flex items-start gap-2.5" style={{ color: '#424245', lineHeight: 1.5 }}>
                        <span style={{ color: '#FFDF19', marginTop: '2px' }}>•</span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#86868b' }}>
                    {t.bioLabel}
                  </h4>
                  <p className="text-sm" style={{ color: '#424245', lineHeight: 1.8 }}>
                    {piInfo.bio[lang]}
                  </p>
                </div>
              </div>

              {/* <a
                href="mailto:siyuan.li@university.edu.cn"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#0066cc' }}
              >
                <Mail size={15} />
                {t.emailLabel}
              </a> */}
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {members.map((member, index) => {
            const initial = member.name.charAt(0)
            return (
              <div
                key={index}
                className="member-card rounded-[20px] p-6 text-center transition-all duration-400"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.03)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-base font-semibold"
                  style={{ background: '#1d1d1f', color: '#ffffff' }}
                >
                  {initial}
                </div>
                <h4 className="font-semibold text-sm" style={{ color: '#1d1d1f' }}>
                  {member.name}
                </h4>
                <p className="text-xs mt-1" style={{ color: '#86868b' }}>
                  {member.year}
                </p>
                <span
                  className="text-xs px-3 py-1 rounded-full inline-block mt-3"
                  style={{ backgroundColor: '#f5f7fa', color: '#424245' }}
                >
                  {member.research}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
