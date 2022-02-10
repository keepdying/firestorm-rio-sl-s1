import React, { useState } from "react";

import { idToDungeon, secondsToHMS, timerCalculator, timeConverter } from "../../utils";

import * as styles from "./styles.module.scss";

const getDungeonImage = (dungeon) => {
  switch(dungeon){
    case "Sanguine Depths": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2284_380.png"
    case "Spires of Ascension": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2285_381.png"
    case "The Necrotic Wake": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2286_376.png"
    case "Halls of Atonement": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2287_378.png"
    case "Plaguefall": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2289_379.png"
    case "Mists of Tirna Scithe": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2290_375.png"
    case "De Other Side": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2291_377.png"
    case "Theater of Pain": return "https://firestorm-servers.com/assets/img/dungeons/dungeon_2293_382.png"
    default: return null;
  }
}

const getAffixImage = (affix) => {
  switch(affix) {
    case 2: return "https://wow.zamimg.com/images/wow/icons/small/spell_magic_lesserinvisibilty.jpg"
    case 3: return "https://wow.zamimg.com/images/wow/icons/small/spell_shaman_lavasurge.jpg"
    case 4: return "https://wow.zamimg.com/images/wow/icons/small/spell_deathknight_necroticplague.jpg"
    case 5: return "https://wow.zamimg.com/images/wow/icons/small/spell_nature_massteleport.jpg"
    case 6: return "https://wow.zamimg.com/images/wow/icons/small/ability_warrior_focusedrage.jpg"
    case 7: return "https://wow.zamimg.com/images/wow/icons/small/ability_warrior_battleshout.jpg"
    case 8: return "https://wow.zamimg.com/images/wow/icons/small/spell_shadow_bloodboil.jpg"
    case 9: return "https://wow.zamimg.com/images/wow/icons/small/achievement_boss_archaedas.jpg"
    case 10: return "https://wow.zamimg.com/images/wow/icons/small/ability_toughness.jpg"
    case 11: return "https://wow.zamimg.com/images/wow/icons/small/ability_ironmaidens_whirlofblood.jpg"
    case 12: return "https://wow.zamimg.com/images/wow/icons/small/ability_backstab.jpg"
    case 13: return "https://wow.zamimg.com/images/wow/icons/small/spell_fire_felflamering_red.jpg"
    case 14: return "https://wow.zamimg.com/images/wow/icons/small/spell_nature_earthquake.jpg"
    case 120: return "https://wow.zamimg.com/images/wow/icons/small/trade_archaeology_nerubian_obelisk.jpg"
    case 121: return "https://wow.zamimg.com/images/wow/icons/medium/spell_animarevendreth_buff.jpg"
    case 122: return "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_prayerofspirit.jpg"
    case 123: return "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_prayerofshadowprotection.jpg"
    case 124: return "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_cyclone.jpg"
    default: return null;
  }
}
const PlayerRunsAcc = ({ playerRun }) => {
  const [ timer, setTimer ] = useState(false);
    return (
      <div id={playerRun.rid} className={styles.accordionAltItem}>
        <div className={styles.accordionAltTitle}>
          <span className={styles.mainItem}>
            <img src={getDungeonImage(idToDungeon(playerRun["dung"]))} alt={idToDungeon(playerRun["dung"])} />
            {idToDungeon(playerRun["dung"], "abbr")}
          </span>
          <span>
            {playerRun["lvl"]}
            <span className={styles.stars}>{timerCalculator(playerRun["dung"], playerRun["time"])}</span> 
          </span>
          <span onMouseLeave={() => setTimer(false)} onMouseEnter={() => setTimer(true)} className={styles.timer}>
              {secondsToHMS(playerRun["time"])}
              { timer && <span className={styles.completed}>Completed on: {timeConverter(playerRun["timestamp"])}</span>}
          </span>
          <span>
            {
              playerRun["affixes"] && 
              playerRun["affixes"].map((affix, index) => {
                return (
                  <img src={getAffixImage(affix)} alt={affix} key={"affix_" + index} />
                )
              })  
            }
          </span>
          <span className={styles.group}>
            <div className={styles.tank}>
              <img src="https://cdnassets.raider.io/assets/img/role_tank-6cee7610058306ba277e82c392987134.png" alt="tank" />
              <span className={`${styles[`color_${playerRun["pclasses"][0]}`]}`}>{playerRun["pnames"][0]}</span>
            </div>
            <div className={styles.heal}>
              <img src="https://cdnassets.raider.io/assets/img/role_healer-984e5e9867d6508a714a9c878d87441b.png" alt="healer" /> 
              <span className={`${styles[`color_${playerRun["pclasses"][1]}`]}`}>{playerRun["pnames"][1]}</span>
            </div>
            <div className={styles.dps}>
              <img src="https://cdnassets.raider.io/assets/img/role_dps-eb25989187d4d3ac866d609dc009f090.png" alt="dps" />
              <span className={`${styles[`color_${playerRun["pclasses"][2]}`]}`}>{playerRun["pnames"][2]}</span> 
              <span className={`${styles[`color_${playerRun["pclasses"][3]}`]}`}>{playerRun["pnames"][3]}</span> 
              <span className={`${styles[`color_${playerRun["pclasses"][4]}`]}`}>{playerRun["pnames"][4]}</span>
            </div>
          </span>
          <span>{playerRun["score"]}</span>
        </div>
        {/* <div className={styles.accordionAltContent}> 
          <span>Completed on: {timeConverter(playerRun["timestamp"])}</span>
         
        </div> */}
      </div>
    );
};

export default PlayerRunsAcc;
