import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import api, { type CourseRequest, type CourseResponse } from 'api/api.ts';
import * as S from './CourseFormDialog.styles';

interface CourseFormDialogProps {
  open: boolean;
  course: CourseResponse | null;
  onClose: (refresh: boolean) => void;
}

export const CourseFormDialog = ({ open, course, onClose }: CourseFormDialogProps) => {
  const [formData, setFormData] = useState<CourseRequest>({
    title: '',
    description: '',
    difficulty: 'BEGINNER',
    category: 'Web Security',
    duration: 0,
    featured: false,
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        difficulty: course.difficulty,
        category: course.category,
        duration: course.duration || 0,
        featured: course.featured,
        imageUrl: course.imageUrl || '',
      });
      setImagePreview(course.imageUrl || '');
    } else {
      setFormData({ title: '', description: '', difficulty: 'BEGINNER', category: 'Web Security', duration: 0, featured: false, imageUrl: '' });
      setImagePreview('');
      setImageFile(null);
    }
    setError(null);
  }, [course, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const savedCourse = course
        ? await api.admin.courses.update(course.id, formData)
        : await api.admin.courses.create(formData);
      if (imageFile) await api.admin.courses.uploadImage(savedCourse.id, imageFile);
      onClose(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <S.Overlay onClick={() => onClose(false)}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{course ? 'Modifier le cours' : 'Nouveau cours'}</S.ModalTitle>
          <S.CloseBtn onClick={() => onClose(false)}><X size={18} /></S.CloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

          <S.Field>
            <S.Label>Titre *</S.Label>
            <S.Input
              value={formData.title}
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder="Titre du cours"
            />
          </S.Field>

          <S.Field>
            <S.Label>Description *</S.Label>
            <S.Textarea
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Décrivez le cours..."
            />
          </S.Field>

          <S.Row>
            <S.Field>
              <S.Label>Difficulté</S.Label>
              <S.Select
                value={formData.difficulty}
                onChange={e => setFormData(p => ({ ...p, difficulty: e.target.value }))}
              >
                <option value="BEGINNER">Débutant</option>
                <option value="INTERMEDIATE">Intermédiaire</option>
                <option value="ADVANCED">Avancé</option>
                <option value="EXPERT">Expert</option>
              </S.Select>
            </S.Field>
            <S.Field>
              <S.Label>Catégorie</S.Label>
              <S.Input
                value={formData.category}
                onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                placeholder="Ex: Web Security"
              />
            </S.Field>
          </S.Row>

          <S.Field>
            <S.Label>Durée (minutes)</S.Label>
            <S.Input
              type="number"
              value={formData.duration || ''}
              onChange={e => setFormData(p => ({ ...p, duration: parseInt(e.target.value) || 0 }))}
              placeholder="60"
            />
          </S.Field>

          <S.ToggleRow>
            <S.ToggleLabel>Cours en vedette</S.ToggleLabel>
            <S.ToggleSwitch>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))}
              />
              <span />
            </S.ToggleSwitch>
          </S.ToggleRow>

          <S.Field>
            <S.Label>Image</S.Label>
            <S.ImageUploadArea>
              <Upload size={15} />
              {imageFile ? imageFile.name : 'Cliquer pour uploader une image'}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </S.ImageUploadArea>
            {imagePreview && <S.ImagePreview src={imagePreview} alt="Aperçu" />}
          </S.Field>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CancelBtn onClick={() => onClose(false)} disabled={loading}>Annuler</S.CancelBtn>
          <S.SaveBtn
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description}
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </S.SaveBtn>
        </S.ModalFooter>
      </S.Modal>
    </S.Overlay>
  );
};
