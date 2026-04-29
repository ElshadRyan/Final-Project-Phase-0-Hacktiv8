
function appendingDiv(divId, divClass, IdToAppend)
{

    if(!IdToAppend)
    {
        return "id to append is required"
    }

    // console.log(IdToAppend);
    let appendedId = document.getElementById(IdToAppend)
    let div = document.createElement("div")
    if(divId)
    {
        div.setAttribute("id", divId)
    }
    if(divClass)
    {
        div.setAttribute("class", divClass)
    }

    appendedId.append(div)
}

function appendingSpan(pId, pClass, value, IdToAppend)
{
    if(!IdToAppend)
    {
        return "id to append is required"
    }
    let appendedId = document.getElementById(IdToAppend)
    let p = document.createElement("span")
    if(pId)
    {
        p.setAttribute("id", pId)
    }
    if(pClass)
    {
        p.setAttribute("class", pClass)
    }
    p.innerHTML = value
    appendedId.append(p)
}

function creatingTable(tableId, tableClass, IdToAppend)
{
    if(!IdToAppend)
    {
        return
    }

    let table = document.createElement("table")

    if(tableId)
    {
        table.setAttribute("id", tableId)
    }
    if(tableClass)
    {
        table.setAttribute("class", tableClass)
    }

    appendedId = document.getElementById(IdToAppend)
    appendedId.append(table)
}

function creatingTableValue(IdToAppend, valueForBody, valueForHead)
{

    if(!IdToAppend)
    {
        return "Id is required"
    }
    if(valueForBody.length === 0)
    {
        return "Gaada Row atau Col nya"
    }

    let appendedId = document.getElementById(IdToAppend)

    creatingTableBody(valueForBody, IdToAppend)


}

function creatingTableBody(value, tableElement)
{
    if(!value)
    {
        return "No Value, Cant Create Table"
    }

    let tableHeightRadius = Math.ceil(value[0]/2)
    let tableWidthRadius = Math.ceil(value[1]/2)

    let table = document.getElementById(tableElement)
    let bodyTable = document.createElement('tbody')

    for(let i = 0; i < value[0]; i++)
    {
        let rowTable =  document.createElement('tr');
        for(let j = 0; j < value[1]; j++)
        {
            let dataTable = document.createElement('td')
            let coordinateID = "" +  (i - tableHeightRadius) + "r"
            coordinateID +=  (j - tableWidthRadius) + "c"
            dataTable.setAttribute("id", coordinateID)
            dataTable.setAttribute("style", "background-color: black")
            dataTable.setAttribute("width", "15px")
            dataTable.setAttribute("height", "15px")
            dataTable.innerHTML = " "
            rowTable.append(dataTable)
        }
        bodyTable.append(rowTable)
    }

    table.append(bodyTable)
    
}

function positioningTheSnakes(snakePosition, currTable)
{
    let tableHeightRadius = Math.ceil(currTable[0]/2)
    let tableWidthRadius = Math.ceil(currTable[1]/2)

    for(let i = 0; i < currTable[0]; i++)
    {
        for(let j = 0; j < currTable[1]; j++)
        {
            for(let k = 0; k < snakePosition.length; k++)
            {
                
                if((i - tableHeightRadius) === snakePosition[k][0] && (j - tableWidthRadius) === snakePosition[k][1])
                {
                    let idToSearch = "" + (i - tableHeightRadius) + 'r'
                    idToSearch += (j - tableWidthRadius) + 'c'
                    let tableCoordinates = document.getElementById(idToSearch)
                    // console.log(idToSearch);

                    tableCoordinates.setAttribute("style", "background-color: green")

                }
            }
        }
    }
}

function playerInputToChangeSnakePosition(snakePosition)
{
    window.addEventListener("keydown", function (event)
    {
        if(event.key === "ArrowUp" || event.key === "w")  
        {
            
            if(positionSnakeToAdd[0] !== 1)
            {

                positionSnakeToAdd = [-1, 0]
            }
            // console.log("Naik");
            // console.log(snakePositionData);
        }
        else if(event.key === "ArrowDown" || event.key === "s")
        {
            if(positionSnakeToAdd[0] !== -1)
            {
                positionSnakeToAdd = [1, 0]
            }
            // console.log("Down");
        }
        else if(event.key === "ArrowLeft" || event.key === "a")
        {
            if(positionSnakeToAdd[1] !== 1)
            {
                positionSnakeToAdd = [0, -1]
            }
            // console.log("Left");
        }
        else if(event.key === "ArrowRight" || event.key === "d")
        {
            if(     positionSnakeToAdd[1] !== -1)
            {
                positionSnakeToAdd = [0, 1]
            }
            // console.log("Right");
        }
    })

}

function adding2MatrixOrPosition(snakePosition, positionToAdd)
{
    if(positionToAdd[0] === 0 && positionToAdd[1] === 0)
    {
        return null
    }

    let newPos = []
    let prevPos = []
    for(let i = 0; i < snakePosition.length; i++)
    {
        let newIndividualPos = []
        if(i === 0)
        {
            newIndividualPos.push(snakePosition[i][0] + positionToAdd[0])
            newIndividualPos.push(snakePosition[i][1] + positionToAdd[1])
            newPos.push(newIndividualPos)
            prevPos = snakePosition[i]
            continue
        }
                
        newPos.push(prevPos)
        prevPos = snakePosition[i]
    }
    
    return newPos

}

function creatingFood(row, col, snakePosition)
{
    let foodCoordinate = []
    const DIMENSION = 2
    let canPutFood = false

    tableHeightRadius = Math.ceil(row/2)    
    tableWidthRadius = Math.ceil(col/2)
    while(true)
    {
        let tempFoodCoordinate = []

        tempFoodCoordinate.push(Math.floor(Math.random()*row) - tableHeightRadius)
        tempFoodCoordinate.push(Math.floor(Math.random()*col) - tableWidthRadius)  
            
        // console.log(tempFoodCoordinate);
        for (let i = 0; i < snakePosition.length; i++) {
            if(tempFoodCoordinate[0] === snakePosition[i][0] && tempFoodCoordinate[1] === snakePosition[i][1])
            {
                // console.log("Masuk");
                canPutFood = false
                break
            }
            canPutFood = true
        }

        if(canPutFood)
        {
            foodCoordinate = tempFoodCoordinate
            break;
        }
    }        
    
    if(isEaten)
    {
        foodPosition = foodCoordinate
    }


    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // console.log(foodPosition);
            if((i - tableHeightRadius) === foodPosition[0] && (j - tableWidthRadius) === foodPosition[1])
                {
                    let idToSearch = "" + (i - tableHeightRadius) +'r'
                    idToSearch += (j - tableWidthRadius) +'c'
                    let tableCoordinates = document.getElementById(idToSearch)
                    // console.log(tableCoordinates);
                    isEaten = false
                    tableCoordinates.setAttribute("style", "background-color: red")

                }
        }        
    }

}

function detectingObstacles(snakePosition, foodCoordinate, row, col)
{
    let tableHeightRadius = Math.ceil(row/2)
    let tableWidthRadius = Math.ceil(col/2)

    

    let snakeRowPos = snakePosition[0][0]
    let snakeColPos = snakePosition[0][1]

    let snakePosRowIndex = snakeRowPos + tableHeightRadius
    let snakePosColIndex = snakeColPos + tableWidthRadius
    

    if(snakePosColIndex === col || snakePosRowIndex === row || snakePosColIndex < 0 || snakePosRowIndex < 0)
    {
        // console.log("lah kok mati");
        isPlaying = false
    }
    

    if(snakePosition[0][0] === foodCoordinate[0] && snakePosition[0][1] === foodCoordinate[1])
    {
        playerData.score++
        isEaten = true
        let snakeLastIndex = snakePosition.length-1
        snakePosition.push(snakePosition[snakeLastIndex])
        console.log(playerData.score);
    }

    for (let i = 1; i < snakePosition.length; i++) {
        if((snakePosition[i][0] === snakeRowPos && snakePosition[i][1] === snakeColPos))
        {
            console.log("lah kok mati");
            isPlaying = false
            break
        }
    }

}
    
//Update or Create
function pushingDataToLocalStorage(data)
{
    if(data.name.length === 0)
    {
        return
    }
    localStorage.setItem(`${data.name}`, JSON.stringify(data))
}

//Read
function readingDataFromLocalStorage()
{
    let allKeys = []
    let allValue = []

    for(let i = 0; i < localStorage.length; i++)
    {
        let currKey = localStorage.key(i)
        allKeys.push(currKey)
        allValue.push(JSON.parse(localStorage.getItem(currKey)))
    }

    return[allKeys, allValue]
}

//delete
function deleteDataFromLocalStorage(data)
{
    localStorage.removeItem(`${data.name}`)
}

function sortingData(keys, values)
{
    if(keys.length < 2)
    {
        return values
    }


    
    for(let i = 0; i < keys.length; i++)
    {
        let tempChar = ''
        let tempValue = {}
        for(let j = 0; j < keys.length; j++)
        {
            console.log(values[j]);
            console.log(j);

            if(values[j+1])
            {
                if(values[j].score < values[j+1].score)
                {
                    tempChar = keys[j]
                    keys[j] = keys[j+1]
                    keys[j+1] = tempChar

                    tempValue = values[j]
                    values[j] = values[j+1]
                    values[j+1] = tempValue
                }
            }
            
        }
    }

    return values
}

function leaderboard(divToAppendWithList)
{
    let allData = readingDataFromLocalStorage()
    console.log(allData);
    let dataSorted = sortingData(allData[0], allData[1])
    const TOP_10 = 10
    
    // console.log(dataSorted[0][0].name);
    let divToAppend = document.getElementById(divToAppendWithList)
    creatingTable("leaderboard", "leaderboard", "section2")

    let tableToAppend = document.getElementById("leaderboard")

    for(let i = 0; i < TOP_10; i++)
    {
        if(!dataSorted[i])
        {
            continue
        }
        let tableRow = document.createElement("tr")
        
        tableToAppend.append(tableRow)

        let tableDataNama = document.createElement("td")
        tableDataNama.innerHTML = dataSorted[i].name
        tableRow.append(tableDataNama)

        let tableDataScore = document.createElement("td")
        tableDataScore.innerHTML = dataSorted[i].score
        tableRow.append(tableDataScore)
    }

    for(let i = 0; i < TOP_10; i++)
    {
        if(!dataSorted[i])
        {
            continue
        }
        
    }


    // let unorderedList = document.createElement("ul")
    // unorderedList.setAttribute("id", "leaderboardList")
    // unorderedList.setAttribute("class", "leaderboardList")

    // let listAllScore = document.createElement("li")
    // listAllScore.setAttribute("id", "allScore")
    // listAllScore.setAttribute("class", "allScore")

    // let listAllName = document.createElement("li")
    // listAllName.setAttribute("id", "allName")
    // listAllName.setAttribute("class", "allName")

    // divToAppend.append(unorderedList)
    // unorderedList.append(listAllName)
    // unorderedList.append(listAllScore)

    // for(let i = 0; i < TOP_10; i++)
    // {
    //     if(!dataSorted[i])
    //     {
    //         continue
    //     }
    //     appendingSpan(undefined,undefined,dataSorted[i].name, "allName")
    //     appendingSpan(undefined,undefined,dataSorted[i].score, "allScore")
    // }
}

const playerChoice = {
    difficulties: {easy: {speed: 15, areaSize: [21, 21]}, medium: {speed: 30, areaSize: [25, 41]}, hard: {speed: 180, areaSize: [41,61]}}
}

let valueBody = []
let snakePositionData = [[0,0], [1,0], [2,0]]
let positionSnakeToAdd = [0,0]
let foodPosition = []
let speed = 1
let isEaten = true
let isPlaying = true

let playerData = {
    score: 0,
    name: '' 
}

appendingDiv("section1", "theGame", "main")
appendingDiv("section2", "leaderboard", "main")

// pushingDataToLocalStorage({name: "Elshad", score: 10})
// pushingDataToLocalStorage({name: "Bimo", score: 100})
// pushingDataToLocalStorage({name: "Apis", score: 50})
// pushingDataToLocalStorage({name: "Hafiz", score: 40})



// leaderboard("section2")



let fps = 1000/playerChoice.difficulties.medium.speed
// console.log(fps);
valueBody = playerChoice.difficulties.medium.areaSize
// console.log(valueBody);

// fetch("http://127.0.0.1:5500/Elshad_Code/gamplayWeb.html")
// window.location.reload()
function main(timestamp)
{
    
    // Stop after 2 seconds

    setTimeout(() => {        
        
        let tableToRemove = document.getElementById("snake_table")
        
        if(tableToRemove)
        {
            tableToRemove.remove()
        }

        creatingTable("snake_table", "snake_table", "section1")
        creatingTableValue("snake_table", valueBody)
        positioningTheSnakes(snakePositionData, valueBody)
        creatingFood(valueBody[0], valueBody[1], snakePositionData)
        
        if(isPlaying)
        {
            // console.log("Masuk");
            window.addEventListener("load", playerInputToChangeSnakePosition(snakePositionData))
            // console.log(positionSnakeToAdd);
            let tempSnakePositionData = adding2MatrixOrPosition(snakePositionData, positionSnakeToAdd)
            if(tempSnakePositionData !== null)
            {
                snakePositionData = tempSnakePositionData
            }
            detectingObstacles(snakePositionData, foodPosition, valueBody[0], valueBody[1])
        }
        else
        {
            pushingDataToLocalStorage(playerData)
        }

        requestAnimationFrame(main);
        }, fps);

}

// getCreatedTable("snake_table", "snake_table", "section1")
// creatingTableValue("snake_table", valueBody)
// positioningTheSnakes(snakePosition, valueBody)

requestAnimationFrame(main)



