import React, { useState } from "react";
import { Modal, Container } from "@material-ui/core"

import PlayerRunsAcc from "../playerRunsAcc";

import { returnPlayerRuns, timerCalculator } from "../../utils";

import * as styles from "./styles.module.scss";

const PlayerAccordion = ({ player, currentRuns, index }) => {
    const [isActive, setIsActive] = useState(false);
    const [ sort, setSort ] = useState("score")
    
    const sortFunction = (a, b) => {
      if (sort === "score") return b.score - a.score;
      if (sort === "dung") return a.score - b.score;
      if (sort === "time") return a.time - b.time;
      if (sort === "lvl") {
        if (a.lvl !== b.lvl) return b.lvl - a.lvl;
        return timerCalculator(b.dung, b.time).length - timerCalculator(a.dung, a.time).length
      }
    }

    const getColorByPosition = (position) => {
      if (position <= 5) return "#e6cc80";
      if (position <= 15) return "#ff8000";
      if (position <= 50) return "#a335ee";
      if (position <= 250) return "#0070dd";
      if (position <= 1000) return "#1eff00";
      return "#ffffff";
    }

    return (
      <div key={`player_${index}`} className={`${styles.accordionItem}`}>
        <div className={styles.accordionTitle} onClick={() => setIsActive(!isActive)}>
          <div style={{ color: getColorByPosition(player.position)}}>{player.position}</div>
          <div className={`${styles[`color_${player.pclass}`]}`}>{player.name}</div>
          <div>{player.fsio}</div>
          {/* <div>{isActive ? '-' : '+'}</div> */}
        </div>
        <Modal
          open={isActive}
          onClose={() => setIsActive(false)}
        >
          <Container maxWidth="lg" className={styles.accordionContent}> 
            <div className={styles.runHeader}>
              <strong onClick={() => setSort("dung")} className={`${styles.mainHeader} ${sort === "dung" && styles.activeSort}`}>Dungeon</strong>
              <strong className={sort === "lvl" && styles.activeSort} onClick={() => setSort("lvl")}>Level</strong>
              <strong className={sort === "time" && styles.activeSort} onClick={() => setSort("time")}>Time</strong>
              <strong>Affixes</strong>
              <strong className={styles.group}>
                Group
              </strong>
              <strong className={sort === "score" && styles.activeSort}  onClick={() => setSort("score")}>Score</strong>
            </div>
            {
              returnPlayerRuns(player.bruns, currentRuns)
              .sort((a, b) => sortFunction(a, b))
              .map((playerRun, index) => {
              return (<PlayerRunsAcc playerRun={playerRun}/>)}
            )} 
          </Container>
        </Modal>
      </div>
    );
};

export default PlayerAccordion