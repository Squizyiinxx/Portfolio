import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PanelKey = "profile" | "work" | "contact";

interface PanelStore {
  profile: boolean;
  work: boolean;
  contact: boolean;
  show: (key: PanelKey) => void;
  close: (key: PanelKey) => void;
  reset: () => void;
  handleButtonNext: () => void;
}
export const usePanelStore = create<PanelStore>()(
  devtools(
    (set, get) => ({
      profile: false,
      work: false,
      contact: false,
      show: (key) => {
        set(
          {
            profile: key === "profile",
            work: key === "work",
            contact: key === "contact",
          },
          false,
          `show/${key}`
        );
      },
      close: (key) => {
        set(
          (state) => ({
            ...state,
            [key]: false,
          }),
          false,
          `close/${key}`
        );
      },
      reset: () =>
        set(
          {
            profile: false,
            work: false,
            contact: false,
          },
          false,
          "reset"
        ),
      handleButtonNext: () => {
        const { work, contact, show } = get();

        if (!work) {
          show("work");
        } else if (work && !contact) {
          show("contact");
        }
      },
    }),
    { name: "panel-store" }
  )
);
