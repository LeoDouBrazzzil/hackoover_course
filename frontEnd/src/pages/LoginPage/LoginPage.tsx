import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import * as S from "./LoginPage.styles";
import {GoogleIcon} from "assets/icon/GoogleIcon.tsx";
import {EyeIcon} from "assets/icon/EyeIcon.tsx";
import {FacebookIcon} from "assets/icon/FacebookIcon.tsx";
import {Link} from "react-router-dom";
import api from "api/api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const intl = useIntl();
  const [form, setForm] = useState<FormState>({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.auth.login({
        emailOrUsername: form.email,
        password: form.password,
      });

      if (response.message) {
        setError(response.message);
        setLoading(false);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || intl.formatMessage({ id: "login.error" }));
      setLoading(false);
    }
  };

  return (
    <>
      <S.GlobalStyle />

      <S.Page>
        <S.Card>

          {/* ── Logo ── */}
          <S.LogoWrap>
            <S.LogoMark>⌘</S.LogoMark>
            <S.LogoText>Hackoover</S.LogoText>
          </S.LogoWrap>

          {/* ── Heading ── */}
          <S.Title>{intl.formatMessage({ id: "login.title" })}</S.Title>
          <S.Subtitle>{intl.formatMessage({ id: "login.subtitle" })}</S.Subtitle>

          {/* ── Social buttons ── */}
          <S.SocialsGrid>
            <S.SocialButton type="button"><GoogleIcon /> Google</S.SocialButton>
            <S.SocialButton type="button"><FacebookIcon /> Facebook</S.SocialButton>
          </S.SocialsGrid>

          {/* ── Divider ── */}
          <S.Divider>
            <S.DividerLine />
            <S.DividerText>{intl.formatMessage({ id: "common.or" })}</S.DividerText>
            <S.DividerLine />
          </S.Divider>

          {/* ── Error message ── */}
          {error && (
            <div style={{
              padding: "12px 16px",
              marginBottom: "16px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "8px",
              border: "1px solid #fcc"
            }}>
              {error}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit}>

            {/* Email or Username */}
            <S.Field>
              <label htmlFor="email">{intl.formatMessage({ id: "login.email_label" })}</label>
              <S.Input
                id="email"
                type="text"
                placeholder={intl.formatMessage({ id: "login.email_placeholder" })}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                autoComplete="email"
                required
              />
            </S.Field>

            {/* Mot de passe */}
            <S.Field>
              <label htmlFor="password">{intl.formatMessage({ id: "login.password_label" })}</label>
              <S.InputWrap>
                <S.Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  $hasToggle
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  autoComplete="current-password"
                  required
                />
                <S.TogglePasswordButton
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? intl.formatMessage({ id: "login.hide_password" }) : intl.formatMessage({ id: "login.show_password" })}
                >
                  <EyeIcon open={showPassword} />
                </S.TogglePasswordButton>
              </S.InputWrap>
            </S.Field>

            {/* Remember / Forgot */}
            <S.FormRow>
              <S.CheckboxWrap>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                />
                <span>{intl.formatMessage({ id: "login.remember" })}</span>
              </S.CheckboxWrap>
              <S.ForgotLink href="#">{intl.formatMessage({ id: "login.forgot" })}</S.ForgotLink>
            </S.FormRow>

            {/* Submit */}
            <S.SubmitButton type="submit" disabled={loading}>
              {loading ? <S.Spinner /> : intl.formatMessage({ id: "login.submit" })}
            </S.SubmitButton>
          </form>

          {/* Footer */}
          <S.CardFooter>
            {intl.formatMessage({ id: "login.no_account" })} <Link to="/register">{intl.formatMessage({ id: "login.create_account" })}</Link>
          </S.CardFooter>

          <S.Terms>
            {intl.formatMessage({ id: "login.terms_prefix" })}{" "}
            <a href="#">{intl.formatMessage({ id: "login.terms_link" })}</a> {intl.formatMessage({ id: "login.terms_and" })}{" "}
            <a href="#">{intl.formatMessage({ id: "login.privacy_link" })}</a>.
          </S.Terms>

        </S.Card>
      </S.Page>
    </>
  );
}
