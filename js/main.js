const BASEPATH = "./data/";

/**
 *
 * @param { string } _before
 * @param { string } _after
 * @param { string }  _isUlutimate
 * @param { string } _exp
 * @param { NodeListOf<Map<string, string>> } _listJson
 */
function calcCalacterExp(_before, _after, _isUlutimate, _exp, _listJson) {
  let before = parseInt(document.getElementById(_before).value)
  let after = parseInt(document.getElementById(_after).value)
  let isUlutimate = document.getElementById(_isUlutimate).checked
  let exp = document.getElementById(_exp)
  const dicts = _listJson;
  let least = 0
  let most = 0
  if (before > after) {
    const _tmp = after
    after = before
    before = _tmp
  }
  dicts.forEach((dict,) => {
    let level = parseInt(dict["Lv"])
    if (before === level) least = parseInt(dict["Total"])
    if (level === after) most = parseInt(dict["Total"])
  })
  exp.value = isUlutimate ? ((most - least) * 1.2).toString() : (most - least).toString()
}

/**
 *
 * @param { string } before
 * @param { string } after
 * @param { string } isUlutimate
 * @param { string } exp
 * @type void
 */
function loadJSONForCharacter(before, after, isUlutimate, exp) {
  const jsonPath = BASEPATH + "character_exp.json"
  const request = new XMLHttpRequest()
  request.open("GET", jsonPath)
  request.responseType = "json"
  request.send()
  request.onload = function () {
    let listJson = request.response
    listJson = JSON.parse(JSON.stringify(listJson))
    calcCalacterExp(before, after, isUlutimate, exp, listJson)
  }
}


/**
 *
 * @param { string } _area
 * @param { Map<string, string> } _json
 * @param { number } _total
 * @param { NodeListOf<HTMLElement> } _name
 * @param { boolean } _isFlag
 */
function calcHowMany(_area, _json, _total, _name, _isFlag) {
  const FlagValue = _isFlag ? 1.5 : 1.0
  const e1 = _json["▲1"]
  const e2 = _json["▲2"]
  const e3 = _json["▲3"]
  const eb = _json["ボス"]
  const time = parseInt(_json["回数"])

  const total = parseInt(_total) / FlagValue

  let min, medium, max, boss
  // TODO MVPvalue
  min = Math.ceil(total / parseInt(e1))
  if (e2 !== "-") medium = Math.ceil(total / parseInt(e2))
  if (e3 !== "-") max = Math.ceil(total / parseInt(e3))
  boss = Math.ceil(total / parseInt(eb))
  console.log(time)
  _name[0].value = `${Math.ceil(min / time)} 周 (${min} 回)`
  _name[1].value = !isNaN(Math.ceil(medium / time)) ?
    `${Math.ceil(medium / time)} 周 (${medium} 回)` :
    "Cannot fight..."
  _name[2].value = !isNaN(Math.ceil(max / time)) ?
    `${Math.ceil(max / time)} 周 (${max} 回)` :
    "Cannot fight..."
  _name[3].value = `${boss} 周`
}

/**
 * @param { string } _area
 * @param { string } _total
 * @param { string } _textArea
 * @param { boolean } _isMVP
 * @param { NodeListOf<Map<string, string>> } listJson
 */
function calcFloatExp(
  _area,
  _total,
  _textArea,
  _isMVP,
  listJson
) {
  const area = document.getElementById(_area).value.replace("_", "-")
  const total = parseInt(document.getElementById(_total).value)
  const name = document.getElementsByName(_textArea)
  const isMVP = document.getElementById(_isMVP).checked
  if (isNaN(total)) return alert("Invalid Value. Cannot calc.")
  listJson.forEach(
    (json,) => {
      if (area === json["海域"]) calcHowMany(area, json, total, name, isMVP)
    }
  )
}

/**
 *
 * @param { string } area
 * @param { string } total
 * @param { string } textName
 * @param { string } isMVP
 */
function loadJSONForFloat(area, total, textName, isMVP) {
  const jsonPath = BASEPATH + "floatexp.json"
  const request = new XMLHttpRequest()
  request.open("GET", jsonPath)
  request.responseType = "json"
  request.send()
  request.onload = function () {
    const listJson = JSON.parse(JSON.stringify(request.response))
    calcFloatExp(area, total, textName, isMVP, listJson)
  }
}
