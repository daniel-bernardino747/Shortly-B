export interface Messages {
  status: number
  message: string
}

export default {
  emailUnavailable: {
    status: 409,
    message: 'An account with this email already exists.',
  } as Messages,
  bodyNotMatch: {
    status: 422,
    message: 'The information in the body does not match.',
  } as Messages,
  userNotExist: {
    status: 401,
    message: 'Incorrect email or password.',
  } as Messages,
}
