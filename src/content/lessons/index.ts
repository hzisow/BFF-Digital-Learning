// Central registry of all BFF Academy lessons, keyed by slug.
// Add a lesson file, import it here, and it shows up across the app.

import type { Lesson } from '../types'
import earningIncome from './earning-income'
import spendingBudgeting from './spending-budgeting'
import savingInvesting from './saving-investing'
import creditDebt from './credit-debt'
import riskInsurance from './risk-insurance'
import financialDecisionMaking from './financial-decision-making'
import financialPlanning from './financial-planning'
import consumerProtection from './consumer-protection'
import firstPaycheck from './first-paycheck'
import taxesDeepDive from './taxes-deep-dive'
import payingForCollege from './paying-for-college'
import entrepreneurship from './entrepreneurship'
import cryptoAndScams from './crypto-and-scams'

export const LESSONS: Record<string, Lesson> = {
  [earningIncome.slug]: earningIncome,
  [spendingBudgeting.slug]: spendingBudgeting,
  [savingInvesting.slug]: savingInvesting,
  [creditDebt.slug]: creditDebt,
  [riskInsurance.slug]: riskInsurance,
  [financialDecisionMaking.slug]: financialDecisionMaking,
  [financialPlanning.slug]: financialPlanning,
  [consumerProtection.slug]: consumerProtection,
  // Bonus electives (week 5 — off the core path)
  [firstPaycheck.slug]: firstPaycheck,
  [taxesDeepDive.slug]: taxesDeepDive,
  [payingForCollege.slug]: payingForCollege,
  [entrepreneurship.slug]: entrepreneurship,
  [cryptoAndScams.slug]: cryptoAndScams,
}

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS[slug]
}
