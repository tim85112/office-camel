import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, CircleCheck, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { BUILDINGS, CONSULT_OPTIONS, CONTACTS, LEGAL_ENTITY, LINKS, REPLY_SLA } from '../constants';
import type { Page } from '../types';

interface ConsultFormProps {
  /** 從哪張方案卡點進來的（沒點就是「還不確定」）。不在表單上問，跟著申請一起送。 */
  plan: string;
  onNavigate: (page: Page) => void;
}

type FieldKey =
  | 'companyName'
  | 'industry'
  | 'headcount'
  | 'buildingName'
  | 'buildingAddress'
  | 'contactName'
  | 'contactTitle'
  | 'contactEmail'
  | 'contactPhone'
  | 'lineId'
  | 'useCase'
  | 'budget'
  | 'currentSolution'
  | 'timeline'
  | 'message'
  | 'referral';

type FormState = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: FormState = {
  companyName: '',
  industry: '',
  headcount: '',
  buildingName: '',
  buildingAddress: '',
  contactName: '',
  contactTitle: '',
  contactEmail: '',
  contactPhone: '',
  lineId: '',
  useCase: '',
  budget: '',
  currentSolution: '',
  timeline: '',
  message: '',
  referral: '',
};

/** 必填欄位與空白時的提示。順序＝畫面由上而下：送出時會跳到第一個沒填好的。 */
const REQUIRED: { key: FieldKey; empty: string }[] = [
  { key: 'companyName', empty: '請填寫公司名稱' },
  { key: 'industry', empty: '請選擇產業類別' },
  { key: 'headcount', empty: '請選擇預估用餐人數' },
  { key: 'buildingName', empty: '請填寫大樓名稱' },
  { key: 'buildingAddress', empty: '請填寫大樓地址' },
  { key: 'contactName', empty: '請填寫你的姓名' },
  { key: 'contactTitle', empty: '請填寫職稱或部門' },
  { key: 'contactEmail', empty: '請填寫 Email' },
  { key: 'contactPhone', empty: '請填寫手機號碼' },
  { key: 'useCase', empty: '請選擇主要用途' },
  { key: 'budget', empty: '請選擇每人午餐預算' },
  { key: 'currentSolution', empty: '請選擇現在中午怎麼吃' },
  { key: 'timeline', empty: '請選擇希望開始的時間' },
  { key: 'referral', empty: '請選擇你是怎麼知道我們的' },
];

const REQUIRED_KEYS = new Set<FieldKey>(REQUIRED.map((r) => r.key));

/** 長度上限跟後台 /api/public/building-intake 一致，超過會被後台退件 */
const MAX_LEN: Partial<Record<FieldKey, number>> = {
  companyName: 120,
  buildingName: 120,
  buildingAddress: 240,
  contactName: 80,
  contactTitle: 80,
  contactEmail: 160,
  contactPhone: 40,
  lineId: 80,
  message: 1000,
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  for (const { key, empty } of REQUIRED) {
    if (!form[key].trim()) errors[key] = empty;
  }
  if (!errors.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) {
    errors.contactEmail = 'Email 格式不太對，再確認一下';
  }
  if (!errors.contactPhone && form.contactPhone.replace(/\D/g, '').length < 8) {
    errors.contactPhone = '號碼好像少了幾碼';
  }
  return errors;
}

/** 已進駐棟數直接從 /buildings 那份清單算，加一棟這裡自己跟上 */
const OPENED_COUNT = Object.values(BUILDINGS)
  .flat()
  .filter((b) => b.status === 'opened').length;

/* 手機 16px、桌機 14px：iOS 遇到小於 16px 的輸入框會在點下去時自動放大整頁 */
const controlBase =
  'w-full rounded-[14px] border bg-white px-3.5 py-2.5 text-base text-brand-ink placeholder:text-brand-ink/45 transition focus:outline-none focus:ring-2 sm:text-sm';
const controlOk = 'border-brand-line focus:ring-brand-red/35';
const controlBad = 'border-brand-red/70 focus:ring-brand-red/35';

const scrollSoft = (el: Element | null, block: ScrollLogicalPosition) => {
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block });
};

const ConsultForm: React.FC<ConsultFormProps> = ({ plan, onNavigate }) => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [doneFor, setDoneFor] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const errors = useMemo(() => validate(form), [form]);
  const shownError = (key: FieldKey) => (attempted || touched[key] ? errors[key] : undefined);

  const bind = (key: FieldKey) => {
    const error = shownError(key);
    return {
      id: `consult-${key}`,
      name: key,
      value: form[key],
      maxLength: MAX_LEN[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
        setSubmitError(null);
      },
      onBlur: () => setTouched((prev) => ({ ...prev, [key]: true })),
      'aria-required': REQUIRED_KEYS.has(key) ? true : undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `consult-${key}-error` : undefined,
      className: `${controlBase} ${error ? controlBad : controlOk}`,
    };
  };

  const text = (key: FieldKey, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => <input {...bind(key)} {...extra} />;

  const select = (key: FieldKey, options: string[]) => {
    const props = bind(key);
    return (
      <select {...props} className={`${props.className} cursor-pointer ${form[key] ? '' : 'text-brand-ink/60'}`}>
        <option value="" disabled>
          請選擇
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-brand-ink">
            {option}
          </option>
        ))}
      </select>
    );
  };

  const field = (key: FieldKey, label: string, control: React.ReactNode, wide = false) => (
    <Field id={`consult-${key}`} label={label} required={REQUIRED_KEYS.has(key)} wide={wide} error={shownError(key)}>
      {control}
    </Field>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    setSubmitError(null);

    const first = REQUIRED.find(({ key }) => errors[key]);
    if (first) {
      const el = document.getElementById(`consult-${first.key}`);
      el?.focus({ preventScroll: true });
      scrollSoft(el, 'center');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Record<string, string> = { plan };
      (Object.keys(form) as FieldKey[]).forEach((key) => {
        payload[key] = form[key].trim();
      });
      const res = await fetch(LINKS.buildingIntakeApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.message || '送出失敗，請稍後再試');
      setDoneFor(form.buildingName.trim());
      setForm(EMPTY);
      setTouched({});
      setAttempted(false);
      requestAnimationFrame(() => scrollSoft(cardRef.current, 'start'));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '送出失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const lineContact = CONTACTS[0]?.line;

  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-gradient-to-br from-brand-ink-deep via-brand-ink to-brand-ink-soft py-20 text-brand-cream md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* 左：為什麼現在填 */}
        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.22em] text-brand-yellow">LET&rsquo;S TALK・預約諮詢</p>
          <h2 className="mt-4 flex flex-col gap-1 text-2xl font-bold leading-tight tracking-[-0.02em] text-white md:text-3xl lg:text-4xl">
            <span>午餐這件事，</span>
            <span className="whitespace-nowrap">
              交給<span className="text-brand-yellow">駝獸</span>來扛。
            </span>
          </h2>

          <ul className="mt-9 space-y-4">
            {[
              `免費諮詢 · 不會當場要你簽約`,
              `${REPLY_SLA}內回覆 · 先幫你看大樓在不在路線上`,
              `已有 ${OPENED_COUNT} 棟商辦 · 每天中午都在送`,
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-cream/95">
                <ShieldCheck className="mt-[3px] h-[18px] w-[18px] flex-shrink-0 text-brand-yellow" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-2 border-t border-brand-cream/15 pt-7 text-sm text-brand-cream/70">
            <p>
              合作洽談 ·{' '}
              <a href={`mailto:${LEGAL_ENTITY.email}`} className="break-all text-brand-cream transition-colors hover:text-brand-yellow">
                {LEGAL_ENTITY.email}
              </a>
            </p>
            {lineContact && (
              <p>
                LINE 專人 ·{' '}
                <a
                  href={lineContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cream underline-offset-4 transition-colors hover:text-brand-yellow hover:underline"
                >
                  加好友直接問
                </a>
              </p>
            )}
          </div>
        </div>

        {/* 右：表單卡 */}
        <div ref={cardRef} className="scroll-mt-24 lg:col-span-7">
          {doneFor !== null ? (
            <div role="status" className="rounded-3xl bg-brand-cream p-7 text-center shadow-2xl shadow-black/30 md:p-12">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-red-mid via-brand-red to-brand-red-deep shadow-lg shadow-brand-red/30">
                <CircleCheck className="h-8 w-8 text-white" />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-brand-ink md:text-2xl">收到了，謝謝你！</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-700 md:text-base">
                我們會在 <strong className="font-bold text-brand-ink">{REPLY_SLA}</strong>
                {`內用電話或 Email 跟你聯絡，先幫你看看${doneFor ? `「${doneFor}」` : '你的大樓'}在不在現有路線上。`}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {lineContact && (
                  <a
                    href={lineContact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-red-mid via-brand-red to-brand-red-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-red-deep/30 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    等不及？加 LINE 直接問
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setDoneFor(null)}
                  className="text-sm font-semibold text-gray-600 underline underline-offset-4 hover:text-brand-red"
                >
                  再填一份
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="rounded-3xl bg-brand-cream p-6 shadow-2xl shadow-black/30 md:p-10">
              <div className="mb-6">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-brand-red">
                  <Sparkles aria-hidden="true" className="h-3 w-3" />
                  LUNCH CONSULTATION
                </p>
                <h3 className="mt-2 text-xl font-bold leading-snug tracking-[-0.02em] text-brand-ink md:text-2xl">
                  1 分鐘填完，{REPLY_SLA}內專人聯絡你
                </h3>
                <p className="mt-2 text-sm text-gray-700">四個小段落，大部分用點的</p>
              </div>

              <SectionLabel first>① 公司與大樓</SectionLabel>
              <div className="grid gap-5 md:grid-cols-2">
                {field('companyName', '公司名稱', text('companyName', { placeholder: '例：駝峰科技股份有限公司', autoComplete: 'organization' }))}
                {field('industry', '產業類別', select('industry', CONSULT_OPTIONS.industry))}
                {field('headcount', '預估用餐人數', select('headcount', CONSULT_OPTIONS.headcount))}
                {field('buildingName', '大樓名稱', text('buildingName', { placeholder: '例：順天經貿廣場' }))}
                {field(
                  'buildingAddress',
                  '大樓地址',
                  text('buildingAddress', { placeholder: '例：台中市西屯區市政路…', autoComplete: 'street-address' }),
                  true,
                )}
              </div>

              <SectionLabel>② 聯絡窗口</SectionLabel>
              <div className="grid gap-5 md:grid-cols-2">
                {field('contactName', '姓名', text('contactName', { placeholder: '怎麼稱呼你', autoComplete: 'name' }))}
                {field('contactTitle', '職稱 / 部門', text('contactTitle', { placeholder: '例：管理處主任、行政、福委', autoComplete: 'organization-title' }))}
                {field('contactEmail', '聯絡 Email', text('contactEmail', { type: 'email', inputMode: 'email', placeholder: 'name@company.com', autoComplete: 'email' }))}
                {field('contactPhone', '手機號碼', text('contactPhone', { type: 'tel', inputMode: 'tel', placeholder: '0912-345-678', autoComplete: 'tel' }))}
                {field('lineId', 'LINE ID（選填）', text('lineId', { placeholder: '留一下，聯絡比較快' }))}
              </div>

              <SectionLabel>③ 需求細節</SectionLabel>
              <div className="grid gap-5 md:grid-cols-2">
                {field('useCase', '主要想用在', select('useCase', CONSULT_OPTIONS.useCase))}
                {field('budget', '每人午餐預算', select('budget', CONSULT_OPTIONS.budget))}
                {field('currentSolution', '現在中午大多怎麼吃？', select('currentSolution', CONSULT_OPTIONS.currentSolution), true)}
                {field('timeline', '希望什麼時候開始', select('timeline', CONSULT_OPTIONS.timeline), true)}
                {field(
                  'message',
                  '還有什麼想先讓我們知道（選填）',
                  <textarea {...bind('message')} rows={3} placeholder="例：取餐處可以放哪、附近有沒有臨停位置、同事有素食需求…" />,
                  true,
                )}
              </div>

              <SectionLabel>④ 怎麼認識我們</SectionLabel>
              <div className="grid gap-5 md:grid-cols-2">
                {field('referral', '怎麼知道商辦駝獸的', select('referral', CONSULT_OPTIONS.referral))}
              </div>

              {submitError && (
                <p role="alert" className="mt-6 text-sm font-medium text-brand-red-deep">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-red-mid via-brand-red to-brand-red-deep px-6 py-4 text-base font-semibold tracking-[0.01em] text-white shadow-md shadow-brand-red-deep/30 transition-all hover:shadow-lg hover:shadow-brand-red-deep/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    送出中
                  </>
                ) : (
                  <>
                    免費預約午餐諮詢
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-gray-600">
                送出即表示你同意我們依
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="mx-1 font-semibold text-brand-red-deep underline underline-offset-2 hover:text-brand-red"
                >
                  隱私權政策
                </button>
                處理你填寫的聯絡資訊。
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/** 「── ① 公司與大樓 ──」兩側細線的段落標 */
function SectionLabel({ first, children }: { first?: boolean; children: React.ReactNode }) {
  return (
    <div className={`mb-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-brand-ink ${first ? '' : 'mt-7'}`}>
      <span aria-hidden="true" className="h-px flex-1 bg-brand-ink/20"></span>
      <h4>{children}</h4>
      <span aria-hidden="true" className="h-px flex-1 bg-brand-ink/20"></span>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  wide,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  wide?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? 'md:col-span-2' : undefined}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold tracking-[0.02em] text-brand-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-brand-red-deep">
            {' '}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-brand-red-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export default ConsultForm;
