package com.hackoover.controller;

import com.hackoover.dto.AccessResponse;
import com.hackoover.service.AccessService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/access")
public class AccessController {

    private final AccessService accessService;

    public AccessController(AccessService accessService) {
        this.accessService = accessService;
    }

    /** Retourne le statut d'accès de l'utilisateur connecté */
    @GetMapping("/status")
    public ResponseEntity<AccessResponse> getStatus(Authentication auth) {
        return ResponseEntity.ok(accessService.getStatus(auth.getName()));
    }

    /** Active l'abonnement mensuel (mock — pas de paiement réel) */
    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(Authentication auth) {
        accessService.subscribe(auth.getName());
        return ResponseEntity.ok().build();
    }

    /** Achète un cours individuel (mock) */
    @PostMapping("/purchase/{courseId}")
    public ResponseEntity<Void> purchaseCourse(@PathVariable UUID courseId, Authentication auth) {
        accessService.purchaseCourse(auth.getName(), courseId);
        return ResponseEntity.ok().build();
    }
}
