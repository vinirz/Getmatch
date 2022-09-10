import ReactStars from "react-rating-stars-component";
import Cookies from "js-cookie";

var REACT_APP_APIKEY = process.env.REACT_APP_APIKEY

var Airtable = require('airtable');
var base = new Airtable({apiKey: REACT_APP_APIKEY}).base('appDmW3c2wnDNUQVS');

var response = []

function Player(props){

    function saveResponse(newRating){        
        response.push({
            "id": props.id,
            "fields":{
                "name": props.name,
                "eval": parseInt(props.lsteval) + parseInt(newRating)
            }
        })
    }

    const updateEval = () => {
        console.log('response: ' + response.length )
        console.log('partial: ' + props.partial.length )

        if (response.length < props.partial.length){
            window.alert('Conclua as avaliações para continuar')
        }else if (Cookies.get('voted') === 1){
            window.alert('Provavelmente você já votou!')
            window.location.reload()
        } else {
            Cookies.set('voted', 1, { expires: 7 });

            response.forEach(element => {
                base('Projects').update([element], 
                    function(err) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                });
            });

            base('Votes').create([
                {
                    "fields": {
                        "count": 'voted'
                    }
                }
            ], 
                function(err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
            });

            window.alert('Avaliação computada!')
            setTimeout(() => {
                window.location.reload()
            }, 500)

        }
    }

    return(
        <>
            <div className="player">
                <h3 id={props.id} >{props.name}</h3>
                <ReactStars
                    count={5}
                    size={24}
                    onChange={saveResponse}
                    activeColor="#F9CE2E"
                />
            </div>

            <button 
                className="fab-btn" 
                onClick={updateEval}
            />
        </>
    )
}


export default Player

