export const ErrorHandler = (error) => {
  if (error?.response) {
    return error?.response?.data?.message || error?.response?.data?.error || error?.message || "Request failed";
  } else if (error?.request) {
    return error?.message;
  } else {
    return "Something went wrong";
  }
};
