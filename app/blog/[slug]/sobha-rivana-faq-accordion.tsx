"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SobhaRivanaFaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full border border-gray-200 rounded-xl px-4 sm:px-5 bg-white shadow-sm">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`} className="border-gray-100">
          <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-4 font-poppins [&[data-state=open]]:text-[#9a8a5c]">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed text-[15px] pb-5 font-poppins">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
