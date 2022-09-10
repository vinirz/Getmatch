import Player from '../Player'
import Airtable from "airtable";
import { useEffect, useState } from 'react';

var REACT_APP_APIKEY = process.env.REACT_APP_APIKEY

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: REACT_APP_APIKEY
});
var base = Airtable.base('appDmW3c2wnDNUQVS');

function List(){

    const [players, setPlayers] = useState([])
    
    useEffect(() => {
        base('Projects').select({
            maxRecords: 18,
            view: "Grid view"
        }).firstPage(function(err, records) {
            if (err) { console.error(err); return; }
            setPlayers(records)
        })

    }, [])

    return (
        <div className="list">
            {   
                players.map(n => {
                    console.log('success')
                    return <Player key={n.id} id={n.id} name={n.fields.name} lsteval={n.fields.eval} partial={players}></Player>
                })
            }
        </div>
        
    )
}

export default List;