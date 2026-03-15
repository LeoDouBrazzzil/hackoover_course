import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Tag, LogIn, LogOut, Settings, User, Sun, Moon } from "lucide-react";
import { useIntl } from "react-intl";
import * as S from "./NavBar.styles";
import logoBlackSmall from "assets/logos/logoBlackSmall.png";
import { useAuth } from "utils/useAuth.ts";
import { clearAccessToken } from "api/api.ts";
import { type Locale, useLocale } from "../../i18n";
import { type ColorTheme, useColorTheme } from "../../theme/ThemeContext";

const FR_FLAG = (
    <svg width="20" height="14" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="15" rx="2.5" fill="#ED2939" />
        <rect width="14.67" height="15" fill="#fff" />
        <rect width="7.33" height="15" fill="#002395" />
    </svg>
);
const EN_FLAG = (
    <svg width="20" height="14" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="15" rx="2.5" fill="#012169" />
        <path d="M0 0 L22 15 M22 0 L0 15" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 L22 15 M22 0 L0 15" stroke="#C8102E" strokeWidth="2" />
        <path d="M11 0 V15 M0 7.5 H22" stroke="#fff" strokeWidth="5" />
        <path d="M11 0 V15 M0 7.5 H22" stroke="#C8102E" strokeWidth="3" />
    </svg>
);
const LANGS: { code: Locale; flag: React.ReactElement; label: string }[] = [
    { code: "fr", flag: FR_FLAG, label: "Français" },
    { code: "en", flag: EN_FLAG, label: "English" },
];

const NavBar = () => {
    const navigate       = useNavigate();
    const location       = useLocation();
    const [open, setOpen]               = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef    = useRef<HTMLDivElement>(null);

    const { isAuthenticated, isAdmin } = useAuth();
    const intl = useIntl();
    const { locale, setLocale } = useLocale();
    const { colorTheme, setColorTheme } = useColorTheme();

    const handleLogout = () => {
        clearAccessToken();
        setDropdownOpen(false);
        navigate("/login");
    };

    // Ferme les menus lors d'un changement de route
    useEffect(() => {
        setOpen(false);
        setDropdownOpen(false);
    }, [location.pathname]);

    // Ferme le menu mobile si on passe au-dessus de 640px
    useEffect(() => {
        const handler = () => { if (window.innerWidth > 640) setOpen(false); };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // Ferme le dropdown au clic extérieur
    useEffect(() => {
        if (!dropdownOpen) return;
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [dropdownOpen]);

    return (
        <S.Nav>
            {/* ── Top row ── */}
            <S.NavContainer>
                <S.NavLeft>
                    <S.Brand to="/">
                        <S.BrandLogo src={logoBlackSmall} alt="Hackoover" />
                        <S.BrandName>Hackoover</S.BrandName>
                    </S.Brand>

                    <S.Separator />
                    <S.DesktopLinks>
                        <S.NavLink to="/courses">{intl.formatMessage({ id: "nav.courses" })}</S.NavLink>
                        <S.NavLink to="/tarifs">{intl.formatMessage({ id: "nav.pricing" })}</S.NavLink>
                        {isAdmin && <S.NavLink to="/admin/courses">⚙️ {intl.formatMessage({ id: "nav.admin" })}</S.NavLink>}
                    </S.DesktopLinks>
                </S.NavLeft>

                <S.NavRight>
                    {isAuthenticated ? (
                        <S.AvatarWrapper ref={dropdownRef}>
                            <S.AvatarButton
                                type="button"
                                onClick={() => setDropdownOpen(v => !v)}
                                aria-label={intl.formatMessage({ id: "nav.account_menu" })}
                                aria-expanded={dropdownOpen}
                            >
                                <S.Avatar
                                    src="/default-avatar.png"
                                    alt="User"
                                />
                            </S.AvatarButton>

                            {dropdownOpen && (
                                <S.DropdownMenu>
                                    <S.DropdownLink to="/dashboard">
                                        <User size={15} /> {intl.formatMessage({ id: "nav.my_profile" })}
                                    </S.DropdownLink>
                                    <S.DropdownDivider />
                                    <S.DropdownLogout type="button" onClick={handleLogout}>
                                        <LogOut size={15} /> {intl.formatMessage({ id: "nav.logout" })}
                                    </S.DropdownLogout>
                                </S.DropdownMenu>
                            )}
                        </S.AvatarWrapper>
                    ) : (
                        <S.LoginButton
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            {intl.formatMessage({ id: "nav.login" })}
                        </S.LoginButton>
                    )}

                    <S.BurgerButton
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        aria-label={open ? intl.formatMessage({ id: "nav.close_menu" }) : intl.formatMessage({ id: "nav.open_menu" })}
                        aria-expanded={open}
                    >
                        <S.BurgerLines $open={open}>
                            <span /><span /><span />
                        </S.BurgerLines>
                    </S.BurgerButton>
                </S.NavRight>
            </S.NavContainer>

            {/* ── Mobile drawer ── */}
            <S.MobileMenu $open={open}>
                <S.MobileNavLink to="/courses">
                    <BookOpen /> {intl.formatMessage({ id: "nav.courses" })}
                </S.MobileNavLink>
                <S.MobileNavLink to="/tarifs">
                    <Tag /> {intl.formatMessage({ id: "nav.pricing" })}
                </S.MobileNavLink>
                {isAdmin && (
                    <S.MobileNavLink to="/admin/courses">
                        <Settings /> {intl.formatMessage({ id: "nav.admin" })}
                    </S.MobileNavLink>
                )}

                <S.MobileDivider />

                {isAuthenticated ? (
                    <S.MobileLogoutButton type="button" onClick={handleLogout}>
                        <LogOut /> {intl.formatMessage({ id: "nav.logout" })}
                    </S.MobileLogoutButton>
                ) : (
                    <S.MobileLoginButton
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        <LogIn size={15} style={{ marginRight: 8 }} />
                        {intl.formatMessage({ id: "nav.login" })}
                    </S.MobileLoginButton>
                )}

                <S.MobileDivider />

                <S.MobileSettingsSection>
                    <S.MobileSettingsLabel>{intl.formatMessage({ id: "lang.select" })}</S.MobileSettingsLabel>
                    {LANGS.map(({ code, flag, label }) => (
                        <S.MobileSettingsRow key={code} $active={locale === code} onClick={() => setLocale(code)}>
                            <S.MobileFlagWrap>{flag}</S.MobileFlagWrap>
                            {label}
                            <S.MobileSettingsCheck $visible={locale === code} />
                        </S.MobileSettingsRow>
                    ))}
                </S.MobileSettingsSection>

                <S.MobileDivider />

                <S.MobileSettingsSection>
                    <S.MobileSettingsLabel>{intl.formatMessage({ id: "settings.appearance" })}</S.MobileSettingsLabel>
                    <S.MobileSettingsRow $active={colorTheme === "light"} onClick={() => setColorTheme("light")}>
                        <Sun />{intl.formatMessage({ id: "settings.light" })}
                        <S.MobileSettingsCheck $visible={colorTheme === "light"} />
                    </S.MobileSettingsRow>
                    <S.MobileSettingsRow $active={colorTheme === "dark"} onClick={() => setColorTheme("dark")}>
                        <Moon />{intl.formatMessage({ id: "settings.dark" })}
                        <S.MobileSettingsCheck $visible={colorTheme === "dark"} />
                    </S.MobileSettingsRow>
                </S.MobileSettingsSection>
            </S.MobileMenu>
        </S.Nav>
    );
};

export default NavBar;
