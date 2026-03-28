"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) {
            return;
        }

        navigator.serviceWorker.register("/sw.js").catch(() => {
            // silent fail in unsupported contexts
        });
    }, []);

    return null;
}
