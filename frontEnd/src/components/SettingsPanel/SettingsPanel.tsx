import { useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { Sun, Moon } from "lucide-react";
import styled, { keyframes, css } from "styled-components";
import {type Locale, useLocale} from "../../i18n";
import {type ColorTheme, useColorTheme} from "../../theme/ThemeContext.tsx";

// ─── SVG Flags ────────────────────────────────────────────────────────────────
const FR_FLAG = (
    <svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="15" rx="2.5" fill="#ED2939" />
        <rect width="14.67" height="15" fill="#fff" />
        <rect width="7.33" height="15" fill="#002395" />
    </svg>
);

const EN_FLAG = (
    <svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="15" rx="2.5" fill="#012169" />
        <path d="M0 0 L22 15 M22 0 L0 15" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 L22 15 M22 0 L0 15" stroke="#C8102E" strokeWidth="2" />
        <path d="M11 0 V15 M0 7.5 H22" stroke="#fff" strokeWidth="5" />
        <path d="M11 0 V15 M0 7.5 H22" stroke="#C8102E" strokeWidth="3" />
    </svg>
);

const FLAGS: Record<Locale, { flag: ReactElement; label: string }> = {
    fr: { flag: FR_FLAG, label: "Français" },
    en: { flag: EN_FLAG, label: "English" },
};

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const Container = styled.div`
    position: fixed;
    top: 14px;
    right: 16px;
    z-index: 1000;

    @media (max-width: 640px) {
        display: none;
    }
`;

const Trigger = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 11px 6px 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-2);
    letter-spacing: 0.03em;
    box-shadow: var(--shadow-sm);
    transition: all 0.15s ease;

    &:hover {
        background: var(--bg-3);
        border-color: var(--border-2);
        box-shadow: var(--shadow-md);
    }
`;

const FlagWrap = styled.span`
    border-radius: 3px;
    overflow: hidden;
    line-height: 0;
    flex-shrink: 0;
`;

const Chevron = styled.svg<{ $open: boolean }>`
    opacity: 0.4;
    transition: transform 0.2s ease;
    ${({ $open }) => $open && css`transform: rotate(180deg); opacity: 0.7;`}
`;

const Panel = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 210px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-lg);
    padding: 8px;
    animation: ${fadeIn} 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
    overflow: hidden;
`;

const SectionLabel = styled.div`
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-4);
    padding: 6px 10px 4px;
`;

const Divider = styled.div`
    height: 1px;
    background: var(--border);
    margin: 6px 0;
`;

const Row = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 9px 10px;
    border-radius: 10px;
    border: none;
    background: ${({ $active }) => $active ? "var(--bg-3)" : "transparent"};
    cursor: pointer;
    text-align: left;
    transition: background 0.12s;

    &:hover { background: var(--bg-3); }
`;

const RowLabel = styled.span`
    flex: 1;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
`;

const Check = styled.span<{ $visible: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    flex-shrink: 0;

    &::after {
        content: "";
        width: 5px;
        height: 3px;
        border-left: 1.5px solid var(--accent-fg);
        border-bottom: 1.5px solid var(--accent-fg);
        transform: rotate(-45deg) translateY(-1px);
        display: block;
    }
`;

const IconWrap = styled.span`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--bg-3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-2);
    flex-shrink: 0;

    svg { width: 14px; height: 14px; }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function SettingsPanel() {
    const intl         = useIntl();
    const { locale, setLocale }         = useLocale();
    const { colorTheme, setColorTheme } = useColorTheme();
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

    const selectLocale = (l: Locale) => { setLocale(l); };
    const selectTheme  = (t: ColorTheme) => { setColorTheme(t); };

    const currentFlag = FLAGS[locale].flag;

    return (
        <Container ref={ref}>
            <Trigger onClick={() => setOpen(v => !v)} aria-label={intl.formatMessage({ id: "lang.select" })}>
                <FlagWrap>{currentFlag}</FlagWrap>
                {locale.toUpperCase()}
                <Chevron $open={open} width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </Chevron>
            </Trigger>

            {open && (
                <Panel>
                    {/* ── Language ── */}
                    <SectionLabel>{intl.formatMessage({ id: "lang.select" })}</SectionLabel>
                    {(Object.entries(FLAGS) as [Locale, typeof FLAGS[Locale]][]).map(([code, { flag, label }]) => (
                        <Row key={code} $active={locale === code} onClick={() => selectLocale(code)}>
                            <FlagWrap>{flag}</FlagWrap>
                            <RowLabel>{label}</RowLabel>
                            <Check $visible={locale === code} />
                        </Row>
                    ))}

                    <Divider />

                    {/* ── Appearance ── */}
                    <SectionLabel>{intl.formatMessage({ id: "settings.appearance" })}</SectionLabel>
                    <Row $active={colorTheme === "light"} onClick={() => selectTheme("light")}>
                        <IconWrap><Sun /></IconWrap>
                        <RowLabel>{intl.formatMessage({ id: "settings.light" })}</RowLabel>
                        <Check $visible={colorTheme === "light"} />
                    </Row>
                    <Row $active={colorTheme === "dark"} onClick={() => selectTheme("dark")}>
                        <IconWrap><Moon /></IconWrap>
                        <RowLabel>{intl.formatMessage({ id: "settings.dark" })}</RowLabel>
                        <Check $visible={colorTheme === "dark"} />
                    </Row>
                </Panel>
            )}
        </Container>
    );
}
