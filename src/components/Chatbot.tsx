import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Clock, DollarSign, Shield, Camera, TrendingUp, Phone } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
  icon: React.ComponentType<any>;
  quickReplies?: string[];
}

const Chatbot = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs = useMemo<FAQ[]>(() => [
    {
      question: "¿Cuánto puedo ganar?",
      answer: "Los ingresos varían según tu dedicación y audiencia. Nuestras modelos ganan entre €2,500-€15,000 mensuales. El promedio está en €8,500/mes. Las más dedicadas superan los €12,000 mensuales.",
      category: "ingresos",
      icon: DollarSign,
      quickReplies: ["¿Cómo empiezo?", "¿Qué necesito?", "¿Es seguro?"]
    },
    {
      question: "¿Es seguro y privado?",
      answer: "Sí, tu privacidad es nuestra prioridad. Te enseñamos técnicas de anonimato, protección de datos personales y cómo mantener separada tu vida privada. Muchas de nuestras modelos trabajan de forma completamente anónima.",
      category: "seguridad",
      icon: Shield,
      quickReplies: ["¿Puedo ser anónima?", "¿Qué servicios incluyen?", "¿Cuánto tiempo necesito?"]
    },
    {
      question: "¿Qué necesito para empezar?",
      answer: "Solo necesitas: ser mayor de 18 años, tener smartphone/cámara, conexión a internet y ganas de trabajar. No necesitas experiencia previa, nosotros te enseñamos todo paso a paso.",
      category: "requisitos",
      icon: Camera,
      quickReplies: ["¿Sin experiencia?", "¿Cuánto cuesta?", "¿Cómo me ayudan?"]
    },
    {
      question: "¿Cuánto tiempo necesito dedicar?",
      answer: "Puedes empezar con 2-3 horas diarias. Muchas de nuestras modelos trabajan medio tiempo y obtienen buenos resultados. A más tiempo dedicado, mejores ingresos potenciales.",
      category: "tiempo",
      icon: Clock,
      quickReplies: ["¿Horarios flexibles?", "¿Trabajo desde casa?", "¿Cuánto puedo ganar?"]
    },
    {
      question: "¿Qué servicios incluyen?",
      answer: "Incluimos: gestión de contenido, marketing en redes sociales, apoyo en chat, optimización de ingresos, protección de privacidad y coaching personal. Todo sin costo adicional.",
      category: "servicios",
      icon: TrendingUp,
      quickReplies: ["¿Me ayudan con fotos?", "¿Marketing incluido?", "¿Soporte 24/7?"]
    },
    {
      question: "¿Cómo me contacto?",
      answer: "Contáctanos directamente por WhatsApp al +34 621 48 22 56 o completa el formulario que te redirigirá automáticamente a WhatsApp. Respondemos rápido y resolvemos todas tus dudas.",
      category: "contacto",
      icon: Phone,
      quickReplies: ["Ver formulario", "¿Horarios de atención?", "¿Es gratis la consulta?"]
    }
  ], []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((text: string, isBot: boolean, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const simulateTyping = useCallback(async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  }, []);

  const findBestAnswer = useCallback((userInput: string): FAQ | null => {
    const input = userInput.toLowerCase();
    
    // Palabras clave para cada categoría
    const keywords = {
      ingresos: ['ganar', 'dinero', 'ingresos', 'cuanto', 'pagar', 'euros', 'sueldo', 'salario'],
      seguridad: ['seguro', 'privado', 'anonimo', 'proteccion', 'datos', 'privacidad'],
      requisitos: ['necesito', 'empezar', 'requisitos', 'camara', 'telefono', 'edad'],
      tiempo: ['tiempo', 'horas', 'horario', 'dedicar', 'trabajo', 'flexible'],
      servicios: ['servicios', 'incluye', 'ayuda', 'apoyo', 'marketing', 'fotos'],
      contacto: ['contacto', 'whatsapp', 'telefono', 'hablar', 'consulta']
    };

    // Buscar coincidencias exactas primero
    for (const faq of faqs) {
      if (input.includes(faq.question.toLowerCase())) {
        return faq;
      }
    }

    // Buscar por palabras clave
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => input.includes(word))) {
        return faqs.find(faq => faq.category === category) || null;
      }
    }

    return null;
  }, [faqs]);

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Agregar mensaje del usuario
    addMessage(text, false);
    setInputValue('');

    // Simular typing
    await simulateTyping(800);

    // Buscar respuesta
    const bestAnswer = findBestAnswer(text);
    
    if (bestAnswer) {
      addMessage(bestAnswer.answer, true, bestAnswer.quickReplies);
    } else {
      // Respuesta por defecto
      addMessage(
        "Gracias por tu pregunta. Para una respuesta personalizada, te recomiendo contactarnos por WhatsApp al +34 621 48 22 56 o completar el formulario. ¡Estaremos encantados de ayudarte!",
        true,
        ["¿Cuánto puedo ganar?", "¿Es seguro?", "¿Qué necesito?"]
      );
    }
  }, [inputValue, addMessage, simulateTyping, findBestAnswer]);

  const handleQuickReply = useCallback((reply: string) => {
    if (reply === "Ver formulario") {
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    handleSendMessage(reply);
  }, [handleSendMessage]);

  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      addMessage(
        "¡Hola! 👋 Soy el asistente de MYONLYFXNS. Estoy aquí para resolver tus dudas sobre nuestra agencia. ¿En qué puedo ayudarte?",
        true,
        ["¿Cuánto puedo ganar?", "¿Es seguro?", "¿Qué necesito?", "¿Cómo empiezo?"]
      );
    }
  }, [messages.length, addMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        initializeChat();
      }
      return !prev;
    });
  }, [initializeChat]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
        aria-label="Abrir chat de ayuda"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl shadow-2xl border border-blue-400/20 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6" />
              <div>
                <div className="font-bold">Asistente MYONLYFXNS</div>
                <div className="text-xs opacity-90">Siempre disponible</div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'bg-blue-900/50' : 'bg-cyan-600'} rounded-2xl p-3`}>
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />}
                    <div className="text-white text-sm leading-relaxed">{message.text}</div>
                    {!message.isBot && <User className="h-4 w-4 text-white mt-1 flex-shrink-0" />}
                  </div>
                  
                  {/* Quick Replies */}
                  {message.isBot && message.quickReplies && (
                    <div className="mt-3 space-y-1">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="block w-full text-left text-xs bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 px-2 py-1 rounded-lg transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-blue-900/50 rounded-2xl p-3 flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-blue-400/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-slate-800/50 border border-blue-400/30 rounded-xl px-3 py-2 text-white text-sm placeholder-blue-300 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-2 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Chatbot;