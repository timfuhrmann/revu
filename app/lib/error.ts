export const MISSING_PARAMETER = "general/missing-parameter";
export const NO_USER = "general/no-user";
export const NAME_TAKEN = "teams/name-taken";
export const UNKNOWN_ERROR = "auth/unknown-error";
export const UNAUTHORIZED = "auth/unauthorized-request";
export const CONTACT_ERROR = "contact/unknown-error";

export const errors: Record<string, string> = {
    [NAME_TAKEN]: "Team name not available - we're sorry!",
    [MISSING_PARAMETER]: "There is a parameter missing, please check your input.",
    [NO_USER]: `You need to be logged in to continue with this action. Please login and try again.`,
    [UNKNOWN_ERROR]: `There has been an error trying to login. Please try again later or contact an admin.`,
    [CONTACT_ERROR]: `There has been an error trying contact us. Please try again later or contact us directly via ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}.`,
};
