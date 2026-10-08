import React from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { CONTACTS, LEGAL_ENTITY, type LegalDoc } from '../constants';

interface LegalPageProps {
  doc: LegalDoc;
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ doc, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-beige/20 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-10 flex items-center font-medium text-gray-600 transition-colors hover:text-brand-red"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          返回首頁
        </button>

        <header className="mb-12 text-center">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-brand-red">{doc.eyebrow}</p>
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-gray-500">最後更新：{doc.updated}</p>
        </header>

        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-10">
          {doc.intro && <p className="mb-10 leading-8 text-gray-600">{doc.intro}</p>}

          <div className="space-y-10">
            {doc.sections.map((section, idx) => (
              <section key={section.heading}>
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  <span className="mr-2 text-brand-red">{idx + 1}.</span>
                  {section.heading}
                </h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mb-3 leading-8 text-gray-600 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-7 text-gray-600">
                        <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-brand-beige/30 p-6">
            <h2 className="mb-2 text-lg font-bold text-gray-900">聯絡我們</h2>
            <p className="mb-4 text-sm leading-7 text-gray-600">
              對本文件或你的個人資料有任何疑問，以下任一方式都可以找到我們。
            </p>
            <p className="mb-4 text-sm leading-7 text-gray-700">
              營運主體：<strong className="font-bold">{LEGAL_ENTITY.name}</strong>
              <span className="mx-2 text-gray-300">|</span>
              統一編號：{LEGAL_ENTITY.taxId}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${LEGAL_ENTITY.email}`}
                className="inline-flex items-center gap-2.5 font-semibold text-brand-dark hover:text-brand-red"
              >
                <Mail className="h-4 w-4 text-brand-red" />
                {LEGAL_ENTITY.email}
              </a>
              {CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.line}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold text-brand-dark hover:text-brand-red"
                >
                  <MessageCircle className="h-4 w-4 text-brand-red" />
                  {contact.name}　加 LINE 好友
                </a>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default LegalPage;
