const transactions = [
    {id: 0, description: 'Luz', amount: -50000, date: '25/10/2021'},
    {id: 1, description: 'Website', amount: 500000, date: '25/10/2021'},
    {id: 2, description: 'manutencao', amount: 300000, date: '25/10/2021'},
    {id: 3, description: 'Internet', amount: -20000, date: '25/10/2021'},
  ]

const Modal = {
    open(){
        const element = document.querySelector('.modal-overlay')
        element.classList.add('active') 
    },

    close(){
        const elementCancel = document.querySelector('.modal-overlay') 
        elementCancel.classList.remove('active')
    },
}

const Transaction = {
    all:transactions, //vai ser usado no local storage

    add(transactionParams6){
        Transaction.all.push(transactionParams6)

        app.reload()
    },

    removeData(index){
        Transaction.all.splice(index, 1)

        app.reload()
    },

    incomes(){
        let income = 0
        Transaction.all.forEach(transactionParams4 => {
            if(transactionParams4.amount > 0){
                income += transactionParams4.amount
            }
        })
        
        return income
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transactionParams5 => {
            if(transactionParams5.amount < 0) {
                expense += transactionParams5.amount;
            }
        })

        return expense
    },

    total(){
        return Transaction.incomes() + Transaction.expenses()
    },
}


const DOM = {
    transactionsContainer:  document.querySelector('#data-table tbody'),

    addTransaction(transactionParams, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactionParams, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transactionParams2){
        const cssClass = transactionParams2.amount > 0 ? 'income' : 'expense'

        const amountDinamic = Utils.formatCurrency(transactionParams2.amount)

        const html = `
            <td class="description">${transactionParams2.description}</td>
            <td class="${cssClass}">${amountDinamic}</td>
            <td class="date">${transactionParams2.date}</td>
            <td>
                <img 
                    onclick=
                    src="https://raw.githubusercontent.com/rocketseat-education/maratona-discover-01/9d0b7435ded694abeba1e932c1f9b3f263fecbff/assets/minus.svg" alt="">
            </td>
        `
        return html
    },

    updateBalance(){
        const incomeDisplay = document.getElementById('incomeDisplay')
        incomeDisplay.innerHTML = Utils.formatCurrency(Transaction.incomes())
    
        const expenseDisplay = document.getElementById('expenseDisplay')
        expenseDisplay.innerHTML = Utils.formatCurrency(Transaction.expenses())
    
        const totalDisplay = document.getElementById('totalDisplay')  
        totalDisplay.innerHTML = Utils.formatCurrency(Transaction.total())
      },

      clearTransaction(){
          DOM.transactionsContainer.innerHTML = '' 
      }
}

const Utils = {
    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) * 100
        
        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
      // console.log(value)
      const signal = Number(value) < 0 ? "-" : ""
  
      value = String(value).replace(/\D/g, "")
  
      value = Number(value) / 100
  
      value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
  
      return signal + value
    },
  }

const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: form.description.value,
            amount: form.amount.value,
            date: form.date.value,
        }
    },

    validateFields(){
        const { description, amount, date } = form.getValues()
        
        if( description.trim() === "" || amount.trim() === "" || date.trim() === "" ){
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues(){
        let {description, amount, date} = form.getValues()

        amount = Utils.formatAmout(amount)

        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
    },

    clearFields() {
        form.description.value = ""
        form.amount.value = ""
        form.date.value = ""
    },

    submit(event){
        event.preventDefault()

        try{
            form.validateFields()

            const transaction = form.formatValues()

            Transaction.add(transaction)

            form.clearFields()
            
            Modal.close()
        }catch (error) {
            alert(error.message)
        }
    },
}

//atualiza as informações no front-end
const app  = {
    init(){
        Transaction.all.forEach(transactionParams3 => DOM.addTransaction(transactionParams3))

        DOM.updateBalance()
    },

    //atualiza a tela
    reload(){
        DOM.clearTransaction()

        app.init()
    }
}

app.init()

Transaction.add({
    id: 5, description: 'auto-center', amount: 60000, date: '16/11/2021'
})

Transaction.removeData(1)