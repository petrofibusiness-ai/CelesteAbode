"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ThreeBhkGreaterNoidaFaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full rounded-xl border border-gray-200 bg-white">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`q-${i}`} className="border-gray-100 px-4 md:px-5">
          <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline hover:text-[#CBB27A] py-4">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base text-gray-700 leading-relaxed pb-4 pt-0">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
