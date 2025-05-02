"use client";
import dynamic from "next/dynamic";
import { blurDataContactSection } from "@/lib/blurData";
import PageTemplate from "../../components/templates/PageTemplate";
import ButtonCloseSection from "../../components/ButtonCloseSection";
import Preload from "../../components/PreloadEffect";
import { domAnimation, LazyMotion, m } from "framer-motion";

const loadAmbientParticles = () =>
  import("@/components/contact/AmbientParticles");
const loadSocialMedia = () => import("@/components/contact/SocialMedia");
const loadFormContact = () => import("@/components/contact/FormContact");
const loadHeadingContact = () => import("@/components/contact/HeadingContact");

const AmbientParticles = dynamic(loadAmbientParticles, { ssr: false });
const SocialMedia = dynamic(loadSocialMedia, { ssr: false });
const FormContact = dynamic(loadFormContact, { ssr: false });
const HeadingContact = dynamic(loadHeadingContact, {
  ssr: false,
  loading: () => (
    <div className="flex w-full h-[3rem] animate-pulse bg-neutral-800"></div>
  ),
});

export default function ContactContent({ onClose }: { onClose: () => void }) {
  return (
    <LazyMotion features={domAnimation}>
      <Preload
        modules={[
          loadAmbientParticles,
          loadHeadingContact,
          loadFormContact,
          loadSocialMedia,
        ]}
      />
      <PageTemplate
        pageType="contact"
        className="fixed inset-0  overflow-hidden bg-neutral-900 text-white"
        bgSrc="/bg-contact.webp"
        bgAlt="Contact Background"
        blurData={blurDataContactSection}
        Component={<AmbientParticles />}
      >
        <div className="max-w-3xl mx-auto py-12 space-y-12">
          <ButtonCloseSection
          onClose={onClose}
            className="lg:hidden"
            title="Close Contact Section"
          />
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            viewport={{ once: true }}
          >
            <HeadingContact />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FormContact />
          </m.div>
          <SocialMedia />
        </div>
      </PageTemplate>
    </LazyMotion>
  );
}
