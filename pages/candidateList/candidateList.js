let numOfSortsByParty = 0;
let numOfSortsByVotes = 0;
let numOfSortsById = 0;
let numOfSortsByTotalPercentage = 0;
let numOfSortsByPartyPercentage = 0;

 function sortByIdMax(a, b) {
    return b.candidateId-a.candidateId;
}
function sortyByIdMin(a, b) {
    return a.candidateId-b.candidateId;
}
 function sortByVotesMax(a, b) {
    return b.personalVotes-a.personalVotes;

}
 function sortByVotesMin(a, b) {
    return a.personalVotes-b.personalVotes;
}


export function round(num) {
    return +(Math.round(num + "e+3") + "e-3");
}
 function rowMaker(array, numOfVotes, partyTotal) {
    array = array.map(c => `<tr class="tr"><td>${c.candidateId}</td><td>${c.firstName}</td><td>${c.lastName}</td>
    <td>${c.partyName}</td><td>${c.personalVotes}</td><td>${round((c.personalVotes/numOfVotes) * 100)}</td>
    <td>${round((c.personalVotes/partyTotal[partyTotal.findIndex((ele) => ele.partyName === c.partyName)].votesReceived) * 100)}</td></tr>`).join("");
    return array;
}
export function setupCandidateList(allParties, allCandidates) {
    let table = document.getElementById('candidateTbody');
    let numOfVotes  = 0;
    let partyTotal = [];
    allParties.forEach(p =>  numOfVotes += p.votesReceived);
    allParties.forEach(p => partyTotal.push({partyName : p.partyName, votesReceived: p.votesReceived}));
    console.log(numOfVotes);
    console.log(allCandidates);
    let mappedCandidates = rowMaker(allCandidates, numOfVotes, partyTotal);
    console.log(mappedCandidates);

    table.innerHTML = mappedCandidates;

    document.getElementById('partiSort').onclick = () => {

        if (numOfSortsByParty % 2 === 0) {
        let sorted = allCandidates.sort(function (a, b) {
            let first = a.partyName.toLowerCase();
            let second = b.partyName.toLowerCase();
            if (first > second) {
                return 1;
            }
            if (first < second) {
                return -1
            }
            return 0;
        });
        console.log(sorted);
        let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes, partyTotal);
        table.innerHTML = sortedAndMappedCandidates;
        numOfSortsByParty++;
      } else {
        let sortedAndMappedCandidates = allCandidates.sort(function (a, b) {
            let first = a.partyName.toLowerCase();
            let second = b.partyName.toLowerCase();
            if (first > second) {
                return 1;
            }
            if (first < second) {
                return -1
            }
            return 0;
        });
        table.innerHTML = rowMaker(sortedAndMappedCandidates.reverse(), numOfVotes, partyTotal);
        numOfSortsByParty++;
        }
    }
    document.getElementById('voteSort').onclick = () => {

        if (numOfSortsByVotes % 2 === 0) {
            let sorted = allCandidates.sort(sortByVotesMax);
            let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes, partyTotal);
            table.innerHTML = sortedAndMappedCandidates;
            numOfSortsByVotes++;
        } else {
            console.log()
            let sortedCandidates = allCandidates.sort(sortByVotesMin);
            table.innerHTML = rowMaker(sortedCandidates, numOfVotes, partyTotal);
            numOfSortsByVotes++;


        }
    }
    document.getElementById('idSort').onclick = () => {
        if (numOfSortsById % 2 === 0) {
            let sorted = allCandidates.sort(sortByIdMax);
            let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes, partyTotal)
            table.innerHTML = sortedAndMappedCandidates;
            numOfSortsById++;

        } else {
            let sorted = allCandidates.sort(sortyByIdMin);
            let sortedAndMappedCandidates = rowMaker(sorted, numOfVotes, partyTotal)
            table.innerHTML = sortedAndMappedCandidates;
            numOfSortsById++;
        }

    }
    document.getElementById('percentSortTotal').onclick = () => {
        if (numOfSortsByTotalPercentage % 2 === 0) {
            let sorted = allCandidates.sort(function (a,b) {
                let first = a.personalVotes / numOfVotes;
                let second = b.personalVotes / numOfVotes;
                if (first > second) {
                    return 1;
                }
                if (first < second) {
                    return -1;
                }
                return 0;
            });
            let sortedAndMapped = rowMaker(sorted, numOfVotes, partyTotal);
            table.innerHTML = sortedAndMapped;
            numOfSortsByTotalPercentage++;
        } else {
            let sorted = allCandidates.sort(function (a,b) {
                let first = a.personalVotes / numOfVotes;
                let second = b.personalVotes / numOfVotes;
                if (first > second) {
                    return 1;
                }
                if (first < second) {
                    return -1;
                }
                return 0;
            });
            sorted = sorted.reverse();
            let sortedAndMapped = rowMaker(sorted, numOfVotes, partyTotal);
            table.innerHTML = sortedAndMapped;
            numOfSortsByTotalPercentage++;
        }
    }
    document.getElementById('percentSortParty').onclick = () => {
        if (numOfSortsByPartyPercentage % 2 === 0) {
            let sorted = allCandidates.sort(function (a,b) {
                let first = a.personalVotes / (partyTotal[partyTotal.findIndex((ele) => ele.partyName === a.partyName)].votesReceived * 100);
                let second = b.personalVotes / (partyTotal[partyTotal.findIndex((ele) => ele.partyName === b.partyName)].votesReceived * 100);
                if (first > second) {
                    return 1;
                }
                if (first < second) {
                    return -1;
                }
                return 0;
            });
            let sortedAndMapped = rowMaker(sorted, numOfVotes, partyTotal);
            table.innerHTML = sortedAndMapped;
            numOfSortsByPartyPercentage++;
        } else {
            let sorted = allCandidates.sort(function (a,b) {
                let first = a.personalVotes / (partyTotal[partyTotal.findIndex((ele) => ele.partyName === a.partyName)].votesReceived * 100);
                let second = b.personalVotes / (partyTotal[partyTotal.findIndex((ele) => ele.partyName === b.partyName)].votesReceived * 100);
                if (first > second) {
                    return 1;
                }
                if (first < second) {
                    return -1;
                }
                return 0;
            });
            sorted = sorted.reverse();
            let sortedAndMapped = rowMaker(sorted, numOfVotes, partyTotal);
            table.innerHTML = sortedAndMapped;
            numOfSortsByPartyPercentage++;

        }
    }
}
