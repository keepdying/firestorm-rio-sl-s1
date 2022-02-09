import dungeons from './dungeons.json';
import affixes from './affixes.json';


function returnPlayerRuns(rids, currentRuns){
  let runs = [];

  for (let i = 0; i < rids.length; i++) {
    for (let j = 0; j < currentRuns.length; j++) {
      if (rids[i] === currentRuns[j].rid) {
        runs.push(currentRuns[j])
      }
    }
  }
  return runs;
};

function idToDungeon(id, field = "name"){
  for (let i = 0; i < dungeons.length; i++){
    if (id === dungeons[i]["id"]){
      return dungeons[i][field];
    }
  }
  return null;
}

function secondsToHMS(seconds){
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function timerCalculator(id, timer){
  for (let i = 0; i < dungeons.length; i++){
    if (id === dungeons[i]["id"]){
      if (dungeons[i]["timer"][0] < timer){
        return "";
      } else if ((dungeons[i]["timer"][1] < timer) && (timer <= dungeons[i]["timer"][0])) {
        return "*";
      } else if ((dungeons[i]["timer"][2] < timer) && (timer <= dungeons[i]["timer"][1])) {
        return "**";
      } else {
        return "***";
      }
    }
  }
  return undefined;
}

function returnAffixText(runAffixes){
  let affixText = [];
  if (runAffixes === null){
    return null
  }
  for (let i = 0; i < runAffixes.length; i++){
    affixText[i] = affixes[runAffixes[i].toString()] 
  }
  return affixText[1] + ", " + affixText[2] +  ", " + affixText[3];
}


export { idToDungeon, returnPlayerRuns, secondsToHMS, timeConverter, timerCalculator, returnAffixText};