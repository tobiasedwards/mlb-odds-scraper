// TODO Refactor

const cheerio = require('cheerio')
const dateFormat = require('dateformat')

const processDatetime = (datetime) => {
  const datePart = datetime.slice(0, 10)
  return dateFormat(Date.parse(datePart), "d mmm yyyy")
}

const processOdds = (percentageString) => {
  const percentage = parseInt(percentageString.slice(0, percentageString.length - 1))
  const odds = percentage / 100.0
  return odds
}

const fiveThirtyEightScraper = {
  parseHTML: (pageHTML) => {
    $ = cheerio.load(pageHTML)
    let result = {}

    const dates = $('time.subhead.subhead-index-upcoming.show-desktop')
    dates.each((d, dateElem) => {
      let games = []
      const date = processDatetime($(dateElem).attr('datetime'))

      $(dateElem).next().find('div.game').each((g, gameElem) => {
        let game = {}

        game.home = $('a.link.show-desktop', 'p.teams-names', gameElem).first().text().trim()
        game.away = $('a.link.show-desktop', 'p.teams-names', gameElem).last().text().trim()

        game.homeOdds = processOdds($('p.chance', gameElem).first().text())
        game.awayOdds = processOdds($('p.chance', gameElem).last().text())

        games.push(game)
      })

      result[date] = games
    })

    return result
  }
}

module.exports = {fiveThirtyEightScraper}
