import { useEffect, useState } from "react";
import './parties.css';

const fetchParties = async () => {
    const url = 'https://z.ynet.co.il/mshort/content/API/electionspolls/api/polls/Get_all';
    const request = await fetch(url);

    const partiesJson = await request.json();

    return partiesJson.at(-1).PollMiflaga.filter(party => party.Miflaga.length > 0);
};

function Party({ party, changeVoteParty }) {
    return (
        <div className="party">
            <h3 className="party__item">{party.Miflaga}</h3>
            <h5 className="party__item">{party.Mandat ? party.Mandat + ' מנדטים' : '(לא עברו את אחוז החסימה)'}</h5>
            <input className="party__item" onChange={() => changeVoteParty(party)} type="radio" name="party" checked={party.votedFor} />
        </div>
    );
}

export default function Parties() {
    
    const localStorageItemName = 'votedParty';
    const [parties, setParties] = useState([]); // Initialize an empty array as a default state.

    const changeVoteParty = (party) => {
        localStorage.setItem(localStorageItemName, party.Miflaga);
        const changeVotesState = parties.map(p => p === party ? ({...p, votedFor: true}) : ({...p, votedFor: false}));
        setParties(changeVotesState);
    };
    
    const isVotedForParty = (party) => {
        return party.Miflaga === localStorage.getItem(localStorageItemName);
    };

    useEffect(() => { // Run effect only once on component init.

        (async () => {

            const fetchedParties = (await fetchParties()).map(party => {
                return ({...party, votedFor: isVotedForParty(party)}); // Check if the party is voted for (From localStorage).
            });

            setParties(fetchedParties); // Assign the fetched parties to the state.

        })();
        
        return () =>  {
            console.log('Parties component disposed (OnDestroy)');
        };

    }, []);

    return (
        parties.map((party, index) => (
            <Party key={index} party={party} changeVoteParty={(party) => changeVoteParty(party)} />
        ))
    );
}