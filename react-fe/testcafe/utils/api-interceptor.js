import { RequestLogger, RequestMock } from 'testcafe'
import { values } from 'lodash'
import chalk from 'chalk'

const apiEnvironment = {
  urls: ['/api']
}
const apiUrlFilter = (request) => {
  const apiUrls = values(apiEnvironment.urls)
  return true
  // return apiUrls.some((url) => request.url.includes(url))
}

export const apiLogger = RequestLogger(apiUrlFilter, {
  // logRequestBody: true,
  logRequestHeaders: true,
  // stringifyRequestBody: true,
  logResponseHeaders: true,
  // logResponseBody: true,
  // stringifyResponseBody: true,
})

export const maskPassword = (request) => {
  return {
    ...request,
    // body: request.body.replace(/password=([^&]*)/g, 'password=***')
  }
}

export const logApiCall = (request, response) =>
  `${response.statusCode} for ${request.method.padStart(4)} ${request.url}`

export const hasApiErrors = (printed = []) => apiLogger.contains((r) => {
  const { request, response, id } = r
  const hasError = response.statusCode >= 400
  if (printed.indexOf(id) < 0) {
    const apiLog = logApiCall(request, response)

    if (hasError) {
      console.error(chalk.red(` ✖ ${apiLog}`))
      console.error(maskPassword(request))
      console.error(response)
    } else {
      console.log(chalk.green(` ✓ ${apiLog}`))
    }
    printed.push(id)
  }

  return hasError
})

export const apiErrorMocker = RequestMock()
  .onRequestTo(apiUrlFilter)
  .respond({}, 500)
