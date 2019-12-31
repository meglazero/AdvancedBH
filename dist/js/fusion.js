const closest = 'Damage closest';
const target = 'Damage target';
const closest2 = 'Damage closest 2';
const furthest = 'Damage furthest 2';
const drainclose = 'Drain closest';

const fusionTemplate = document.querySelector('#fusionTemplate');
const fusionTable = document.querySelector('#fusions');

const fusions = [
    {
        image: "/dist/imgs/prof-gak.png",
        name: 'Prof. Gak',
        bonus: '7.5% Health',
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
    },
    {
        image: "/dist/imgs/booty.png",
        name: 'Booty',
        bonus: '7.5% Life Steal',
        fusedFams: 'BooBoo + Batty',
        atk: '26%',
        hp: '17.3%',
        agi: '21.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Feast (2 SP)',
        tar2: drainclose,
        dam2: '80-120%',
        rarity: 'common',
    },
];

function genFusions(element) {
    const fusionElement = document.importNode(fusionTemplate.content, true);
    const fusionImage = fusionElement.querySelector('#fusionImage');
    // fusionImage.textContent = "";
    fusionImage.style.backgroundImage = element.image;
    console.log(fusionImage);

    const fusionName = fusionElement.querySelector('#fusionName');
    fusionName.textContent = element.name;

    // const atkImage = document.querySelector('#atkImage');
    // target1.textContent = element.tar1;

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
    bonusStat.textContent = element.bonus;

    // const hpImage = document.querySelector('#hpImage');
    // target1.textContent = element.tar1;

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

    // const agiImage = document.querySelector('#agiImage');
    // target1.textContent = element.tar1;

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


    // fusions.forEach(element => {
    fusionTable.appendChild(fusionElement);
    // });
}

fusions.forEach(element => {
    genFusions(element);
});