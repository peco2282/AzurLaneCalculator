const BASEPATH = "./data/";

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
  if (isUlutimate) exp.value = ((most - least) * 1.2).toString()
  else exp.value = (most - least).toString()
}

/**
 *
 * @param before string
 * @param after string
 * @param isUlutimate string
 * @param exp string
 * @type void
 */
function loadJSONForCharacter(before, after, isUlutimate , exp) {
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

function calcHowMany(_area, _json, _total, _name, _isMVP) {
  const MVPValue = _isMVP ? 1.5: 1.0

  const e1 = _json["▲1"]
  const e2 = _json["▲2"]
  const e3 = _json["▲3"]
  const eb = _json["ボス"]
  const time = parseInt(_json["回数"])

  const total = parseInt(_total)

  let min, medium, max, boss
  // TODO MVPvalue
  min = Math.ceil(total / parseInt(e1))
  if (e2 !== "-") medium = Math.ceil(total / parseInt(e2))
  if (e3 !== "-") max = Math.ceil(total / parseInt(e3))
  boss = Math.ceil(total / parseInt(eb))
  console.log(time)
  _name[0].value = `${Math.ceil(min / time)} 周 (${min} 回)`
  _name[1].value = !isNaN(Math.ceil(medium / time)) ?
    `${Math.ceil(medium / time)} 周 (${medium} 回)`:
    "Cannot fight..."
  _name[2].value = !isNaN(Math.ceil(max / time)) ?
    `${Math.ceil(max / time)} 周 (${max} 回)`:
    "Cannot fight..."
  _name[3].value = `${boss} (周)`
}

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
