export const setLastAddedTime = (page) => {
  localStorage.setItem(`lastAdded_${page}`, new Date().toLocaleString());
};

export const getLastAddedTime = (page) => {
  const time = localStorage.getItem(`lastAdded_${page}`);
  return time ? new Date(time) : null;
};

export const canAddPoints = (page) => {
  const lastTime = getLastAddedTime(page);
  if (!lastTime) return true;

  const now = new Date();
  const diff = now - lastTime;
  return diff > 24 * 60 * 60 * 1000;
};
