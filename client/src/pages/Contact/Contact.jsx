import Address from "../../components/Adress/Adress";
import Form from "../../components/Form/Form";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact__container">
      <div className="contact__box">
        <Address />
        <Form />
      </div>
    </div>
  );
}

export default Contact;
