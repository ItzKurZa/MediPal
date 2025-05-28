export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

export function truncateText(text, maxLength = 30) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}