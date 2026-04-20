import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

/**
 * Public unsubscribe page.
 * URL: /unsubscribe?token=...
 * One-click unsubscribe — no login required (UK GDPR + PECR compliant).
 */
export default function Unsubscribe() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">("loading");
  const [message, setMessage] = useState("");
  const calledRef = useRef(false);

  const unsubscribeMutation = trpc.marketing.unsubscribe.useMutation({
    onSuccess: (data) => {
      setStatus("success");
      setMessage(data.message);
    },
    onError: (err) => {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setStatus("no-token");
      setMessage("No unsubscribe token was found in this link.");
      return;
    }
    if (calledRef.current) return;
    calledRef.current = true;
    unsubscribeMutation.mutate({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg, #f0f4f8 0%, #e8edf5 100%)" }}
    >
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div
            className="px-8 py-7 text-center"
            style={{ background: "linear-gradient(135deg, #0c1e3c 0%, #163563 50%, #2e6da4 100%)" }}
          >
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)" }}
              >
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold text-white tracking-tight">EquiProfile</span>
                <span className="block text-[10px] text-white/60 uppercase tracking-widest font-medium">
                  Professional Horse Management
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-10 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="w-11 h-11 animate-spin mx-auto mb-5" style={{ color: "#2e6da4" }} />
                <h2 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">
                  Updating your preferences…
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  This will only take a moment.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#f0fdf4" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">
                  You've been unsubscribed
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>
                <div
                  className="rounded-xl px-5 py-4 text-xs text-slate-500 leading-relaxed"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  We respect your decision. You won't receive any further marketing emails from EquiProfile.
                  <br /><br />
                  If you change your mind, you're always welcome back at{" "}
                  <a href="https://equiprofile.online" style={{ color: "#2e6da4" }} className="hover:underline">
                    equiprofile.online
                  </a>
                  .
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#fff1f2" }}
                >
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">
                  Something went wrong
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>
                <p className="text-xs text-slate-400">
                  Need help? Contact{" "}
                  <a href="mailto:support@equiprofile.online" style={{ color: "#2e6da4" }} className="hover:underline">
                    support@equiprofile.online
                  </a>
                </p>
              </>
            )}

            {status === "no-token" && (
              <>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#fffbeb" }}
                >
                  <XCircle className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">
                  Invalid unsubscribe link
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>
                <p className="text-xs text-slate-400">
                  If you believe this is an error, contact{" "}
                  <a href="mailto:support@equiprofile.online" style={{ color: "#2e6da4" }} className="hover:underline">
                    support@equiprofile.online
                  </a>
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div
            className="px-8 py-4 text-center"
            style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
          >
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Amarktai Network Ltd. · EquiProfile. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
