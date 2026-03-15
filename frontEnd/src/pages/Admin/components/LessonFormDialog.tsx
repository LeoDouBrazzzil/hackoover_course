import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useIntl } from 'react-intl';
import api, { type LessonRequest, type LessonResponse } from 'api/api.ts';
import { TipTapEditor } from 'components/editor/TipTapEditor.tsx';
import * as S from './LessonFormDialog.styles';

interface LessonFormDialogProps {
  open: boolean;
  courseId: string;
  lesson: LessonResponse | null;
  nextOrderIndex: number;
  onClose: (refresh: boolean) => void;
}

export const LessonFormDialog = ({ open, courseId, lesson, nextOrderIndex, onClose }: LessonFormDialogProps) => {
  const intl = useIntl();
  const [formData, setFormData] = useState<LessonRequest>({
    courseId,
    title: '',
    content: '',
    orderIndex: nextOrderIndex,
    duration: 0,
    videoUrl: '',
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lesson) {
      setFormData({
        courseId: lesson.courseId,
        title: lesson.title,
        content: lesson.content,
        orderIndex: lesson.orderIndex,
        duration: lesson.duration || 0,
        videoUrl: lesson.videoUrl || '',
      });
    } else {
      setFormData({ courseId, title: '', content: '', orderIndex: nextOrderIndex, duration: 0, videoUrl: '' });
    }
    setActiveTab('edit');
    setError(null);
  }, [lesson, open]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (lesson) {
        await api.admin.lessons.update(lesson.id, formData);
      } else {
        await api.admin.lessons.create(formData);
      }
      onClose(true);
    } catch (err: any) {
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.lesson_form.error' }));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <S.Overlay onClick={() => onClose(false)}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{lesson ? intl.formatMessage({ id: 'admin.lesson_form.title_edit' }) : intl.formatMessage({ id: 'admin.lesson_form.title_new' })}</S.ModalTitle>
          <S.CloseBtn onClick={() => onClose(false)}><X size={18} /></S.CloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

          <S.Field>
            <S.Label>{intl.formatMessage({ id: 'admin.lesson_form.field.title' })}</S.Label>
            <S.Input
              value={formData.title}
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder={intl.formatMessage({ id: 'admin.lesson_form.field.title_placeholder' })}
            />
          </S.Field>

          <S.Row>
            <S.Field>
              <S.Label>{intl.formatMessage({ id: 'admin.lesson_form.field.duration' })}</S.Label>
              <S.Input
                type="number"
                value={formData.duration || ''}
                onChange={e => setFormData(p => ({ ...p, duration: parseInt(e.target.value) || 0 }))}
                placeholder="15"
              />
            </S.Field>
            <S.Field>
              <S.Label>{intl.formatMessage({ id: 'admin.lesson_form.field.video' })}</S.Label>
              <S.Input
                value={formData.videoUrl}
                onChange={e => setFormData(p => ({ ...p, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
              />
            </S.Field>
          </S.Row>

          <S.Field>
            <S.Label>{intl.formatMessage({ id: 'admin.lesson_form.field.content' })}</S.Label>
            <S.TabsWrapper>
              <S.TabBar>
                <S.TabBtn $active={activeTab === 'edit'} onClick={() => setActiveTab('edit')}>
                  {intl.formatMessage({ id: 'admin.lesson_form.tab.edit' })}
                </S.TabBtn>
                <S.TabBtn $active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
                  {intl.formatMessage({ id: 'admin.lesson_form.tab.preview' })}
                </S.TabBtn>
              </S.TabBar>
              <S.TabContent>
                {activeTab === 'edit' && (
                  <TipTapEditor
                    content={formData.content}
                    onChange={html => setFormData(p => ({ ...p, content: html }))}
                    editable={true}
                  />
                )}
                {activeTab === 'preview' && (
                  <TipTapEditor
                    content={formData.content}
                    editable={false}
                  />
                )}
              </S.TabContent>
            </S.TabsWrapper>
          </S.Field>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CancelBtn onClick={() => onClose(false)} disabled={loading}>{intl.formatMessage({ id: 'admin.lesson_form.cancel' })}</S.CancelBtn>
          <S.SaveBtn
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.content}
          >
            {loading ? intl.formatMessage({ id: 'admin.lesson_form.saving' }) : intl.formatMessage({ id: 'admin.lesson_form.save' })}
          </S.SaveBtn>
        </S.ModalFooter>
      </S.Modal>
    </S.Overlay>
  );
};
