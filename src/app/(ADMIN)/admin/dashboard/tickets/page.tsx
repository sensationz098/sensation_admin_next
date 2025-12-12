
"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Ticket = {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseName: string;
  username: string;
  description: string;
  resolved?: boolean;
};

const tickets: Record<string, Ticket> = {
  "ticket-001": { id: "ticket-001", name: "Aman Verma", email: "aman.verma@example.com", phone: "+91 7012345678", courseName: "React Mastery", username: "aman_dev", description: "Unable to access bonus content after purchase.", resolved: false },
  "ticket-002": { id: "ticket-002", name: "Sanjana Sharma", email: "sanjana.sharma@example.com", phone: "+91 9876543210", courseName: "Data Structures", username: "sanjana", description: "Payment deducted but course not unlocked.", resolved: false },
  "ticket-003": { id: "ticket-003", name: "Rohit Singh", email: "rohit.singh@example.com", phone: "+91 8162736455", courseName: "Full Stack Web Development", username: "rohit_dev", description: "Videos are loading slowly on mobile network.", resolved: false },
  "ticket-004": { id: "ticket-004", name: "Nisha Patel", email: "nisha.patel@example.com", phone: "+91 9023456781", courseName: "Java Backend", username: "nisha_code", description: "Assignment upload option not visible.", resolved: false },
  "ticket-005": { id: "ticket-005", name: "Arjun Rao", email: "arjun.rao@example.com", phone: "+91 7865432190", courseName: "MongoDB Complete Guide", username: "arjun_db", description: "Unable to connect to provided practice cluster.", resolved: false },
  "ticket-006": { id: "ticket-006", name: "Pooja Mishra", email: "pooja.m@example.com", phone: "+91 9988776655", courseName: "Python Bootcamp", username: "pooja_data", description: "Certificate is not generating.", resolved: false },
  "ticket-007": { id: "ticket-007", name: "Karan Mehta", email: "karan.mehta@example.com", phone: "+91 9090909090", courseName: "DevOps Zero to Hero", username: "karan_ops", description: "AWS lab environment not loading.", resolved: false },
  "ticket-008": { id: "ticket-008", name: "Sonal Gupta", email: "sonal.g@example.com", phone: "+91 9123456780", courseName: "Algorithms", username: "sonal", description: "Unable to download certificate.", resolved: false },
  "ticket-009": { id: "ticket-009", name: "Harsh Kumar", email: "harsh.k@example.com", phone: "+91 7890654321", courseName: "Next.js Advanced", username: "harsh_next", description: "App router section videos not playing.", resolved: false },
  "ticket-010": { id: "ticket-010", name: "Ritika Sharma", email: "ritika.sharma@example.com", phone: "+91 9988001122", courseName: "CSS Mastery", username: "ritika_ui", description: "Animations are not working in provided code.", resolved: false },
  "ticket-011": { id: "ticket-011", name: "Nitin Shah", email: "nitin.shah@example.com", phone: "+91 9988776655", courseName: "NodeJS Deep Dive", username: "nitin_shah", description: "Course progress not updating.", resolved: false },
  "ticket-012": { id: "ticket-012", name: "Vaibhav Jain", email: "vaibhav.j@example.com", phone: "+91 9123678455", courseName: "SQL Pro Course", username: "vaibhav_sql", description: "Practice queries giving unexpected errors.", resolved: false },
  "ticket-013": { id: "ticket-013", name: "Mansi Arora", email: "mansi.arora@example.com", phone: "+91 8812345670", courseName: "UI/UX Beginner", username: "mansi_design", description: "Figma download link invalid.", resolved: false },
  "ticket-014": { id: "ticket-014", name: "Zaid Khan", email: "zaid.khan@example.com", phone: "+91 7001122334", courseName: "Flutter Mobile Dev", username: "zaid_flutter", description: "Flutter SDK installation document outdated.", resolved: false },
  "ticket-015": { id: "ticket-015", name: "Isha Kapoor", email: "isha.kapoor@example.com", phone: "+91 9022334455", courseName: "AI & ML Basics", username: "isha_ai", description: "Jupyter notebook not running on given environment.", resolved: false },
};

export default function TicketPage() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  const initialKey = params.get("ticketKey") || Object.keys(tickets)[0];

  const [selectedId, setSelectedId] = useState<string>(initialKey);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // control the dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setError(null);
    const t = tickets[selectedId];
    if (t) setSelectedTicket({ ...t });
    else {
      setSelectedTicket(null);
      setError("Ticket not found in local store.");
    }
  }, [selectedId]);

  async function handleResolve() {
    if (!selectedTicket) return;
    setError(null);
    setLoading(true);
    try {
      const key = Object.keys(tickets).find((k) => tickets[k].id === selectedTicket.id) ?? selectedId;
      const target = tickets[key];
      if (!target) throw new Error("Ticket not found in local store.");
      target.resolved = true;
      setSelectedTicket({ ...target });
      await new Promise((r) => setTimeout(r, 150));
      return true; // success
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to resolve ticket");
      return false; // failure
    } finally {
      setLoading(false);
    }
  }

  function TicketListItem({ keyId, t }: { keyId: string; t: Ticket }) {
    const isSelected = keyId === selectedId;
    return (
      <button
        onClick={() => setSelectedId(keyId)}
        className={`w-full text-left px-3 py-2 rounded-md mb-2 ${isSelected ? "bg-blue-600 text-white" : "bg-white/5"}`}
      >
        <div className="font-medium">{t.name}</div>
        <div className="text-xs text-gray-400">{t.email}</div>
        <div className="text-xs mt-1">
          <span className={t.resolved ? "text-green-600" : "text-red-600"}>{t.resolved ? "Resolved" : "Open"}</span>
        </div>
      </button>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT: ticket list */}
        <div className="md:col-span-1">
          <div className="bg-white/5 rounded-2xl p-4 shadow-md h-full flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">Tickets</div>
              <div className="text-xs text-gray-400">{Object.keys(tickets).length}</div>
            </div>

            <div className="overflow-y-auto max-h-[60vh] pr-2">
              {Object.entries(tickets)
                .sort(([aId, a], [bId, b]) => {
                  if (a.resolved === b.resolved) return 0;
                  return a.resolved ? 1 : -1;
                })
                .map(([keyId, t]) => (
                  <TicketListItem key={keyId} keyId={keyId} t={t} />
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT: selected ticket details */}
        <div className="md:col-span-3">
          <div className="bg-white/5 rounded-2xl p-6 shadow-md">
            {!selectedTicket && !error && <div>Loading ticket…</div>}
            {!selectedTicket && error && <div className="text-red-600">Error: {error}</div>}

            {selectedTicket && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Ticket ID</div>
                    <div className="font-medium">{selectedTicket.id}</div>
                  </div>

                  <div className="text-sm">
                    Status:{" "}
                    <span className={selectedTicket.resolved ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {selectedTicket.resolved ? "Resolved" : "Open"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name" value={selectedTicket.name} />
                  <Field label="Username" value={selectedTicket.username} />
                  <Field label="Email" value={selectedTicket.email} />
                  <Field label="Phone" value={selectedTicket.phone} />
                  <Field label="Course" value={selectedTicket.courseName} full />
                  <Field label="Description" value={selectedTicket.description} full isText />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {/* Controlled dialog */}
                  <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Dialog.Trigger asChild>
                      <button
                        className="rounded-lg px-4 py-2 bg-green-600 text-white disabled:opacity-50"
                        disabled={selectedTicket.resolved || loading}
                        onClick={() => {
                          // open the dialog
                          setIsDialogOpen(true);
                        }}
                      >
                        {selectedTicket.resolved ? "Already resolved" : loading ? "Resolving…" : "Mark as resolved"}
                      </button>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="fixed inset-0 bg-black/40" />

                    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                      <Dialog.Title className="text-lg font-semibold">Mark ticket as resolved?</Dialog.Title>
                      <p className="text-sm text-gray-600 mt-2">This will update the local demo ticket.</p>

                      <div className="mt-4 flex justify-end gap-3">
                        <Dialog.Close className="px-3 py-2 rounded-md border">Cancel</Dialog.Close>

                        <button
                          className="px-3 py-2 rounded-md bg-red-600 text-white"
                          disabled={loading}
                          onClick={async () => {
                            const ok = await handleResolve();
                            if (ok) {
                              // close only on success
                              setIsDialogOpen(false);
                            }
                          }}
                        >
                          {loading ? "Resolving…" : "Yes, resolve"}
                        </button>
                      </div>

                      <Dialog.Close />
                    </Dialog.Content>
                  </Dialog.Root>

                  <div className="ml-auto text-sm text-gray-400">Fetched: <strong>{new Date().toLocaleString()}</strong></div>
                </div>

                {error && <div className="mt-4 text-sm text-red-600">Error: {error}</div>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, full, isText }: { label: string; value: string; full?: boolean; isText?: boolean }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""} space-y-1`}>
      <div className="text-xs text-gray-400">{label}</div>
      <div className={isText ? "whitespace-pre-wrap" : "font-medium"}>{value}</div>
    </div>
  );
}

