export interface FollowUpMessage {
  id: string;
  label: string;
  body: string;
}

export interface FollowUpCondition {
  id: string;
  letter: string;
  /** Short label for compact UI */
  shortTitle: string;
  /** Full pipeline stage, e.g. "Lead received → Call not picked" */
  pipelineLabel: string;
  /** Plain-language hint for the sales team */
  hint: string;
  messages: FollowUpMessage[];
}

export const LEAD_FOLLOW_UP_CONDITIONS: FollowUpCondition[] = [
  {
    id: "lead-received-call-not-picked",
    letter: "A",
    shortTitle: "Call not picked",
    pipelineLabel: "Lead received → Call not picked",
    hint: "Use when a new enquiry came in but the lead did not answer your call.",
    messages: [
      {
        id: "a-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nThank you for your enquiry. We attempted to connect with you regarding your requirement but were unable to reach you.\n\nWhenever convenient, please feel free to share your preferred location, budget range, and any specific preferences. We would be happy to suggest suitable opportunities accordingly.",
      },
      {
        id: "a-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nThank you for expressing interest. Rather than sharing multiple options, we prefer understanding your requirement first so that any recommendations we provide are genuinely relevant to your objectives.\n\nWhenever suitable, we would be glad to assist.",
      },
      {
        id: "a-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nWe recently tried reaching out regarding your enquiry. The right opportunity often depends on factors such as location preference, investment goals, budget, and timeline.\n\nA brief discussion can help us understand your requirement better and guide you accordingly.",
      },
      {
        id: "a-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nThank you for connecting with us. Should you still be exploring opportunities, please feel free to share your requirement at your convenience.\n\nWe would be happy to assist with options that align with your expectations.",
      },
    ],
  },
  {
    id: "call-connected-not-interested",
    letter: "B",
    shortTitle: "Not interested",
    pipelineLabel: "Call connected → Not interested",
    hint: "Use after a conversation where the lead is not interested in the option discussed.",
    messages: [
      {
        id: "b-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nThank you for taking the time to speak with us. While the opportunity discussed may not have aligned with your current requirement, we appreciate the conversation and remain available should your plans evolve in the future.",
      },
      {
        id: "b-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nThank you once again for your time. Every buyer's priorities are unique, and not every opportunity is the right fit.\n\nShould your preferences, budget considerations, or timelines change, we would be happy to assist with suitable alternatives.",
      },
      {
        id: "b-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nIt was a pleasure speaking with you. Even if your plans are currently on hold, please know that we remain available whenever you require market insights, guidance, or assistance with future opportunities.",
      },
      {
        id: "b-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nWe appreciate the opportunity to understand your requirement. Although the option discussed wasn't suitable at this stage, we would be glad to assist whenever the right opportunity presents itself.",
      },
    ],
  },
  {
    id: "callback-not-picked",
    letter: "C",
    shortTitle: "Callback missed",
    pipelineLabel: "Callback requested → Did not pick next call",
    hint: "Use when the lead asked for a callback but did not answer the follow-up call.",
    messages: [
      {
        id: "c-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nWe attempted to connect at the time discussed but understand that schedules can sometimes be unpredictable.\n\nWhenever convenient, please feel free to share a suitable time and we would be happy to reconnect.",
      },
      {
        id: "c-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nThank you for your earlier time. We were unable to connect during our scheduled call and thought of reaching out here instead.\n\nWhenever suitable, we would be glad to continue the discussion.",
      },
      {
        id: "c-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nWe hope everything is going well. As discussed earlier, we attempted to reconnect regarding your requirement.\n\nShould you still wish to explore available opportunities, we would be happy to assist at a time convenient for you.",
      },
      {
        id: "c-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nWe understand that priorities and schedules can change. Whenever you feel the timing is right to revisit your requirement, please feel free to let us know and we would be glad to continue from where we left off.",
      },
    ],
  },
  {
    id: "site-visit-promised-not-contactable",
    letter: "D",
    shortTitle: "Visit not scheduled",
    pipelineLabel: "Site visit promised → Not contactable",
    hint: "Use when a site visit was discussed but the lead is now unreachable.",
    messages: [
      {
        id: "d-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nThank you for your interest. You had expressed interest in visiting the project, and we wanted to reach out to understand whether you would still like to schedule a visit.\n\nWhenever suitable, we would be happy to assist with the arrangements.",
      },
      {
        id: "d-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nMany buyers find that a site visit provides a much clearer perspective than brochures or online information alone.\n\nShould you still wish to explore the opportunity further, we would be pleased to coordinate a visit at your convenience.",
      },
      {
        id: "d-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nWe hope all is well. We wanted to reconnect regarding the site visit discussed earlier.\n\nIf you are still evaluating opportunities, we would be happy to assist with any information or arrangements required.",
      },
      {
        id: "d-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nThank you for considering the opportunity. Whenever you feel comfortable taking the next step and visiting the project, please let us know.\n\nWe would be glad to facilitate a visit based on your preferred schedule.",
      },
    ],
  },
  {
    id: "site-visit-completed-no-response",
    letter: "E",
    shortTitle: "Post-visit silence",
    pipelineLabel: "Site visit completed → No response",
    hint: "Use after a site visit when the lead has gone quiet.",
    messages: [
      {
        id: "e-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nThank you for taking the time to visit the project. We hope the visit provided a clearer understanding of the opportunity.\n\nShould you require any additional information, clarifications, or assistance in evaluating the project, please feel free to let us know.",
      },
      {
        id: "e-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nThank you once again for visiting the project. Important decisions often require careful evaluation.\n\nIf there are any aspects you would like to discuss further, we would be happy to assist with complete transparency.",
      },
      {
        id: "e-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nWe trust you had the opportunity to explore the project thoroughly during your visit.\n\nShould you require any information regarding pricing, availability, payment plans, or future prospects, we would be pleased to assist.",
      },
      {
        id: "e-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nThank you for your visit. As you continue evaluating your options, please feel free to reach out if there is any information that would help support your decision-making process.\n\nWe would be happy to assist.",
      },
    ],
  },
  {
    id: "buying-intent-silent",
    letter: "F",
    shortTitle: "Suddenly silent",
    pipelineLabel: "Buying intent shown → Suddenly silent",
    hint: "Use when the lead showed strong interest but stopped responding.",
    messages: [
      {
        id: "f-1",
        label: "Message 1",
        body: "Hello {{lead_name}},\n\nThank you once again for the discussions we've had so far. We understand that significant real estate decisions often involve careful consideration, planning, and discussions with family or advisors.\n\nShould there be any information or assistance required from our side, we would be glad to help.",
      },
      {
        id: "f-2",
        label: "Message 2",
        body: "Hello {{lead_name}},\n\nWe appreciate the time and interest you have invested in evaluating this opportunity. If there are any questions, concerns, or factors that you are currently assessing, please feel free to reach out.\n\nWe would be happy to provide any clarity that may be helpful.",
      },
      {
        id: "f-3",
        label: "Message 3",
        body: "Hello {{lead_name}},\n\nThank you for considering the opportunity. We understand that priorities and circumstances can evolve over time.\n\nShould you wish to revisit the discussion or explore the opportunity further, we remain available to assist.",
      },
      {
        id: "f-4",
        label: "Message 4",
        body: "Hello {{lead_name}},\n\nImportant decisions deserve thoughtful consideration. If there is any additional information, comparison, or guidance that would support your evaluation process, please do not hesitate to let us know.\n\nWe would be pleased to assist in any way we can.",
      },
    ],
  },
];

const LEAD_NAME_PLACEHOLDER = /\{\{lead_name\}\}/g;

/** Replace {{lead_name}} with the given name, or a friendly fallback. */
export function applyLeadNameToMessage(body: string, leadName: string): string {
  const trimmed = leadName.trim();
  const name = trimmed || "there";
  return body.replace(LEAD_NAME_PLACEHOLDER, name);
}

export function pickRandomFollowUpMessage(messages: FollowUpMessage[]): FollowUpMessage {
  if (!messages.length) {
    throw new Error("No follow-up messages available");
  }
  const index = Math.floor(Math.random() * messages.length);
  return messages[index]!;
}

export function getFollowUpConditionById(id: string): FollowUpCondition | undefined {
  return LEAD_FOLLOW_UP_CONDITIONS.find((c) => c.id === id);
}
