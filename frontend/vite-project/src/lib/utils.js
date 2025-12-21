/**
 * Get the appropriate CSS class for difficulty badge based on problem difficulty
 * @param {string} difficulty - The difficulty level (easy, medium, hard, etc.)
 * @returns {string} CSS class name for the badge
 */
export const getDifficultyBadgeClass = (difficulty) => {
  if (!difficulty || typeof difficulty !== 'string') {
    return "badge-ghost";
  }
  
  const normalizedDifficulty = difficulty.toLowerCase().trim();
  
  switch (normalizedDifficulty) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};
