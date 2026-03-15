package com.hackoover.dto;

import java.util.List;

public class AccessResponse {

    private boolean hasActiveSubscription;
    private List<String> purchasedCourseIds;

    public AccessResponse(boolean hasActiveSubscription, List<String> purchasedCourseIds) {
        this.hasActiveSubscription = hasActiveSubscription;
        this.purchasedCourseIds = purchasedCourseIds;
    }

    public boolean isHasActiveSubscription() { return hasActiveSubscription; }
    public List<String> getPurchasedCourseIds() { return purchasedCourseIds; }
}
