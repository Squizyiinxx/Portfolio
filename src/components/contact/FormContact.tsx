"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LazyMotion, domAnimation, m } from "framer-motion";

const ContactSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    website: z.string().optional(), 
  })
  .strict();
type ContactFormData = z.infer<typeof ContactSchema>;

const FormContact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (data.website) {
      return reset();
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message");
      }
      reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message || "Unexpected error" });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.form
        onSubmit={onSubmit}
        className="space-y-6 z-[99]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
        aria-label="Contact form"
        noValidate
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Your name"
          className="input-contact"
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}
        <input
          {...register("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <input
          {...register("email")}
          type="email"
          placeholder="Your email"
          className="input-contact"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Your message"
          className="input-contact resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-sm">{errors.message.message}</p>
        )}

        <m.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          className="bg-primary-300 text-primary-800 px-6 py-3 rounded-xl font-semibold transition-shadow duration-300 brightness-75 hover:brightness-100 hover:shadow-[0_0_10px_rgba(255,255,0,0.8)] disabled:opacity-50 w-full md:w-44"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </m.button>
        {isSubmitSuccessful && (
          <div
            className="text-green-400 text-center"
            role="status"
            aria-live="polite"
          >
            Message sent successfully!
          </div>
        )}
        {errors.root && (
          <div
            className="text-red-400 text-center"
            role="alert"
            aria-live="assertive"
          >
            {errors.root.message}
          </div>
        )}
      </m.form>
    </LazyMotion>
  );
};

export default memo(FormContact);
