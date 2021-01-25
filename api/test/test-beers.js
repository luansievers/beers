var expect = require("chai").expect;
var axios = require('axios');

describe('Beers', function () {
    it("should get Libertine Black Ale beer", (done) => {
        axios.get("http://localhost:3000/beer?name=Libertine%20Black%20Ale", {
            headers: {
                'x-user': 'luan@gmail.com'
            }
        }).then((response) => {
            expect(response.data[0].id).to.equal(167);
            done();
        })
    });
    it("should not get any beer", (done) => {
        axios.get("http://localhost:3000/beer?name=123456789", {
            headers: {
                'x-user': 'luan@gmail.com'
            }
        }).then((response) => {
            expect(response.data.length).to.equal(0);
            done();
        })
    });
    it("should show error requesting missing header", (done) => {
        axios.get("http://localhost:3000/beer?name=Libertine%20Black%20Ale")
            .catch((error) => {
                expect(error.response.data.message).to.equal('Request is missing header x-user with a valid email')
                done();
            })
    });
});