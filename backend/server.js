const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const {Sequelize} = require('sequelize');
const instance = express();
const jwtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtObject = {
    'jwtSecret': 'abcprq00700mnozyx'
}
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

//===========================Database details============================
const sequelize = new Sequelize("product", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
        min: 0,
        max: 5,
        idle: 1000
    },
    define: {
        timestamps: false // omit the createdAt and updatedAt columns
    }
});

//=====================model import========================================================
let admin = sequelize.import('./models/admin');
let user = sequelize.import('./models/user');
let prodinfo = sequelize.import('./models/prodinfo');
let hash ;
let globalTokan;

//===============username check in database for user===============================================
instance.post('/uniqueuser', (request, response)=> {
    sequelize.sync({force: false})
    .then(() => 
        user.findByPk(request.body.username)
    )
    .then((result) => {
        if(result === null) {
            response.json({
                statusCode: 404,
                data: `${request.body.username} not found`
            });
            response.end();
        }
        else {
            response.json({
                statusCode: 200,
                data: `User Found`
            });
            response.end();
        }
    })
    .catch((error) => {
        response.send({
            statusCode: 500,
            data: `Error Occured: ${error}`
        });
        response.end();
    });
})

//====================username check for admin in database==================================================
instance.post('/uniqueadmin', (request, response)=> {
    sequelize.sync({force: false})
    .then(() => 
        admin.findByPk(request.body.username)
    )
    .then((result) => {
        if(result === null) {
            response.json({
                statusCode: 404,
                data: `${request.body.username} not found`
            });
            response.end();
        }
        else {
            response.json({
                statusCode: 200,
                data: `User Found`
            });
            response.end();
        }
    })
    .catch((error) => {
        response.send({
            statusCode: 500,
            data: `Error Occured: ${error}`
        });
        response.end();
    });
})

//=======================authorization for users===============================================================
instance.set('jwtSecret', jwtObject.jwtSecret);
// 2. Authorize the user and generate token
instance.post('/user/authorize', (request, response) => {
    const authValue = {
        Username: request.body.Username,
        Password: request.body.Password
    };
        sequelize.sync({ force: false })
        .then(() => user.findByPk(authValue.Username))
        .then((result) => {
            console.log(JSON.stringify(result));
            // 2a. if user not found response the UnAuthorized
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {if(!(bcrypt.compareSync(authValue.Password, result.Password))) {
                        // Passwords match
                        response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                        response.end();
                       } else 
                       {
                        let accessToken = jwtoken.sign(result.toJSON(), instance.get('jwtSecret'), {
                            expiresIn: 3600 // token will expire in 3600 seconds
                        });
                        globalTokan = accessToken;
                        console.log(`Access Token ${accessToken}`);
                        // 2c. respond token to client
                        response.send({
                            statusCode: 200,
                            authenticated: true,
                            data: accessToken
                        });
                        response.end();
                    }  
            }
        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
});


//=======================authorization for admin============================================================
instance.post('/admin/authorize', (request, response) => {
    const authValue = {
        Username: request.body.Username,
        Password: request.body.Password
    };
        sequelize.sync({ force: false })
        .then(() => admin.findByPk(authValue.Username))
        .then((result) => {
            //console.log(JSON.stringify(result));
            // 2a. if user not found response the UnAuthorized
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {if(!(bcrypt.compareSync(authValue.Password, result.Password))) {
                        // Passwords match
                        response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                        response.end();
                       } else 
                       {
                        let accessToken = jwtoken.sign(result.toJSON(), instance.get('jwtSecret'), {
                            expiresIn: 3600 // token will expire in 3600 seconds
                        });
                        globalTokan = accessToken;
                        //console.log(`Access Token ${accessToken}`);
                        // 2c. respond token to client
                        response.send({
                            statusCode: 200,
                            authenticated: true,
                            data: accessToken
                        });
                        response.end();
                    }  
            }
        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
});

//======================user registeration==================================================================
instance.post('/user/register', (request, response) => {
    hash = bcrypt.hashSync(request.body.Password, 2);
    sequelize.sync({ force: false })
        .then(() =>              
            user.create({
            Username: request.body.Username,
            Password: hash
        }))
        .then((result) => {            
            response.json({
                statusCode: 200,
                data: `User Created Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();
        })
        .catch((error) => {
            response.send({
                statusCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
});

//======================admin registeration==================================================================
instance.post('/admin/register', (request, response) => {
    //let pass= request.body.Password;
    hash = bcrypt.hashSync(request.body.Password, 3);
    sequelize.sync({ force: false })
        .then(() =>              
            admin.create({
            Username: request.body.Username,
            Password: hash
        }))
        .then((result) => {            
            response.json({
                statusCode: 200,
                data: `User Created Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();
        })
        .catch((error) => {
            response.send({
                statusCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
});

//================================Token Verification=======================================================
function verifyToken(request)  {
    let token = request.headers.authorization.split(' ')[1];
    
    return new Promise((r,e) => {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
                // 3d. request failed because token verification failed
                //console.log(decoded);
                if (err) {
                    e(err)
                } else {
                    r(decoded);
                }
        })
    });
}

//=========================================create new product=================================================
instance.route('/create-product').post((request, response) => {
    let header = request.headers.authorization;
    // 3b read the token value
    
    let token = header.split(' ')[1];
    //console.log(token);
    if (token !== globalTokan) {
        response.send({ statusCode: 401, data: 'Request UnAuthorized' });
        response.end();
    } else
    {
        // 3c. Varify the token based on issuer using the secret key stored
        // in express object
        verifyToken(request)
        .then((result) => {
                request.decoded = result;
    const product = {
        ProductId: parseInt(request.body.ProductId),
        ProductName: request.body.ProductName,
        Price: parseFloat(request.body.Price),
        Description: request.body.Description,
        Rating: request.body.Rating
    };
  sequelize.sync({ force: false })
      .then(() => prodinfo.create(product))
      .then((result) => {
          if (result !== null) {
              response.json({ statusCode: 200, data: JSON.stringify(result.toJSON()) });
              response.end();
          } else {
              response.json({ statusCode: 200, data: `Record is not Created` });
              response.end();
          }
      }).catch((error) => {
          response.send({ statusCode: 500, data: error });
      })
    })
    .catch((err) => {
        response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
        response.end();
    });
}

});

//==========================================display all product===============================================
instance.route('/display').get((request, response) => {
    let token = request.headers.authorization.split(' ')[1];
    //console.log(`Global token: ${globalTokan}`);
    
    if (token !== globalTokan) {
        
        response.send({ statusCode: 401, data: 'Request UnAuthorized' });
        response.end();
    } else {

        verifyToken(request)
        .then((result) => {
            request.decoded = result;
            sequelize.sync({ force: false })
                .then(() => prodinfo.findAll()) // --> the select * from Students
                .then((result) => {
                    response.json({ statusCode: 200, rowCount: result.length, data: result });
                    response.end();
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                });
        })
        .catch((error)=> {
            response.send({ statusCode: 500, data: `Token not verified ${error}` });
            response.end();
        })
}
});

//=======================================product update=================================================
instance.route('/update-product/:id').put((request, response) => {
    let header = request.headers.authorization;
    // 3b read the token value
    let token = header.split(' ')[1];
    //console.log(token);
    if (token !== globalTokan) {
        response.send({ statusCode: 401, data: 'Request UnAuthorized' });
        response.end();
    } else
    {
        // 3c. Varify the token based on issuer using the secret key stored
        // in express object
        verifyToken(request)
        .then((result) => {
            request.decoded = result;
                let id = request.params.id;
                const product = {
                    ProductId: parseInt(request.body.ProductId),
                    ProductName: request.body.ProductName,
                    Price: parseFloat(request.body.Price),
                    Description: request.body.Description,
                    Rating: request.body.Rating
                };
                sequelize.sync({ force: false })
                    .then(() => prodinfo.update(product, { where: { ProductId: id } }))
                    .then((result) => {
                        if (result !== 0) {
                            response.json({ statusCode: 200, data: result.length });
                            response.end();
                        } else {
                            response.json({ statusCode: 200, data: `Record is not Updated` });
                            response.end();
                        }
                    }).catch((error) => {
                        response.send({ statusCode: 500, data: error });
                    })
        })
    }
});

//===============================================delete product===========================================
instance.route('/delete-product/:id').delete((request, response) => {
    // do not overwrite the models
    let header = request.headers.authorization;
      // 3b read the token value
      let token = header.split(' ')[1];
      
      if (token !== globalTokan) {
          response.send({ statusCode: 401, data: 'Request UnAuthorized' });
          response.end();
      } else
      {
      verifyToken(request)
      .then((result) => {
          request.decoded = result;
          // read the parameter
          let id = request.params.id;
          // do not overwrite the models
          sequelize.sync({ force: false })
              .then(() => prodinfo.destroy({ where: { ProductId: id }})) // --> the select * from Students where StudentId=id
              .then((result) => {                
                  if (result === 0) {
                      response.json({ statusCode: 210, data: 'No Record deleted' });
                      response.end();
                  } else {
                      response.json({ statusCode: 200, data: result });
                      response.end();
                  }
              }).catch((error) => {
                  response.send({ statusCode: 500, data: error });
              })
      })
      .catch((err) => {
          response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
          response.end();
      });
      }
  });

  instance.get('/getproducts/:id', (request, response) => {
    // read the parameter
    let id = request.params.id;
    //console.log(id);
    
    // do not overwrite the models
    let header = request.headers.authorization;
    let token = header.split(' ')[1];
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                .then(() => prodinfo.findAll({where : Sequelize.or(
                    { ProductId: id },
                    { ProductName: id },
                    { Price: id },
                    { Description: id },
                    { Rating: id },
                  )})) 
                .then((result) => {
                    if (result !== null) {
                        response.json({ statusCode: 200, data: result });
                        response.end();
                    } else {
                        response.json({ statusCode: 200, data: `Record not found` });
                        response.end();
                    }
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                })
            }
        });
    }
    
});

instance.listen(4000, () => {
    console.log('Server is listening on port 4000');
  })