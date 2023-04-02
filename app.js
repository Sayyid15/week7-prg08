function loadData() {
    Papa.parse("./data/swimming.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => prepareData(results.data)
    })
}



function prepareData(data) {
    const nn = ml5.neuralNetwork({task: 'regression', debug: true})

    data.sort(() => Math.random() > 0.5)
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // trainData.forEach(el => {
    //         console.log(el["fixed acidity"])
    // })

    // for (const row of trainData) {
    //         console.log(row["fixed acidity"])
    // }


    for (let row of trainData) {
        nn.addData({ eventName: row["Event Name"], swimTime: row["Swim time"], eventDescription: row["Event description"], teamName: row["Team Name"], gender: row["Gender"], athleteBirthDate: row["Athlete birth date "], city:row["City"], countryCode: row["Country Code"]  }, { athleteFullName: row["Athlete Full Name"] })
    }

    nn.normalizeData()
    nn.train({ epochs: 32 }, () => trainCompleted(nn))
}

function trainCompleted(nn) {
    let button = document.getElementById('button')
    button.addEventListener('click', (event) => saveModel(nn));
}

function saveModel(nn) {
    nn.save()
}

loadData()