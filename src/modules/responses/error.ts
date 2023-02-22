export default function error(message: any) {
  return {
    success: false,
    error: message,
  };
}
