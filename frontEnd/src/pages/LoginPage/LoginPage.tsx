import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      setError(err.response?.data?.message || "Erreur lors de la connexion");
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
          <S.Title>Bon retour 👋</S.Title>
          <S.Subtitle>Connectez-vous pour accéder à votre espace.</S.Subtitle>

          {/* ── Social buttons ── */}
          <S.SocialsGrid>
            <S.SocialButton type="button"><GoogleIcon /> Google</S.SocialButton>
            <S.SocialButton type="button"><FacebookIcon /> Facebook</S.SocialButton>
          </S.SocialsGrid>

          {/* ── Divider ── */}
          <S.Divider>
            <S.DividerLine />
            <S.DividerText>ou</S.DividerText>
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
              <label htmlFor="email">Adresse e-mail ou nom d'utilisateur</label>
              <S.Input
                id="email"
                type="text"
                placeholder="vous@exemple.com ou username"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                autoComplete="email"
                required
              />
            </S.Field>

            {/* Mot de passe */}
            <S.Field>
              <label htmlFor="password">Mot de passe</label>
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
                  aria-label={showPassword ? "Masquer" : "Afficher"}
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
                <span>Se souvenir de moi</span>
              </S.CheckboxWrap>
              <S.ForgotLink href="#">Mot de passe oublié ?</S.ForgotLink>
            </S.FormRow>

            {/* Submit */}
            <S.SubmitButton type="submit" disabled={loading}>
              {loading ? <S.Spinner /> : "Se connecter"}
            </S.SubmitButton>
          </form>

          {/* Footer */}
          <S.CardFooter>
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </S.CardFooter>

          <S.Terms>
            En continuant, vous acceptez nos{" "}
            <a href="#">Conditions d'utilisation</a> et notre{" "}
            <a href="#">Politique de confidentialité</a>.
          </S.Terms>

        </S.Card>
      </S.Page>
    </>
  );
}
