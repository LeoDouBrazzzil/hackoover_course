import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen } from "lucide-react";

import CourseCard from "components/courses/CourseCard/CourseCard.tsx";

import {
    CoursesContainer,
    PageHeader,
    PageTitle,
    PageSubtitle,
    FiltersBar,
    SearchWrap,
    SearchInput,
    FilterDivider,
    FilterSelect,
    ResultCount,
    CoursesGrid,
    SkeletonCard,
    EmptyState,
} from "pages/Courses/Courses.styles.tsx";
import api from "api/api.ts";

export default function Courses() {
    const [searchTerm,      setSearchTerm]      = useState("");
    const [levelFilter,     setLevelFilter]     = useState("all");
    const [categoryFilter,  setCategoryFilter]  = useState("all");

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => api.entities.Course.list(),
        initialData: [],
    });

    const filtered = courses.filter((course: any) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.description ?? "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel    = levelFilter    === "all" || course.level    === levelFilter;
        const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
        return matchesSearch && matchesLevel && matchesCategory;
    });

    return (
        <CoursesContainer>

            {/* ── Header ── */}
            <PageHeader>
                <PageTitle>Catalogue de Cours</PageTitle>
                <PageSubtitle>Explorez nos formations en cybersécurité</PageSubtitle>
            </PageHeader>

            {/* ── Filters ── */}
            <FiltersBar>
                <SearchWrap>
                    <Search />
                    <SearchInput
                        placeholder="Rechercher un cours..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </SearchWrap>

                <FilterDivider />

                <FilterSelect
                    value={levelFilter}
                    onChange={e => setLevelFilter(e.target.value)}
                    aria-label="Filtrer par niveau"
                >
                    <option value="all">Tous niveaux</option>
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                    <option value="expert">Expert</option>
                </FilterSelect>

                <FilterSelect
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    aria-label="Filtrer par catégorie"
                >
                    <option value="all">Toutes catégories</option>
                    <option value="pentesting">Pentesting</option>
                    <option value="cryptographie">Cryptographie</option>
                    <option value="forensic">Forensic</option>
                </FilterSelect>

                {!isLoading && (
                    <ResultCount>
                        {filtered.length} cours
                    </ResultCount>
                )}
            </FiltersBar>

            {/* ── Grid ── */}
            <CoursesGrid>
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : filtered.length > 0 ? (
                    filtered.map((c: any) => (
                        <CourseCard key={c.id} course={c} />
                    ))
                ) : (
                    <EmptyState>
                        <BookOpen />
                        <strong>Aucun cours trouvé</strong>
                        <span>Essayez de modifier vos filtres ou votre recherche</span>
                    </EmptyState>
                )}
            </CoursesGrid>

        </CoursesContainer>
    );
}
