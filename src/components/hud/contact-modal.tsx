"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { HudPanel } from "./hud-panel";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n-client";

// 1. ESQUEMA TÁCTICO DE VALIDACIÓN
const contactSchema = z.object({
  from_name: z.string().min(2),
  from_email: z.string().email(),
  message: z.string().min(10).max(1000)
});

type ContactFormData = z.infer<typeof contactSchema>;

// Mandato React 19: Casting Absoluto
const MotionDiv = motion.div as any;
const MotionForm = motion.form as any;

/**
 * ContactModal - Canal de Comunicación HUD v7.7 (Visual Refinement).
 * Refactor: i18n Sync + macOS Rounded Geometry + Responsive Error Flow.
 */
export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema.extend({
      from_name: z.string().min(2, t("labels.error_required_name")),
      from_email: z.string().email(t("labels.error_invalid_email")),
      message: z.string().min(10, t("labels.error_min_message")).max(1000)
    }))
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EMAILJS_CONFIG_MISSING");
      }

      await emailjs.send(serviceId, templateId, data as any, publicKey);

      setStatus('success');
      reset();
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);

    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setStatus('error');
      setErrorMessage(err.message || "ERROR_SENDING_MESSAGE");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
          />

          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg z-[210] flex flex-col h-full max-h-[85vh] my-auto"
          >
            <HudPanel title="COMMUNICATION_CHANNEL" className="rounded-md shadow-[0_0_100px_rgba(0,0,0,1)] border-amber-500/20 flex flex-col h-full overflow-hidden">
              {/* BOTÓN CIERRE: Integrated Tactical Close (Standarized Amber Protocol) */}
              <button 
                onClick={onClose}
                className="absolute top-[6px] right-2 w-8 h-8 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer z-50 rounded-md border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              <div className="flex-grow overflow-hidden relative flex flex-col min-h-0">
                <div className="p-6 sm:p-10 space-y-4 flex-grow flex flex-col overflow-y-auto amber-scrollbar">
                  <div className="space-y-2 flex-none">
                    <h2 className="text-2xl font-black tracking-tighter uppercase text-white">{t("labels.contact")}</h2>
                    <div className="h-[1px] w-12 bg-amber-500/50" />
                  </div>

                  <div className="flex-grow">
                    <AnimatePresence mode="wait">
                      {status === 'success' ? (
                        <MotionDiv
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-12 flex flex-col items-center text-center space-y-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center">
                            <CheckCircle2 size={32} className="text-green-500" />
                          </div>
                          <p className="font-mono text-sm font-black text-green-400 uppercase tracking-widest">
                            {t("labels.success_message")}
                          </p>
                        </MotionDiv>
                      ) : (
                        <MotionForm
                          noValidate
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-1">{t("labels.name")}</label>
                            <input 
                              {...register("from_name")}
                              type="text"
                              placeholder={t("labels.placeholder_name")}
                              className={cn(
                                "w-full bg-black/40 backdrop-blur-md border border-white/5 border-b-2 px-4 py-3 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-b-amber-500 rounded-md transition-all",
                                errors.from_name ? "border-b-red-500/50 bg-red-500/5" : "border-b-white/10"
                              )}
                            />
                            <div className="h-5 relative overflow-hidden">
                              <AnimatePresence>
                                {errors.from_name && (
                                  <MotionDiv
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute inset-0 flex items-center px-1"
                                  >
                                    <span className="text-red-400/90 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                                      <AlertCircle size={10} />
                                      {errors.from_name.message}
                                    </span>
                                  </MotionDiv>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-1">{t("labels.email")}</label>
                            <input 
                              {...register("from_email")}
                              type="email"
                              placeholder={t("labels.placeholder_email")}
                              className={cn(
                                "w-full bg-black/40 backdrop-blur-md border border-white/5 border-b-2 px-4 py-3 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-b-amber-500 rounded-md transition-all",
                                errors.from_email ? "border-b-red-500/50 bg-red-500/5" : "border-b-white/10"
                              )}
                            />
                            <div className="h-5 relative overflow-hidden">
                              <AnimatePresence>
                                {errors.from_email && (
                                  <MotionDiv
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute inset-0 flex items-center px-1"
                                  >
                                    <span className="text-red-400/90 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                                      <AlertCircle size={10} />
                                      {errors.from_email.message}
                                    </span>
                                  </MotionDiv>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-1">{t("labels.message")}</label>
                            <textarea 
                              {...register("message")}
                              rows={4}
                              placeholder={t("labels.placeholder_message")}
                              className={cn(
                                "w-full bg-black/40 backdrop-blur-md border border-white/5 border-b-2 px-4 py-3 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-b-amber-500 rounded-md transition-all resize-none",
                                errors.message ? "border-b-red-500/50 bg-red-500/5" : "border-b-white/10"
                              )}
                            />
                            <div className="h-5 relative overflow-hidden">
                              <AnimatePresence>
                                {errors.message && (
                                  <MotionDiv
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute inset-0 flex items-center px-1"
                                  >
                                    <span className="text-red-400/90 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                                      <AlertCircle size={10} />
                                      {errors.message.message}
                                    </span>
                                  </MotionDiv>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] bg-red-500/10 p-3 border border-red-500/20 rounded-md">
                              <AlertCircle size={14} />
                              <span className="uppercase">{errorMessage}</span>
                            </div>
                          )}

                          <button
                            disabled={status === 'submitting'}
                            type="submit"
                            className="w-full relative group h-14 flex-none overflow-hidden rounded-md transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(245,158,11,0.1)] mt-2 mb-2"
                          >
                            <div className="absolute inset-0 bg-gold-gradient animate-gold-shine" />
                            <span className="relative font-mono text-[14px] font-black text-black uppercase tracking-[0.25em] flex items-center justify-center gap-3">
                              {status === 'submitting' ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  {t("labels.sending")}
                                </>
                              ) : (
                                <>
                                  <Send size={18} />
                                  {t("labels.send_message")}
                                </>
                              )}
                            </span>
                          </button>
                        </MotionForm>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </HudPanel>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}
