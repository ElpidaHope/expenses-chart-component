const bars = document.querySelector(".bars")

const date = new Date()
const dayOfWeek = date.toDateString().split(' ')[0].toLowerCase()

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    const totalAmount = data.reduce((prev,curr) => {
      return prev + curr.amount
    },acc=0)
    data.map(item => {
      const height = Math.floor((item.amount / totalAmount) * 100 * 6)
      element(item, height, dayOfWeek)
    })

    const eachBar = document.querySelectorAll('.each-bar')

    eachBar.forEach(bar => {
      bar.addEventListener("click", (e) => {
        bar.classList.toggle('fade')
        bar.previousElementSibling.classList.toggle('show')
      })
    })
  })

const element = (item, height, dayOfWeek) => {
  const newDiv = document.createElement('div')
  const anotherDiv = document.createElement('div')
  const newP = document.createElement('p')
  const anotherP = document.createElement('p')
  newP.classList.add('bar-price')
  
  newDiv.appendChild(newP)
  newDiv.appendChild(anotherDiv)
  newDiv.appendChild(anotherP)
  bars.append(newDiv)

  newP.textContent = `$${item.amount}`
  anotherP.textContent = item.day

  anotherDiv.style.height = height + 'px';
  anotherDiv.classList.add('each-bar')

  if (dayOfWeek === item.day) {
    anotherDiv.classList.add('active')
  }
}

