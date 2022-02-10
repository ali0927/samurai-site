export function getSrcSet(root, id, widths) {
  widths = widths ?? [692, 831, 1108, 1385];
  const srcset = widths
    .map((width, i) => `${root}${id}-${i + 1}x.png ${width}w`)
    .join(", ");
  return srcset;
}

export function getDisplayAddress(address) {
  if (!address) {
    return;
  } else {
    return `${address.toString().slice(0, 5)}...${address
      .toString()
      .slice(-5)}`;
  }
}

function getCloudflareResizedImage(image) {
  return `https://shogunsamurais.com/cdn-cgi/image/width=500,quality=100/${image}`;
}

export async function getTokenMetadata(tokenId) {
  const CID =
    process.env.NEXT_PUBLIC_IPFS_METADATA_ROOT ??
    "bafybeifnvv7fz6irgzrictch2fw36sc4fyvqzlxsy55uqdarfau7yndeve";
  const uri = `https://${CID}.ipfs.infura-ipfs.io/${tokenId}`;
  const metadata = await fetch(uri).then((r) => r.json());
  if (metadata.image && metadata.image.slice(0, 4) === "ipfs") {
    metadata.image = getCloudflareResizedImage(
      `https://${metadata.image.split("ipfs://").pop()}.ipfs.infura-ipfs.io`
    );
  } else {
    getCloudflareResizedImage(metadata.image);
  }
  return { tokenId, ...metadata };
}

export function getSamuraiAttribute(samurai, trait) {
  return samurai?.attributes?.filter(
    (attribute) => attribute.trait_type === trait
  )[0]?.value;
}
