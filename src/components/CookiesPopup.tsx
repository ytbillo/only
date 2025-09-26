import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Settings } from 'lucide-react';

interface CookiesPopupProps {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}

const CookiesPopup = React.memo(({ onAccept, onReject, onCustomize }: CookiesPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      // Mostrar popup después de 1 segundo
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('cookies-preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }));
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('cookies-accepted', 'false');
    localStorage.setItem('cookies-preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false
    }));
    setIsVisible(false);
    onReject();
  };

  const handleCustomize = () => {
    setIsVisible(false);
    onCustomize();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-2xl shadow-2xl max-w-2xl w-full border border-gray-200 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Cookie className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Configuración de Cookies</h3>
              <p className="text-sm text-gray-600">Respetamos tu privacidad</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-6">
            Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio 
            y personalizar el contenido. Al hacer clic en "Aceptar todas", consientes el uso de todas las cookies.
          </p>

          {/* Cookie Types */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Cookies Necesarias</div>
                  <div className="text-sm text-gray-600">Esenciales para el funcionamiento del sitio</div>
                </div>
              </div>
              <div className="text-sm font-medium text-green-600">Siempre activas</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Cookies de Análisis</div>
                  <div className="text-sm text-gray-600">Nos ayudan a mejorar nuestros servicios</div>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600">Recomendadas</div>
            </div>
          </div>

          {/* Privacy Links */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6">
            <p className="text-sm text-gray-700">
              Para más información, consulta nuestra{' '}
              <button className="text-blue-600 hover:text-blue-700 underline font-medium">
                Política de Cookies
              </button>
              {' '}y{' '}
              <button className="text-blue-600 hover:text-blue-700 underline font-medium">
                Política de Privacidad
              </button>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Aceptar Todas</span>
            </button>
            
            <button
              onClick={handleCustomize}
              className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Personalizar</span>
            </button>
            
            <button
              onClick={handleReject}
              className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Solo Necesarias</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CookiesPopup;