import { usePanelStore } from "@/store/PanelStore";
import { useCallback, useMemo } from "react";

export const usePanel = () => {
  // Selektif mengambil hanya state yang diperlukan
  const profile = usePanelStore((state) => state.profile);
  const work = usePanelStore((state) => state.work);
  const contact = usePanelStore((state) => state.contact);
  const show = usePanelStore((state) => state.show);
  const close = usePanelStore((state) => state.close);
  const reset = usePanelStore((state) => state.reset);
  const handleButtonNext = usePanelStore((state) => state.handleButtonNext);

  // Perbaikan: memindahkan useCallback ke top level, tidak dalam useMemo
  const showProfile = useCallback(() => show("profile"), [show]);
  const closeProfile = useCallback(() => close("profile"), [close]);
  const showWork = useCallback(() => show("work"), [show]);
  const closeWork = useCallback(() => close("work"), [close]);
  const showContact = useCallback(() => show("contact"), [show]);
  const closeContact = useCallback(() => close("contact"), [close]);
  const resetPanels = useCallback(() => reset(), [reset]);

  // Sekarang useMemo hanya menyimpan object biasa, tidak ada hooks di dalamnya
  const handlers = useMemo(
    () => ({
      showProfile,
      closeProfile,
      showWork,
      closeWork,
      showContact,
      closeContact,
      reset: resetPanels,
    }),
    [
      showProfile,
      closeProfile,
      showWork,
      closeWork,
      showContact,
      closeContact,
      resetPanels,
    ]
  );
  const panel = Object.freeze({ profile, work, contact });

  return { panel, handlers, handleButtonNext };
};
