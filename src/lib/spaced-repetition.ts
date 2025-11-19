// Spaced Repetition Algorithm (Modified SM-2)
// Based on SuperMemo algorithm for optimal learning intervals

export interface SpacedRepetitionCard {
  id: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
  lastSeen: Date;
}

export enum AnswerQuality {
  BLACKOUT = 0,      // Complete blackout
  INCORRECT = 1,     // Incorrect response
  HARD = 2,         // Correct but very difficult
  GOOD = 3,         // Correct with some hesitation
  EASY = 4,         // Perfect response
  VERY_EASY = 5     // Too easy
}

export class SpacedRepetitionEngine {
  private static readonly MIN_EASE_FACTOR = 1.3;
  private static readonly MAX_EASE_FACTOR = 3.0;
  private static readonly INITIAL_EASE_FACTOR = 2.5;
  private static readonly INITIAL_INTERVAL = 1;
  private static readonly GRADUATING_INTERVAL = 4;

  /**
   * Calculate next review parameters based on answer quality
   */
  static calculateNextReview(
    card: SpacedRepetitionCard,
    quality: AnswerQuality,
    responseTime?: number
  ): Partial<SpacedRepetitionCard> {
    let { easeFactor, interval, repetitions } = card;
    
    // Adjust ease factor based on quality
    if (quality >= AnswerQuality.GOOD) {
      easeFactor = Math.min(
        this.MAX_EASE_FACTOR,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      );
    } else {
      easeFactor = Math.max(
        this.MIN_EASE_FACTOR,
        easeFactor - 0.2
      );
    }

    // Calculate new interval
    if (quality < AnswerQuality.HARD) {
      // Incorrect answer - reset to beginning
      repetitions = 0;
      interval = this.INITIAL_INTERVAL;
    } else {
      repetitions += 1;
      
      if (repetitions === 1) {
        interval = this.INITIAL_INTERVAL;
      } else if (repetitions === 2) {
        interval = this.GRADUATING_INTERVAL;
      } else {
        interval = Math.round(interval * easeFactor);
      }

      // Apply quality modifiers
      if (quality === AnswerQuality.HARD) {
        interval = Math.max(1, Math.round(interval * 0.8));
      } else if (quality === AnswerQuality.VERY_EASY) {
        interval = Math.round(interval * 1.3);
      }
    }

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    // Factor in response time for ease adjustment
    if (responseTime) {
      const timeModifier = this.calculateTimeModifier(responseTime);
      easeFactor = Math.max(
        this.MIN_EASE_FACTOR,
        Math.min(this.MAX_EASE_FACTOR, easeFactor * timeModifier)
      );
    }

    return {
      easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
      interval,
      repetitions,
      nextReview,
      lastSeen: new Date()
    };
  }

  /**
   * Get cards due for review
   */
  static getCardsForReview(
    cards: SpacedRepetitionCard[],
    maxCards: number = 50
  ): SpacedRepetitionCard[] {
    const now = new Date();
    
    return cards
      .filter(card => card.nextReview <= now)
      .sort((a, b) => {
        // Prioritize by how overdue the card is
        const overdueA = now.getTime() - a.nextReview.getTime();
        const overdueB = now.getTime() - b.nextReview.getTime();
        return overdueB - overdueA;
      })
      .slice(0, maxCards);
  }

  /**
   * Get new cards for learning
   */
  static getNewCards(
    allCards: string[],
    learnedCards: string[],
    maxNewCards: number = 10
  ): string[] {
    const unlearnedCards = allCards.filter(id => !learnedCards.includes(id));
    return unlearnedCards.slice(0, maxNewCards);
  }

  /**
   * Calculate priority score for weak area targeting
   */
  static calculateWeaknessScore(
    totalSeen: number,
    totalCorrect: number,
    consecutiveCorrect: number,
    averageResponseTime: number | null
  ): number {
    if (totalSeen === 0) return 0;

    const accuracyRate = totalCorrect / totalSeen;
    const streakPenalty = Math.max(0, 5 - consecutiveCorrect) / 5;
    const timePenalty = averageResponseTime && averageResponseTime > 10000 ? 0.2 : 0;
    
    // Higher score means needs more attention
    return (1 - accuracyRate) * 0.6 + streakPenalty * 0.3 + timePenalty * 0.1;
  }

  /**
   * Calculate response time modifier for ease factor
   */
  private static calculateTimeModifier(responseTime: number): number {
    // Fast response (< 3 seconds) slightly increases ease
    if (responseTime < 3000) return 1.05;
    
    // Slow response (> 15 seconds) decreases ease
    if (responseTime > 15000) return 0.95;
    
    // Normal response time
    return 1.0;
  }

  /**
   * Generate study session with optimal card distribution
   */
  static generateStudySession(
    reviewCards: SpacedRepetitionCard[],
    newCardIds: string[],
    sessionConfig: {
      maxReviewCards: number;
      maxNewCards: number;
      reviewToNewRatio: number; // e.g., 3 means 3 review cards per 1 new card
    }
  ): { reviewCards: SpacedRepetitionCard[]; newCardIds: string[] } {
    const { maxReviewCards, maxNewCards, reviewToNewRatio } = sessionConfig;
    
    // Limit review cards
    const limitedReviewCards = reviewCards.slice(0, maxReviewCards);
    
    // Calculate optimal new cards based on ratio
    const optimalNewCards = Math.min(
      maxNewCards,
      Math.floor(limitedReviewCards.length / reviewToNewRatio)
    );
    
    const limitedNewCardIds = newCardIds.slice(0, optimalNewCards);

    return {
      reviewCards: limitedReviewCards,
      newCardIds: limitedNewCardIds
    };
  }
}