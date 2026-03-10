import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, LogIn, Settings } from "lucide-react";
import * as S from "./NavBar.styles";
import logoBlackSmall from "assets/logos/logoBlackSmall.png";
import {useAuth} from "utils/useAuth.ts";

const NavBar = () => {
    const navigate  = useNavigate();
    const location  = useLocation();
    const [open, setOpen] = useState(false);

    const { isAuthenticated, isAdmin } = useAuth();

    // Ferme le menu lors d'un changement de route
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // Ferme le menu si on passe au-dessus de 640px
    useEffect(() => {
        const handler = () => { if (window.innerWidth > 640) setOpen(false); };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return (
        <S.Nav>
            {/* ── Top row ── */}
            <S.NavContainer>
                <S.NavLeft>
                    {/* Brand */}
                    <S.Brand to="/">
                        <S.BrandLogo src={logoBlackSmall} alt="Hackoover" />
                        <S.BrandName>Hackoover</S.BrandName>
                    </S.Brand>

                    {/* Desktop links */}
                    <S.Separator />
                    <S.DesktopLinks>
                        <S.NavLink to="/courses">Cours</S.NavLink>
                        <S.NavLink to="/dashboard">Dashboard</S.NavLink>
                        {isAdmin && <S.NavLink to="/admin/courses">⚙️ Admin</S.NavLink>}
                    </S.DesktopLinks>
                </S.NavLeft>

                <S.NavRight>
                    {/* Desktop — auth */}
                    {isAuthenticated ? (
                        <S.ProfileLink to="/dashboard">
                            <S.Avatar
                                src="/default-avatar.png"
                                alt="User"
                                title="Aller au dashboard"
                            />
                        </S.ProfileLink>
                    ) : (
                        <S.LoginButton
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Se connecter
                        </S.LoginButton>
                    )}

                    {/* Mobile burger */}
                    <S.BurgerButton
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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
                    <BookOpen /> Cours
                </S.MobileNavLink>
                <S.MobileNavLink to="/dashboard">
                    <LayoutDashboard /> Dashboard
                </S.MobileNavLink>
                {isAdmin && (
                    <S.MobileNavLink to="/admin/courses">
                        <Settings /> Admin
                    </S.MobileNavLink>
                )}

                {!isAuthenticated && (
                    <>
                        <S.MobileDivider />
                        <S.MobileLoginButton
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            <LogIn size={15} style={{ marginRight: 8 }} />
                            Se connecter
                        </S.MobileLoginButton>
                    </>
                )}
            </S.MobileMenu>
        </S.Nav>
    );
};

export default NavBar;
