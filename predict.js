const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('', modelLoaded)

async function modelLoaded() {
    console.log("the model was loaded!")

}


let button = document.getElementById('predict')
button.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let eventName = document.getElementById('eventName').value;
    let swimTime = document.getElementById('swimTime').value;
    let eventDescription = document.getElementById('eventDescription').value;
    let teamName = document.getElementById('teamName').value;
    let gender = document.getElementById('gender').value;
    let athleteBirthDate = document.getElementById('athleteBirthDate').value;
    let city = document.getElementById('city').value;
    let countryCode = document.getElementById('countryCode').value;


    const result = await nn.predict({
        eventName: parseInt(eventName),
        swimTime: parseInt(swimTime),
        eventDescription: parseInt(eventDescription),
        teamName:parseInt(teamName),
        gender: parseInt(gender),
        athleteBirthDate: parseInt(athleteBirthDate),
        city: parseInt(city),
        countryCode: parseInt(countryCode)
    })
    console.log(result)

    let endResult = document.getElementById('result')
    endResult.innerHTML = `De zwemmer  is: ${result[0].quality}`;
}