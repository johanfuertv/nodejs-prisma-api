import {Router} from "express"
import {prisma} from "../routes/db.js"

const router = Router();

router.get("/products", async (req,res,next) =>{
  try {
    const products = await prisma.product.findMany();
    return res.json(products);
  } catch (error) {
    next(error);
  }
})
router.get("/products/:id", async (req,res,next) => {
    try {
        const {id} = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id),
            }
        });
        return res.json(product);
    } catch (error) {
        next(error);
    }
}

)

router.post("/products:/id"), async (req, res,next ) => {
    try {
        const productFound = await prisma.product.findFirst({
            where: {
                id: (req.params.id),
            },
            include: {
                category: true
            }

        })
    } catch (error) {
        next(error);
    }
}

router.delete("/products:/id"), async (req, res, next) => {
    try {
       const productDeleted= await prisma.product.findMany(prisma.products.delete({
            where: {
                id: parseInt (req.params.id),
            }
        }))
        return res.json(productDeleted);
    } catch (error) {
        next(error);
        
    }
}

router.put("products:/id", async (req, res, next) => {
    try {
       const productUpdate = await  prisma.product.update({
            where: {
                id: parseInt (req.params.id),
            },
            data: {
                name: req.body.name,
                price: req.body.price,
                categoryId: req.body.categoryId
            }
        })
        return res.json(productUpdate);
    } catch (error) {
        next(error);
    }
});
export default router;

