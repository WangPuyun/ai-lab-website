import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, Building, Send, LoaderCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

const CONTACT_FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() ?? 'https://formspree.io/f/xnjlegwv'

const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const content = {
  zh: {
    supertitle: 'CONTACT',
    title: '联系我们',
    addressLabel: '通讯地址',
    address:
      '中国福建省福州市大学城学园路2号 福州大学机械工程及自动化学院 350108',
    emailLabel: '电子邮箱',
    labLabel: '所属单位',
    labText: '福州大学机械工程及自动化学院',
    messageTitle: '发送消息',
    messageDesc: '欢迎发送合作咨询、学生申请与学术交流信息，导师将通过邮箱回复。',
    nameLabel: '姓名',
    namePlaceholder: '请输入您的姓名',
    emailFormLabel: '邮箱',
    emailPlaceholder: '请输入您的邮箱',
    subjectLabel: '主题',
    subjectPlaceholder: '例如：研究生申请（姓名）',
    messageLabel: '自荐信',
    messagePlaceholder:
      '请简要介绍研究兴趣、项目经历、技术特长，以及希望加入课题组的原因。',
    submitBtn: '发送消息',
    submitting: '发送中...',
    endpointMissing:
      '未配置表单提交地址，请先设置 VITE_CONTACT_FORM_ENDPOINT。',
    required: '请完整填写姓名、邮箱、主题与消息内容。',
    invalidEmail: '邮箱格式不正确，请检查后重试。',
    messageTooShort: '消息内容请至少填写 30 个字符。',
    success: '消息发送成功，导师查阅后会通过邮箱联系您。',
    failed: '发送失败，请稍后重试或直接发邮件至 xwu@fzu.edu.cn。',
    privacy: '隐私政策',
    terms: '使用条款',
    copyright: '© 2025 AOCI Lab. All rights reserved.',
  },
  en: {
    supertitle: 'CONTACT',
    title: 'Contact Us',
    addressLabel: 'Lab Address',
    address:
      'No. 2 Xueyuan Road, University Town, Fuzhou, Fujian, China, 350108\nCollege of Mechanical Engineering and Automation, Fuzhou University',
    emailLabel: 'PI Email',
    labLabel: 'Affiliation',
    labText: 'College of Mechanical Engineering and Automation, Fuzhou University',
    messageTitle: 'Send a Message',
    messageDesc:
      'Feel free to send collaboration inquiries, student applications, or academic communication requests.',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    emailFormLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'e.g. Graduate Application (Your Name)',
    messageLabel: 'Self-Recommendation Letter',
    messagePlaceholder:
      'Briefly share your research interests, project experience, technical strengths, and why you want to join the lab.',
    submitBtn: 'Send Message',
    submitting: 'Sending...',
    endpointMissing:
      'Form endpoint is not configured. Please set VITE_CONTACT_FORM_ENDPOINT first.',
    required: 'Please complete name, email, subject, and message.',
    invalidEmail: 'Invalid email format.',
    messageTooShort: 'Please provide at least 30 characters in the message.',
    success: 'Message sent successfully. The professor will contact you after review.',
    failed: 'Failed to send. Please try again later or email xwu@fzu.edu.cn directly.',
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

  const [formData, setFormData] = useState<ContactFormState>(INITIAL_FORM_STATE)
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    setFormData(INITIAL_FORM_STATE)
    setFormStatus('idle')
    setStatusMessage('')
  }, [lang])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll('.animate-in'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
          }
        )
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const updateField =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((previous) => ({ ...previous, [field]: event.target.value }))
      if (formStatus !== 'idle') {
        setFormStatus('idle')
        setStatusMessage('')
      }
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!CONTACT_FORM_ENDPOINT) {
      setFormStatus('error')
      setStatusMessage(t.endpointMissing)
      return
    }

    if (formData.website.trim()) {
      setFormStatus('success')
      setStatusMessage(t.success)
      setFormData(INITIAL_FORM_STATE)
      return
    }

    const name = formData.name.trim()
    const email = formData.email.trim()
    const subject = formData.subject.trim()
    const message = formData.message.trim()

    if (!name || !email || !subject || !message) {
      setFormStatus('error')
      setStatusMessage(t.required)
      return
    }

    if (!isValidEmail(email)) {
      setFormStatus('error')
      setStatusMessage(t.invalidEmail)
      return
    }

    if (message.length < 30) {
      setFormStatus('error')
      setStatusMessage(t.messageTooShort)
      return
    }

    setFormStatus('submitting')
    setStatusMessage('')

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          source: 'research-group-webpage',
          language: lang,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      setFormStatus('success')
      setStatusMessage(t.success)
      setFormData(INITIAL_FORM_STATE)
    } catch {
      setFormStatus('error')
      setStatusMessage(t.failed)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: t.addressLabel,
      value: t.address,
    },
    {
      icon: Mail,
      label: t.emailLabel,
      value: 'xwu@fzu.edu.cn',
      href: 'mailto:xwu@fzu.edu.cn',
    },
    {
      icon: Building,
      label: t.labLabel,
      value: t.labText,
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: '#f5f7fa', paddingTop: '160px', paddingBottom: '0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 24px' }}>
        <div ref={titleRef} className="text-center mb-16">
          <p className="animate-in text-sm font-medium mb-3" style={{ color: '#86868b', letterSpacing: '0.05em' }}>
            {t.supertitle}
          </p>
          <h2
            className="animate-in font-semibold"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#1d1d1f',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
        </div>

        <div ref={contentRef} className="flex flex-col lg:flex-row lg:items-stretch gap-12 pb-24">
          <div className="lg:w-1/2 lg:self-stretch flex flex-col gap-6 lg:gap-0 lg:justify-between">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-[20px] p-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#e8e8ed' }}
                >
                  <item.icon size={18} color="#1d1d1f" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: '#1d1d1f' }}>
                    {item.label}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: '#0066cc' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm whitespace-pre-line" style={{ color: '#86868b', lineHeight: 1.6 }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="rounded-[24px] overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                border: '1px solid rgba(29,29,31,0.08)',
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: '260px',
                  background:
                    'linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(59,130,246,0.2) 100%)',
                }}
              >
                <div className="text-center z-10 px-6">
                  <MapPin size={46} color="#0891b2" style={{ margin: '0 auto 14px' }} />
                  <p className="text-base font-semibold" style={{ color: '#0f172a' }}>
                    {lang === 'zh' ? '福州大学' : 'Fuzhou University'}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#475569' }}>
                    {lang === 'zh' ? '中国 · 福建福州' : 'Fujian, China'}
                  </p>
                </div>
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(8,145,178,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.28) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 lg:flex">
            <div className="w-full lg:h-full rounded-[24px] p-8" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <h3 className="font-semibold mb-2" style={{ fontSize: '20px', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                {t.messageTitle}
              </h3>
              <p className="text-sm mb-6" style={{ color: '#86868b' }}>
                {t.messageDesc}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  value={formData.website}
                  onChange={updateField('website')}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={updateField('name')}
                      placeholder={t.namePlaceholder}
                      disabled={formStatus === 'submitting'}
                      className="w-full text-sm px-4 py-3 rounded-[14px] outline-none transition-all duration-200 disabled:opacity-70"
                      style={{ backgroundColor: '#f5f7fa', border: '1.5px solid transparent', color: '#1d1d1f' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>
                      {t.emailFormLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={updateField('email')}
                      placeholder={t.emailPlaceholder}
                      disabled={formStatus === 'submitting'}
                      className="w-full text-sm px-4 py-3 rounded-[14px] outline-none transition-all duration-200 disabled:opacity-70"
                      style={{ backgroundColor: '#f5f7fa', border: '1.5px solid transparent', color: '#1d1d1f' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>
                    {t.subjectLabel}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={updateField('subject')}
                    placeholder={t.subjectPlaceholder}
                    disabled={formStatus === 'submitting'}
                    className="w-full text-sm px-4 py-3 rounded-[14px] outline-none transition-all duration-200 disabled:opacity-70"
                    style={{ backgroundColor: '#f5f7fa', border: '1.5px solid transparent', color: '#1d1d1f' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={6}
                    name="message"
                    required
                    value={formData.message}
                    onChange={updateField('message')}
                    placeholder={t.messagePlaceholder}
                    disabled={formStatus === 'submitting'}
                    className="w-full text-sm px-4 py-3 rounded-[14px] outline-none transition-all duration-200 resize-none disabled:opacity-70"
                    style={{ backgroundColor: '#f5f7fa', border: '1.5px solid transparent', color: '#1d1d1f' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-6 py-3 text-sm font-normal rounded-full transition-all duration-300 hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: '#1d1d1f', color: '#ffffff' }}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      {t.submitBtn}
                    </>
                  )}
                </button>

                {statusMessage ? (
                  <p
                    className="text-sm"
                    style={{
                      color: formStatus === 'success' ? '#15803d' : formStatus === 'error' ? '#be123c' : '#86868b',
                    }}
                    role="status"
                  >
                    {statusMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-xs" style={{ color: '#86868b' }}>
            {t.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#86868b' }} onClick={(event) => event.preventDefault()}>
              {t.privacy}
            </a>
            <a href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#86868b' }} onClick={(event) => event.preventDefault()}>
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
