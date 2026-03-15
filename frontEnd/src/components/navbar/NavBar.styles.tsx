import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Nav shell ────────────────────────────────────────────────────────────────
export const Nav = styled.nav`
  position: sticky;
  top: 16px;
  z-index: 99;
  width: 92%;
  max-width: 860px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 4px 24px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, background 0.3s ease;
  animation: ${fadeDown} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  &:hover {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

// ─── Top row ──────────────────────────────────────────────────────────────────
export const NavContainer = styled.div`
  padding: 10px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ─── Brand ────────────────────────────────────────────────────────────────────
export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  margin-right: 8px;
`;

export const BrandLogo = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 7px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: rotate(-6deg) scale(1.1);
  }
`;

export const BrandName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
`;

// ─── Separator ────────────────────────────────────────────────────────────────
export const Separator = styled.div`
  width: 1px;
  height: 18px;
  background: var(--border-2);
  margin: 0 8px;

  @media (max-width: 640px) {
    display: none;
  }
`;

// ─── Desktop links ────────────────────────────────────────────────────────────
export const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: #555;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 10px;
    right: 10px;
    height: 1.5px;
    background: var(--text);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: var(--text);
    background: rgba(0, 0, 0, 0.04);
  }

  &:hover::after { transform: scaleX(1); }

  &.active { color: var(--text); font-weight: 600; }
  &.active::after { transform: scaleX(1); }
`;

// ─── Right side ───────────────────────────────────────────────────────────────
export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LoginButton = styled.button`
  padding: 7px 16px;
  background: var(--accent);
  color: var(--accent-fg);
  border: none;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: -0.1px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12);

  &:hover {
    background: color-mix(in srgb, var(--accent) 85%, transparent);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12);
  }

  &:active { transform: translateY(0); }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-2);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    border-color: var(--text);
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }
`;

// ─── Burger button ────────────────────────────────────────────────────────────
export const BurgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-2);
  border-radius: 9px;
  background: rgba(0,0,0,0.03);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(0,0,0,0.06);
    border-color: rgba(0,0,0,0.14);
  }

  @media (max-width: 640px) {
    display: flex;
  }
`;

export const BurgerLines = styled.div<{ $open: boolean }>`
  position: relative;
  width: 16px;
  height: 12px;

  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 1.5px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    left: 0;
  }

  span:nth-child(1) {
    top: 0;
    ${({ $open }) => $open && css`transform: translateY(5px) rotate(45deg);`}
  }
  span:nth-child(2) {
    top: 5px;
    ${({ $open }) => $open && css`opacity: 0; transform: scaleX(0);`}
  }
  span:nth-child(3) {
    top: 10px;
    ${({ $open }) => $open && css`transform: translateY(-5px) rotate(-45deg);`}
  }
`;

// ─── Mobile drawer ────────────────────────────────────────────────────────────
export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 640px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    padding: 8px 12px 14px;
    border-top: 1px solid rgba(0,0,0,0.06);
    gap: 2px;
    animation: ${slideDown} 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
`;

export const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  text-decoration: none;
  transition: all 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
    color: var(--text-4);
    flex-shrink: 0;
    transition: color 0.15s ease;
  }

  &:hover {
    background: rgba(0,0,0,0.04);
    color: var(--text);
    svg { color: var(--text); }
  }

  &.active {
    background: rgba(0,0,0,0.05);
    color: var(--text);
    font-weight: 600;
    svg { color: var(--text); }
  }
`;

export const MobileDivider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.06);
  margin: 6px 0;
`;

export const MobileLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 11px;
  background: var(--accent);
  color: var(--accent-fg);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);

  &:hover { background: color-mix(in srgb, var(--accent) 85%, transparent); }
`;

export const MobileLogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  svg { width: 16px; height: 16px; flex-shrink: 0; }
  &:hover { background: rgba(239,68,68,0.06); }
`;

// ─── Avatar dropdown ──────────────────────────────────────────────────────────
export const AvatarWrapper = styled.div`
  position: relative;
`;

export const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 188px;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-2);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  padding: 6px;
  z-index: 200;
  animation: ${fadeDown} 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

export const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 11px;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-2);
  text-decoration: none;
  transition: all 0.15s ease;

  svg { width: 15px; height: 15px; color: var(--text-4); flex-shrink: 0; }
  &:hover { background: rgba(0,0,0,0.04); color: var(--text); svg { color: var(--text); } }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.06);
  margin: 4px 0;
`;

// ─── Mobile settings section ──────────────────────────────────────────────────
export const MobileSettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MobileSettingsLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-4);
  padding: 6px 12px 2px;
`;

export const MobileSettingsRow = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: ${({ $active }) => $active ? "rgba(0,0,0,0.05)" : "transparent"};
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  transition: background 0.12s;

  &:hover { background: rgba(0,0,0,0.04); color: var(--text); }

  svg { width: 16px; height: 16px; color: var(--text-4); flex-shrink: 0; }
`;

export const MobileFlagWrap = styled.span`
  border-radius: 3px;
  overflow: hidden;
  line-height: 0;
  flex-shrink: 0;
`;

export const MobileSettingsCheck = styled.span<{ $visible: boolean }>`
  margin-left: auto;
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

export const DropdownLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 500;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  svg { width: 15px; height: 15px; flex-shrink: 0; }
  &:hover { background: rgba(239,68,68,0.07); }
`;
