import { useState } from 'react';
import { Container, Typography, Box, Button, Alert, Tabs, Tab } from '@mui/material';
import { Save, Eye } from 'lucide-react';
import {TipTapEditor} from "components/editor/TipTapEditor.tsx";

export const EditorDemo = () => {
  const [content, setContent] = useState<string>(`
    <h1>Leçon 3: Attaques XSS (Cross-Site Scripting)</h1>

    <div data-callout data-type="note">
      <p><strong>📚 Objectif de cette leçon:</strong> Comprendre les attaques XSS, leurs types, et comment s'en protéger.</p>
    </div>

    <h2>Qu'est-ce qu'une attaque XSS ?</h2>
    <p>Une attaque <strong>Cross-Site Scripting (XSS)</strong> permet à un attaquant d'<u>injecter du code JavaScript malveillant</u> dans une page web vue par d'autres utilisateurs.</p>

    <p style="text-align: center;"><mark>C'est l'une des vulnérabilités les plus courantes du web !</mark></p>

    <h3>Types d'attaques XSS</h3>

    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
          <th>Dangerosité</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Reflected XSS</strong></td>
          <td>Le script malveillant provient de la requête HTTP</td>
          <td>⚠️ Moyenne</td>
        </tr>
        <tr>
          <td><strong>Stored XSS</strong></td>
          <td>Le script est stocké côté serveur (BDD)</td>
          <td>🔴 Élevée</td>
        </tr>
        <tr>
          <td><strong>DOM-based XSS</strong></td>
          <td>L'attaque se produit côté client uniquement</td>
          <td>⚠️ Moyenne</td>
        </tr>
      </tbody>
    </table>

    <div data-callout data-type="danger">
      <p><strong>⚠️ Attention:</strong> Une attaque XSS réussie peut permettre le vol de cookies, de tokens d'authentification, ou même la prise de contrôle de session !</p>
    </div>

    <h2>Exemple d'attaque Reflected XSS</h2>
    <p>Imaginons un formulaire de recherche vulnérable :</p>

    <pre><code class="language-javascript">// Code PHP vulnérable
&lt;?php
  $search = $_GET['q'];
  echo "Résultats pour : " . $search;
?&gt;</code></pre>

    <p>Un attaquant pourrait envoyer ce lien à une victime :</p>
    <pre><code class="language-bash">https://site-vulnerable.com/search?q=&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code></pre>

    <div data-callout data-type="tip">
      <p><strong>💡 Astuce:</strong> Testez toujours vos inputs avec des payloads comme <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> lors de vos audits de sécurité.</p>
    </div>

    <h2>Protection contre XSS</h2>

    <ul data-type="taskList">
      <li data-checked="true"><label><input type="checkbox" checked><span></span></label><div><p>Échapper toutes les entrées utilisateur (HTML entities)</p></div></li>
      <li data-checked="true"><label><input type="checkbox" checked><span></span></label><div><p>Utiliser Content-Security-Policy (CSP)</p></div></li>
      <li data-checked="true"><label><input type="checkbox" checked><span></span></label><div><p>Valider et sanitiser les inputs côté serveur</p></div></li>
      <li data-checked="false"><label><input type="checkbox"><span></span></label><div><p>Utiliser des frameworks modernes (React, Vue) qui échappent automatiquement</p></div></li>
    </ul>

    <h3>Exemple de code sécurisé</h3>
    <pre><code class="language-python"># Python avec Flask (sécurisé)
from flask import escape

@app.route('/search')
def search():
    query = request.args.get('q', '')
    safe_query = escape(query)
    return f"Résultats pour : {safe_query}"</code></pre>

    <hr>

    <div data-callout data-type="success">
      <p><strong>✅ À retenir:</strong> Toujours traiter les données utilisateur comme <em>non fiables</em> et les échapper avant de les afficher !</p>
    </div>

    <blockquote>
      <p>"Never trust user input." - Principe fondamental de la sécurité web</p>
    </blockquote>

    <h2>Exercice pratique</h2>
    <ol>
      <li>Trouvez une vulnérabilité XSS dans le lab fourni</li>
      <li>Exploitez-la pour voler un cookie de session</li>
      <li>Proposez un correctif sécurisé</li>
    </ol>

    <p><strong>Formule chimique du sel:</strong> NaCl (utilisez l'indice<sub>2</sub> pour H<sub>2</sub>O)</p>
    <p><strong>Note mathématique:</strong> E = mc<sup>2</sup></p>
  `);

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleSave = () => {
    console.log('Contenu sauvegardé:', content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          📝 Prototype Éditeur de Cours
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interface pour que vos associés créent et modifient des leçons facilement.
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Leçon sauvegardée avec succès ! ✅
        </Alert>
      )}

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Édition" />
          <Tab label="Aperçu" />
        </Tabs>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSave}
        >
          Sauvegarder
        </Button>
      </Box>

      {activeTab === 0 && (
        <TipTapEditor
          content={content}
          onChange={setContent}
          editable={true}
        />
      )}

      {activeTab === 1 && (
        <Box>
          <Alert severity="info" icon={<Eye size={18} />} sx={{ mb: 2 }}>
            Aperçu du rendu pour les étudiants
          </Alert>
          <TipTapEditor
            content={content}
            editable={false}
          />
        </Box>
      )}

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          ✨ Fonctionnalités de l'éditeur
        </Typography>
        <Typography variant="body2" component="div">
          <strong>Formatage de texte:</strong> Gras, Italique, Souligné, Barré, Surlignage, Couleur, Code inline<br/>
          <strong>Titres:</strong> H1, H2, H3<br/>
          <strong>Alignement:</strong> Gauche, Centre, Droite, Justifié<br/>
          <strong>Listes:</strong> À puces, Numérotées, Tâches (checkboxes)<br/>
          <strong>Tableaux:</strong> Création et édition de tableaux<br/>
          <strong>Code:</strong> Blocs de code avec coloration syntaxique (JS, Python, Java, Bash, SQL, etc.)<br/>
          <strong>Callouts:</strong> Note (bleu), Warning (orange), Tip (vert), Danger (rouge), Success (vert foncé)<br/>
          <strong>Médias:</strong> Liens, Images, Vidéos YouTube<br/>
          <strong>Autres:</strong> Citations, Lignes horizontales, Exposant, Indice, Undo/Redo
        </Typography>
      </Box>
    </Container>
  );
};
