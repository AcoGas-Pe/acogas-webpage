"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface ContactPopupContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactPopupContext = createContext<ContactPopupContextValue | null>(null);

const AUTO_OPEN_DELAY_MS = 20000;

export function ContactPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (hasAutoOpened.current) return;
    const t = setTimeout(() => {
      hasAutoOpened.current = true;
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <ContactPopupContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactPopupContext.Provider>
  );
}

export function useContactPopup() {
  const ctx = useContext(ContactPopupContext);
  if (!ctx) return null;
  return ctx;
}
