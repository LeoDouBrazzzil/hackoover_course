import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen } from "lucide-react";
import { useIntl } from "react-intl";

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
import { useAccess } from "utils/useAccess.ts";

export default function Courses() {
    const intl = useIntl();
    const [searchTerm,      setSearchTerm]      = useState("");
    const [levelFilter,     setLevelFilter]     = useState("all");
    const [categoryFilter,  setCategoryFilter]  = useState("all");

    const { canAccess } = useAccess();

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
                <PageTitle>{intl.formatMessage({ id: "courses.page_title" })}</PageTitle>
                <PageSubtitle>{intl.formatMessage({ id: "courses.page_sub" })}</PageSubtitle>
            </PageHeader>

            {/* ── Filters ── */}
            <FiltersBar>
                <SearchWrap>
                    <Search />
                    <SearchInput
                        placeholder={intl.formatMessage({ id: "courses.search_placeholder" })}
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
                    <option value="all">{intl.formatMessage({ id: "courses.filter.all_levels" })}</option>
                    <option value="débutant">{intl.formatMessage({ id: "courses.filter.beginner" })}</option>
                    <option value="intermédiaire">{intl.formatMessage({ id: "courses.filter.intermediate" })}</option>
                    <option value="avancé">{intl.formatMessage({ id: "courses.filter.advanced" })}</option>
                    <option value="expert">{intl.formatMessage({ id: "courses.filter.expert" })}</option>
                </FilterSelect>

                <FilterSelect
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    aria-label="Filtrer par catégorie"
                >
                    <option value="all">{intl.formatMessage({ id: "courses.filter.all_categories" })}</option>
                    <option value="pentesting">{intl.formatMessage({ id: "courses.filter.pentesting" })}</option>
                    <option value="cryptographie">{intl.formatMessage({ id: "courses.filter.cryptography" })}</option>
                    <option value="forensic">{intl.formatMessage({ id: "courses.filter.forensic" })}</option>
                </FilterSelect>

                {!isLoading && (
                    <ResultCount>
                        {intl.formatMessage({ id: "courses.count" }, { count: filtered.length })}
                    </ResultCount>
                )}
            </FiltersBar>

            {/* ── Grid ── */}
            <CoursesGrid>
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : filtered.length > 0 ? (
                    filtered.map((c: any) => (
                        <CourseCard key={c.id} course={c} isLocked={!canAccess(c.id)} />
                    ))
                ) : (
                    <EmptyState>
                        <BookOpen />
                        <strong>{intl.formatMessage({ id: "courses.empty.title" })}</strong>
                        <span>{intl.formatMessage({ id: "courses.empty.sub" })}</span>
                    </EmptyState>
                )}
            </CoursesGrid>

        </CoursesContainer>
    );
}
