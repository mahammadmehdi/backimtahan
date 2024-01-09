import express from 'express'
import mongoose, { Schema } from 'mongoose';
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const productSchema = new Schema({
    image:String,
    name: String, 
    price: Number,
    category: String,
  });
  const productModel = mongoose.model('Product', productSchema);
app.get('/', async(req, res) => {
    try {
  const product = await productModel.find({})
  res.send(product)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/:id',async (req, res) => {
    try {
        const {id} = req.params
        const product = await productModel.findById(id)
        res.send(product) 
    } catch (error) {
        res.send(error.message)
        
    }
  })

  
  app.post('/', async(req, res) => {
    try {
    const {image,name,price,category} = req.body
    const newProducts = new productModel({image,name,price,category})
    await newProducts.save()
    res.send('Ugurla yuklendi')
    } catch (error) {
        res.send(error.message)
        
    }
  })
  
  app.put('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {image,name,price,category} = req.body
    const product = await productModel.findByIdAndUpdate(id,{image,name,price,category} )
    res.send(product)
  } catch (error) {
    res.send(error.message)
    
  }
  })
  
  app.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
    const product = await productModel.findByIdAndDelete(id)
    res.send(product)
    } catch (error) {
    res.send(error.message)
        
    }
  })

  mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/')
  .then(() => console.log('Connected!'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})