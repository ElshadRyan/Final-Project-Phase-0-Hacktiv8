
function appendingDiv(divId, divClass, IdToAppend)
{

    if(!IdToAppend)
    {
        return "id to append is required"
    }

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

function getCreatedTable(tableId, tableClass, IdToAppend)
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

    let tableHeightRadius = Math.ceil(value.length/2)
    let tableWidthRadius = Math.ceil(value[0].length/2)

    let table = document.getElementById(tableElement)
    let bodyTable = document.createElement('tbody')

    value.forEach((element, indexCol) => {
        let rowTable =  document.createElement('tr');
        element.forEach((value, indexRow) => {
            let dataTable = document.createElement('td')
            let coordinateID = "" +  (indexCol - tableHeightRadius)
            coordinateID +=  (indexRow - tableWidthRadius ) 
            dataTable.setAttribute("id", coordinateID)
            dataTable.setAttribute("style", "background-color: black")
            dataTable.setAttribute("width", "10px")
            dataTable.setAttribute("height", "10px")
            dataTable.innerHTML = value
            rowTable.append(dataTable)
        });
        bodyTable.append(rowTable)
    });

    table.append(bodyTable)
    
}

function positioningTheSnakes(snakePosition, currTable)
{
    tableHeightRadius = Math.ceil(currTable.length/2)
    tableWidthRadius = Math.ceil(currTable[0].length/2)

    for(let i = 0; i < currTable.length; i++)
    {
        for(let j = 0; j < currTable[i].length; j++)
        {
            for(let k = 0; k < snakePosition.length; k++)
            {
                
                if((i - tableHeightRadius) === snakePosition[k][0] && (j - tableWidthRadius) === snakePosition[k][1])
                {
                    let idToSearch = "" + (i - tableHeightRadius)
                    idToSearch += (j - tableWidthRadius)
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
            
        console.log(tempFoodCoordinate);
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
    
    if(!isEaten)
    {
        foodPosition = foodCoordinate
    }


    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // console.log(foodPosition);
            if((i - tableHeightRadius) === foodPosition[0] && (j - tableWidthRadius) === foodPosition[1])
                {
                    let idToSearch = "" + (i - tableHeightRadius)
                    idToSearch += (j - tableWidthRadius)
                    let tableCoordinates = document.getElementById(idToSearch)
                    console.log(tableCoordinates);
                    isEaten = true
                    tableCoordinates.setAttribute("style", "background-color: red")

                }
        }        
    }

}

function detectingObstacles(snakePosition, foodCoordinate, row, col)
{
    tableHeightRadius = Math.ceil(row.length/2)
    tableWidthRadius = Math.ceil(col.length/2)
    for(let k = 0; k < snakePosition.length; k++)
    {
        if(row > (snakePosition[k][0] + tableHeightRadius) || col > (snakePosition[k][1] + tableWidthRadius))
        {
            isPlaying = false
        }
    }
}
    
let valueBody = [
 [" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
,[" "," "," "," "," "," "," "," "," "," "," "]
]

let snakePositionData = [[0,0], [1,0], [2,0]]
let positionSnakeToAdd = [0,0]
let foodPosition = []
let isEaten = false
let isPlaying = true

let playerOption = 
{
    name: '',
    difficulty: '',
    snakeColour: ''
}


appendingDiv("section1", "section1", "main")
let fps = 1000/10

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
        
        if(isPlaying)
        {
            getCreatedTable("snake_table", "snake_table", "section1")
            creatingTableValue("snake_table", valueBody)
            positioningTheSnakes(snakePositionData, valueBody)
            creatingFood(valueBody.length, valueBody[0].length, snakePositionData)
            window.addEventListener("load", playerInputToChangeSnakePosition(snakePositionData))
            let tempSnakePositionData = adding2MatrixOrPosition(snakePositionData, positionSnakeToAdd)
            if(tempSnakePositionData !== null)
            {
                snakePositionData = tempSnakePositionData
            }
            detectingObstacles(snakePositionData, foodPosition, valueBody.length, valueBody[0].length)
        }

        


        requestAnimationFrame(main);
        
        positioningTheSnakes(valueBody, snakePositionData, "snake_table")
        }, fps);
    
}

// getCreatedTable("snake_table", "snake_table", "section1")
// creatingTableValue("snake_table", valueBody)
// positioningTheSnakes(snakePosition, valueBody)

requestAnimationFrame(main)



