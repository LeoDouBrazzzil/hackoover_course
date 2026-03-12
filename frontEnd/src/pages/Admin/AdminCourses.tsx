import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, BookMarked } from 'lucide-react';
import { CourseFormDialog } from './components/CourseFormDialog';
import { LessonsDialog } from './components/LessonsDialog';
import api, { type CourseResponse } from 'api/api.ts';
import * as S from './AdminCourses.styles';

export const AdminCourses = () => {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [lessonsDialogOpen, setLessonsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<CourseResponse | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await api.admin.courses.getAll();
      setCourses(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des cours');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    try {
      await api.admin.courses.delete(courseToDelete);
      setSuccess('Cours supprimé avec succès');
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
      loadCourses();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const handleCourseFormClose = (refresh: boolean) => {
    setCourseFormOpen(false);
    if (refresh) {
      loadCourses();
      setSuccess(selectedCourse ? 'Cours modifié avec succès' : 'Cours créé avec succès');
    }
  };

  return (
    <S.Page>
      <S.Header>
        <S.TitleGroup>
          <S.Title>Gestion des cours</S.Title>
          <S.Subtitle>{courses.length} cours au total</S.Subtitle>
        </S.TitleGroup>
        <S.NewButton onClick={() => { setSelectedCourse(null); setCourseFormOpen(true); }}>
          <Plus size={15} />
          Nouveau cours
        </S.NewButton>
      </S.Header>

      {error   && <S.Toast $type="error"   onClick={() => setError(null)}>{error}</S.Toast>}
      {success && <S.Toast $type="success" onClick={() => setSuccess(null)}>{success}</S.Toast>}

      {loading ? (
        <S.LoadingGrid>
          {[...Array(6)].map((_, i) => <S.SkeletonCard key={i} />)}
        </S.LoadingGrid>
      ) : (
        <S.Grid>
          {courses.length === 0 ? (
            <S.EmptyState>
              <BookMarked size={40} />
              <p>Aucun cours pour l'instant</p>
              <p>Cliquez sur "Nouveau cours" pour commencer</p>
            </S.EmptyState>
          ) : courses.map((course, i) => (
            <S.CardWrapper key={course.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <S.CardImageWrap>
                {course.imageUrl
                  ? <S.CardImg src={course.imageUrl} alt={course.title} />
                  : <S.CardImagePlaceholder><BookOpen size={32} /></S.CardImagePlaceholder>
                }
              </S.CardImageWrap>

              <S.CardBody>
                <S.CardMeta>
                  <S.Badge $variant={course.difficulty}>{course.difficulty}</S.Badge>
                  <S.Badge>{course.category}</S.Badge>
                  {course.featured && <S.Badge $variant="featured">★ Featured</S.Badge>}
                </S.CardMeta>
                <S.CardTitle>{course.title}</S.CardTitle>
                <S.CardDesc>{course.description}</S.CardDesc>
              </S.CardBody>

              <S.CardActions>
                <S.ActionBtn onClick={() => { setSelectedCourse(course); setLessonsDialogOpen(true); }}>
                  <BookOpen size={12} /> Leçons
                </S.ActionBtn>
                <S.ActionBtn onClick={() => { setSelectedCourse(course); setCourseFormOpen(true); }}>
                  <Edit size={12} /> Éditer
                </S.ActionBtn>
                <S.ActionBtn $danger onClick={() => { setCourseToDelete(course.id); setDeleteDialogOpen(true); }}>
                  <Trash2 size={12} /> Supprimer
                </S.ActionBtn>
              </S.CardActions>
            </S.CardWrapper>
          ))}
        </S.Grid>
      )}

      {courseFormOpen && (
        <CourseFormDialog
          open={courseFormOpen}
          course={selectedCourse}
          onClose={handleCourseFormClose}
        />
      )}

      {lessonsDialogOpen && selectedCourse && (
        <LessonsDialog
          open={lessonsDialogOpen}
          course={selectedCourse}
          onClose={() => setLessonsDialogOpen(false)}
        />
      )}

      {deleteDialogOpen && (
        <S.Overlay onClick={() => setDeleteDialogOpen(false)}>
          <S.ConfirmModal onClick={e => e.stopPropagation()}>
            <S.ConfirmTitle>Supprimer ce cours ?</S.ConfirmTitle>
            <S.ConfirmText>
              Cette action est irréversible. Le cours et toutes ses leçons seront définitivement supprimés.
            </S.ConfirmText>
            <S.ConfirmActions>
              <S.CancelBtn onClick={() => setDeleteDialogOpen(false)}>Annuler</S.CancelBtn>
              <S.DangerBtn onClick={handleDeleteConfirm}>Supprimer</S.DangerBtn>
            </S.ConfirmActions>
          </S.ConfirmModal>
        </S.Overlay>
      )}
    </S.Page>
  );
};
