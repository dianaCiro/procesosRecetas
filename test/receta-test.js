var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
var recetaQuery = require('../queries/receta');
var server = require('../app');

chai.use(chaiHttp);

require("blanket")({ /* optional options */ }),  require("../controllers/notes");

describe('/GET notes', () => {
    it('debe retornar 200', (done) => {
      chai.request(server)
          .get('/api/notes')
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
    });
});

describe('/GET notes', () => {
    it('debe retornar todas las notas', (done) => {
      chai.request(server)
          .get('/api/notes')
          .end((err, res) => {
              res.body.should.be.a('array');
            done();
          });
    });
});

describe('/POST notes/new', () => {
    it('debe retornar 200 a crear una nota', (done) => {
      var note = {
          about: "contenido de la nota"
      }
      chai.request(server)
          .post('/api/notes/new')
          .send(note)
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
    });

});

describe('/POST notes/new', () => {
    it('debe retornar el contenido de la nota al crearla', (done) => {
      var note = {
          about: "contenido de la nota"
      }
      chai.request(server)
          .post('/api/notes/new')
          .send(note)
          .end((err, res) => {
              expect(res.body).to.equal(note['about']);
            done();
          });
    });

});

describe('/POST notes/new', () => {
    it('debe retornar 500 al no recibir parametros al crear una nota', (done) => {
      chai.request(server)
          .post('/api/notes/new')
          .end((err, res) => {
              res.should.have.status(500);
            done();
          });
    });

});