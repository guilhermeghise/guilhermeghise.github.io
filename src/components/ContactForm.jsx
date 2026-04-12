import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';


const appleEase = [0.22, 1, 0.36, 1];

export default function ContactForm({ t }) { 
  const [state, handleSubmit] = useForm("xbdpvorn");

if (state.succeeded) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="contact-success"
      >
        <CheckCircle size={48} color="#30D158" />
        <h3>{t.successTitle}</h3>
        <p>{t.successText}</p>
        <button onClick={() => window.location.reload()} className="back-btn">{t.backBtn}</button>
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
        <label htmlFor="name">{t.name}</label>
        <input id="name" type="text" name="name" placeholder={t.namePlaceholder} required />
      </div>

      <div className="input-group">
        <label htmlFor="email">{t.email}</label>
        <input id="email" type="email" name="email" placeholder={t.emailPlaceholder} required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="input-group">
        <label htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" rows="5" placeholder={t.messagePlaceholder} required />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button type="submit" disabled={state.submitting} className="submit-btn">
        {state.submitting ? t.sending : (
          <>
            {t.send} <Send size={18} />
          </>
        )}
      </button>
    </motion.form>
  );
}