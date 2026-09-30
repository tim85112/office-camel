import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
    children: React.ReactNode;
    /** 同一組元素依序進場的延遲（毫秒） */
    delay?: number;
    className?: string;
}

/**
 * 捲到畫面內才淡入上浮。
 *
 * 內容初始是 opacity-0，所以「沒被觸發」等於「看不到」——這種壞法不會報錯。
 * 因此三道保險都直接顯示：關掉動畫偏好、瀏覽器沒有 IntersectionObserver、
 * 以及 1.2 秒的兜底計時器（observer 因為任何原因沒 fire 也一定看得到內容）。
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setShown(true);
            return;
        }
        if (!('IntersectionObserver' in window)) {
            setShown(true);
            return;
        }

        const el = ref.current;
        if (!el) {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        observer.observe(el);

        const failsafe = window.setTimeout(() => setShown(true), 1200);

        return () => {
            observer.disconnect();
            window.clearTimeout(failsafe);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`group transition-all duration-700 ease-out motion-reduce:transition-none ${shown ? 'is-shown opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                } ${className}`}
            style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

export default Reveal;
