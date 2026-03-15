import { useState, useEffect } from "react";
import { useAuth } from "utils/useAuth.ts";
import api from "api/api.ts";

interface AccessStatus {
    hasActiveSubscription: boolean;
    hasSubscription: boolean;
    purchasedCourseIds: string[];
    loading: boolean;
    canAccess: (courseId: string) => boolean;
}

export const useAccess = (): AccessStatus => {
    const { isAuthenticated } = useAuth();
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        api.access.getStatus()
            .then(data => {
                setHasActiveSubscription(data.hasActiveSubscription);
                setPurchasedCourseIds(data.purchasedCourseIds);
            })
            .finally(() => setLoading(false));
    }, [isAuthenticated]);

    const canAccess = (courseId: string) => {
        if (!isAuthenticated) return false;
        return hasActiveSubscription || purchasedCourseIds.includes(courseId);
    };

    return { hasActiveSubscription, hasSubscription: hasActiveSubscription, purchasedCourseIds, loading, canAccess };
};
