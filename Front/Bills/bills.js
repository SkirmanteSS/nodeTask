const bill = document.querySelector("bill");
const billTable = document.querySelector("table");
const allBills = async () => {
    billTable.innerHTML = "";
    try { 
        const response = await 
        fetch(`http://localhost:5503/bills/${group_id}`, {
            method: 'GET',
            headers: {
                authorization:
                `Bearer ${sessionStorage.getItem("token")}`,
            }
        });
        const data = await response.json();

        if (data.length ===0) {
            console.log("There is no bill")
        }


} catch (error) {
    console.eror(error)
};    
allBills()
};

addBill.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const req = await 
        fetch(`http://localhost:5503/bills/${group_id}`, {
            method: "POST",
            headers: {
                authorization:
                `Bearer ${sessionStorage.getItem("token")}`,
            }
        });
        const data = await response.json();

        if (data.length ===0) {
            console.log("Please fill all info")
        }


} catch (error) {
    console.eror(error)
};    
addBill()
};
