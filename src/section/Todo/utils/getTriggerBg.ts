export const getTriggerBg = (priority?: string) => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 border-green-300 text-green-700';
    case 'medium':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    case 'high':
      return 'bg-red-100 border-red-300 text-red-700';
    default:
      return 'bg-white border-gray-200 text-gray-900';
  }
};
