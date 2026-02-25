import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const open = idx === openIndex;
        return (
          <div key={it.q} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
            >
              <span className="font-semibold">{it.q}</span>
              <span
                className="grid place-items-center transition"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  background: "white",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                <ChevronDown size={18} />
              </span>
            </button>

            <div
              className="px-6"
              style={{
                maxHeight: open ? 220 : 0,
                overflow: "hidden",
                transition: "max-height 260ms ease",
              }}
            >
              <div className="pb-5 text-sm text-muted leading-relaxed">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}