"use client";

import dynamic from "next/dynamic";
import { blurDataWorkSection } from "@/lib/blurData";
import Preload from "@/components/PreloadEffect";
import PageTemplate from "../../components/templates/PageTemplate";
import ButtonCloseSection from "../../components/ButtonCloseSection";

const loadHeadingWorkSection = () =>
  import("@/components/work/HeadingWorkSection");
const loadProjectGridContainer = () =>
  import("@/components/work/ProjectGridContainer");

const HeadingWorkSection = dynamic(loadHeadingWorkSection, {
  ssr: false,
  loading: () => <div className="h-36 bg-neutral-700 animate-pulse w-full" />,
});
const ProjectGridContainer = dynamic(loadProjectGridContainer, {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-neutral-800 animate-pulse w-full" />
  ),
});

const WorkSection = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <Preload
        modules={[
          () => import("@/components/CinematicBackgroundLayer"),
          loadHeadingWorkSection,
          loadProjectGridContainer,
        ]}
      />
      <PageTemplate
        className="fixed inset-0 bg-neutral-950 text-white"
        bgSrc="/bg-landscape.webp"
        bgAlt="Work Section Background"
        blurData={blurDataWorkSection}
        pageType="work"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <ButtonCloseSection onClose={onClose} title="Close Work Section" />
          <HeadingWorkSection />
          <ProjectGridContainer />
        </div>
      </PageTemplate>
    </>
  );
};

export default WorkSection;
