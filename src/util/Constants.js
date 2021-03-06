export const API_URL =
  process.env.VUE_APP_CODE_COMPILER_URL || "http://localhost:5000"; // Should be re-named CODE_COMPILER_URL
export const INDEX_MANAGER_URL =
  process.env.VUE_APP_INDEX_MANAGER_URL || "http://localhost:3030";
export const HASURA_URL =
  process.env.VUE_APP_HASURA_URL || "http://localhost:3000";
export const SUB_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["vi", "en"];
// The following components is not required to confirm email before using it
export const NO_CONFIRM_EMAIL_ROUTES = ["ConfirmEmail"];

// Signature constants
export const SIGNATURE_TYPE = { TEXT: "text", DRAW: "draw", IMAGE: "image" };

export const PIXEL_RATIO = window.devicePixelRatio || 1;
export const VIEWPORT_RATIO = 0.98;

// PDF Generate
export const FILE_ID_PREFIX = "F";
export const PAGE_ID_PREFIX = "P";
export const BOX_ID_PREFIX = "P";

// Color user
export const COLORS_USER = [
  "#B0EDBF",
  "#EFCECA",
  "#BFEFEC",
  "#EFD4AC",
  "#D1F4AE"
];
// Local field
export const LOCAL_STORE = {
  TOKEN: "token",
  LANG: "lang",
  TABLE: "table",
  MAPPING: "mapping",
  MODELS: "models",
  PROJECT: "project",
  UP: "up",
  LIB: "lib",
  SCHEMA: "schema",
  QUERY: "query",
  COMPILE: "compile",
  CHAIN: "chain"
};
// Step
export const STEPPER = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
  STEP_4: 4,
  STEP_5: 5
};
// Protocol
export const PROTOCOL = {
  needSign: "Need to Sign",
  personSign: "In Person Signing",
  receivesCopy: "Receives a Copy"
};

// Day reminder
export const REMINDER = {
  EVERY_DAY: 1,
  EVERY_2_DAYS: 2,
  EVERY_3_DAYS: 3,
  EVERY_4_DAYS: 4,
  EVERY_5_DAYS: 5
};
// ContractStatus
export const CONTRACT_STATTUS = {
  DRAFT: "draft",
  SIGNING: "signing",
  EXPIRE: "expire",
  COMPLETE: "complete"
};
