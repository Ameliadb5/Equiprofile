/**
 * AdminUnlockDialog
 *
 * A self-contained dialog that lets a user with role=admin unlock their admin
 * session by entering the ADMIN_UNLOCK_PASSWORD, without needing to go to AI
 * Chat and type "show admin".
 *
 * Usage:
 *   <AdminUnlockDialog trigger={<Button>Open Admin Panel</Button>} />
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import React from "react";

interface AdminUnlockDialogProps {
  /** The element that triggers the dialog when clicked */
  trigger: React.ReactElement;
  /** Called after a successful unlock (defaults to navigating to /admin) */
  onUnlocked?: () => void;
}

export function AdminUnlockDialog({
  trigger,
  onUnlocked,
}: AdminUnlockDialogProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();

  const unlockMutation = trpc.adminUnlock.submitPassword.useMutation({
    onSuccess: () => {
      setOpen(false);
      setPassword("");
      toast.success("Admin mode unlocked!");
      if (onUnlocked) {
        onUnlocked();
      } else {
        navigate("/admin");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Incorrect password");
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      unlockMutation.mutate({ password });
    }
  };

  // Inject onClick onto the trigger element so it is keyboard-accessible.
  // The caller supplies an interactive element (e.g. <Button>) which already
  // handles focus and keyboard events; we just wire in the open action.
  const triggerWithHandler = React.cloneElement(
    trigger as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>,
    {
      onClick: (e: React.MouseEvent) => {
        // Preserve any existing onClick on the trigger
        const originalOnClick = (
          trigger.props as { onClick?: (e: React.MouseEvent) => void }
        ).onClick;
        originalOnClick?.(e);
        setOpen(true);
      },
    },
  );

  return (
    <>
      {triggerWithHandler}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Unlock Admin Panel
            </DialogTitle>
            <DialogDescription>
              Enter the admin unlock password to access the Admin Dashboard.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-unlock-password">Admin Password</Label>
              <Input
                id="admin-unlock-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                disabled={unlockMutation.isPending}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setPassword("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!password.trim() || unlockMutation.isPending}
              >
                {unlockMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Unlocking…
                  </>
                ) : (
                  "Unlock"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
