const closest = 'Damage closest';
const target = 'Damage target';
const closest2 = 'Damage closest 2';
const furthest = 'Damage furthest 2';
const drainclose = 'Drain closest';

const fusionTemplate = document.querySelector('#fusionTemplate').content;
console.log(fusionTemplate);
const fusionTable = document.querySelector('#fusions');

const fusions = [
    {   name: 'Prof. Gak',
        bonus: '7.5% Health',
        fusedFams: 'Gak + Prof. Oak',
        atk: '20.6%',
        hp: '29.3%',
        spd: '15.1%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Slime Cut (2 SP)',
        tar2: closest,
        dam2: '183.2-274.8%',
    },
    {   name: 'Booty',
        bonus: '7.5% Life Steal',
        fusedFams: 'BooBoo + Batty',
        atk: '26%',
        hp: '17.3%',
        spd: '21.7%',
        atk1: 'Attack (0 SP)',
        tar1: closest,
        dam1: '90-110%',
        atk2: 'Feast (2 SP)',
        tar2: drainclose,
        dam2: '80-120%',
    },
];

function genFusions(element) {
    const fusionElement = document.importNode(fusionTemplate, true);
    const fusionImage = document.querySelector('#fusionImage');
    const fusionName = document.getElementsByClassName('#fusionName');
    // const atkImage = document.querySelector('#atkImage');
    const atkImage = document.querySelector('#atkImage');
    const skill1 = document.querySelector('#skill1');
    const skill2 = document.querySelector('#skill2');
    const skill3 = document.querySelector('#skill3');
    const skill4 = document.querySelector('#skill4');
    const skill5 = document.querySelector('#skill5');
    const skill6 = document.querySelector('#skill6');
    const bonusStat = document.querySelector('#bonusStat');
    // const hpImage = document.querySelector('#hpImage');
    const hpValue = document.querySelector('#hpValue');
    const target1 = document.querySelector('#target1');
    const target2 = document.querySelector('#target2');
    const target3 = document.querySelector('#target3');
    const target4 = document.querySelector('#target4');
    const target5 = document.querySelector('#target5');
    const target6 = document.querySelector('#target6');
    const fusionFams = document.querySelector('#fusionFams');
    // const agiImage = document.querySelector('#agiImage');
    const agiValue = document.querySelector('#agiValue');
    const damage1 = document.querySelector('#damage1');
    const damage2 = document.querySelector('#damage2');
    const damage3 = document.querySelector('#damage3');
    const damage4 = document.querySelector('#damage4');
    const damage5 = document.querySelector('#damage5');
    const damage6 = document.querySelector('#damage6');

    // fusions.forEach(element => {
        fusionName.append(document.createElement('div'));
        console.log(fusionName);
        console.log(fusionElement);
        fusionTable.appendChild(fusionElement);
    // });
}

fusions.forEach(element => {
    genFusions(element);
});