let siteNameInputs
let siteUrlInputs
let bookMarksArray = []
bookMarksArray = JSON.parse(localStorage.getItem('bookMarks'))

function save() {
    siteNameInputs = document.getElementById('siteName').value
    siteUrlInputs = document.getElementById('siteUrl').value
    let isValidSiteName = nameIsValid()
    let isValidSiteURL = isValidURL()
    if (isValidSiteName && isValidSiteURL) {
        let bookMarkObject = {

            name: siteNameInputs,
            url: siteUrlInputs

        }

        bookMarksArray.push(bookMarkObject)

        localStorage.setItem('bookMarks', JSON.stringify(bookMarksArray))

        document.getElementById('siteName').value = ''
        document.getElementById('siteUrl').value = ''
        display()
    }

}



function display() {
    let bookMarksTable = JSON.parse(localStorage.getItem('bookMarks'))

    let dataTable = ''
    if (bookMarksTable.length == 0) {
        dataTable = ''
        document.getElementById('idTable').innerHTML = dataTable
    } else {
        for (let i = 0; i < bookMarksTable.length; i++) {

            dataTable += `
           <tr>
             <td class="text-center ">${i + 1}</td>
             <td class="text-center ">${bookMarksTable[i].name}</td>
              <td class="text-center ">
               <button class="btn btn-success"> <a href='${bookMarksTable[i].url}'target='_blank'>
               <i class="fa-solid fa-eye pe-2"></i>visit
               </a></button>
              </td>
                <td class="text-center ">
                <button class="btn btn-danger" onclick='deleteRow(${i})'> <i class="fa-solid fa-eye pe-2"></i>delete
               </a>
                 </button>
                </td>
           </tr>
            `
            document.getElementById('idTable').innerHTML = dataTable

        }
    }


}



function nameIsValid() {
    if (siteNameInputs.length < 3) {
        alert('Name must be at least 3 characters');
        return false;
    } else if (!(/^\S{3,}$/.test(siteNameInputs))) {
        alert('Name cannot contain whitespace');
        return false;
    } else {
        return true
    }


}


function isValidURL() {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(siteUrlInputs)) {
        return true
    } else {
        alert('Please Enter Valid URL');
        return false
    }
}


function deleteRow(index) {
    bookMarksArray.splice(index, 1)
    localStorage.setItem('bookMarks', JSON.stringify(bookMarksArray))
    display()
}


display()