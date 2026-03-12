import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { common, createLowlight } from 'lowlight';
import { Callout } from './extensions/Callout';

const lowlight = createLowlight(common);

import { Box, Button, ButtonGroup, Paper, Divider, Tooltip, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Underline as UnderlineIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table as TableIcon,
  CheckSquare,
  Minus,
  AlertCircle,
  Info,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface TipTapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
}

export const TipTapEditor = ({
  content = '',
  onChange,
  editable = true
}: TipTapEditorProps) => {
  const [colorMenuAnchor, setColorMenuAnchor] = useState<null | HTMLElement>(null);

  const colors = [
    { name: 'Noir', value: '#000000' },
    { name: 'Rouge', value: '#e53935' },
    { name: 'Orange', value: '#fb8c00' },
    { name: 'Jaune', value: '#fdd835' },
    { name: 'Vert', value: '#43a047' },
    { name: 'Bleu', value: '#1e88e5' },
    { name: 'Violet', value: '#8e24aa' },
    { name: 'Gris', value: '#757575' },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Use CodeBlockLowlight instead
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          style: 'max-width: 100%; height: auto;',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      HorizontalRule,
      Callout,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL du lien:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('URL de l\'image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt('URL YouTube:');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const handleColorClick = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setColorMenuAnchor(null);
  };

  const handleRemoveColor = () => {
    editor.chain().focus().unsetColor().run();
    setColorMenuAnchor(null);
  };

  return (
    <Paper elevation={3} sx={{ overflow: 'hidden' }}>
      {/* Toolbar */}
      {editable && (
        <Box sx={{ p: 1, backgroundColor: 'grey.100', borderBottom: 1, borderColor: 'divider' }}>
          <ButtonGroup size="small" sx={{ mb: 1 }}>
            <Tooltip title="Gras">
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive('bold') ? 'contained' : 'outlined'}
              >
                <Bold size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Italique">
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive('italic') ? 'contained' : 'outlined'}
              >
                <Italic size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Souligné">
              <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                variant={editor.isActive('underline') ? 'contained' : 'outlined'}
              >
                <UnderlineIcon size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Barré">
              <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive('strike') ? 'contained' : 'outlined'}
              >
                <Strikethrough size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Surlignage">
              <Button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                variant={editor.isActive('highlight') ? 'contained' : 'outlined'}
              >
                <Highlighter size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Code inline">
              <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                variant={editor.isActive('code') ? 'contained' : 'outlined'}
              >
                <Code size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Couleur texte">
              <Button
                onClick={(e) => setColorMenuAnchor(e.currentTarget)}
                variant="outlined"
              >
                🎨
              </Button>
            </Tooltip>
          </ButtonGroup>

          {/* Color Picker Menu */}
          <Menu
            anchorEl={colorMenuAnchor}
            open={Boolean(colorMenuAnchor)}
            onClose={() => setColorMenuAnchor(null)}
          >
            {colors.map((color) => (
              <MenuItem
                key={color.value}
                onClick={() => handleColorClick(color.value)}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: color.value,
                    border: '1px solid #ccc',
                    borderRadius: 0.5
                  }}
                />
                {color.name}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={handleRemoveColor}>
              Retirer la couleur
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Titre 1">
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
              >
                <Heading1 size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Titre 2">
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
              >
                <Heading2 size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Titre 3">
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                variant={editor.isActive('heading', { level: 3 }) ? 'contained' : 'outlined'}
              >
                <Heading3 size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          {/* Text Alignment */}
          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Aligner à gauche">
              <Button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                variant={editor.isActive({ textAlign: 'left' }) ? 'contained' : 'outlined'}
              >
                <AlignLeft size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Centrer">
              <Button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                variant={editor.isActive({ textAlign: 'center' }) ? 'contained' : 'outlined'}
              >
                <AlignCenter size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Aligner à droite">
              <Button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                variant={editor.isActive({ textAlign: 'right' }) ? 'contained' : 'outlined'}
              >
                <AlignRight size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Justifier">
              <Button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                variant={editor.isActive({ textAlign: 'justify' }) ? 'contained' : 'outlined'}
              >
                <AlignJustify size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Liste à puces">
              <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive('bulletList') ? 'contained' : 'outlined'}
              >
                <List size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Liste numérotée">
              <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                variant={editor.isActive('orderedList') ? 'contained' : 'outlined'}
              >
                <ListOrdered size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Liste de tâches">
              <Button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                variant={editor.isActive('taskList') ? 'contained' : 'outlined'}
              >
                <CheckSquare size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Citation">
              <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                variant={editor.isActive('blockquote') ? 'contained' : 'outlined'}
              >
                <Quote size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          {/* Special Elements */}
          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Tableau">
              <Button
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                variant="outlined"
              >
                <TableIcon size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Bloc de code">
              <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                variant={editor.isActive('codeBlock') ? 'contained' : 'outlined'}
              >
                {'</>'}
              </Button>
            </Tooltip>
            <Tooltip title="Ligne horizontale">
              <Button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                variant="outlined"
              >
                <Minus size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          {/* Callouts for Cybersecurity */}
          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Note">
              <Button
                onClick={() => editor.chain().focus().setCallout('note').run()}
                variant={editor.isActive('callout', { type: 'note' }) ? 'contained' : 'outlined'}
              >
                <Info size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Avertissement">
              <Button
                onClick={() => editor.chain().focus().setCallout('warning').run()}
                variant={editor.isActive('callout', { type: 'warning' }) ? 'contained' : 'outlined'}
              >
                <AlertCircle size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Astuce">
              <Button
                onClick={() => editor.chain().focus().setCallout('tip').run()}
                variant={editor.isActive('callout', { type: 'tip' }) ? 'contained' : 'outlined'}
              >
                💡
              </Button>
            </Tooltip>
            <Tooltip title="Danger">
              <Button
                onClick={() => editor.chain().focus().setCallout('danger').run()}
                variant={editor.isActive('callout', { type: 'danger' }) ? 'contained' : 'outlined'}
              >
                <ShieldAlert size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Succès">
              <Button
                onClick={() => editor.chain().focus().setCallout('success').run()}
                variant={editor.isActive('callout', { type: 'success' }) ? 'contained' : 'outlined'}
              >
                <CheckCircle2 size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          {/* Media */}
          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Ajouter un lien">
              <Button onClick={addLink} variant="outlined">
                <LinkIcon size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Ajouter une image">
              <Button onClick={addImage} variant="outlined">
                <ImageIcon size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Ajouter une vidéo YouTube">
              <Button onClick={addYoutube} variant="outlined">
                <YoutubeIcon size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: 'inline' }} />

          <ButtonGroup size="small" sx={{ mb: 1, ml: 1 }}>
            <Tooltip title="Annuler">
              <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo size={18} />
              </Button>
            </Tooltip>
            <Tooltip title="Refaire">
              <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo size={18} />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      )}

      {/* Editor Content */}
      <Box
        sx={{
          p: 3,
          minHeight: 400,
          maxHeight: 600,
          overflow: 'auto',
          '& .ProseMirror': {
            outline: 'none',
            '& h1': { fontSize: '2em', fontWeight: 'bold', mt: 2, mb: 1 },
            '& h2': { fontSize: '1.5em', fontWeight: 'bold', mt: 2, mb: 1 },
            '& h3': { fontSize: '1.25em', fontWeight: 'bold', mt: 2, mb: 1 },
            '& p': { mb: 1 },
            '& ul, & ol': { pl: 3, mb: 1 },
            '& ul[data-type="taskList"]': {
              listStyle: 'none',
              pl: 0,
              '& li': {
                display: 'flex',
                alignItems: 'center',
                '& > label': {
                  mr: 1,
                },
              },
            },
            '& blockquote': {
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              fontStyle: 'italic',
              color: 'text.secondary',
            },
            '& code': {
              backgroundColor: 'grey.200',
              px: 0.5,
              py: 0.25,
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: '0.9em',
            },
            '& pre': {
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              '& code': {
                backgroundColor: 'transparent',
                color: 'inherit',
                p: 0,
              },
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 1,
            },
            '& table': {
              borderCollapse: 'collapse',
              width: '100%',
              margin: '1em 0',
              '& td, & th': {
                border: '1px solid #ddd',
                padding: '8px',
                minWidth: '100px',
              },
              '& th': {
                backgroundColor: 'grey.200',
                fontWeight: 'bold',
              },
            },
            '& hr': {
              border: 'none',
              borderTop: '2px solid',
              borderColor: 'divider',
              my: 2,
            },
            '& mark': {
              backgroundColor: 'yellow',
              padding: '2px 4px',
              borderRadius: '2px',
            },
            // Callout styles
            '& div[data-callout]': {
              padding: '12px 16px',
              borderRadius: '4px',
              margin: '16px 0',
              borderLeft: '4px solid',
              '&[data-type="note"]': {
                backgroundColor: '#e3f2fd',
                borderColor: '#2196f3',
              },
              '&[data-type="warning"]': {
                backgroundColor: '#fff3e0',
                borderColor: '#ff9800',
              },
              '&[data-type="tip"]': {
                backgroundColor: '#f1f8e9',
                borderColor: '#8bc34a',
              },
              '&[data-type="danger"]': {
                backgroundColor: '#ffebee',
                borderColor: '#f44336',
              },
              '&[data-type="success"]': {
                backgroundColor: '#e8f5e9',
                borderColor: '#4caf50',
              },
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  );
};
