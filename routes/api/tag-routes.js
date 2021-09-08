//dependencies
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']  //tag attributes
    }
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id  //identifying single tag
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({  //creating new tag
    tag_name: req.body.tag_name
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {  //update tag
    where: {
      id: req.params.id  //identifying tag to update
    }
  }).then(dbTagData => {
      if (!dbTagData){
        res.status(404).json({message:'Tag cant be updated no tag found with that id.'});  //update tag error message
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({  //delete tag
    where: {
      id: req.params.id  //identifying tag to delete
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'Tag cant be deleted no tag found with that id.'});  //delete tag error message
      return;
    }
    res.json(dbTagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;
