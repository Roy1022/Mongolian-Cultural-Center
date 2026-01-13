import React, { useState } from "react";
import { Modal } from "./Modal";
import "./MembershipFormModal.css";

export const MembershipFormModal = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    tier: "bronze",
    notes: "",
    emName: "",
    emPhone: "",
    amount: "30",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    agree: false,
    signature: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => {
      const newForm = { ...f, [name]: type === "checkbox" ? checked : value };
      if (name === "tier") newForm.amount = { bronze: "30", silver: "60", gold: "120" }[value];
      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.agree) newErrors.agree = "You must agree to the terms.";
    if (!form.signature.trim()) newErrors.signature = "Signature is required.";
    if (form.paymentMethod === "card" && !/^\d{12,19}$/.test(form.cardNumber.replace(/\s+/g, ""))) newErrors.cardNumber = "Invalid card number.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setForm({
      fullName: "", dob: "", email: "", phone: "", address: "",
      tier: "bronze", notes: "", emName: "", emPhone: "",
      amount: "30", paymentMethod: "card", cardName: "", cardNumber: "",
      cardExp: "", cardCvc: "", agree: false, signature: ""
    });
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <div className="membership-form">
        <h3>Membership Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name*</label><input type="text" name="fullName" value={form.fullName} onChange={handleChange} /></div>
          <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={form.dob} onChange={handleChange} /></div>
          <div className="form-group"><label>Email*</label><input type="email" name="email" value={form.email} onChange={handleChange} /></div>
          <div className="form-group"><label>Phone Number</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} /></div>
          <div className="form-group"><label>Address</label><input type="text" name="address" value={form.address} onChange={handleChange} /></div>

          <div className="form-group radio-group">
            <span className="group-label">Membership Tier</span>
            {["bronze","silver","gold"].map(t => (
              <label key={t}>
                <input type="radio" name="tier" value={t} checked={form.tier===t} onChange={handleChange}/>
                {t.charAt(0).toUpperCase()+t.slice(1)} {t==="bronze"?"($30)":t==="silver"?"($60)":"($120)"}
              </label>
            ))}
          </div>

          <div className="form-group">
            <label>Notes / Accessibility Needs</label>
            <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
          </div>

          <div className="form-group"><label>Emergency Contact Name</label><input type="text" name="emName" value={form.emName} onChange={handleChange} /></div>
          <div className="form-group"><label>Emergency Contact Phone</label><input type="tel" name="emPhone" value={form.emPhone} onChange={handleChange} /></div>

          <div className="form-group radio-group">
            <span className="group-label">Payment Method</span>
            {["cash","card","online"].map(p => (
              <label key={p}>
                <input type="radio" name="paymentMethod" value={p} checked={form.paymentMethod===p} onChange={handleChange}/>
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </label>
            ))}
          </div>

          {form.paymentMethod==="card" && <>
            <div className="form-group"><label>Name on Card</label><input type="text" name="cardName" value={form.cardName} onChange={handleChange}/></div>
            <div className="form-group"><label>Card Number</label><input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange}/>{errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}</div>
            <div className="form-group card-flex">
              <div><label>Expiration Date</label><input type="text" name="cardExp" value={form.cardExp} onChange={handleChange}/></div>
              <div><label>CVC</label><input type="text" name="cardCvc" value={form.cardCvc} onChange={handleChange}/></div>
            </div>
          </>}

          <div className="form-group checkbox-label">
            <label>
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange}/>
              I agree to the terms*
            </label>
            {errors.agree && <p className="error-text">{errors.agree}</p>}
          </div>

          <div className="form-group"><label>Signature*</label><input type="text" name="signature" value={form.signature} onChange={handleChange}/>{errors.signature && <p className="error-text">{errors.signature}</p>}</div>

          <div className="form-actions">
            <button type="button" onClick={handleClose}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
