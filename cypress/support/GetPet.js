  export function getPet (pet){
    cy.log(`GET pet with pet id: ${pet.id}`)


    cy.request('GET', `/pet/${pet.id}`).then( response => {
      cy.log(`Requst body: ${response.requestBody}`)
      expect(response.status).to.be.equal(200)
    })
    cy.log(JSON.stringify(pet))
}