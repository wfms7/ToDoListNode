const express = require('express');
const router = express.Router()
const toDoListController = require('../controller/toDoListController')

router.get('/listadetarefas', async(req,res)=>{

    const  tarefas = await toDoListController.getToDolist();
  
    res.json(tarefas);
})

router.post('/newToDoList', async(req,res)=>{
    const data = req.body;

  
    const result  = await toDoListController.saveToDoList(data);
    console.log(result)
    res.send(result);
});


router.delete('/delete',async(req,res)=>{

    const data = req.body;
    const result  = await toDoListController.deleteToDo(data.ID);
    console.log(result)
    res.send(result);

})

router.put('/edit/:id',async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const result  = await toDoListController.editToDo(id,data);
    console.log(result)
    res.send(result);

})


module.exports = router;