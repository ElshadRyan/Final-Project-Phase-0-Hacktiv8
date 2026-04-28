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
                    console.log(idToSearch);

                    tableCoordinates.setAttribute("style", "background-color: green")

                }
            }
        }
    }
}



let valueBody = [
 [123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]
,[123,123,123,421,421,32,512,123,42,5, 20]]

let snakePosition = [[0,0], [1,0], [2,0]]


appendingDiv("section1", "section1", "main")
let fps = 1000

// fetch("http://127.0.0.1:5500/Elshad_Code/gamplayWeb.html")
// window.location.reload()
function main(timestamp)
{
    
    // Stop after 2 seconds
    // setTimeout(() => {        
        
    //     let tableToRemove = document.getElementById("snake_table")
        
    //     if(tableToRemove)
    //     {
    //         tableToRemove.remove()
    //     }
        
    //     getCreatedTable("snake_table", "snake_table", "section1")
    //     creatingTableValue("snake_table", valueBody)
    //     valueBody[0][0]++


    //     requestAnimationFrame(main);
        
    //     positioningTheSnakes(valueBody, snakePosition, "snake_table")
    //     }, fps);
    
}

getCreatedTable("snake_table", "snake_table", "section1")
creatingTableValue("snake_table", valueBody)
positioningTheSnakes(snakePosition, valueBody)

requestAnimationFrame(main)



