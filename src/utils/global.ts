export const asyncTimeout = async (delay: number) => {
  return await new Promise(r => setTimeout(r, delay));
};
