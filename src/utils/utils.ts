export const API_URL = "/api/v0"; // Serverless!

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
