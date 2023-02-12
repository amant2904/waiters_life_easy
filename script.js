// main api url
let api_url = "https://crudcrud.com/api/41e904649bc44d50bf41f8e6499fe730/orders"

// show data in UI
function showDataInUI(obj, id, t_no) {
    // create table row
    let t_row = document.createElement("tr");

    // create table data
    let td_1 = document.createElement("td");
    let td_2 = document.createElement("td");
    let td_3 = document.createElement("td");
    let td_4 = document.createElement("td");

    // put value in table data
    td_1.append(document.createTextNode(obj.price));
    td_2.append(document.createTextNode(obj.dish));

    // creating delete button
    let dlt_btn = document.createElement("button");
    dlt_btn.className = "btn btn-danger dlt_btn";
    dlt_btn.append(document.createTextNode("Delete"));

    // append dlt button in table data
    td_3.append(dlt_btn);

    // append order id in table data
    td_4.append(document.createTextNode(id));
    td_4.hidden = true;

    // append table data in table row
    t_row.append(td_1, td_2, td_3, td_4);

    // append table row in main table
    if (t_no == "t1") {
        document.getElementById("table_1").append(t_row);
    }
    else if (t_no == "t2") {
        document.getElementById("table_2").append(t_row);
    }
    else if (t_no == "t3") {
        document.getElementById("table_3").append(t_row);
    }
}

// showing all data in UI
window.addEventListener("DOMContentLoaded", (e) => {
    axios.get(api_url)
        .then(res => {
            // console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                showDataInUI(res.data[i], res.data[i]._id, res.data[i].table_no);
            }
        }).catch(err => console.log(err));
})

// submit button working
document.getElementById("submit_btn").addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        price: document.getElementById("price").value,
        dish: document.getElementById("dish").value,
        table_no: document.getElementById("table_list").value
    }
    let options = {
        method: "post",
        data: obj
    }
    axios(api_url, options)
        .then(res => {
            showDataInUI(obj, res.data._id, res.data.table_no);
        })
        .catch(err => {
            console.log(err);
        })
})

// delete order
document.getElementById("table_row").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("dlt_btn") == true) {
        // console.log(e.target.parentElement.parentElement.children[3].textContent)
        axios.delete(api_url + "/" + e.target.parentElement.parentElement.children[3].textContent)
            .then(res => {
                e.target.parentElement.parentElement.remove();
            })
            .catch(err => console.log(err));
    }
})