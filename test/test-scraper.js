const assert = require('assert')
const fs = require('fs')
const should = require('should')
const path = require('path')

const {fiveThirtyEightScraper} = require('../src/scraper.js')

describe('fiveThirtyEightScraper', () => {
  describe('#processHTML', () => {
    const testHTML = fs.readFileSync(path.join(
      __dirname, './files/fivethirtyeight.html'))

    it('should process the correct dates', () => {
      const games = fiveThirtyEightScraper.parseHTML(testHTML)
      games.should.have.keys(
        '27 Jun 2017',
        '28 Jun 2017',
        '29 Jun 2017',
        '30 Jun 2017',
        '1 Jul 2017'
      )
    })

    it('should process the correct number of games', () => {
      const games = fiveThirtyEightScraper.parseHTML(testHTML)
      games['27 Jun 2017'].should.have.length(15)
      games['28 Jun 2017'].should.have.length(15)
      games['29 Jun 2017'].should.have.length(13)
      games['30 Jun 2017'].should.have.length(15)
      games['1 Jul 2017'].should.have.length(16)
    })

    it('should correctly reflect the odds for each game', () => {
      const games = fiveThirtyEightScraper.parseHTML(testHTML)
      games['27 Jun 2017'].should.containEql({
        home: 'Rays',
        away: 'Pirates',
        homeOdds: 0.49,
        awayOdds: 0.51
      })
      games['28 Jun 2017'].should.containEql({
        home: 'Rockies',
        away: 'Giants',
        homeOdds: 0.54,
        awayOdds: 0.46
      })
    })
  })
})
