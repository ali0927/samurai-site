import getConfig from 'next/config';
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// Will only be available on the server-side
console.log('ADMIN_PRIVATEKEY-------', serverRuntimeConfig.ADMIN_PRIVATEKEY);
// Will be available on both server-side and client-side
console.log('staticFolder-----', publicRuntimeConfig.staticFolder);
