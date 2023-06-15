export const Burn = async (_, args) => {
  const { solAddress } = args;
  try {
    return solAddress;
  } catch (error) {
    throw error;
  }
}