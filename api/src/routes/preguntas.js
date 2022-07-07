const Router = require('express');
const { Questions } = require('../db.js');
// const Questions = require('../models/Questions.js');


const router = Router();

router.post("/", async(req,res) =>{
  const {question, product_ID, user_email}=req.body

    await Questions.create({
      user_email:user_email,
      product_ID: product_ID,
      question: question
    })
    res.status(200).send("pregunta enviada");
 
})

router.get("/", async(req,res)=>{

const findByQuestion = await Questions.findAll()
res.status(200).send(findByQuestion)
})

router.put("/:id",async(req,res)=>{
const {answer} = req.body
const {id} = req.params

try{
  let pregunta = await Questions.findOne({
    where: {
      id: id,
    },
  })

  if(pregunta){
    await Questions.update(
      {answer},
      {where:{id:id}}
    )
  }
  res.status(200).send("los cambios se dieron con exito")
}catch (error) {
  console.log(error);
}
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Questions.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("successfully removed");
  } catch (error) {
    console.log(error);
  }
});
// router.put("/:email/:id", async (req, res) => {
//     const {pregunta, respuesta} = req.body
//     const {id, email}  = req.params;
  
//      try {
//       let celular = await Publication.findByPk(id);
//       let usuario = await User.findByPk(email);
  
//       if (!celular.QyA) {
//         await Publication.update({ QyA:[{usuario: usuario.username, pregunta:pregunta, respuesta:respuesta}] }, { where: { id: id } });
   
//       } else {
        
  
//         await Publication.update(
//           { QyA: celular.QyA.concat({usuario: usuario.username, pregunta:pregunta, respuesta:null}) },
//           { where: { id: id } }
//         );
       
//       }
  
//       res.send("pregunta enviada");
//     } catch (error) {
//       console.log(error);
//     }
//   });




module.exports = router;