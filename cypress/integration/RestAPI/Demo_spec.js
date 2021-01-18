describe('Http Example',function(){

    it('GET Request',function(){

        cy.request({
            
            method:'GET',
            url:'https://httpbin.org/get',
        }).then(function(response){
           expect(response.body).have.property('url')
           expect(response.status).to.deep.equal(200)
        })
    })

    it('POST Request',function(){

        cy.request({
            method:'POST',
            url:'https://httpbin.org/post',
            body:{
                "name":"Sanjeev",
                "age":27
            },
            headers:{
                "content-type":"application/json"

            }

        }).then(function(response){
           expect(response.body).have.property('json')
           expect(response.body.json).to.deep.equal({
            "name":"Sanjeev",
            "age":27
           })
        })
    })

    it('PUT Request',function(){
       cy.request('PUT','https://httpbin.org/put',{'name':'sanjeev' }).then(function(response){
            expect(response.body).have.property('json');
            expect(response.body.json).to.deep.equal({"name":"sanjeev" })
        })
    })

    it('PATCH Request',function(){
        cy.request('PATCH','https://httpbin.org/patch',{'name':'sanjeev' }).then(function(response){
             expect(response.body).have.property('json');
             expect(response.body.json).to.deep.equal({"name":"sanjeev" })
         })
     })

})