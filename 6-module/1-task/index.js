export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("TABLE");
    this.tableHead = this.elem.createTHead("THEAD");
    this.tableBody = this.elem.createTBody();
    this.createTable();
    this.addEventListener();
  }

  createTable() {
    this.tableHead.insertAdjacentHTML(
      "beforeend",
      `<td>Имя</td>
      <td>Возраст</td>
      <td>Зарплата</td>
      <td>Город</td>
      <td></td>`
    );
    this.rows.forEach((row) => {
      this.tableBody.insertAdjacentHTML(
        "beforeend", 
        `<td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button class='close'>X</button></td>`
      );
    });
  }

  addEventListener() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.classList.contains('close')) {
        event.target.closest('tr').remove(); 
      }
    });
  }
}

