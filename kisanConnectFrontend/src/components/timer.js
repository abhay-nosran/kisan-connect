export const updateTimer = (endTime, setTimeLeft) => {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) {
    setTimeLeft("Auction Ended");
    return;
  }

  const pad = (n) => n.toString().padStart(2, "0");

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setTimeLeft(`${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
};
