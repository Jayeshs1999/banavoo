import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import useDeviceType from "../utils/DeviceType";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../slices/productsAPISlice";
export default function CustomizationForm() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    colors: "",
    size: "",
    quantity: "",
    budget: "",
    deadline: "",
    specialInstructions: "",
    files: null,
    address: "",
  };
  const [createProduct] = useCreateProductMutation();

  const deviceType = useDeviceType();
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.name || formData.name.length < 8)
      newErrors.name = "Name must be at least 8 characters long";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Phone number must be at least 10 digits long";
    if (!formData.title || formData.title.length < 4)
      newErrors.title = "Title must be at least 4 characters long";
    if (!formData.description || formData.description.length < 8)
      newErrors.description = "Description must be at least 8 characters long";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e: any) => {
  //   setFormData({ ...formData, files: e.target.files });
  // };

  const handleSubmit = (e: any) => {
    console.log("Form submitted", formData);
    e.preventDefault();
    if (validateForm()) {
      try {
        submitHandler(e);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const updatedProduct = {
      name: formData?.name,
      email: formData?.email,
      phoneNumber: formData?.phone,
      projectTitle: formData?.title,
      description: formData?.description,
      colors: formData?.colors,
      size: formData?.size,
      quantity: formData?.quantity,
      budget: formData?.budget,
      deliveryDeadline: formData?.deadline,
      specialInstructions: formData?.specialInstructions,
      files: formData?.files,
      address: formData?.address,
    };
    localStorage.setItem("product_added_location", formData?.address);

    if (formData?.phone?.length === 10) {
      const result = await createProduct(updatedProduct);
      if (result) {
        navigate("/placed-order");
        // props.handleDialog(false);
        resetForm();
        toast.success("Book added Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      console.log("Phone number is not valid", formData?.phone?.length);
      toast.error("Please Enter valid Phone Number");
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  return (
    <Container
      style={{
        // background: "linear-gradient(135deg, #ff4d54, rgb(255 255 255))",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: deviceType === "mobile" ? "100%" : "50%",
      }}
    >
      <FaArrowLeft
        size={20}
        style={{ cursor: "pointer", marginBottom: "20px" }}
        onClick={() => navigate("/")}
      />
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        Customize Your Product
      </h2>
      {/* <div className="d-flex align-items-center justify-content-center mb-4">
        
       
      </div> */}

      <Form onSubmit={handleSubmit}>
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "WhatsApp/Contact Number", name: "phone", type: "tel" },
          { label: "Project Title", name: "title", type: "text" },
          { label: "Description", name: "description", type: "textarea" },
          //   { label: "Preferred Colors/Materials", name: "colors", type: "text" },
          // { label: "Size/Dimensions", name: "size", type: "text" },
          { label: "Quantity", name: "quantity", type: "number" },
          { label: "Budget (Optional)", name: "budget", type: "number" },
          {
            label: "Delivery Deadline (Optional)",
            name: "deadline",
            type: "date",
          },
          {
            label: "Special Instructions",
            name: "specialInstructions",
            type: "textarea",
          },
          { label: "Address", name: "address", type: "textarea" },
        ].map((field, index) => (
          <Form.Group key={index} style={{ marginBottom: "15px" }}>
            <Form.Label style={{ fontWeight: "bold", color: "#222" }}>
              {field.label}
            </Form.Label>
            <Form.Control
              as={field.type === "textarea" ? "textarea" : "input"}
              type={field.type !== "textarea" ? field.type : undefined}
              name={field.name}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              onChange={handleChange}
              required={
                field.name !== "colors" &&
                field.name !== "budget" &&
                field.name !== "specialInstructions"
              }
            />
            {errors[field.name] && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors[field.name]}
              </p>
            )}
          </Form.Group>
        ))}

        {/* <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Label style={{ fontWeight: "bold", color: "#222" }}>
            Upload Sample Images
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </Form.Group> */}

        <Button
          type="submit"
          className="w-100"
          style={{
            backgroundColor: "#ff7f50",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Request
        </Button>
      </Form>
    </Container>
  );
}
