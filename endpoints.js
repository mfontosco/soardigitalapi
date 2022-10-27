// app.get('/', (req, res)=> {
//     let message = "Welcome to backend"
//     res.json({
//         status: 'good',
//         msg: message
//     })
// })

// app.post('/create-user', async (req, res)=> {
//     const { name, email, password, address, interest, status} = req.body
//     try {
//         const userExists = await models.User.findOne({ where: email}).catch(err => {
//             if(err) console.log( "Error : ", err)
//         })

//         if(userExists){
//             return res.status(400).json({
//                 status: 'failed',
//                 error: "User with this email already exists"
//             })
//         }
//         let createUser = await models.User.create({
//             name,
//             email,
//             password,
//             address,
//             interest,
//             status
//         })
        
//         res.status(200).json({
//             status: 'good',
//             user: createUser
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'bad',
//             error: "Registration Failed"
//         })
//     }  
// })

// app.post('/login', async (req, res)=> {
//     const {email, password} = req.body

//     try {
//         const userWithEMail = await models.User.findOne({where: {email}}).catch(err => {
//             res.status(400).json({
//                 status: 'bad',
//                 error: "Email and Password does not match" && err
//             })
//         })

//         if(userWithEMail.password !== password){
//             return res.status(400).json({
//                 status: 'bad',
//                 error: "Email and Password does not match" && err
//             })
//         }


//             res.status(200).json({
//                 status: 'Login Successfull',
//                 user: {
//                     email,
//                     token: generateToken(password)
//                 }
//             })

       
//     } catch (error) {
//         res.status(400).json({
//             status: 'Login Failed',
//             error: "Please provide valid email and password" && err
//         })
//     }
// })

// app.get('/create-post', async (req, res)=> {
//     try {
//         let createPost = await models.Post.create({
//             title: 'Hello',
//             description: 'Hiiii@gmail.com',
//             userId: 1,
//         })
//         return '1';
//     } catch (error) {
//         console.log(error) 
//     } 

// })

// app.get('/get-user', async (req, res)=> {
//     const {id} = req.params
//     try{
//         let getUser = await models.User.findByPk(id, {
//             include: [{
//                 model: models.Post 
//             }]
//         })
//         console.log(getUser)
//     }catch(err){
//         console.log(err)
//     }
    
// })

// app.get('/get-post/:id', async (req, res)=> {
//     const {id} = req.params
//     try{
//         let getPost = await models.Post.findByPk(id, {
//             include: [{
//                 model: models.Likes,
                
//             }, {
//                 model: models.User,
//             }]
//         })
//         console.log(getPost)
//     }catch(err){
//         console.log(err)
//     }
    
// })

// app.get('/like-post/:id', async (req, res)=> {
//     const {id} = req.params
//     try{
//         let createPost = await models.Post.create({
//             postid: id,
//             userid: 1
//         })
//         console.log(createPost)
//     }catch(err){
//         console.log(err)
//     }
    
// })