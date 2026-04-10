import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';


const appleEase = [0.22, 1, 0.36, 1];

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xbdpvorn");

  if (state.succeeded) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="contact-success"
      >
        <CheckCircle size={48} color="#30D158" />
        <h3>Message sent!</h3>
        <p>I'll get back to you as soon as possible.</p>
        <button onClick={() => window.location.reload()} className="back-btn">Send another</button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="apple-contact-form"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: appleEase }}
    >
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" placeholder="What's your name?" required />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" placeholder="your@email.com" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="input-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" placeholder="What should we build together?" required />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button type="submit" disabled={state.submitting} className="submit-btn">
        {state.submitting ? "Sending..." : (
          <>
            Send message <Send size={18} />
          </>
        )}
      </button>
    </motion.form>
  );
}