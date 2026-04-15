import { ReactNode } from "react";
import { ImageSlider } from "@/components/ImageSlider";
import { authSlides } from "@/config/marketingAssets";

interface AuthSplitLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

/**
 * Auth Split Layout Component
 *
 * Desktop (md+): 50/50 split — left panel shows an image slider, right panel
 * hosts the form. The image panel starts from the very top of the screen and
 * sits behind the fixed navbar (z-50), giving a seamless edge-to-edge look.
 * The layout scrolls naturally so the site Footer renders below the fold.
 *
 * Mobile: First image fills the background (including behind the navbar).
 * The panel itself is transparent so the image remains visible all around.
 * Only the Card (form block) carries the glass-morphism effect via its own
 * backdrop-blur / bg classes.
 */
export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="w-full relative flex flex-col min-h-screen md:flex-row md:bg-[#0b1726]">
      {/* Image slider panel — absolute full-bg on mobile, left 50% on desktop.
          No top padding so it extends behind the fixed navbar. */}
      <div className="absolute inset-0 z-0 md:sticky md:top-0 md:inset-auto md:z-auto md:w-1/2 md:flex-shrink-0 md:h-screen overflow-hidden">
        <ImageSlider
          slides={authSlides}
          interval={6000}
          showArrows={false}
          showDots={true}
          showText={false}
          className="w-full h-full"
          overlayClass="bg-black/10"
        />
      </div>

      {/* Form panel
          Mobile:  transparent + natural height so the image shows through
                   everywhere except the Card itself (which has its own glass).
                   pt-[72px] keeps the form content below the fixed navbar.
          Desktop: solid dark right half, scrollable so Footer shows below. */}
      <div
        className={[
          // base — centres the card, transparent on mobile
          "relative z-10 w-full flex items-center justify-center px-4 py-8",
          "pt-[72px] min-h-screen",
          // desktop: fill remaining width, allow natural scroll
          "md:w-1/2 md:pb-8 md:pt-[72px] md:bg-[#0b1726] md:border-l md:border-white/5",
        ].join(" ")}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
