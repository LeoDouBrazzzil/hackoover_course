import { useRef, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled, { keyframes, css } from "styled-components";
import { type Locale, useLocale } from "../../i18n";

// ─── Flags ────────────────────────────────────────────────────────────────────
const FR_FLAG = (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="14" rx="2" fill="#ED2939" />
        <rect width="13.33" height="14" fill="#fff" />
        <rect width="6.67" height="14" fill="#002395" />
    </svg>
);

const EN_FLAG = (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="14" rx="2" fill="#012169" />
        <path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" strokeWidth="2.8" />
        <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.8" />
        <path d="M10 0 V14 M0 7 H20" stroke="#fff" strokeWidth="4.5" />
        <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
);

const FLAGS: Record<Locale, { flag: JSX.Element; label: string }> = {
    fr: { flag: FR_FLAG, label: "Français" },
    en: { flag: EN_FLAG, label: "English" },
};

// ─── Styled Components ────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 5px 7px;
  background: #f4f4f5;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 100px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: #ebebec;
    border-color: rgba(0,0,0,0.12);
  }

  svg:last-child {
    opacity: 0.45;
    transition: transform 0.2s ease;
  }
`;

const Chevron = styled.svg<{ $open: boolean }>`
  ${({ $open }) => $open && css`transform: rotate(180deg);`}
`;

const Wrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  padding: 6px;
  min-width: 150px;
  z-index: 999;
  animation: ${fadeIn} 0.18s cubic-bezier(0.16,1,0.3,1) both;
`;

const DropdownLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
  padding: 6px 10px 4px;
`;

const Option = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 9px;
  border: none;
  background: ${({ $active }) => $active ? "#f4f4f5" : "transparent"};
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;

  &:hover { background: #f4f4f5; }
`;

const OptionText = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0a0a0a;
  letter-spacing: -0.01em;
`;

const Check = styled.div<{ $visible: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  flex-shrink: 0;

  &::after {
    content: "";
    width: 5px;
    height: 3px;
    border-left: 1.5px solid #fff;
    border-bottom: 1.5px solid #fff;
    transform: rotate(-45deg) translateY(-1px);
    display: block;
  }
`;

const FlagWrap = styled.div`
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
  line-height: 0;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function LangSwitcher() {
    const { locale, setLocale } = useLocale();
    const intl = useIntl();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const select = (l: Locale) => {
        setLocale(l);
        setOpen(false);
    };

    const current = FLAGS[locale];

    return (
        <Wrap ref={ref}>
            <Trigger onClick={() => setOpen(v => !v)} aria-label={intl.formatMessage({ id: "lang.select" })}>
                <FlagWrap>{current.flag}</FlagWrap>
                {locale.toUpperCase()}
                <Chevron $open={open} width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </Chevron>
            </Trigger>

            {open && (
                <Dropdown>
                    <DropdownLabel>{intl.formatMessage({ id: "lang.select" })}</DropdownLabel>
                    {(Object.entries(FLAGS) as [Locale, typeof FLAGS[Locale]][]).map(([code, { flag, label }]) => (
                        <Option key={code} $active={locale === code} onClick={() => select(code)}>
                            <FlagWrap>{flag}</FlagWrap>
                            <OptionText>
                                <OptionName>{label}</OptionName>
                            </OptionText>
                            <Check $visible={locale === code} />
                        </Option>
                    ))}
                </Dropdown>
            )}
        </Wrap>
    );
}
