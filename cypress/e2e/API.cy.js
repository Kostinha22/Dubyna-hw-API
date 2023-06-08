///<reference types="cypress"/>
import {faker} from '@faker-js/faker'
import pet from  '../fixtures/pet.json'  
import {getPet} from  '../support/GetPet'

pet.id = faker.number.int()
pet.name = faker.animal.cat.name 
pet.category.id = faker.number.int(3)
pet.category.name = faker.animal.type()



  it('Create pet', () => {
    cy.log(`Create pet with pet id: ${pet.id}`)


    cy.request('POST', '/pet', pet).then( response => {
      cy.log(`Requst body: ${response.requestBody}`)
      expect(response.status).to.be.equal(200)
      expect(response.body.id).to.be.equal(pet.id)
      expect(response.body.name).to.be.equal(pet.name)
    })
    cy.log(JSON.stringify(pet))
    getPet(pet)
  })

    it('UPDATE pet', () => {
    cy.log(`Create pet with pet id: ${pet.id}`)

    pet.name = 'Erron Black'
    pet.status = 'sold'
    cy.request('PUT', '/pet', pet).then( response => {
      cy.log(`Requst body: ${response.requestBody}`)
      expect(response.status).to.be.equal(200)
      expect(response.body.id).to.be.equal(pet.id)
      expect(response.body.name).to.be.equal(pet.name)
      expect(response.body.status).to.be.equal(pet.status)
    })
    getPet(pet)
  })


    it('Find pet by status', () => {
      cy.log(`Find pet with pet id: ${pet.id}`)

      cy.request('GET', `/pet/findByStatus?status=${pet.status}`).then( response => {
        cy.log(`Requst body: ${response.requestBody}`)
        expect(response.status).to.be.equal(200)

        let pets = response.body // створюємо змінну pets 
        let resultPetArray = pets.filter( myPet => {
          return myPet.id === pet.id // порівнюємо 

        })
        
        console.log(resultPetArray)
        expect(resultPetArray[0]).to.be.eql(pet) // expect - очікуємо що перший елемент змінної resultPetArray дорівнює pet 
      })
  })

  it('Update pet with form data', () => {
    cy.log(`Update pet with form data: ${pet.id}`)

    pet.name = 'White pony';
    pet.status = 'pending';
  
    cy.request({
      method: 'POST',
      url: `/pet/${pet.id}`,
      form: true,
      body: {
        id: `${pet.id}`,
        name: pet.name,
        status: pet.status,

      },
      
    }).then( response => {
      expect(response.status).to.be.equal(200);
      expect(Number(response.body.message)).to.equal(Number(pet.id)); 

    })
    getPet(pet)
  })

// Видалити тварину
  it('Delete pet', () => {
    cy.log(`Delete pet with pet id: ${pet.id}`)
  

    cy.request({
      method: 'DELETE',
      url: `/pet/${pet.id}`,
      failOnStatusCode: false
    }).then( response => {
      cy.log(`Requst body: ${response.requestBody}`)
      expect(response.status).to.be.equal(200)
      expect(Number(response.body.message)).to.equal(Number(pet.id)); 

    })
    


  })

  it('GET pet', () => {
    cy.log(`Delete pet with pet id: ${pet.id}`)
    cy.request({
      method: 'GET',
      url: `/pet/${pet.id}`,
      failOnStatusCode: false
    })
    .then(response => {
    expect(response.status).to.be.equal(404)
    expect(response.body.code).to.be.equal(1)
    expect(response.body.message).to.be.equal('Pet not found')

  })
})