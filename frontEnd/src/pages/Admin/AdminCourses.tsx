import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, BookMarked } from 'lucide-react';
import { useIntl } from 'react-intl';
import { CourseFormDialog } from './components/CourseFormDialog';
import { LessonsDialog } from './components/LessonsDialog';
import api, { type CourseResponse } from 'api/api.ts';
import * as S from './AdminCourses.styles';

export const AdminCourses = () => {
  const intl = useIntl();
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
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.error.load_courses' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    try {
      await api.admin.courses.delete(courseToDelete);
      setSuccess(intl.formatMessage({ id: 'admin.success.deleted' }));
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
      loadCourses();
    } catch (err: any) {
      setError(err.response?.data?.message || intl.formatMessage({ id: 'admin.error.delete' }));
    }
  };

  const handleCourseFormClose = (refresh: boolean) => {
    setCourseFormOpen(false);
    if (refresh) {
      loadCourses();
      setSuccess(selectedCourse ? intl.formatMessage({ id: 'admin.success.updated' }) : intl.formatMessage({ id: 'admin.success.created' }));
    }
  };

  return (
    <S.Page>
      <S.Header>
        <S.TitleGroup>
          <S.Title>{intl.formatMessage({ id: 'admin.page_title' })}</S.Title>
          <S.Subtitle>{intl.formatMessage({ id: 'admin.course_count' }, { count: courses.length })}</S.Subtitle>
        </S.TitleGroup>
        <S.NewButton onClick={() => { setSelectedCourse(null); setCourseFormOpen(true); }}>
          <Plus size={15} />
          {intl.formatMessage({ id: 'admin.new_course' })}
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
              <p>{intl.formatMessage({ id: 'admin.empty.title' })}</p>
              <p>{intl.formatMessage({ id: 'admin.empty.cta' })}</p>
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
                  <BookOpen size={12} /> {intl.formatMessage({ id: 'admin.action.lessons' })}
                </S.ActionBtn>
                <S.ActionBtn onClick={() => { setSelectedCourse(course); setCourseFormOpen(true); }}>
                  <Edit size={12} /> {intl.formatMessage({ id: 'admin.action.edit' })}
                </S.ActionBtn>
                <S.ActionBtn $danger onClick={() => { setCourseToDelete(course.id); setDeleteDialogOpen(true); }}>
                  <Trash2 size={12} /> {intl.formatMessage({ id: 'admin.action.delete' })}
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
            <S.ConfirmTitle>{intl.formatMessage({ id: 'admin.confirm.title' })}</S.ConfirmTitle>
            <S.ConfirmText>
              {intl.formatMessage({ id: 'admin.confirm.text' })}
            </S.ConfirmText>
            <S.ConfirmActions>
              <S.CancelBtn onClick={() => setDeleteDialogOpen(false)}>{intl.formatMessage({ id: 'admin.confirm.cancel' })}</S.CancelBtn>
              <S.DangerBtn onClick={handleDeleteConfirm}>{intl.formatMessage({ id: 'admin.confirm.delete' })}</S.DangerBtn>
            </S.ConfirmActions>
          </S.ConfirmModal>
        </S.Overlay>
      )}
    </S.Page>
  );
};
