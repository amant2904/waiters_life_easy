// main api url
let api_url = "https://crudcrud.com/api/425338674cdc4fb7b7110d774c1740ab/orders"

// show data in UI
function showDataInUI(obj) {
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
    td_4.append(document.createTextNode(obj._id));
    // td_4.hidden = true;

    // append table data in table row
    t_row.append(td_1, td_2, td_3, td_4);

    // append table row in main table
    if (obj.table_no == "t1") {
        document.getElementById("table_1").append(t_row);
    }
    else if (obj.table_no == "t2") {
        document.getElementById("table_2").append(t_row);
    }
    else if (obj.table_no == "t3") {
        document.getElementById("table_3").append(t_row);
    }
}



// --------------------------------------------------------------------------------------------------------
// without promise :-

// // showing all data in UI
// window.addEventListener("DOMContentLoaded", (e) => {
//     axios.get(api_url)
//         .then(res => {
//             // console.log(res);
//             for (let i = 0; i < res.data.length; i++) {
//                 showDataInUI(res.data[i]);
//             }
//         }).catch(err => console.log(err));
// })

// // submit button working
// document.getElementById("submit_btn").addEventListener("click", (e) => {
//     e.preventDefault();
//     let obj = {
//         price: document.getElementById("price").value,
//         dish: document.getElementById("dish").value,
//         table_no: document.getElementById("table_list").value
//     }
//     let options = {
//         method: "post",
//         data: obj
//     }
//     axios(api_url, options)
//         .then(res => {
//             showDataInUI(obj);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// // delete order
// document.getElementById("table_row").addEventListener("click", (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains("dlt_btn") == true) {
//         axios.delete(api_url + "/" + e.target.parentElement.parentElement.children[3].textContent)
//             .then(res => {
//                 e.target.parentElement.parentElement.remove();
//             })
//             .catch(err => console.log(err));
//     }
// })





// ---------------------------------------------------------------------------------------
// using Promises :-

// show all data in UI
// window.addEventListener("DOMContentLoaded", () => {
//     let api_getting = new Promise((resolve, reject) => {
//         axios.get(api_url).then((res) => {
//             resolve(res);
//         }).catch(err => {
//             reject(err);
//         })
//     })
//     api_getting.then((val) => {
//         // console.log(val);
//         for (let i = 0; i < val.data.length; i++) {
//             showDataInUI(val.data[i]);
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// })

// // submit button working
// document.getElementById("submit_btn").addEventListener("click", (e) => {
//     e.preventDefault();
//     let obj = {
//         price: document.getElementById("price").value,
//         dish: document.getElementById("dish").value,
//         table_no: document.getElementById("table_list").value
//     }

//     let submit = new Promise((resolve, reject) => {
//         let options = {
//             method: "post",
//             data: obj
//         }
//         axios(api_url, options)
//             .then(res => {
//                 resolve(res);
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })
//     submit.then(res => {
//         showDataInUI(obj);
//     }).catch(err => {
//         console.log(err);
//     })
// })

// // delete button working
// document.getElementById("table_row").addEventListener("click", (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains("dlt_btn") == true) {
//         let delete_promise = new Promise((resolve, reject) => {
//             axios.delete(api_url + "/" + e.target.parentElement.parentElement.children[3].textContent)
//                 .then(res => {
//                     resolve(res);
//                 })
//                 .catch(err => reject(err));
//         })
//         delete_promise.then(res => {
//             e.target.parentElement.parentElement.remove();
//         })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// })




// ---------------------------------------------------------------------------------------
// using Async-Await :- 

// show data in UI
window.addEventListener("DOMContentLoaded", async () => {
    try {
        let res = await axios.get(api_url);
        for (let i = 0; i < res.data.length; i++) {
            showDataInUI(res.data[i]);
        }
    }
    catch (err) {
        console.log("error found");
    }
})

// submit button working
document.getElementById("submit_btn").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        let obj = {
            price: document.getElementById("price").value,
            dish: document.getElementById("dish").value,
            table_no: document.getElementById("table_list").value
        }
        let options = {
            method: "post",
            data: obj
        }
        await axios(api_url, options);
        showDataInUI(obj);
    }
    catch (err) {
        console.log(err);
    }
})

// delete button working
document.getElementById("table_row").addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("dlt_btn") == true) {
        try {
            await axios.delete(api_url + "/" + e.target.parentElement.parentElement.children[3].textContent);
            e.target.parentElement.parentElement.remove();
        }
        catch (err) {
            console.log(err);
        }
    }
})