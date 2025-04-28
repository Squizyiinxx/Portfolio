
import dynamic from "next/dynamic";

const MainContent = dynamic(() => import("./MainContent"), { ssr: true });

export const revalidate = 86400;
export default function Home() {
  return (
    <>
      <MainContent />
    </>
  );
}
