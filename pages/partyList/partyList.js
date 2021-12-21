import {round} from "../candidateList/candidateList.js";


let numOfSortsByParty = 0;
let numOfSortsByVotes = 0;
let numOfSortsById = 0;
let numOfSortsByPartyPercentage = 0;


function sortByIdMaxParty(a, b) {
    return b.partyId-a.partyId;
}
function sortByIdMinParty(a, b) {
    return a.partyId-b.partyId;
}
function sortByNameMin(a, b) {
    return a.partyName.toLowerCase()-b.partyName.toLowerCase();
}
function sortByNameMax(a,b) {
    return b.partyName.toLowerCase()-a.toLowerCase();
}
function sortByVotesMaxParty(a, b) {
    return b.votesReceived-a.votesReceived;

}
function sortByVotesMinParty(a, b) {
    return a.votesReceived-b.votesReceived;
}
function rowMaker(array, numOfVotes) {
    array = array.map(p => `<tr class="tr"><td>${p.partyId}</td><td>${p.partyName}</td><td>${p.votesReceived}</td>
    <td>${round((p.votesReceived/numOfVotes) * 100)}</td></tr>`).join("");
    return array;
}

export function setupPartyList(allParties, allCandidates) {
    let table = document.getElementById('partyTbody');
    let numOfVotes = 0;
    allParties.forEach(p =>  numOfVotes += p.votesReceived);
    console.log(numOfVotes);
    let mappedParties = rowMaker(allParties, numOfVotes);
    table.innerHTML = mappedParties;


        document.getElementById('idSort2').onclick = () => {
            if (numOfSortsById % 2 === 0) {
                let sorted = allParties.sort(sortByIdMinParty);
                let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes)
                table.innerHTML = sortedAndMappedCandidates;
                numOfSortsById++;

            } else {
                let sorted = allParties.sort(sortByIdMaxParty);
                let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes)
                table.innerHTML = sortedAndMappedCandidates;
                numOfSortsById++;
            }
        }

        document.getElementById('voteSort2').onclick = () => {
            if (numOfSortsByVotes % 2 === 0) {
                let sorted = allParties.sort(sortByVotesMinParty)
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByVotes++;
            } else {
                let sorted = allParties.sort(sortByVotesMaxParty);
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByVotes++;
            }
        }

        document.getElementById('percentSortTotal2').onclick = () => {
            if (numOfSortsByPartyPercentage % 2 === 0) {
                let sorted = allParties.sort(function (a,b) {
                    let first = a.votesReceived / numOfVotes;
                    let second = b.votesReceived / numOfVotes;
                    if (first > second) {
                        return 1;
                    }
                    if (first < second) {
                        return -1;
                    }
                    return 0;
                });
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByPartyPercentage++;
            } else {
                let sorted = allParties.sort(function (a,b) {
                    let first = a.votesReceived / numOfVotes;
                    let second = b.votesReceived / numOfVotes;
                    if (first > second) {
                        return 1;
                    }
                    if (first < second) {
                        return -1;
                    }
                    return 0;
                });
                sorted = sorted.reverse();
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByPartyPercentage++;

            }
        }
        document.getElementById('nameSort').onclick = () => {
            console.log("DEBUG NAMESORT");
            if (numOfSortsByParty % 2 === 0) {
                let sorted = allParties.sort(function (a,b) {
                    let first = a.partyName.toLowerCase();
                    let second = b.partyName.toLowerCase();

                    if (first > second) {
                        return 1;
                    }
                    if (first < second) {
                        return -1;
                    }
                    return 0;
                });
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByParty++;

            } else {
                let sorted = allParties.sort(function (a,b) {
                    let first = a.partyName.toLowerCase();
                    let second = b.partyName.toLowerCase();

                    if (first > second) {
                        return 1;
                    }
                    if (first < second) {
                        return -1;
                    }
                    return 0;
                });
                sorted = sorted.reverse();
                let sortedAndMapped = rowMaker(sorted, numOfVotes);
                table.innerHTML = sortedAndMapped;
                numOfSortsByParty++;
            }
        }
}
