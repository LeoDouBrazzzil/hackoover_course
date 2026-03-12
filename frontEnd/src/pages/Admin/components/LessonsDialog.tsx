import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, GripVertical, BookOpen } from 'lucide-react';
import api, { type CourseResponse, type LessonResponse } from 'api/api.ts';
import { LessonFormDialog } from './LessonFormDialog';
import * as S from './LessonsDialog.styles';

interface LessonsDialogProps {
  open: boolean;
  course: CourseResponse;
  onClose: () => void;
}

export const LessonsDialog = ({ open, course, onClose }: LessonsDialogProps) => {
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
      setError(err.response?.data?.message || 'Erreur lors du chargement des leçons');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette leçon ?')) return;
    try {
      await api.admin.lessons.delete(lessonId);
      loadLessons();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression');
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
              <S.ModalTitle>Leçons — {course.title}</S.ModalTitle>
              <S.ModalSubtitle>{lessons.length} leçon{lessons.length !== 1 ? 's' : ''}</S.ModalSubtitle>
            </S.HeaderInfo>
            <S.CloseBtn onClick={onClose}><X size={18} /></S.CloseBtn>
          </S.ModalHeader>

          <S.ModalBody>
            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

            <S.TopBar>
              <S.Count>{loading ? 'Chargement...' : `${lessons.length} leçon${lessons.length !== 1 ? 's' : ''}`}</S.Count>
              <S.AddBtn onClick={() => { setSelectedLesson(null); setLessonFormOpen(true); }}>
                <Plus size={14} /> Nouvelle leçon
              </S.AddBtn>
            </S.TopBar>

            {lessons.length === 0 && !loading ? (
              <S.EmptyState>
                <BookOpen size={36} />
                <p>Aucune leçon pour ce cours</p>
                <p>Cliquez sur "Nouvelle leçon" pour commencer</p>
              </S.EmptyState>
            ) : (
              <S.LessonList>
                {lessons.map((lesson, index) => (
                  <S.LessonItem key={lesson.id}>
                    <S.LessonDragHandle><GripVertical size={16} /></S.LessonDragHandle>
                    <S.LessonOrder>{index + 1}</S.LessonOrder>
                    <S.LessonInfo>
                      <S.LessonTitle>{lesson.title}</S.LessonTitle>
                      <S.LessonMeta>{lesson.duration || 0} min</S.LessonMeta>
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
            <S.CloseFooterBtn onClick={onClose}>Fermer</S.CloseFooterBtn>
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
