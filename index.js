import "https://unpkg.com/navigo"
import {adjustForMissingHash, loadTemplate, makeActive, makeOptions, renderTemplate} from "./utils.js";
import {setupOptionsForCandidateCreation} from "./pages/createCandidate/createCandidate.js";
import {setupOptionsForCandidateUpdate} from "./pages/updateCandidate/updateCandidate.js";
import {setupOptionsForCandidateDelete} from "./pages/deleteCandidate/deleteCandidate.js";
import {setupCandidateList} from "./pages/candidateList/candidateList.js";
import {setupPartyList} from "./pages/partyList/partyList.js";



import anime from './node_modules/animejs/lib/anime.es.js';

window.addEventListener("load", async () => {

    function openAdminPanel() {


        document.getElementById('openSidebarBtn').onclick = async () => {
            document.getElementById('sidebar').style.transition = "0.5s"
            document.getElementById('sidebar').style.overflow = "hidden";
            document.getElementById('sidebar').style.width = "300px";
            document.querySelectorAll('.sidebar a').forEach(link => {
                let animation = anime({
                    targets: link,
                    opacity: [0, 1],
                    delay : 500,
                    easing: 'linear'
                })
            })
        }
    }
    openAdminPanel();

    function closeNav() {
        document.getElementById('closeSidebarBtn').onclick = async () => {
            document.getElementById('sidebar').style.transition = "0.0s";
            document.getElementById('sidebar').style.width = "0";
        }

    }
    closeNav();

    function animateForm() {
        let form = document.getElementById('createForm1');
        let animation = anime({
            targets: form,
            translateX: [1600, 0],
            delay: 200,
            duration: 1500,
            easing: 'easeInOutExpo'
        });
    }
    function animateForm2() {
        let form = document.getElementById('updateForm1');
        let animation = anime({
            targets: form,
            translateX: [1600, 0],
            delay: 200,
            duration: 1500,
            easing: 'easeInOutExpo'
        });
    }
    function animateForm3() {
        let form = document.getElementById('deleteForm1');
        let animation = anime({
            targets: form,
            translateX: [1600, 0],
            delay: 200,
            duration: 1500,
            easing: 'easeInOutExpo'
        });
    }
    function animateTable() {
        let table = document.getElementById('candidateTable');
        let animation = anime({
            targets: table,
            translateX: [1600, 0],
            delay: 200,
            duration: 1500,
            easing: 'easeInOutExpo'
        });

        let target2 = document.querySelectorAll(".candidateTable .tr");
        console.log(target2);

        let animation2 = anime({
                targets: target2,
                translateX: [1600, 0],
                delay: anime.stagger(10),
                duration: 1500,
                easing: 'easeInOutExpo'
            });


    }
    function animateTable2() {
        let table = document.getElementById('partyTable');
        let animation = anime({
            targets: table,
            translateX: [1600, 0],
            delay: 200,
            duration: 1500,
            easing: 'easeInOutExpo'
        });

        let target2 = document.querySelectorAll(".candidateTable .tr");
        console.log(target2);

        let animation2 = anime({
            targets: target2,
            translateX: [1600, 0],
            delay: anime.stagger(10),
            duration: 1500,
            easing: 'easeInOutExpo'
        });
    }
    async function fetchAllParties () {
        let array =[];
        let response = await fetch("http://localhost:8888/parties");
        let responseData = await response.json();
        responseData.forEach(party => {
            array.push(party);
        })
        return array;

    }

    async function fetchAllCandidates() {
        let array = [];
        let response = await fetch("http://localhost:8888/candidates");
        let responseData = await response.json();
        responseData.forEach(candidate => {
            array.push(candidate);
        })
        return array;
    }




    function scrollToElement(y) {
        window.scroll(0, y);
    }


    const allParties = await fetchAllParties();
    let allCandidates = await fetchAllCandidates();
    console.log(allParties);
    console.log(allCandidates);

    const emptyTemplate = await loadTemplate("./pages/empty/empty.html")
    const createCandidateTemplate = await loadTemplate("./pages/createCandidate/createCandidate.html");
    const updateCandidateTemplate = await loadTemplate("./pages/updateCandidate/updateCandidate.html");
    const deleteCandidateTemplate = await loadTemplate("./pages/deleteCandidate/deleteCandidate.html");
    const candidateListTemplate = await loadTemplate("./pages/candidateList/candidateList.html");
    const partyListTemplate = await loadTemplate("./pages/partyList/partyList.html");



    const router = new Navigo("/", {hash: true});
    adjustForMissingHash();
    router.on({
        "/" : () => {
            renderTemplate(emptyTemplate, "content");
            makeActive('homeLink');
        },
        "/parties" : () => {
            renderTemplate(partyListTemplate, "content");
            makeActive('partyLink')
            setupPartyList(allParties, allCandidates);
            scrollToElement(1300);
            animateTable2();



        }
        ,
        "/candidates" : () => {
            renderTemplate(candidateListTemplate, "content");
            makeActive('candidateLink');
            setupCandidateList(allParties, allCandidates);
            scrollToElement(1300);
            animateTable();

        },
        "/createCandidate" : () => {
            renderTemplate(createCandidateTemplate, "content");
            scrollToElement(1500);
            setupOptionsForCandidateCreation(allParties, allCandidates);
            animateForm();

        },
        "/updateCandidate" : () => {
            renderTemplate(updateCandidateTemplate, "content");
            scrollToElement(1500);
            setupOptionsForCandidateUpdate(allParties, allCandidates);
            animateForm2();

        },
        "/deleteCandidate" : () => {
            renderTemplate(deleteCandidateTemplate, "content");
            scrollToElement(1500);
            setupOptionsForCandidateDelete(allParties, allCandidates);
            animateForm3();
        }
    })



});