/**
 * ManagementLayout — Layout wrapper for management public marketing pages
 */
import { ReactNode } from "react";
import { ManagementNavbar } from "./ManagementNavbar";
import { ManagementFooter } from "./ManagementFooter";
import { PageTransition } from "@/components/PageTransition";

interface ManagementLayoutProps {
  children: ReactNode;
  /** Pass true on pages where the body content IS the conversion action (e.g. Contact),
   *  so the footer pre-CTA strip is hidden to avoid a double CTA feeling. */
  hidePreFooterCta?: boolean;
}

export function ManagementLayout({ children, hidePreFooterCta }: ManagementLayoutProps) {
  return (
    <>
      <ManagementNavbar />
      <PageTransition>{children}</PageTransition>
      <ManagementFooter hidePreFooterCta={hidePreFooterCta} />
    </>
  );
}
