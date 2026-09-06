"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  GlobalWorkerOptions,
  getDocument,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  X,
  ExternalLink,
} from "lucide-react";

export interface CertificateItem {
  id: string;
  fileName: string;
  fileUrl: string;
  type: "image" | "pdf";
  title: string;
  issuer: string;
}

interface CertificatesCarouselProps {
  certificates: CertificateItem[];
}

GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs";

function PdfCanvas({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const loadingTask = getDocument({ url: src });

    loadingTask.promise
      .then(async (pdf) => {
        if (cancelled) return;
        const page = await pdf.getPage(1);
        if (cancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale: 2 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: context, viewport }).promise;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-label="Certificate" />;
}

export default function CertificatesCarousel({
  certificates,
}: CertificatesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerRef = useRef<{
    active: boolean;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    target: HTMLElement | null;
  }>({ active: false, startX: 0, startScrollLeft: 0, moved: false, target: null });
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"normal" | "reverse">(
    "normal"
  );

  const handleCardClick = (cert: CertificateItem, trigger: HTMLElement) => {
    if (pointerRef.current.moved) return;
    lastTriggerRef.current = trigger;
    setSelectedCert(cert);
  };

  const pauseForInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsInteractionPaused(true);
  };

  const resumeAfterInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsInteractionPaused(false), 1100);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || !scrollContainerRef.current) return;
    event.preventDefault();
    pauseForInteraction();
    scrollContainerRef.current.scrollLeft += event.deltaX;
    resumeAfterInteraction();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = event.currentTarget;
    pointerRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      moved: false,
      target: event.target instanceof HTMLElement ? event.target : null,
    };
    viewport.setPointerCapture(event.pointerId);
    pauseForInteraction();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer.active) return;
    const distance = event.clientX - pointer.startX;
    if (Math.abs(distance) > 5) pointer.moved = true;
    if (!pointer.moved) return;
    event.preventDefault();
    event.currentTarget.scrollLeft = pointer.startScrollLeft - distance;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current.active) return;
    const { moved, target } = pointerRef.current;
    pointerRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!moved && target && !target.closest("button")) {
      const cardElement = target.closest<HTMLElement>("[data-certificate-id]");
      const certificate = certificates.find(
        (cert) => cert.id === cardElement?.dataset.certificateId
      );
      if (certificate && cardElement) handleCardClick(certificate, cardElement);
    }
    resumeAfterInteraction();
    window.setTimeout(() => {
      pointerRef.current.moved = false;
    }, 0);
  };

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const handleScrollNav = (direction: "left" | "right") => {
    const viewport = scrollContainerRef.current;
    if (!viewport) return;
    pauseForInteraction();
    viewport.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
    resumeAfterInteraction();
  };

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => {
        cancelAnimationFrame(frame);
        document.body.style.overflow = "unset";
        lastTriggerRef.current?.focus();
      };
    }

    document.body.style.overflow = "unset";
    lastTriggerRef.current?.focus();
    return undefined;
  }, [selectedCert]);

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSelectedCert(null);
      return;
    }

    if (event.key !== "Tab" || !modalRef.current) return;

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled"));
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const renderCertificateGroup = (copy: number) => (
    <div className="certificates-marquee-group" aria-hidden={copy > 0} key={copy}>
      {certificates.map((cert, idx) => (
        <motion.div
          key={`${copy}-${cert.id || idx}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: Math.min(idx * 0.05, 0.4) }}
          whileHover={{ y: -6 }}
          data-certificate-id={cert.id}
          onClick={(event) => handleCardClick(cert, event.currentTarget)}
          onTouchEnd={(event) => handleCardClick(cert, event.currentTarget)}
          tabIndex={-1}
          className="group flex-shrink-0 w-[245px] sm:w-[290px] lg:w-[310px] flex flex-col rounded-2xl surface-glass certificate-card-glow transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {/* Thumbnail Area */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-black/40 flex items-center justify-center p-4">
            {cert.type === "image" ? (
              <>
                <Image
                  src={cert.fileUrl}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 245px, (max-width: 1024px) 290px, 310px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070410]/90 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="relative h-full w-full overflow-hidden bg-white transition-colors">
                <PdfCanvas
                  src={cert.fileUrl}
                  className="pointer-events-none h-full w-full object-cover object-top"
                />
              </div>
            )}

            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-eyebrow uppercase tracking-[0.18em] bg-[var(--surface-soft)] border border-border text-accent-soft backdrop-blur-md">
                <Award className="w-2.5 h-2.5 text-accent-soft" />
                Verified
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-eyebrow text-accent-soft truncate">
                {cert.issuer}
              </span>
            </div>

            <h3 className="font-heading text-base font-bold text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug mb-3">
              {cert.title}
            </h3>

            <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between transition-colors">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.12] bg-[var(--surface-soft)] text-xs font-body font-medium text-foreground/90 group-hover:text-foreground group-hover:border-accent transition-colors"
                onClick={(event) => {
                  event.stopPropagation();
                  lastTriggerRef.current = event.currentTarget;
                  setSelectedCert(cert);
                }}
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3 h-3 text-accent-soft opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full">
      {/* Top Controls: Counter & Nav Buttons */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-xs font-eyebrow text-muted-foreground flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-soft" />
          <span className="josefin-sans-2 uppercase tracking-[0.18em]">
            {certificates.length} Verified Credentials
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setAnimationDirection("reverse");
              handleScrollNav("left");
            }}
            aria-label="Previous certificate"
            className="p-2 rounded-full border border-border bg-[var(--surface-soft)] text-muted hover:text-foreground hover:border-accent transition-all duration-200 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setAnimationDirection("normal");
              handleScrollNav("right");
            }}
            aria-label="Next certificate"
            className="p-2 rounded-full border border-border bg-[var(--surface-soft)] text-muted hover:text-foreground hover:border-accent transition-all duration-200 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Container with Edge Mask */}
      <div
        ref={scrollContainerRef}
        className="certificates-marquee-viewport relative overflow-x-auto overflow-y-hidden scrollbar-none [mask-image:linear-gradient(to_right,transparent_0%,black_1.5rem,black_calc(100%-1.5rem),transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,black_2.5rem,black_calc(100%-2.5rem),transparent_100%)]"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onFocus={() => setIsHoverPaused(true)}
        onBlur={() => setIsHoverPaused(false)}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="certificates-marquee-track select-none pb-6 pt-2"
          style={{
            animationPlayState:
              isHoverPaused || isInteractionPaused ? "paused" : "running",
            animationDirection,
          }}
        >
          {renderCertificateGroup(0)}
          {renderCertificateGroup(1)}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050308]/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-dialog-title"
            onKeyDown={handleModalKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              ref={modalRef}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col items-center bg-transparent"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="w-full border-b border-white/10 px-3 pb-3 pt-2 pr-14 text-left sm:px-5">
                <span className="text-[10px] font-eyebrow uppercase tracking-[0.2em] text-accent-soft">
                  {selectedCert.issuer}
                </span>
                <h2
                  id="certificate-dialog-title"
                  className="mt-1 font-heading text-lg font-bold text-foreground sm:text-xl"
                >
                  {selectedCert.title}
                </h2>
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate"
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-[#0b0712]/90 p-2.5 text-white shadow-lg transition-colors hover:border-accent hover:bg-[#160d24]"
              >
                <X className="h-5 w-5" />
              </button>
              {selectedCert.type === "image" ? (
                <Image
                  src={selectedCert.fileUrl}
                  alt={selectedCert.title}
                  width={1600}
                  height={2200}
                  className="max-h-[82vh] w-auto max-w-full object-contain pt-3"
                  sizes="100vw"
                  priority
                />
              ) : (
                <PdfCanvas
                  src={selectedCert.fileUrl}
                  className="max-h-[82vh] max-w-full object-contain pt-3"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
