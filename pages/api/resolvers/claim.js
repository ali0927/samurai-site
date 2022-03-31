export const Claim = async (_, args) => {
  try {
    const { address, tokenIds } = args;
    return address;
  } catch (error) {
      throw error;
  }
}