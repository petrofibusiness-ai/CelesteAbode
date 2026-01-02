// Analytics stub functions for Segmented Entry
export type UserIntent = "live" | "invest" | "signature";
export type BudgetMode = "exploring" | "focused" | "stretchCurious";

export interface IntentPayload {
  intent: UserIntent;
  budgetText?: string;    // free text, e.g., "₹1.2–1.5 Cr"
  budgetMode?: BudgetMode;
  possessionWindow?: "0-3" | "3-9" | "9-18";
  microMarkets?: string[];
  configuration?: string[]; // ["2 BHK","Villa"]
  risk?: "conservative" | "balanced" | "aggressive";
  specialNeeds?: string[];  // ["NRI", "School radius"]
  valueUpliftViewed?: boolean; // true if +10% panel opened
}

// Analytics event stubs
export const analytics = {
  se_intent_tile_clicked: (_intent: UserIntent) => {
    // TODO: Integrate with analytics service
  },
  
  se_drawer_opened: (_intent: UserIntent) => {
    // TODO: Integrate with analytics service
  },
  
  se_value_uplift_viewed: (_intent: UserIntent) => {
    // TODO: Integrate with analytics service
  },
  
  se_submit_preferences: (_intent: UserIntent, _payload: IntentPayload) => {
    // TODO: Integrate with analytics service
  }
};
