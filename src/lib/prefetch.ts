export const prefetchProfile = async () => {
  await import("../app/section/Profile");
  await import("../app/section/SkillShowCase");
};

export const prefetchWork = async () => {
  await import("../app/section/WorkSection");
};

export const prefetchContact = async () => {
  await import("../app/section/ContactSection");
};
