import {makeOptions} from "../../utils.js";


export function setupOptionsForCandidateDelete(allParties, allCandidates) {
    let selectElement = document.getElementById('partyDeleteCandidate');

    let selectParties = allParties.map(party =>`<option>${party.partyId} : ${party.partyName}</option>`).join("");

    selectElement.innerHTML = selectParties;

    selectElement.onclick = () => {
        let candidateList = document.getElementById('idDeleteCandidate');
        candidateList.disabled = false;
        let value = document.getElementById('partyDeleteCandidate').value;
        let indexOfColon = value.indexOf(":");

        let partyId = Number(document.getElementById('partyDeleteCandidate').value.substring(0, indexOfColon));
        console.log(partyId);

        let candidates = allParties.filter(party => party.partyId === partyId);
        let possibleSelections = candidates[0];
        let selectCandidates = possibleSelections.candidates.map(candidate => `<option>${candidate.candidateId}: ${candidate.firstName} ${candidate.lastName}`).join("");
        console.log(selectCandidates);
        candidateList.innerHTML = selectCandidates;
    }

    document.getElementById('deleteCandidateBtn').onclick = async (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        await deleteCandidate(allParties, allCandidates)

    }

    document.getElementById('resetForm').onclick = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('createCandidateForm').reset();

    }
}

export async function deleteCandidate(allParties, allCandidates) {
    let indexOfColon = document.getElementById('idDeleteCandidate').value.indexOf(":")
    let candidateId = Number(document.getElementById('idDeleteCandidate').value.substring(0, indexOfColon));
    let indexOfColon2 = document.getElementById('partyDeleteCandidate').value.indexOf(":");
    let partyId = Number(document.getElementById('partyDeleteCandidate').value.substring(0, indexOfColon2));
    console.log(candidateId);
    let options = makeOptions("DELETE");
    let response = await fetch("http://localhost:8888/candidates/" + candidateId, options);

    if (response.status === 204) {
        console.log("DELETED" + candidateId);
        let indexOfCandidate = (element) => element.candidateId === candidateId;
        let index1 = (allCandidates.findIndex(indexOfCandidate));
        allCandidates.splice(index1, 1);
        let index2 = (allParties[partyId-1].candidates.findIndex(indexOfCandidate))
        allParties[partyId-1].candidates.splice(index2, 1);
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = '#00e676'
        document.getElementById('addedToolText').innerText = '✔ Kandidat slettet'


    } else {
        document.getElementById('addedTool').style.display = 'block'
        document.getElementById('addedToolText').style.color = 'crimson'
        document.getElementById('addedToolText').innerText = '❌ Kandidat kunne ikke slettes'
    }

}