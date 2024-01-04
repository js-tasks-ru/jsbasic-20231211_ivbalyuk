function highlight(table) {
  let statusNumber = 0;
  let genderNunber = 0;
  let ageNumber = 0;
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    switch (table.rows[0].cells[i].innerHTML) {
    case 'Status' : 
      statusNumber = i;
      break;
    case 'Gender' : 
      genderNunber = i;
      break;
    case 'Age' : 
      ageNumber = i;
      break;
    }
  }

  for (let row of table.rows) {
    let available = row.cells[statusNumber].dataset.available;
    if (available === "true") {
      row.classList.add("available");
    } else if (available === "false") {
      row.classList.add("unavailable");
    } else if (available === undefined) {
      row.hidden = true;
    }

    if (row.cells[genderNunber].innerHTML === "m") {
      row.classList.add("male");
    } else if (row.cells[genderNunber].innerHTML === "f") {
      row.classList.add("female");
    }

    if (row.cells[ageNumber].innerHTML < 18) {
      row.style.textDecoration = "line-through";
    }
  }
  return table;
}
