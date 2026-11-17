import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarCheck, CircleCheck } from 'lucide-react';
import { BUSINESS_PLANS, PLAN_UNDECIDED, type BusinessPlan } from '../constants';
import type { Page } from '../types';
import ConsultForm from './ConsultForm';
import Reveal from './Reveal';

interface BuildingIntakeProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

const BuildingIntake: React.FC<BuildingIntakeProps> = ({ onBack, onNavigate }) => {
  /** 按了哪張卡的「預約諮詢」。不在表單上另外問 —— 跟著申請一起存進後台。 */
  const [plan, setPlan] = useState<string>(PLAN_UNDECIDED);
  const [contactInView, setContactInView] = useState(false);

  const pickPlan = useCallback((name: string) => {
    setPlan(name);
    scrollToContact();
  }, []);

  /* 直接打開 /apply#contact（例如 LINE 上貼的連結）就停在表單 */
  useEffect(() => {
    if (window.location.hash === '#contact') requestAnimationFrame(scrollToContact);
  }, []);

  /* 表單在畫面內就把右下角的浮動按鈕收起來，不要擋到送出鈕 */
  useEffect(() => {
    const el = document.getElementById('contact');
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section id="plans" className="scroll-mt-16 bg-brand-sand pb-14 pt-24 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-brand-red md:mb-10"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            返回首頁
          </button>

          <p className="text-xs font-bold tracking-[0.22em] text-brand-ink">合作方案・TWO WAYS TO START</p>
          <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.02em] text-brand-ink md:text-4xl lg:text-[44px]">
            2 種方案，$0 免費導入
          </h1>

          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
            {BUSINESS_PLANS.map((p, idx) => (
              <Reveal key={p.id} delay={idx * 110} className="h-full">
                <TiltCard selected={plan === p.name}>
                  <PlanCard plan={p} onPick={pickPlan} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultForm plan={plan} onNavigate={onNavigate} />

      <button
        type="button"
        onClick={scrollToContact}
        aria-hidden={contactInView}
        tabIndex={contactInView ? -1 : 0}
        className={`fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-red-mid via-brand-red to-brand-red-deep px-5 py-3.5 text-base font-bold text-white shadow-xl shadow-brand-red-deep/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:bottom-8 sm:right-6 sm:px-6 ${
          contactInView ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
        }`}
      >
        <CalendarCheck className="h-5 w-5" />
        預約免費諮詢
      </button>
    </>
  );
};

/** 滑鼠移上去：卡片跟著游標微微傾斜、外面浮出兩層錯位細框、游標處一圈淡淡的光。
 *  被選中（按過這張的「預約諮詢」）時兩層框留著。
 *  手機／觸控與「減少動態」不傾斜，只有框。 */
function TiltCard({ selected, children }: { selected: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--tilt-rx', `${((0.5 - py) * 6).toFixed(2)}deg`);
    el.style.setProperty('--tilt-ry', `${((px - 0.5) * 8).toFixed(2)}deg`);
    el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
  };

  const on = selected
    ? 'translate-x-[6px] translate-y-[6px] border-brand-red/85'
    : 'border-brand-red/0 group-hover/tilt:translate-x-[6px] group-hover/tilt:translate-y-[6px] group-hover/tilt:border-brand-red/85';
  const on2 = selected
    ? '-translate-x-[4px] -translate-y-[4px] border-brand-ink/35'
    : 'border-brand-ink/0 group-hover/tilt:-translate-x-[4px] group-hover/tilt:-translate-y-[4px] group-hover/tilt:border-brand-ink/35';

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/tilt relative h-full rounded-3xl [perspective:1100px]"
    >
      <span aria-hidden="true" className={`pointer-events-none absolute -inset-[3px] rounded-[inherit] border-2 transition-all duration-300 ease-out ${on}`}></span>
      <span aria-hidden="true" className={`pointer-events-none absolute -inset-[3px] rounded-[inherit] border transition-all duration-300 ease-out ${on2}`}></span>
      <div
        className="relative h-full w-full rounded-[inherit] transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: 'rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))', transformStyle: 'preserve-3d' }}
      >
        {children}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
            selected ? 'opacity-100' : 'opacity-0 group-hover/tilt:opacity-100'
          }`}
          style={{
            background:
              'radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 30%), rgba(201, 70, 37, 0.14), transparent 60%)',
          }}
        ></span>
      </div>
    </div>
  );
}

function PlanCard({ plan, onPick }: { plan: BusinessPlan; onPick: (name: string) => void }) {
  const dark = Boolean(plan.featured);
  return (
    <article
      className={`relative h-full rounded-3xl p-6 md:p-10 ${
        dark
          ? 'bg-gradient-to-br from-brand-ink-soft via-brand-ink to-brand-ink-deep text-brand-cream shadow-2xl shadow-brand-ink-deep/40'
          : 'border border-brand-line bg-white text-gray-700'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-4 right-5 rounded-full bg-brand-red px-4 py-1.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand-red/30 md:right-7">
          {plan.featured.badge}
        </span>
      )}
      <div className="flex h-full flex-col">
        <p className="text-xs tracking-widest opacity-75">{plan.eyebrow}</p>
        <h2 className={`mt-2 text-xl font-bold tracking-[-0.02em] md:mt-3 md:text-2xl ${dark ? 'text-white' : 'text-brand-ink'}`}>
          {plan.name}
        </h2>

        <p className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1 md:mt-5">
          <span className={`text-4xl font-bold leading-none md:text-5xl ${dark ? 'text-brand-red-light' : 'text-brand-red'}`}>NT$0</span>
          {plan.priceNote && (
            <span className={`text-sm ${dark ? 'text-brand-cream/75' : 'text-gray-600'}`}>{plan.priceNote}</span>
          )}
        </p>
        <p className={`mt-3 text-sm ${dark ? 'text-brand-cream/75' : 'text-gray-600'}`}>{plan.terms.join(' · ')}</p>

        <ul className={`mt-5 space-y-2.5 border-t pt-5 md:mt-7 md:space-y-3 md:pt-6 ${dark ? 'border-brand-cream/15' : 'border-brand-ink/10'}`}>
          {plan.points.map((point) => (
            <li key={point} className={`flex items-start gap-2.5 text-sm md:gap-3 ${dark ? 'text-brand-cream/90' : 'text-gray-700'}`}>
              <CircleCheck className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? 'text-brand-red-light' : 'text-brand-red'}`} />
              {point}
            </li>
          ))}
        </ul>

        {/* 兩張卡內容長度不同：按鈕一律貼底，兩顆才會對齊 */}
        <div className="mt-auto pt-6 md:pt-8">
          <button
            type="button"
            onClick={() => onPick(plan.name)}
            className={`group/cta inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-3.5 ${
              dark
                ? 'bg-gradient-to-br from-brand-red-mid via-brand-red to-brand-red-deep shadow-brand-red-deep/30'
                : 'bg-gradient-to-br from-brand-ink-soft via-brand-ink to-brand-ink-deep shadow-brand-ink/25'
            }`}
          >
            預約諮詢這個方案
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default BuildingIntake;
