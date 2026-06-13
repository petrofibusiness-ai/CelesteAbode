"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  MessagesSquare,
  Send,
  Shuffle,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  applyLeadNameToMessage,
  LEAD_FOLLOW_UP_CONDITIONS,
  pickRandomFollowUpMessage,
  type FollowUpCondition,
  type FollowUpMessage,
} from "@/lib/lead-follow-up-messages";
import {
  openWhatsAppSendToNumber,
  whatsAppComposeUrlNoRecipient,
} from "@/lib/whatsapp-compose";

const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function getPhoneValidationError(value: string): string {
  if (!value.trim()) return "Enter a phone number.";
  const digits = normalizePhoneDigits(value);
  if (digits.length < PHONE_MIN_DIGITS || digits.length > PHONE_MAX_DIGITS) {
    return `Use a valid WhatsApp number (${PHONE_MIN_DIGITS}-${PHONE_MAX_DIGITS} digits including country code).`;
  }
  return "";
}

function ConditionCard({
  condition,
  selected,
  onSelect,
}: {
  condition: FollowUpCondition;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full min-w-[15.5rem] shrink-0 snap-start flex-col rounded-2xl border p-4 text-left transition-all sm:min-w-0",
        selected
          ? "border-[#CBB27A] bg-gradient-to-br from-[#CBB27A]/10 to-white shadow-md ring-2 ring-[#CBB27A]/30"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
            selected ? "bg-[#CBB27A] text-white" : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200"
          )}
        >
          {condition.letter}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-zinc-900">{condition.shortTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{condition.pipelineLabel}</p>
        </div>
        {selected ? <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden /> : null}
      </div>
    </button>
  );
}

function MessageOptionCard({
  message,
  previewName,
  selected,
  onSelect,
}: {
  message: FollowUpMessage;
  previewName: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const preview = applyLeadNameToMessage(message.body, previewName);
  const firstLine = preview.split("\n")[0] ?? preview;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-[#25D366] bg-[#25D366]/5 ring-2 ring-[#25D366]/25"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
      )}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
            selected ? "bg-[#25D366] text-white" : "bg-zinc-100 text-zinc-700"
          )}
        >
          {message.label}
        </span>
        {selected ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#25D366]">
            <Check className="h-3.5 w-3.5" aria-hidden />
            Selected
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-medium text-zinc-900">{firstLine}</p>
      <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-zinc-500">{preview}</p>
    </button>
  );
}

export default function AdminLeadFollowUpPage() {
  const [selectedConditionId, setSelectedConditionId] = useState(LEAD_FOLLOW_UP_CONDITIONS[0]!.id);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [leadName, setLeadName] = useState("");
  const [phone, setPhone] = useState("");

  const selectedCondition = useMemo(
    () => LEAD_FOLLOW_UP_CONDITIONS.find((c) => c.id === selectedConditionId) ?? LEAD_FOLLOW_UP_CONDITIONS[0]!,
    [selectedConditionId]
  );

  const selectedMessage = useMemo(() => {
    if (!selectedMessageId) return null;
    return selectedCondition.messages.find((m) => m.id === selectedMessageId) ?? null;
  }, [selectedCondition, selectedMessageId]);

  const resolvedMessageText = useMemo(() => {
    if (!selectedMessage) return "";
    return applyLeadNameToMessage(selectedMessage.body, leadName);
  }, [selectedMessage, leadName]);

  const phoneDigits = normalizePhoneDigits(phone);
  const phoneError = getPhoneValidationError(phone);
  const canSendToNumber = phoneError.length === 0;

  const handleConditionChange = useCallback((conditionId: string) => {
    setSelectedConditionId(conditionId);
    setSelectedMessageId(null);
  }, []);

  const handlePickRandom = useCallback(() => {
    const picked = pickRandomFollowUpMessage(selectedCondition.messages);
    setSelectedMessageId(picked.id);
    toast.success(`${picked.label} picked at random`);
  }, [selectedCondition.messages]);

  const handleCopyMessage = useCallback(async () => {
    if (!resolvedMessageText) {
      toast.error("Choose a message first");
      return;
    }
    try {
      await navigator.clipboard.writeText(resolvedMessageText);
      toast.success("Message copied — paste in WhatsApp");
    } catch {
      toast.error("Could not copy. Try selecting the preview text manually.");
    }
  }, [resolvedMessageText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-10 pt-4 sm:pt-6 md:pt-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div className="mb-6 flex items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#CBB27A] to-[#A8925F] shadow-lg sm:h-14 sm:w-14">
            <MessagesSquare className="h-6 w-6 text-white sm:h-7 sm:w-7" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Lead follow-up messages
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              Pick the lead situation, choose a ready-made message, add the client&apos;s name, and send on WhatsApp.
              Not linked to any property.
            </p>
          </div>
        </div>

        {/* Step 1 — Situation */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CBB27A]/15 text-xs font-bold text-[#8B7344]">
                1
              </span>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">What&apos;s the situation?</h2>
                <p className="text-xs text-zinc-500">Tap the stage that matches this lead in your pipeline</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
              {LEAD_FOLLOW_UP_CONDITIONS.map((condition) => (
                <ConditionCard
                  key={condition.id}
                  condition={condition}
                  selected={selectedConditionId === condition.id}
                  onSelect={() => handleConditionChange(condition.id)}
                />
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-[#CBB27A]/40 bg-[#CBB27A]/5 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-[#8B7344]">When to use this</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700">{selectedCondition.hint}</p>
            </div>
          </div>
        </section>

        {/* Step 2 — Message */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CBB27A]/15 text-xs font-bold text-[#8B7344]">
                  2
                </span>
                <div>
                  <h2 className="text-base font-semibold text-zinc-900">Choose a message</h2>
                  <p className="text-xs text-zinc-500">
                    {selectedCondition.messages.length} options for &ldquo;{selectedCondition.pipelineLabel}&rdquo;
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full shrink-0 border-[#CBB27A]/50 bg-[#CBB27A]/5 text-zinc-800 hover:bg-[#CBB27A]/15 sm:w-auto"
                onClick={handlePickRandom}
              >
                <Shuffle className="h-4 w-4" aria-hidden />
                Pick random message
              </Button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
            {selectedCondition.messages.map((message) => (
              <MessageOptionCard
                key={message.id}
                message={message}
                previewName={leadName}
                selected={selectedMessageId === message.id}
                onSelect={() => setSelectedMessageId(message.id)}
              />
            ))}
          </div>
        </section>

        {/* Step 3 — Personalise & send */}
        <section className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CBB27A]/15 text-xs font-bold text-[#8B7344]">
                3
              </span>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Personalise &amp; send</h2>
                <p className="text-xs text-zinc-500">Add the lead&apos;s name, review, then open WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4 sm:p-6">
            <div>
              <label htmlFor="lead-name" className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-800">
                <User className="h-4 w-4 text-zinc-500" aria-hidden />
                Lead name
              </label>
              <Input
                id="lead-name"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="e.g. Rahul, Priya Sharma"
                className="h-11 rounded-xl border-zinc-200 bg-zinc-50/60 text-sm focus-visible:border-[#CBB27A]/50 focus-visible:ring-[#CBB27A]/20"
                autoComplete="off"
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                Replaces <span className="font-mono text-zinc-600">{`{{lead_name}}`}</span> in the message. Leave blank
                to use &ldquo;there&rdquo;.
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-zinc-800">Message preview</p>
              <div
                className={cn(
                  "min-h-[8rem] rounded-2xl border px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]",
                  selectedMessage
                    ? "border-zinc-200 bg-zinc-50 text-zinc-800"
                    : "border-dashed border-zinc-200 bg-zinc-50/50 text-zinc-400"
                )}
              >
                {selectedMessage
                  ? resolvedMessageText
                  : "Select a message above (or tap “Pick random message”) to see the preview here."}
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">WhatsApp actions</p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!resolvedMessageText}
                className="w-full gap-1.5 border-zinc-300 bg-white disabled:opacity-50"
                onClick={handleCopyMessage}
              >
                <Copy className="h-4 w-4" aria-hidden />
                Copy message
              </Button>

              <Button
                asChild
                size="sm"
                disabled={!resolvedMessageText}
                className="w-full gap-1.5 bg-[#25D366] text-white hover:bg-[#20BD5A] disabled:opacity-50"
              >
                <a
                  href={resolvedMessageText ? whatsAppComposeUrlNoRecipient(resolvedMessageText) : "#"}
                  rel="noopener noreferrer"
                  aria-disabled={!resolvedMessageText}
                  onClick={(e) => {
                    if (!resolvedMessageText) e.preventDefault();
                  }}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Choose chat in WhatsApp
                </a>
              </Button>

              <div className="flex flex-col gap-2">
                <label htmlFor="follow-up-phone" className="sr-only">
                  Phone number
                </label>
                <Input
                  id="follow-up-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Client WhatsApp number"
                  inputMode="tel"
                  className="h-10 border-zinc-300 bg-white"
                  autoComplete="off"
                  aria-invalid={phone.length > 0 && !canSendToNumber}
                />
                <Button
                  type="button"
                  size="sm"
                  disabled={!canSendToNumber || !resolvedMessageText}
                  className="w-full gap-1.5 bg-black text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => {
                    if (!canSendToNumber || !resolvedMessageText) return;
                    openWhatsAppSendToNumber(phoneDigits, resolvedMessageText);
                  }}
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Send to entered number
                </Button>
                {phone.length > 0 && phoneError ? (
                  <p className="text-xs text-red-600">{phoneError}</p>
                ) : (
                  <p className="text-xs text-zinc-500">Include country code if needed (example: 91…).</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
