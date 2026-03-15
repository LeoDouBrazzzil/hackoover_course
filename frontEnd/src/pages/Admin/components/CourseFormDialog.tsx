import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { useIntl } from 'react-intl';
import api, { type CourseRequest, type CourseResponse } from 'api/api.ts';
import * as S from './CourseFormDialog.styles';

interface CourseFormDialogProps {
  open: boolean;
  course: CourseResponse | null;
  onClose: (refresh: boolean) => void;
}

export const CourseFormDialog = ({ open, course, onClose }: CourseFormDialogProps) => {
  const intl = useIntl();
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
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.error.save' }));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <S.Overlay onClick={() => onClose(false)}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{course ? intl.formatMessage({ id: 'admin.course_form.title_edit' }) : intl.formatMessage({ id: 'admin.course_form.title_new' })}</S.ModalTitle>
          <S.CloseBtn onClick={() => onClose(false)}><X size={18} /></S.CloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

          <S.Field>
            <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.title' })}</S.Label>
            <S.Input
              value={formData.title}
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder={intl.formatMessage({ id: 'admin.course_form.field.title_placeholder' })}
            />
          </S.Field>

          <S.Field>
            <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.description' })}</S.Label>
            <S.Textarea
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder={intl.formatMessage({ id: 'admin.course_form.field.description_placeholder' })}
            />
          </S.Field>

          <S.Row>
            <S.Field>
              <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.difficulty' })}</S.Label>
              <S.Select
                value={formData.difficulty}
                onChange={e => setFormData(p => ({ ...p, difficulty: e.target.value }))}
              >
                <option value="BEGINNER">{intl.formatMessage({ id: 'admin.course_form.difficulty.beginner' })}</option>
                <option value="INTERMEDIATE">{intl.formatMessage({ id: 'admin.course_form.difficulty.intermediate' })}</option>
                <option value="ADVANCED">{intl.formatMessage({ id: 'admin.course_form.difficulty.advanced' })}</option>
                <option value="EXPERT">{intl.formatMessage({ id: 'admin.course_form.difficulty.expert' })}</option>
              </S.Select>
            </S.Field>
            <S.Field>
              <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.category' })}</S.Label>
              <S.Input
                value={formData.category}
                onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                placeholder={intl.formatMessage({ id: 'admin.course_form.field.category_placeholder' })}
              />
            </S.Field>
          </S.Row>

          <S.Field>
            <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.duration' })}</S.Label>
            <S.Input
              type="number"
              value={formData.duration || ''}
              onChange={e => setFormData(p => ({ ...p, duration: parseInt(e.target.value) || 0 }))}
              placeholder="60"
            />
          </S.Field>

          <S.ToggleRow>
            <S.ToggleLabel>{intl.formatMessage({ id: 'admin.course_form.field.featured' })}</S.ToggleLabel>
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
            <S.Label>{intl.formatMessage({ id: 'admin.course_form.field.image' })}</S.Label>
            <S.ImageUploadArea>
              <Upload size={15} />
              {imageFile ? imageFile.name : intl.formatMessage({ id: 'admin.course_form.image_upload' })}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </S.ImageUploadArea>
            {imagePreview && <S.ImagePreview src={imagePreview} alt={intl.formatMessage({ id: 'admin.course_form.image_preview_alt' })} />}
          </S.Field>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CancelBtn onClick={() => onClose(false)} disabled={loading}>{intl.formatMessage({ id: 'admin.course_form.cancel' })}</S.CancelBtn>
          <S.SaveBtn
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description}
          >
            {loading ? intl.formatMessage({ id: 'admin.course_form.saving' }) : intl.formatMessage({ id: 'admin.course_form.save' })}
          </S.SaveBtn>
        </S.ModalFooter>
      </S.Modal>
    </S.Overlay>
  );
};
