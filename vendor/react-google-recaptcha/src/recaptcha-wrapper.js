import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

function getURL() {
  return `https://www.recaptcha.net/recaptcha/enterprise.js?onload=${callbackName}&render=explicit`;
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? {nonce: getOptions().nonce} : {},
})(({grecaptcha, ...props}) => <ReCAPTCHA grecaptcha={grecaptcha?.enterprise} {...props}/>);
