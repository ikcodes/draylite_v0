// export const API_URL = "/api/v0"; // Serverless!
export const API_URL = "https://heroic-hack-m8m0h.cloud.serverless.com/api/v0"; // DEV INSTANCE
// export const API_URL = "https://lightning-build-fpr99.cloud.serverless.com/api/v0"; // LOCAL / SANDBOX

export const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const phoneMask = [
  { fixed: "(" },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: "xxx",
  },
  { fixed: ")" },
  { fixed: " " },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: "xxx",
  },
  { fixed: "-" },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/,
    placeholder: "xxxx",
  },
];

export const emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: "example",
  },
  { fixed: "@" },
  {
    regexp: /^[\w]+$/,
    placeholder: "my",
  },
  { fixed: "." },
  {
    regexp: /^[\w]+$/,
    placeholder: "domain",
  },
];
