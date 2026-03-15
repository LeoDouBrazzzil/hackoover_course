import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, GripVertical, BookOpen } from 'lucide-react';
import { useIntl } from 'react-intl';
import api, { type CourseResponse, type LessonResponse } from 'api/api.ts';
import { LessonFormDialog } from './LessonFormDialog';
import * as S from './LessonsDialog.styles';

interface LessonsDialogProps {
  open: boolean;
  course: CourseResponse;
  onClose: () => void;
}

export const LessonsDialog = ({ open, course, onClose }: LessonsDialogProps) => {
  const intl = useIntl();
  const [lessons, setLessons] = useState<LessonResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(null);

  useEffect(() => {
    if (open) loadLessons();
  }, [open, course.id]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const data = await api.admin.lessons.getByCourse(course.id);
      setLessons(data.sort((a, b) => a.orderIndex - b.orderIndex));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.lessons.error.load' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm(intl.formatMessage({ id: 'admin.lessons.confirm_delete' }))) return;
    try {
      await api.admin.lessons.delete(lessonId);
      loadLessons();
    } catch (err: any) {
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.lessons.error.delete' }));
    }
  };

  const handleLessonFormClose = (refresh: boolean) => {
    setLessonFormOpen(false);
    if (refresh) loadLessons();
  };

  if (!open) return null;

  return (
    <>
      <S.Overlay onClick={onClose}>
        <S.Modal onClick={e => e.stopPropagation()}>
          <S.ModalHeader>
            <S.HeaderInfo>
              <S.ModalTitle>{intl.formatMessage({ id: 'admin.lessons.title' }, { course: course.title })}</S.ModalTitle>
              <S.ModalSubtitle>{intl.formatMessage({ id: 'admin.lessons.subtitle' }, { count: lessons.length, plural: lessons.length !== 1 ? 's' : '' })}</S.ModalSubtitle>
            </S.HeaderInfo>
            <S.CloseBtn onClick={onClose}><X size={18} /></S.CloseBtn>
          </S.ModalHeader>

          <S.ModalBody>
            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

            <S.TopBar>
              <S.Count>{loading ? intl.formatMessage({ id: 'admin.lessons.loading' }) : intl.formatMessage({ id: 'admin.lessons.subtitle' }, { count: lessons.length, plural: lessons.length !== 1 ? 's' : '' })}</S.Count>
              <S.AddBtn onClick={() => { setSelectedLesson(null); setLessonFormOpen(true); }}>
                <Plus size={14} /> {intl.formatMessage({ id: 'admin.lessons.new' })}
              </S.AddBtn>
            </S.TopBar>

            {lessons.length === 0 && !loading ? (
              <S.EmptyState>
                <BookOpen size={36} />
                <p>{intl.formatMessage({ id: 'admin.lessons.empty.title' })}</p>
                <p>{intl.formatMessage({ id: 'admin.lessons.empty.cta' })}</p>
              </S.EmptyState>
            ) : (
              <S.LessonList>
                {lessons.map((lesson, index) => (
                  <S.LessonItem key={lesson.id}>
                    <S.LessonDragHandle><GripVertical size={16} /></S.LessonDragHandle>
                    <S.LessonOrder>{index + 1}</S.LessonOrder>
                    <S.LessonInfo>
                      <S.LessonTitle>{lesson.title}</S.LessonTitle>
                      <S.LessonMeta>{lesson.duration || 0} {intl.formatMessage({ id: 'admin.lessons.min' })}</S.LessonMeta>
                    </S.LessonInfo>
                    <S.LessonActions>
                      <S.IconBtn onClick={() => { setSelectedLesson(lesson); setLessonFormOpen(true); }}>
                        <Edit size={14} />
                      </S.IconBtn>
                      <S.IconBtn $danger onClick={() => handleDeleteLesson(lesson.id)}>
                        <Trash2 size={14} />
                      </S.IconBtn>
                    </S.LessonActions>
                  </S.LessonItem>
                ))}
              </S.LessonList>
            )}
          </S.ModalBody>

          <S.ModalFooter>
            <S.CloseFooterBtn onClick={onClose}>{intl.formatMessage({ id: 'admin.lessons.close' })}</S.CloseFooterBtn>
          </S.ModalFooter>
        </S.Modal>
      </S.Overlay>

      {lessonFormOpen && (
        <LessonFormDialog
          open={lessonFormOpen}
          courseId={course.id}
          lesson={selectedLesson}
          nextOrderIndex={lessons.length}
          onClose={handleLessonFormClose}
        />
      )}
    </>
  );
};
