import { hostUrl } from '../environment'

import { apiLogger, hasApiErrors } from '../utils/api-interceptor.js'
import { Selector } from 'testcafe'

fixture`Basic Slides`
  .page(hostUrl)
  .requestHooks(apiLogger)

test('Should proceed back & forth through slides', async (t) => {
  const printed = []

  await t
    .expect(Selector('h1').exists).ok()
    .expect(Selector('h1').innerText).eql('Moving away from Selenium')
    .pressKey('right')
    .expect(Selector('h1').exists).ok()
    .expect(Selector('h1').innerText).eql('Selenium is flakey')
    .pressKey('left')
    .expect(Selector('h1').exists).ok()
    .expect(Selector('h1').innerText).eql('Moving away from Selenium')

  await t.expect(hasApiErrors(printed)).notOk('Expected no api errors at any point')

})

test('Should proceed through the correct order', async (t) => {

  const slideTitles = [
    'Moving away from Selenium',
    'Selenium is flakey',
    'False Positives',
    'Selenium Architecture',
  ]

  slideTitles.forEach(async (title, index) => {
    await t
      .expect(Selector('h1').innerText).eql(title)
      .takeScreenshot(`${index + 1}-${title}.png`)
      .pressKey('right')
  })

  await t.expect(hasApiErrors()).notOk('Expected no api errors at any point')

})
