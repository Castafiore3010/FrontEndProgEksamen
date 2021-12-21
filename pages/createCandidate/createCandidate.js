import {makeOptions} from "../../utils.js";



export function setupOptionsForCandidateCreation(allParties, allCandidates) {
    let selectElement = document.getElementById('partyCreateCandidate');

    let selectParties = allParties.map(party =>`<option>${party.partyId} : ${party.partyName}</option>`).join("");

    selectElement.innerHTML = selectParties;


    document.getElementById('createCandidateBtn').onclick = async (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        await createCandidate(allParties, allCandidates);

    }

    document.getElementById('resetForm').onclick = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('createCandidateForm').reset();

    }




}



 export async function createCandidate(allParties, allCandidates) {
    let candidate = {};
    candidate.candidateId = null;
    candidate.firstName = document.getElementById('firstNameCreateCandidate').value;
    candidate.lastName = document.getElementById('lastNameCreateCandidate').value;
    candidate.party = {};
    candidate.personalVotes = Number(document.getElementById('votesCreateCandidate').value);
    let partyId = Number(document.getElementById('partyCreateCandidate').value.substring(0, 2));


    if (partyId !== 0) {
        let partyList = allParties.filter(party => party.partyId === partyId);
        candidate.party = partyList[0];
    }

    let options = makeOptions("POST", candidate);

    let response = await fetch("http://localhost:8888/candidates", options);

    if (response.status === 201) {
        let responseData = await response.json();
        let candidateToPush = responseData;
        allCandidates.push(candidateToPush);
        allParties.filter(party => party === candidate.party)[0].candidates.push(candidateToPush);
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = '#00e676'
        document.getElementById('addedToolText').innerText = '✔ Kandidat tilføjet'


    } else {
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = 'crimson'
        document.getElementById('addedToolText').innerText = '❌ Kandidat kunne ikke tilføjes'
    }


}