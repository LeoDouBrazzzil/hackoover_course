import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.15;
  pointer-events: none;
`;

/**
 * Composant Matrix Rain - Effet de code qui tombe
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Définir la taille du canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caractères à afficher (alphanumériques + symboles)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Position Y de chaque colonne
    const drops: number[] = Array(columns).fill(1);

    // Fonction d'animation
    function draw() {
      if (!ctx || !canvas) return;

      // Effet de fondu blanc semi-transparent pour effacer progressivement
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Couleur noire pour les caractères
      ctx.fillStyle = '#000000';
      ctx.font = `${fontSize}px monospace`;

      // Dessiner les caractères
      for (let i = 0; i < drops.length; i++) {
        // Choisir un caractère aléatoire
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Dessiner le caractère
        ctx.fillText(char, x, y);

        // Réinitialiser la goutte si elle atteint le bas
        // ou aléatoirement pour créer l'effet de pluie
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Incrémenter la position
        drops[i]++;
      }
    }

    // Animer à ~30 FPS
    const interval = setInterval(draw, 33);

    // Gérer le redimensionnement
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
}
