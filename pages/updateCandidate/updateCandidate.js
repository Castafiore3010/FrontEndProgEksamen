import {makeOptions} from "../../utils.js";

export function setupOptionsForCandidateUpdate(allParties, allCandidates) {
    let selectElement = document.getElementById('partyUpdateCandidate');

    let selectParties = allParties.map(party =>`<option>${party.partyId} : ${party.partyName}</option>`).join("");

    selectElement.innerHTML = selectParties;

    selectElement.onclick = () => {
        let candidateList = document.getElementById('idUpdateCandidate');
        candidateList.disabled = false;
        let partyId = Number(document.getElementById('partyUpdateCandidate').value.substring(0, 2));
        console.log(partyId);
        let candidates = allParties.filter(party => party.partyId === partyId);
        let possibleSelections = candidates[0];
        let selectCandidates = possibleSelections.candidates.map(candidate => `<option>${candidate.candidateId}: ${candidate.firstName} ${candidate.lastName}`).join("");
        console.log(selectCandidates);
        candidateList.innerHTML = selectCandidates;

        candidateList.onclick = () => {

            let value = document.getElementById('idUpdateCandidate').value;
            let indexOfColon = value.indexOf(":");
            let candidateId = Number(document.getElementById('idUpdateCandidate').value.substring(0, indexOfColon));


            console.log(candidateId);
            let candidatesFilter = allCandidates.filter(candidate => candidate.candidateId === candidateId);
            let candidate = candidatesFilter[0];
            document.getElementById('firstNameUpdateCandidate').disabled = false;
            document.getElementById('lastNameUpdateCandidate').disabled = false;
            document.getElementById('votesUpdateCandidate').disabled = false;
            document.getElementById('firstNameUpdateCandidate').value = candidate.firstName;
            document.getElementById('lastNameUpdateCandidate').value = candidate.lastName;
            document.getElementById('votesUpdateCandidate').value = candidate.personalVotes;
        }

    }


    document.getElementById('updateCandidateBtn').onclick = async (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        await updateCandidate(allParties, allCandidates)

    }

    document.getElementById('resetForm').onclick = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('createCandidateForm').reset();

    }




}


export async function updateCandidate(allParties, allCandidates) {
    let candidate = {};
    let indexOfFirstColon = document.getElementById('partyUpdateCandidate').value.indexOf(":")
    let indexOfSecondColon = document.getElementById('idUpdateCandidate').value.indexOf(":")
    let partyId = Number(document.getElementById('partyUpdateCandidate').value.substring(0, indexOfFirstColon));
    let candidateId = Number(document.getElementById('idUpdateCandidate').value.substring(0, indexOfSecondColon));
    candidate.candidateId = candidateId;
    candidate.firstName = document.getElementById('firstNameUpdateCandidate').value;
    candidate.lastName = document.getElementById('lastNameUpdateCandidate').value;
    candidate.party = {};
    candidate.personalVotes = Number(document.getElementById('votesUpdateCandidate').value);


    if (partyId !== 0) {
        let partyList = allParties.filter(party => party.partyId === partyId);
        candidate.party = partyList[0];
        console.log(candidate.party);
        let id = candidate.party.partyId;
        let name = candidate.party.partyName;
        candidate.party = {partyId : id};
        candidate.partyName = name;

    }
    console.log(candidate);

    let options = makeOptions("PUT", candidate);

    let response = await fetch("http://localhost:8888/candidates/" + candidate.candidateId, options)

    if (response.status === 200) {
        let indexOfCandidate = (element) => element.candidateId === candidateId;
        let index = (allCandidates.findIndex(indexOfCandidate));
        allCandidates[index] = candidate;
        let index2 = (allParties[partyId-1].candidates.findIndex(indexOfCandidate))
        console.log(index2);
        allParties[partyId-1].candidates[index2] = candidate;
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = '#00e676'
        document.getElementById('addedToolText').innerText = '✔ Kandidat opdateret'


    } else {
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = 'crimson'
        document.getElementById('addedToolText').innerText = '❌ Kandidat kunne ikke opdateres'
    }

}



