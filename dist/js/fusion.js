//damage/heal targets for individual attacks
const closest = 'Damage closest';
const target = 'Damage target';
const closest2 = 'Damage closest 2';
const furthest = 'Damage furthest 2';
const drainClose = 'Drain closest';
const drainAll = 'Drain all';
const weakest = 'Damage weakest';
const all = 'Damage all';
const healT = 'Heal target';
const healS = 'Spread heal';
//

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
// let commonFilter = false;
// let rareFilter = false;
// let epicFilter = false;
// let legendaryFilter = false;
// let mythicFilter = false;
let filterCheck = [commonSelector, rareSelector, epicSelector, legendarySelector, mythicSelector];
let rarityFilter = [];
let raritySearch = false;
const filteredFusions = [];

const alphanum = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//pulls all the relevant info, places in correct div, and pushes a child out to parent
function genFusions(element) {
    //imports template from fusion.html
    const fusionElement = document.importNode(fusionTemplate.content, true);

    //selects entire fusion group info and updates color based on fusion rarity
    const fusionGroup = fusionElement.querySelector('#fusionTable');
    if (element.rarity == 'common') {
        fusionGroup.style.backgroundColor = '#9CE5B6';
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
    if(element.perc2 == ''){
        bonusStat.textContent = element.perc1 + element.bonus1;
    } else if(element.perc2 != ''){
        bonusStat.textContent = element.perc1 + element.bonus1 + ', ' + element.perc2 + element.bonus2;
    };

    const hpValue = fusionElement.querySelector('#hpValue');
    hpValue.textContent = element.hp;

    const target1 = fusionElement.querySelector('#target1');
    target1.textContent = element.tar1;

    const target2 = fusionElement.querySelector('#target2');
    target2.textContent = element.tar2;

    const target3 = fusionElement.querySelector('#target3');
    target3.textContent = element.tar3;

    const target4 = fusionElement.querySelector('#target4');
    target4.textContent = element.tar4;

    const target5 = fusionElement.querySelector('#target5');
    target5.textContent = element.tar5;

    const target6 = fusionElement.querySelector('#target6');
    target6.textContent = element.tar6;

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

function clearChecks(){
    filterCheck.forEach(element => {
        element.checked = false;
    });
}

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
    if(searchBar.value != '' || bonusBar != ''){
        //if mode selector is bonus
        if(searchMode.value == 'bonus'){
            //check each fusion
            bLower = bonusSearch.value.toLowerCase();
            fusions.forEach(element => {
                //load bonus1 and bonus2 to b1/b2 variable
                const b1 = element.bonus1.toLowerCase();
                const b2 = element.bonus2.toLowerCase();

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

//full list of fusions
const fusions = [
    //------------- COMMONS DUNGEON -------------//
    {
        image: 'url("dist/imgs/prof-gak.png")',
        name: 'Prof. Gak',
        perc1: '7.5% ',
        bonus1: 'Health',
        perc2: '',
        bonus2: '',
        fusedFams: 'Gak + Prof. Oak',
        atk: '20.6%',
        hp: '29.3%',
        agi: '15.1%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Slime Cut (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z2D2, Z1D2',
    },
    {
        image: 'url("dist/imgs/booty.png")',
        name: 'Booty',
        perc1: '7.5% ',
        bonus1: 'Life Steal',
        perc2: '',
        bonus2: '',
        fusedFams: 'BooBoo + Batty',
        atk: '26%',
        hp: '17.3%',
        agi: '21.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Feast (2 SP)',
        tar2: drainClose,
        dam2: '80-120%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z1D1, Z1D1',
    },
    {
        image: 'url("dist/imgs/narchie.png")',
        name: 'Narchie',
        perc1: '7.5% ',
        bonus1: 'Speed',
        perc2: '',
        bonus2: '',
        fusedFams: 'Archie + Naginee',
        atk: '18.4%',
        hp: '18.4%',
        agi: '28.2%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Venom Shot (2 SP)',
        tar2: target,
        dam2: '144-216%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z2D3, Z3D1',
    },
    {
        image: 'url("dist/imgs/jugg.png")',
        name: 'Jugg',
        perc1: '15% ',
        bonus1: 'Crit Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Sugg + Juice',
        atk: '27.1%',
        hp: '29.3%',
        agi: '8.6%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Impale (2 SP)',
        tar2: closest2,
        dam2: '104-156%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z2D2, Z3D3',
    },
    {
        image: 'url("dist/imgs/krives.png")',
        name: 'Krives',
        perc1: '7.5% ',
        bonus1: 'Damage',
        perc2: '',
        bonus2: '',
        fusedFams: 'Krusty + Ives',
        atk: '19.5%',
        hp: '21.7%',
        agi: '23.8%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Straight Shot (3 SP)',
        tar2: furthest,
        dam2: '183.4-340.6%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z1D3, Z3D1',
    },
    {
        image: 'url("dist/imgs/naukmo.png")',
        name: 'Naukmo',
        perc1: '7.5% ',
        bonus1: 'Evade Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Baumo + Nock',
        atk: '17.3%',
        hp: '33.6%',
        agi: '14.1%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: "Let 'em Loose (2 SP)",
        tar2: all,
        dam2: '56-104%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z2D1, Z3D3',
    },
    {
        image: 'url("dist/imgs/esskelegro.png")',
        name: "Es'Skelegro",
        perc1: '7.5% ',
        bonus1: 'Damage Enrage',
        perc2: '',
        bonus2: '',
        fusedFams: "Es'Skeleto + 2 Jumbo Syrum",
        atk: '19.5%',
        hp: '26%',
        agi: '19.5%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Bone Smack (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z1D3',
    },
    {
        image: 'url("dist/imgs/grolum.png")',
        name: 'Grolum',
        perc1: '15% ',
        bonus1: 'Crit Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Golum + 2 Jumbo Syrum',
        atk: '21.7%',
        hp: '10.8%',
        agi: '32.5%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Leap Attack (2 SP)',
        tar2: target,
        dam2: '144-216%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z4D3',
    },
    {
        image: 'url("dist/imgs/zammy.png")',
        name: 'Zammy',
        perc1: '7.5% ',
        bonus1: 'Speed',
        perc2: '',
        bonus2: '',
        fusedFams: 'Sammy + 2 Mini Syrum',
        atk: '24.9%',
        hp: '19.5%',
        agi: '20.6%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Venom Spit (1 SP)',
        tar2: furthest,
        dam2: '109.9-204.1%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z4D2',
    },
    {
        image: 'url("dist/imgs/saerugg.png")',
        name: 'Saerugg',
        perc1: '15% ',
        bonus1: 'Block Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Saerebrum + Uggs',
        atk: '23.8%',
        hp: '30.3%',
        agi: '10.9%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Double Time (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z4D2, Z4D1',
    },
    {
        image: 'url("dist/imgs/asst-oak.png")',
        name: 'Asst. Oak',
        perc1: '4.5% ',
        bonus1: 'Deflect Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Prof. Oak + 2 Mini Syrum',
        atk: '20.6%',
        hp: '29.3%',
        agi: '15.1%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Paper Cut (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z1D2',
    },
    {
        image: 'url("dist/imgs/immyt.png")',
        name: 'Immyt',
        perc1: '7.5% ',
        bonus1: 'Evade Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Emmyt + 2 Mini Syrum',
        atk: '21.7%',
        hp: '29.3%',
        agi: '14%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Impale (1 SP)',
        tar2: target,
        dam2: '94.5-175.5%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z5D1',
    },
    {
        image: 'url("dist/imgs/bummih.png")',
        name: 'Bummih',
        perc1: '7.5% ',
        bonus1: 'Dual Strike',
        perc2: '',
        bonus2: '',
        fusedFams: 'Mummih + 2 Jumbo Syrum',
        atk: '20.6%',
        hp: '17.3%',
        agi: '27.1%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Horrify (1 SP)',
        tar2: all,
        dam2: '30-90%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z5D3',
    },
    {
        image: 'url("dist/imgs/vickoo.png")',
        name: 'Vickoo',
        perc1: '7.5% ',
        bonus1: 'Dual Strike',
        perc2: '',
        bonus2: '',
        fusedFams: 'BooBoo + Vicky',
        atk: '26%',
        hp: '17.3%',
        agi: '21.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Cleanse (2 SP)',
        tar2: healT,
        dam2: '88-132%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z1D1, Z7D1',
    },
    {
        image: 'url("dist/imgs/saerebrumark.png")',
        name: 'Saerebrumark',
        perc1: '7.5% ',
        bonus1: 'Evade Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Saerebrum + Samark',
        atk: '13.8%',
        hp: '32.5%',
        agi: '18.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Pummel (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z4D2, Z10D2',
    },
    {
        image: 'url("dist/imgs/gorce.png")',
        name: 'Gorce',
        perc1: '7.5% ',
        bonus1: 'Damage',
        perc2: '',
        bonus2: '',
        fusedFams: 'Golum + Chilro',
        atk: '40%',
        hp: '16.3%',
        agi: '8.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Leap Attack (2 SP)',
        tar2: target,
        dam2: '144-216%',
        rarity: 'common',
        source: 'dungeon',
        specSource: 'Z4D3, Z10D3',
    },

    //------------- RARE DUNGEON -------------//
    {
        image: 'url("dist/imgs/bubbo.png")',
        name: 'Bubbo',
        perc1: '15% ',
        bonus1: 'Life Steal',
        perc2: '',
        bonus2: '',
        fusedFams: 'Tubbo + Batty',
        atk: '20%',
        hp: '37.5%',
        agi: '17.5%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Reaping (2 SP)',
        tar2: drainAll,
        dam2: '28-52%',
        atk3: 'Isolate (3 SP)',
        tar3: furthest,
        dam3: '157.2-366.8%',
        rarity: 'rare',
        source: 'dungeon',
        specSource: 'Z1D1',
    },

    //------------- EPIC DUNGEON -------------//
    {
        image: 'url("dist/imgs/pengz.png")',
        name: 'Pengz',
        perc1: '22.5% ',
        bonus1: 'Speed',
        perc2: '',
        bonus2: '',
        fusedFams: 'Pengey + Grimz',
        atk: '25.5%',
        hp: '24.1%',
        agi: '35.4%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Death Touch (1 SP)',
        tar2: drainClose,
        dam2: '52.5-97.5%',
        atk3: 'Cold Heal (2 SP)',
        tar3: healT,
        dam3: '88-132%',
        atk4: 'Scythe Swipe (3 SP)',
        tar4: all,
        dam4: '60-140%',
        rarity: 'epic',
        source: 'dungeon',
        specSource: 'Z2D1, Z1D1',
    },

    //------------- LEGENDARY DUNGEON -------------//
    {
        image: 'url("dist/imgs/robby.png")',
        name: 'Robby',
        perc1: '60% ',
        bonus1: 'Crit Chance',
        perc2: '',
        bonus2: '',
        fusedFams: 'Gobby + 5 Robot Sprocket',
        atk: '37%',
        hp: '26.3%',
        agi: '31.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Terra Punch (1 SP)',
        tar2: closest,
        dam2: '137.6-206.4%',
        atk3: 'Shockwave (1 SP)',
        tar3: all,
        dam3: '48-72%',
        atk4: 'Recharge (2 SP)',
        tar4: healS,
        dam4: '96-144%',
        atk5: 'Rocket Punch (2 SP)',
        tar5: target,
        dam5: '144-216%',
        rarity: 'legendary',
        source: 'dungeon',
        specSource: 'Any zone any dungeon',
    },

    //------------- MYTHIC DUNGEON -------------//
    {
        image: 'url("dist/imgs/rombolio.png")',
        name: 'Rombolio',
        perc1: '30% ',
        bonus1: 'Evade Chance',
        perc2: '15% ',
        bonus2: 'Redirect Chance',
        fusedFams: 'Bobodom + Olxaroth + Capt. Wombomz',
        atk: '31.7%',
        hp: '41.7%',
        agi: '26.6%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Slam (1 SP)',
        tar2: closest,
        dam2: '103.2-240.8%',
        atk3: 'Chomp (1 SP)',
        tar3: weakest,
        dam3: '85.2-198.8%',
        atk4: 'Feast (1 SP)',
        tar4: drainClose,
        dam4: '45-105%',
        atk5: 'Inspire (2 SP)',
        tar5: 'Spread heal',
        dam5: '72-168%',
        atk6: 'Gnaw (2 SP)',
        tar6: target,
        dam6: '108-252%',
        rarity: 'mythic',
        source: 'dungeon',
    },
];

//onLoad gens all fusions and adjusts forms based on modeselector
modeCheck();
clearTable();