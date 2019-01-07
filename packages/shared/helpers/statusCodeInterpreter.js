export default statusCode => {
  switch (Number(statusCode)) {
    case 403:
      return "You have exceeded the number of requests allowed."
    default:
      return "A strange error has occured."
  }
}
