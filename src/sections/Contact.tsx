import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, Users, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const content = {
  zh: {
    supertitle: 'CONTACT',
    title: '联系我们',
    addressLabel: '实验室地址',
    address: '北京市海淀区清华园1号\n精密仪器系 光学工程研究所 301室',
    emailLabel: 'PI 邮箱',
    recruitmentLabel: '招生信息',
    recruitmentText: '课题组长期招收博士研究生和硕士研究生，欢迎具有光学、计算机、电子信息等背景的优秀学子加入。同时欢迎博士后研究人员加盟合作。',
    subscribeTitle: '订阅实验室动态',
    subscribeDesc: '获取最新研究进展、论文发表与学术活动通知',
    subscribePlaceholder: '请输入您的邮箱地址',
    subscribeBtn: '订阅',
    subscribeSuccess: '订阅成功！感谢您的关注',
    privacy: '隐私政策',
    terms: '使用条款',
    copyright: '© 2025 AOCI Lab. All rights reserved.',
  },
  en: {
    supertitle: 'CONTACT',
    title: 'Contact Us',
    addressLabel: 'Lab Address',
    address: 'No.1 Tsinghua Yuan, Haidian District, Beijing\nRoom 301, Institute of Optical Engineering',
    emailLabel: 'PI Email',
    recruitmentLabel: 'Recruitment',
    recruitmentText: 'We welcome outstanding students with backgrounds in optics, computer science, and electronic information to join our PhD and Master programs. Postdoctoral researchers are also welcome.',
    subscribeTitle: 'Subscribe to Updates',
    subscribeDesc: 'Get the latest research progress, paper publications, and academic event notifications',
    subscribePlaceholder: 'Enter your email address',
    subscribeBtn: 'Subscribe',
    subscribeSuccess: 'Subscribed successfully! Thank you for your interest',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    copyright: '© 2025 AOCI Lab. All rights reserved.',
  },
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = content[lang]

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => { setSubscribed(false); setEmail('') }, [lang])

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
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: '#f5f7fa', paddingTop: '160px', paddingBottom: '0' }}
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
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-12 pb-24">
          {/* Left: Contact Info */}
          <div className="lg:w-1/2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8e8ed' }}>
                <MapPin size={18} color="#1d1d1f" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#1d1d1f' }}>{t.addressLabel}</h4>
                <p className="text-sm whitespace-pre-line" style={{ color: '#86868b', lineHeight: 1.6 }}>
                  {t.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8e8ed' }}>
                <Mail size={18} color="#1d1d1f" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#1d1d1f' }}>{t.emailLabel}</h4>
                <a href="mailto:siyuan.li@university.edu.cn" className="text-sm transition-opacity hover:opacity-70" style={{ color: '#0066cc' }}>
                  siyuan.li@university.edu.cn
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8e8ed' }}>
                <Users size={18} color="#1d1d1f" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#1d1d1f' }}>{t.recruitmentLabel}</h4>
                <p className="text-sm" style={{ color: '#86868b', lineHeight: 1.6 }}>
                  {t.recruitmentText}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Subscribe */}
          <div className="lg:w-1/2">
            <div className="rounded-[24px] p-8" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <h3 className="font-semibold mb-2" style={{ fontSize: '20px', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                {t.subscribeTitle}
              </h3>
              <p className="text-sm mb-6" style={{ color: '#86868b' }}>
                {t.subscribeDesc}
              </p>

              {subscribed ? (
                <div className="rounded-[16px] p-4 text-center" style={{ backgroundColor: '#f5f7fa' }}>
                  <p className="text-sm font-medium" style={{ color: '#1d1d1f' }}>{t.subscribeSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.subscribePlaceholder}
                    required
                    className="flex-1 text-sm px-4 py-3 rounded-[14px] outline-none transition-all duration-200"
                    style={{
                      backgroundColor: '#f5f7fa',
                      border: '1.5px solid transparent',
                      color: '#1d1d1f',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1d1d1f'
                      e.currentTarget.style.backgroundColor = '#ffffff'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.backgroundColor = '#f5f7fa'
                    }}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-normal rounded-full transition-all duration-300 hover:opacity-90 flex-shrink-0 flex items-center gap-1.5"
                    style={{
                      backgroundColor: '#1d1d1f',
                      color: '#ffffff',
                    }}
                  >
                    {t.subscribeBtn}
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-xs" style={{ color: '#86868b' }}>
            {t.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#86868b' }} onClick={(e) => e.preventDefault()}>
              {t.privacy}
            </a>
            <a href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#86868b' }} onClick={(e) => e.preventDefault()}>
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
