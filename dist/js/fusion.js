//#region damage/heal targets for individual attacks
const closest = 'Damage closest';
const closest2 = 'Damage closest 2';
const closest3 = 'Damage closest 3';
const closest4 = 'Damage closest 4';
const closestx2 = 'Damage closest (x2)';
const closestx3 = 'Damage closest (x3)';
const closestx6 = 'Damage closest (x6)';
const closestSelf = 'Damage closest & self';
const closestShieldSelf = 'Damage closest & shield self';
const closestShieldSpread = 'Damage closest & spread shield';
const closestHealSelf = 'Damage closest & heal self';
const target = 'Damage target';
const targetx2 = 'Damage target (x2)';
const targetx3 = 'Damage target (x3)';
const furthest = 'Damage furthest';
const furthestx2 = 'Damage furthest (x2)';
const furthestx3 = 'Damage furthest (x3)';
const furthestDmgDrain = 'Damage and drain furthest';
const drainClose = 'Drain closest';
const drainAll = 'Drain all';
const drainTarget = 'Drain target';
const drainWeakest = 'Drain weakest';
const drainFurthest = 'Drain furthest';
const drainRandom = 'Drain random';
const weakest = 'Damage weakest';
const weakestx2 = 'Damage weakest (x2)';
const weakRan = 'Damage weakest & 1 random';
const weakestShieldSelf = 'Damage closest & shield self';
const strongest = 'Damage strongest';
const strongestx2 = 'Damage strongest (x2)';
const strongestDmgDrain = 'Damage and drain strongest';
const strongestOnce = 'Damage strongest (usable once per adventure)';
const all = 'Damage all';
const tarHeal = 'Heal target';
const spreadHeal = 'Spread heal';
const selfHeal = 'Heal self';
const teamHeal = 'Heal team';
const weakestHeal = 'Heal weakest';
const teamShieldHeal = 'Shield and heal team';
const spreadShieldTeamHeal = 'Spread shield and heal team';
const selfShield = 'Shield self';
const teamShield = 'Shield team';
const tarShield = 'Shield target';
const spreadShield = 'Spread shield';
const spreadShieldOnce = 'Spread shield (usable once per adventure)';
const tarShieldSelf = 'Shield target & damage self';
const random = 'Damage random';
const randomx2 = 'Damage random (x2)';
const randomx3 = 'Damage random (x3)';
const randomx5 = 'Damage random (x5)';
const randomAdditional = 'Damage random & 1 additional enemy';
const randomAdditional4 = 'Damage random & 4 additional enemies';
const furthestRandom2 = 'Damage furthest & 2 random enemies';
const furthestRandom3 = 'Damage furthest & 3 random enemies';
const tarRan = 'Damage target and random';
const dmgDmgClosest = 'Damage and physical damage closest';
const targetSelf = 'Damage target & self';
const furthestSelf = 'Damage furthest & self';
const weakestSelf = 'Damage weakest & self';
const strongestSelf = 'Damage strongest & self';
const teamHealDmgSelf = 'Heal team & damage self';
const dmgAdditional2 = 'Damage & 2 additional enemies';
const dmgDrainRandom = 'Damage & drain random enemy';
const strongestSpreadHeal = 'Damage strongest & spread heal';
const resurrect = 'Resurrect teammate (usable once per adventure)';
//#endregion

//sets up template and table to output information to from fusions objects
const fusionTemplate = document.querySelector('#fusionTemplate');
const fusionTable = document.querySelector('#fusions');

//set search variables
const searchMode = document.querySelector('#search');
const searchBar = document.querySelector('#searchbar');
const bonusBar = document.querySelector('.searchbar');
const bonusBox = document.querySelector('.bonus');
const bonusSearch = document.querySelector('#bonusSearch');
const commonSelector = document.querySelector('#commonCheck');
const rareSelector = document.querySelector('#rareCheck');
const epicSelector = document.querySelector('#epicCheck');
const legendarySelector = document.querySelector('#legendaryCheck');
const mythicSelector = document.querySelector('#mythicCheck');
let filterCheck = [commonSelector, rareSelector, epicSelector, legendarySelector, mythicSelector];
let rarityFilter = [];
let raritySearch = false;
let eleDmg;
const filteredFusions = [];
const bonuses = ['damage', 'dmg', 'health', 'speed', 'crit chance', 'crit damage', 'life steal', 'dual strike', 'empower chance', 'quad strike',
                'heal power', 'evade chance', 'block chance', 'damage enrage', 'deflect chance', 'absorb chance', 'damage reduction', 'resistance',
                'redirect chance', 'team enrage', 'max shields', 'ricochet chance', 'sp skill damage']

const alphanum = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

var fusions = [];

//don't really understand but puts in a http request to pull the info out of the json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './dist/js/fusionlist.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};

//initializes function chain to pull info out of json file, when complete fires triggered
function init() {
    loadJSON(function(response) {
        let actual_JSON = JSON.parse(response);
        triggered(actual_JSON);
    });
};

//loads json info to fusions variable and then loads table once parse is final
function triggered(json){
    fusions = json.fusions;
    //onLoad gens all fusions and adjusts forms based on modeselector
    modeCheck();
    clearTable();
};

//begins process of pulling json data
init();

//pulls all the relevant info, places in correct div, and pushes a child out to parent
function genFusions(element) {
    //imports template from fusion.html
    const fusionElement = document.importNode(fusionTemplate.content, true);

    //selects entire fusion group info and updates color based on fusion rarity
    const fusionGroup = fusionElement.querySelector('#fusionTable');
    if (element.rarity == 'common') {
        fusionGroup.style.backgroundColor = '#4ad37a';
    } else if (element.rarity == 'rare') {
        fusionGroup.style.backgroundColor = '#8687E1';
    } else if (element.rarity == 'epic') {
        fusionGroup.style.backgroundColor = '#FC7E77';
    } else if (element.rarity == 'legendary') {
        fusionGroup.style.backgroundColor = '#F7F72A';
    } else if (element.rarity == 'mythic') {
        fusionGroup.style.backgroundColor = '#E4094A';
    }

    //from here to appendchild pulls individual div targets and places info from fusion object
    const fusionImage = fusionElement.querySelector('#fusionImage');
    fusionImage.style.backgroundImage = element.image;

    const fusionName = fusionElement.querySelector('#fusionName');
    fusionName.textContent = element.name;

    const atkValue = fusionElement.querySelector('#atkValue');
    atkValue.textContent = element.atk;

    const skill1 = fusionElement.querySelector('#skill1');
    skill1.textContent = element.atk1;

    const skill2 = fusionElement.querySelector('#skill2');
    skill2.textContent = element.atk2;

    const skill3 = fusionElement.querySelector('#skill3');
    skill3.textContent = element.atk3;

    const skill4 = fusionElement.querySelector('#skill4');
    skill4.textContent = element.atk4;

    const skill5 = fusionElement.querySelector('#skill5');
    skill5.textContent = element.atk5;

    const skill6 = fusionElement.querySelector('#skill6');
    skill6.textContent = element.atk6;

    const bonusStat = fusionElement.querySelector('#bonusStat');

    //if fusion has more than 1 bonus stat display both with spacing, else display one

    //giant block of if else statements to work down if fusions have element, brain, and 4-1 bonus stats
    //and if those stats require being made elemental or not
    if(element.eleDmg != undefined && (
        element.bonus1 == 'Dmg' || element.bonus2 == 'Dmg' ||
        element.bonus3 == 'Dmg' || element.bonus4 == 'Dmg' ||
        element.bonus1 == 'Resistance' || element.bonus2 == 'Resistance' ||
        element.bonus3 == 'Resistance' || element.bonus4 == 'Resistance')){
        if(element.brain != undefined){
            if(element.perc4 != undefined){
                if( element.bonus4 == 'Dmg' || element.bonus4 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.eleDmg + element.bonus4 +  ', ' + element.brain;
                }else if(element.bonus3 == 'Dmg' || element.bonus3 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.eleDmg + element.bonus3 + ', ' + element.perc4 + element.bonus4  + ', ' + element.brain;
                } else if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4  + ', ' + element.brain;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4  + ', ' + element.brain;
                }
            } else if(element.perc3 != undefined){
                if(element.bonus3 == 'Dmg' || element.bonus3 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.eleDmg + element.bonus3 + ', ' + element.brain;
                } else if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.brain;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.brain;
                }
            } else if(element.perc2 != undefined){
                if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2 + ', ' + element.brain;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.brain;
                }
            } else{
                bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.brain;
            }
        } else {
            if(element.perc4 != undefined){
                if( element.bonus4 == 'Dmg' || element.bonus4 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.eleDmg + element.bonus4;
                }else if(element.bonus3 == 'Dmg' || element.bonus3 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.eleDmg + element.bonus3 + ', ' + element.perc4 + element.bonus4;
                } else if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4;
                }
            } else if(element.perc3 != undefined){
                if(element.bonus3 == 'Dmg' || element.bonus3 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.eleDmg + element.bonus3;
                } else if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2 + ', ' + element.perc3 + element.bonus3;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3;
                }
            } else if(element.perc2 != undefined){
                if(element.bonus2 == 'Dmg' || element.bonus2 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.eleDmg + element.bonus2;
                } else if(element.bonus1 == 'Dmg' || element.bonus1 == 'Resistance'){
                    bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1 + ', ' + element.perc2 + element.bonus2;
                }
            } else{
                bonusStat.textContent = element.perc1 + element.eleDmg + element.bonus1;
            }
        }
    } else if(element.brain != undefined){
        if(element.perc4 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4  + ', ' + element.brain;
        } else if(element.perc3 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.brain;
        } else if(element.perc2 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.brain;
        } else{
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.brain;
        }
    } else {
        if(element.perc4 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3 + ', ' + element.perc4 + element.bonus4;
        } else if(element.perc3 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2 + ', ' + element.perc3 + element.bonus3;
        } else if(element.perc2 != undefined){
            bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2;
        } else{
            bonusStat.textContent = element.perc1 + element.bonus1;
        }
    }

    const hpValue = fusionElement.querySelector('#hpValue');
    hpValue.textContent = element.hp;

    const target1 = fusionElement.querySelector('#target1');
    if(element.eleDmg == undefined){
        target1.textContent = element.tar1;
    } else if(element.tar1.toLowerCase().includes('heal') || element.tar1.toLowerCase().includes('shield')){
        target1.textContent = element.tar1;
    } else{
        target1.textContent = element.eleDmg + element.tar1.toLowerCase();
    };

    const target2 = fusionElement.querySelector('#target2');
    if(element.tar2 != undefined){
        if(element.eleDmg == undefined){
            target2.textContent = element.tar2;
        } else if(element.tar2.toLowerCase().includes('heal') || element.tar2.toLowerCase().includes('shield')){
            target2.textContent = element.tar2;
        } else{
            target2.textContent = element.eleDmg + element.tar2.toLowerCase();
        }
    } else{
        target2.textContent = element.tar3;
    };

    const target3 = fusionElement.querySelector('#target3');
    if(element.tar3 != undefined){
        if(element.eleDmg == undefined){
            target3.textContent = element.tar3;
        } else if(element.tar3.toLowerCase().includes('heal') || element.tar3.toLowerCase().includes('shield')){
            target3.textContent = element.tar3;
        } else{
            target3.textContent = element.eleDmg + element.tar3.toLowerCase();
        }
    } else{
        target3.textContent = element.tar3;
    };

    const target4 = fusionElement.querySelector('#target4');
    if(element.tar4 != undefined){
        if(element.eleDmg == undefined){
            target4.textContent = element.tar4;
        } else if(element.tar4.toLowerCase().includes('heal') || element.tar4.toLowerCase().includes('shield')){
            target4.textContent = element.tar4;
        } else{
            target4.textContent = element.eleDmg + element.tar4.toLowerCase();
        }
    }else{
        target4.textContent = element.tar4;
    };

    const target5 = fusionElement.querySelector('#target5');
    if(element.tar5 != undefined){
        if(element.eleDmg == undefined){
            target5.textContent = element.tar5;
        } else if(element.tar5.toLowerCase().includes('heal') || element.tar5.toLowerCase().includes('shield')){
            target5.textContent = element.tar5;
        } else{
            target5.textContent = element.eleDmg + element.tar5.toLowerCase();
        }
    }else{
        target5.textContent = element.tar5;
    };

    const target6 = fusionElement.querySelector('#target6');
    if(element.tar6 != undefined){
        if(element.eleDmg == undefined){
            target6.textContent = element.tar6;
        } else if(element.tar6.toLowerCase().includes('heal') || element.tar6.toLowerCase().includes('shield')){
            target6.textContent = element.tar6;
        } else{
            target6.textContent = element.eleDmg + element.tar6.toLowerCase();
        }
    }else{
        target6.textContent = element.tar6;
    };

    const fusionFams = fusionElement.querySelector('#fusionFams');
    fusionFams.textContent = element.fusedFams;

    const agiValue = fusionElement.querySelector('#agiValue');
    agiValue.textContent = element.agi;

    const damage1 = fusionElement.querySelector('#damage1');
    damage1.textContent = element.dam1;

    const damage2 = fusionElement.querySelector('#damage2');
    damage2.textContent = element.dam2;

    const damage3 = fusionElement.querySelector('#damage3');
    damage3.textContent = element.dam3;

    const damage4 = fusionElement.querySelector('#damage4');
    damage4.textContent = element.dam4;

    const damage5 = fusionElement.querySelector('#damage5');
    damage5.textContent = element.dam5;

    const damage6 = fusionElement.querySelector('#damage6');
    damage6.textContent = element.dam6;

    //adds template as child into html under #fusions id
    fusionTable.appendChild(fusionElement);
};

    //checks whether search mode is in bonus stat or name and adjuts visibility as needed
function modeCheck(){
    if(searchMode.value == 'bonus'){
        searchBar.style.display = 'none';
        bonusBox.style.display = 'flex';
    } else {
        searchBar.style.display = 'flex';
        bonusBox.style.display = 'none';
    }
};

    //resets tabkle to display all familiars
function clearTable(){
    //sets current fusion table in array
    const fusionGroups = document.querySelectorAll('#fusionTable');
    
    //for each item in current talbe array
    fusionGroups.forEach(element => {
        //remove the item
        fusionTable.removeChild(element);
    });
    
    //run through and gen all fusions
    fusions.forEach(element => {
        genFusions(element);
    });
};

function clearChecks(){
    if(searchBar.value != '' || bonusBar.value != ''){
        clearTable();
    }
    filterCheck.forEach(element => {
        element.checked = false;
    });
};

function removeNonAlphanum(arr){
    const al = arr.length;
    var tf = true;

    for (let i = 0; i <= al-1; i++) {
        const e1 = arr[i];

        e1 != alphanum.some(function check(e1){
            if(e1 == arr[i]){
                return tf = true;
            }else{
                return tf = false;
            }
        })

        if(tf == false){
            arr.splice(i, 1);
        }
    }
    
    if(arr[arr.length-1] == '*'){
        arr.pop();
    }
};

    //pulls name or bonus stat info from #search, then looks for
    //#searchbar info in column depending on #search setting, clear tables and
    //update with only familiars that match
function search(){
    if(commonSelector.checked || 
        rareSelector.checked || 
        epicSelector.checked || 
        legendarySelector.checked || 
        mythicSelector.checked){
        filterCheck.forEach(element => {
            if(element.checked == true){
                rarityFilter.push(element.value);
            }
        });
        raritySearch = true;
    }
    //if there is a value entered in searchbar
    if(searchBar.value != '' || bonusSearch.value != ''){
        // console.log(searchBar.value)
        // console.log(bonusSearch.value)
        // console.log(bonusSearch)
        // console.log(searchBar)
        //if mode selector is bonus
        if(searchMode.value == 'bonus'){
            //check each fusion
            bLower = bonusSearch.value.toLowerCase();
            fusions.forEach(element => {
                //load bonus1 and bonus2 to b1/b2 variable
                if(element.bonus4 != undefined){
                    const b1 = element.bonus1.toLowerCase();
                    const b2 = element.bonus2.toLowerCase();
                    const b3 = element.bonus3.toLowerCase();
                    const b4 = element.bonus4.toLowerCase();

                    if(bonuses.includes(b1) != true){
                        console.log(element.name + ': ' + b1);
                    };
                    if(bonuses.includes(b2) != true){
                        console.log(element.name + ': ' + b2);
                    };
                    if(bonuses.includes(b3) != true){
                        console.log(element.name + ': ' + b3);
                    };
                    if(bonuses.includes(b4) != true){
                        console.log(element.name + ': ' + b4);
                    };

                    if(raritySearch == false){
                        //if the searchbar is equal to either bonusstat
                            if(bLower == b1 || bLower == b2 || bLower == b3 || bLower == b4){
                                //push fusion to gen array
                                filteredFusions.push(element);
                            }
                        }else{
                            rarityFilter.forEach(rarity => {
                                if(element.rarity == rarity && (bLower == b1 || bLower == b2 || bLower == b3 || bLower == b4)){
                                    filteredFusions.push(element);
                                }
                            });
                        }
                } else if(element.bonus3 != undefined){
                    const b1 = element.bonus1.toLowerCase();
                    const b2 = element.bonus2.toLowerCase();
                    const b3 = element.bonus3.toLowerCase();

                    if(bonuses.includes(b1) != true){
                        console.log(element.name + ': ' + b1);
                    };
                    if(bonuses.includes(b2) != true){
                        console.log(element.name + ': ' + b2);
                    };
                    if(bonuses.includes(b3) != true){
                        console.log(element.name + ': ' + b3);
                    };

                    if(raritySearch == false){
                        //if the searchbar is equal to either bonusstat
                            if(bLower == b1 || bLower == b2 || bLower == b3){
                                //push fusion to gen array
                                filteredFusions.push(element);
                            }
                        }else{
                            rarityFilter.forEach(rarity => {
                                if(element.rarity == rarity && (bLower == b1 || bLower == b2 || bLower == b3)){
                                    filteredFusions.push(element);
                                }
                            });
                        }
                } else if(element.bonus2 != undefined){
                    const b1 = element.bonus1.toLowerCase();
                    const b2 = element.bonus2.toLowerCase();

                    if(bonuses.includes(b1) != true){
                        console.log(element.name + ': ' + b1);
                    };
                    if(bonuses.includes(b2) != true){
                        console.log(element.name + ': ' + b2);
                    };

                    if(raritySearch == false){
                        //if the searchbar is equal to either bonusstat
                            if(bLower == b1 || bLower == b2){
                                //push fusion to gen array
                                filteredFusions.push(element);
                            }
                        }else{
                            rarityFilter.forEach(rarity => {
                                if(element.rarity == rarity && (bLower == b1 || bLower == b2)){
                                    filteredFusions.push(element);
                                }
                            });
                        }
                } else {
                const b1 = element.bonus1.toLowerCase();

                if(bonuses.includes(b1) != true){
                    console.log(element.name + ': ' + b1);
                };

                if(raritySearch == false){
                    //if the searchbar is equal to either bonusstat
                        if(bLower == b1){
                            //push fusion to gen array
                            filteredFusions.push(element);
                        }
                    }else{
                        rarityFilter.forEach(rarity => {
                            if(element.rarity == rarity && bLower == b1){
                                filteredFusions.push(element);
                            }
                        });
                    }
                }
            });
        }

        if(searchMode.value == 'name'){
            //breaks searchbar value into array
            var v = searchBar.value.toLowerCase().split('');
            var iv = v;

            iv = iv.filter(function(str) {
                return /\S/.test(str);
            });

            removeNonAlphanum(iv);

            //for each fusion
            fusions.forEach(element => {
                //breaks element name into array
                var n = element.name.toLowerCase().split('');

                n = n.filter(function(str) {
                    return /\S/.test(str);
                });

                removeNonAlphanum(n);

                //while variable is less than name length
                if(n.length == iv.length){
                    //set counter variable
                    let i = 0;
                    //run checks against counter time
                    while (i < n.length) {
                        //if array cells match
                        if(n[i] == iv[i]){
                            //increase array count
                            i++;
                        }else{
                        //if array items don't match, end loop
                        return;
                        }
                    }
                    if(raritySearch == false){
                        //if loop completes, all cells match, push fusion to gen array
                        filteredFusions.push(element);
                    }else if(raritySearch == true){
                        rarityFilter.forEach(rarity => {
                            if(element.rarity == rarity){
                                filteredFusions.push(element);
                            }else{
                                return;
                            }
                        });
                    }
                }else if(v.includes('*')){
                    //wildcard search prior to text to search for partial names

                    //if asterisk is at the beginning of query
                    if(v[0] == '*'){
                        let j = 0;

                        //run through element.name array
                        for (let i = 0; i < n.length; i++) {
                            //if j is less than query length -1
                            if(j != iv.length-1){
                                //check if fusion name item is equal to query item j
                                if(n[i] != iv[j]){
                                    //if not, reset j to 0
                                    j = 0;
                                } else {
                                    //if so, increment j
                                    j++
                                }
                            //once j is equal to query length -1 and i is equal to element.name length -1
                            } else if(j == iv.length-1 && i == n.length-1 && n[i] == iv[j]){
                                    //check if fusion name item equals query item j
                                        //if so, push fusion to gen array and reset j
                                        if(raritySearch == false){
                                        filteredFusions.push(element);
                                        j=0;
                                        return;
                                        }else if(raritySearch == true){
                                            rarityFilter.forEach(rarity => {
                                                if(element.rarity == rarity){
                                                    filteredFusions.push(element);
                                                    j=0;
                                                    return;
                                                }else{
                                                    j=0;
                                                    return;
                                                }
                                            });
                                        }
                            }else{
                                //if not at the end of the name, reset j
                                j = 0;
                            }
                        }
                    }  else if(v[v.length-1] == '*'){
                        //wildcard search after text to search for partial names

                        //run through query prior to asterisk
                        for (let i = 0; i < iv.length; i++) {
                            //if query item does not equal fusion name item
                            if(iv[i] != n[i]){
                                //end loop
                                return;
                            //else if query item equals fusion name item and i equals length -2
                            }else if(iv[i] == n[i] && i == iv.length-1) {
                                if(raritySearch == false){
                                //push fusion to gen array
                                filteredFusions.push(element);
                                }else{
                                    rarityFilter.forEach(rarity => {
                                        if(element.rarity == rarity){
                                            filteredFusions.push(element);
                                        }else{
                                            return;
                                        }
                                    });
                                }
                            }
                        }
                    }
                    }
                else{
                    return;
                }
                
            });
        }
    } else if(raritySearch == true){
            fusions.forEach(element => {
            rarityFilter.forEach(rarity => {
                if(element.rarity == rarity){
                    filteredFusions.push(element);
                }
            })
        })
    };
    
    //creates array for total list to remove
    const fusionGroups = document.querySelectorAll('#fusionTable');
    
    //error checking if no familiars found
    if(filteredFusions.length == 0){
        alert('Search returned no result');
        rarityFilter = [];
        raritySearch = false;
    }else{
        //clears existing table
        fusionGroups.forEach(element => {
            fusionTable.removeChild(element);
        });

        //gens fusions based on filtered list
        filteredFusions.forEach(element => {
            genFusions(element);
        });
        
        //clear filteredFusions array
        let ff = filteredFusions.length;
        for (let i = 0; i < ff; i++) {
            filteredFusions.shift();
        };

        rarityFilter = [];
        raritySearch = false;
    }
};