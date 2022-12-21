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
  paramsNotMatch: {
    status: 422,
    message: 'The information in the parameters is incorrect.',
  } as Messages,
  urlAndUserNotMatch: {
    status: 401,
    message: 'Unable to delete a url that is not yours.',
  } as Messages,
  invalidLogin: {
    status: 401,
    message: 'Incorrect email or password.',
  } as Messages,
  invalidHeader: {
    status: 401,
    message: 'Authorization header was not informed.',
  } as Messages,
  urlNotFound: {
    status: 404,
    message: 'Could not find this url.',
  } as Messages,
  userNotFound: {
    status: 404,
    message: 'Could not find this user.',
  } as Messages,
  invalidEmail: {
    status: 422,
    message: 'Provide a valid email.',
  } as Messages,
  invalidURL: {
    status: 422,
    message: 'Provide a valid url.',
  } as Messages,
}
