import React from "react";
import { Container } from "@material-ui/core";
import ReactPaginate from 'react-paginate';

import PlayerAccordion from '../../components/playerAccordion';

import players_json from '../../players.json'
import currentRuns from '../../runs.json';
import pclasses from '../../pclasses.json';

import * as styles from "./styles.module.scss";

import Select from "react-select"

const playersPerPage = 25;
const selectorStyle = {
    control: (base) => ({
        ...base,
        scale: "75%",
        marginTop: 0,
        width: 250

    }),
    input: (base) => ({
        ...base,
        margin: '0px',
      }),
  };

export default class PlayerListScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchTerm: "",
            allPlayers: [],
            filteredPlayers: [],
            selectedPlayers: [],
            visiblePlayers: [],
            page: 0,
            selectedOption: null,
        }
        
    }

    componentDidMount(){
        let initialPlayers = players_json;
        initialPlayers.forEach((player, index) => {
            player.position = index + 1
        })

        this.setState({ allPlayers: initialPlayers, selectedPlayers: initialPlayers, filteredPlayers: initialPlayers, visiblePlayers: initialPlayers.slice(0, playersPerPage)});
    }

    handlePageClick = (data) => {
        let page = data.selected;
        this.setState({ visiblePlayers: this.state.filteredPlayers.slice(page * playersPerPage, (page + 1) * playersPerPage), page })
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        let { page, allPlayers} = this.state;

        if (selectedOption['value'] === "noclass"){
            page = 0;
            allPlayers.forEach((player, index) => {
                player.position = index + 1
            })
            this.setState({ selectedPlayers: allPlayers, filteredPlayers: allPlayers, visiblePlayers: allPlayers.slice(page * playersPerPage, (page + 1) * playersPerPage), page: 0 }); 
        } else {
            page = 0;
            let selectedPlayers = allPlayers.filter(player => player.pclass === selectedOption['value']);
            selectedPlayers.forEach((player, index) => {
                player.position = index + 1
            })
            this.setState({ selectedPlayers: selectedPlayers, filteredPlayers: selectedPlayers, visiblePlayers: selectedPlayers.slice(page * playersPerPage, (page + 1) * playersPerPage), page: 0 });
        }
        // console.log(`Option selected:`, selectedOption);
      };

    updateFilteredPlayers = (event) => {
        let { page, selectedPlayers } = this.state;
        let searchTerm = event.target.value;
        let filteredPlayers = selectedPlayers.filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()));
        this.setState({ searchTerm, filteredPlayers: filteredPlayers, visiblePlayers: filteredPlayers.slice(page * playersPerPage, (page + 1) * playersPerPage), page: 0 });
    }
    

    render(){
        const { state, handlePageClick, handleChange } = this;
        const { visiblePlayers, filteredPlayers, page, selectedOption } = state;

        return (
            <Container component="main" maxWidth="md" className={styles.playerListScreen}>
                <div className={styles.topBars}>
                    <input style={{ display: 'inline-block' }}
                        type="text" 
                        placeholder="Search by name..." 
                        onChange={(event) => this.updateFilteredPlayers(event)}
                    />
                    <div className={styles.pclassSelector}>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={pclasses}
                        styles={selectorStyle}
                        defaultValue={pclasses[0]}
                    />
                    </div>
                </div>
                <div className={styles.playerList}>
                    <div className={styles.listHeaders}>
                        <div className={styles.listHeader}>
                            Position
                        </div>
                        <div className={styles.listHeader}>
                            Player
                        </div>
                        <div className={styles.listHeader}>
                            Score
                        </div>
                    </div>
                    <div className={styles.listValues}>
                        {visiblePlayers.map((player, index) => {
                            return (
                                <PlayerAccordion 
                                    index={index}
                                    player={player} 
                                    currentRuns={currentRuns}
                                />
                            )}
                        )}
                    </div>
                </div>
                <ReactPaginate
                    forcePage={page}
                    previousClassName={styles.page}
                    nextClassName={styles.page}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={filteredPlayers.length/playersPerPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    pageClassName={styles.page}
                    activeClassName={styles.active}
                />
            </Container>
        )
    }
}