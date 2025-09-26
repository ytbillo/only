import React, { useState } from 'react';
import { Cookie, X, Check, Shield, BarChart3, Target } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookiesCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
}

const CookiesCustomizer = React.memo(({ isOpen, onClose, onSave }: CookiesCustomizerProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false
  });

  const handleSave = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('cookies-preferences', JSON.stringify(preferences));
    onSave(preferences);
    onClose();
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // No se puede desactivar
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Cookie className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">Personalizar Cookies</h2>
              <p className="text-blue-100 text-sm">Elige qué cookies quieres permitir</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Cookies Necesarias</h3>
                    <p className="text-sm text-gray-600">Siempre activas</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Estas cookies son esenciales para el funcionamiento básico del sitio web. 
                Incluyen funciones como navegación, acceso a áreas seguras y formularios de contacto.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Cookies de Análisis</h3>
                    <p className="text-sm text-gray-600">Mejoran la experiencia</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                    preferences.analytics 
                      ? 'bg-blue-500 justify-end' 
                      : 'bg-gray-300 justify-start'
                  } px-1`}
                >
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </button>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Nos ayudan a entender cómo los visitantes interactúan con el sitio web, 
                recopilando información de forma anónima para mejorar nuestros servicios.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Cookies de Marketing</h3>
                    <p className="text-sm text-gray-600">Contenido personalizado</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                    preferences.marketing 
                      ? 'bg-purple-500 justify-end' 
                      : 'bg-gray-300 justify-start'
                  } px-1`}
                >
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </button>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Se utilizan para mostrar contenido y anuncios más relevantes para ti. 
                Pueden ser establecidas por nosotros o por terceros cuyos servicios utilizamos.
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-6">
            <p className="text-sm text-gray-700">
              <strong>Tu privacidad es importante:</strong> Puedes cambiar estas preferencias 
              en cualquier momento desde el pie de página de nuestro sitio web.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Guardar Preferencias</span>
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CookiesCustomizer;