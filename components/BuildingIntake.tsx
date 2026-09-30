import React, { useState } from 'react';
import { ArrowLeft, Building2, Loader2, Mail, MapPin, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { LINKS, REPLY_SLA } from '../constants';
import type { Page } from '../types';

interface BuildingIntakeProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

type FormState = {
  buildingName: string;
  buildingAddress: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

const INITIAL_FORM: FormState = {
  buildingName: '',
  buildingAddress: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10';

function validate(form: FormState): string | null {
  if (!form.buildingName.trim()) return '請填寫大樓名稱';
  if (!form.buildingAddress.trim()) return '請填寫大樓詳細地址';
  if (!form.contactName.trim()) return '請填寫聯絡人';
  if (!form.contactPhone.trim()) return '請填寫聯絡電話';
  if (!form.contactEmail.trim()) return '請填寫聯絡 Email';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) return '聯絡 Email 格式不正確';
  if (form.contactPhone.replace(/\D/g, '').length < 6) return '聯絡電話格式不正確';
  return null;
}

const BuildingIntake: React.FC<BuildingIntakeProps> = ({ onBack, onNavigate }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(LINKS.buildingIntakeApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buildingName: form.buildingName.trim(),
          buildingAddress: form.buildingAddress.trim(),
          contactName: form.contactName.trim(),
          contactPhone: form.contactPhone.trim(),
          contactEmail: form.contactEmail.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || '送出失敗，請稍後再試');
      }
      setForm(INITIAL_FORM);
      setSuccessMessage(data.message || '已收到申請。');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : '送出失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige/20 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center font-medium text-gray-600 transition-colors hover:text-brand-red"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          返回首頁
        </button>

        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900">公司合作申請</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              以下欄位皆必填。請填行政或可協助大樓導入的窗口資訊。
            </p>

            <div className="mt-5 flex gap-3 rounded-xl bg-brand-beige/40 px-4 py-3.5 text-sm leading-6 text-brand-dark">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <p>
                送出後，我們會在 <strong className="font-bold">{REPLY_SLA}</strong>內由專人以電話或 Email 與你聯繫，
                說明導入方式與所需空間。
                <span className="text-gray-500">全程零費用，也不會當場要你簽約。</span>
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="大樓名稱" required icon={<Building2 className="h-4 w-4" />}>
                <input
                  value={form.buildingName}
                  onChange={(event) => updateField('buildingName', event.target.value)}
                  className={inputClass}
                  placeholder="例如：順天經貿廣場"
                  maxLength={120}
                />
              </Field>

              <Field label="大樓詳細地址" required icon={<MapPin className="h-4 w-4" />}>
                <input
                  value={form.buildingAddress}
                  onChange={(event) => updateField('buildingAddress', event.target.value)}
                  className={inputClass}
                  placeholder="例如：台中市西屯區..."
                  maxLength={240}
                />
              </Field>

              <Field label="聯絡人" required icon={<UserRound className="h-4 w-4" />}>
                <input
                  value={form.contactName}
                  onChange={(event) => updateField('contactName', event.target.value)}
                  className={inputClass}
                  placeholder="請填姓名或稱呼"
                  maxLength={80}
                />
              </Field>

              <Field label="聯絡電話" required icon={<Phone className="h-4 w-4" />}>
                <input
                  value={form.contactPhone}
                  onChange={(event) => updateField('contactPhone', event.target.value)}
                  className={inputClass}
                  placeholder="例如：0912-345-678"
                  inputMode="tel"
                  maxLength={40}
                />
              </Field>

              <Field label="聯絡 Email" required icon={<Mail className="h-4 w-4" />}>
                <input
                  value={form.contactEmail}
                  onChange={(event) => updateField('contactEmail', event.target.value)}
                  className={inputClass}
                  placeholder="name@example.com"
                  inputMode="email"
                  maxLength={160}
                />
              </Field>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                <p className="font-bold">{successMessage}</p>
                <p className="mt-1 text-green-800/80">
                  我們會在 {REPLY_SLA}內與你聯繫。想更快討論的話，直接打頁尾的電話找我們也可以。
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-red px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  送出中
                </>
              ) : (
                '送出申請'
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-gray-500">
              送出即表示你同意我們依
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="mx-1 font-semibold text-brand-red underline underline-offset-2 hover:text-red-700"
              >
                隱私權政策
              </button>
              處理你填寫的聯絡資訊。
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

function Field({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center text-sm font-bold text-gray-700">
        <span className="mr-2 text-brand-red">{icon}</span>
        {label}
        {required && <span className="ml-1 text-brand-red">*</span>}
      </span>
      {children}
    </label>
  );
}

export default BuildingIntake;
