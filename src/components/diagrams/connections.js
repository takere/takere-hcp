export const sourceToTargetMapping = {
  BEGIN_NODE: ['QUIZ_NODE', 'EXPLANATION_NODE', 'INFORMATION_NODE', 'MEDICATION_CONTROL_NODE', 'REMINDER_NODE'],
  MEDICATION_CONTROL_NODE: ['QUIZ_NODE', 'EXPLANATION_NODE', 'INFORMATION_NODE', 'MEDICATION_CONTROL_NODE', 'REMINDER_NODE', 'CONDITIONAL_NODE'],
  REMINDER_NODE: [],
  CONDITIONAL_NODE: ['QUIZ_NODE', 'EXPLANATION_NODE', 'INFORMATION_NODE', 'MEDICATION_CONTROL_NODE', 'CONDITIONAL_NODE', 'REMINDER_NODE'],
  EXPLANATION_NODE: ['QUIZ_NODE', 'EXPLANATION_NODE', 'INFORMATION_NODE', 'MEDICATION_CONTROL_NODE'],
  INFORMATION_NODE: [],
  QUIZ_NODE: ['QUIZ_NODE', 'EXPLANATION_NODE', 'INFORMATION_NODE', 'MEDICATION_CONTROL_NODE', 'REMINDER_NODE', 'CONDITIONAL_NODE'],
};

export function isConnectionAllowed(sourceNodeType, targetNodeType) {
  if (sourceToTargetMapping[sourceNodeType] === undefined) {
    return false;
  }

  if (sourceToTargetMapping[targetNodeType] === undefined) {
    return false;
  }

  return sourceToTargetMapping[sourceNodeType].includes(targetNodeType);
}
