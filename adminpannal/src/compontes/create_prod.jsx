import "./create_product.css";
import { useEffect, useState } from "react";
import axios from "axios";
import product from "../images/images.png";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const url = "https://wandering-plum-parka.cyclic.app/products/create";
function CreateProd() {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [valid,setValid]=useState(localStorage.getItem("Token"))
  const navigate=useNavigate();
  const toast=useToast()
  const createPost = async () => {
    const pay = {
      img,
      name,
      price,
      mrp,
      discount,
      brand,
      category,
    };

    try {
      await axios
        .post(url, pay)
        .then(function (response) {
         
          if(response.data?.err?.name=="ValidationError"){
            toast({
              title:"Filled to Created Product",
              description:"Fill all the required Detail's",
              status:"error",
              position:"top",
              duration:5000,
              isClosable:true,
            })
          }else{

            toast({
              title:"Product Created Successfully",
              description:"you can move to Home page",
              status:"success",
              position:"top",
              duration:5000,
              isClosable:true,
            })
          }
        })
        .catch(function (error) {
          toast({
            title:"Filled to Created Product",
            description:"Fill all the required Detail's",
            status:"error",
            position:"top",
            duration:5000,
            isClosable:true,
          })
          console.log(error);
        });
    } catch (err) {
      console.log(err);
      console.log({ err: "Somting went wrong" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof postImage);
    createPost();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImg(base64);
  };
  useEffect(() => {
    if(valid=="true"){
      console.log(valid)
    }else{
      toast({
        title:"Login First !",
        description:"To create Product Login",
        status:"error",
        position:"top",
        duration:5000,
        isClosable:true,
      })
      navigate("/")
    }
    
   

  },[]);

  return (
    <div className="form_head">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={img ? img : product} alt="product Image" />
        </label>

        <input
          type="file"
          lable="Image"
          name="img"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        <label htmlFor="">
          Product Name <span>*</span>
        </label>
        <input
          type="string"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of Product"
        />
        <label htmlFor="">
          Product Price <span>*</span>
        </label>
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price "
        />
        <label htmlFor="">
          Product Mrp <span>*</span>
        </label>
        <input
          type="string"
          name="mrp"
          onChange={(e) => setMrp(e.target.value)}
          placeholder="Mrp(₹2999)"
        />
        <label htmlFor="">
          Product Discpunt <span>*</span>
        </label>
        <input
          type="string"
          name="discount"
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount(15%(₹599))"
        />
        <label htmlFor="">
          Product Braand <span>*</span>
        </label>
        <input
          type="string"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand Name"
        />
        <label htmlFor="">
          Product Category <span>*</span>
        </label>
        <input
          type="string"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProd;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
