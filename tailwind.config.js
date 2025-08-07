// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Breakpoints optimizados para dispositivos móviles
      screens: {
        'xs': '375px',      // Móviles pequeños
        'sm': '640px',      // Móviles grandes
        'md': '768px',      // Tablets
        'lg': '1024px',     // Desktop pequeño
        'xl': '1280px',     // Desktop
        '2xl': '1536px',    // Desktop grande
        // Breakpoints personalizados
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        // Orientación
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        // Altura específica para móviles en landscape
        'short': {'raw': '(max-height: 500px)'},
      },

      // Espaciado optimizado para touch
      spacing: {
        '18': '4.5rem',     // 72px
        '88': '22rem',      // 352px
        '100': '25rem',     // 400px
        '104': '26rem',     // 416px
        '112': '28rem',     // 448px
        '128': '32rem',     // 512px
        // Safe areas
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      // Tamaños mínimos para elementos táctiles
      minHeight: {
        'touch': '44px',    // Tamaño mínimo recomendado para touch
        'touch-lg': '48px', // Tamaño grande para touch
        'screen-1/2': '50vh',
        'screen-3/4': '75vh',
        'screen-9/10': '90vh',
      },

      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },

      maxHeight: {
        'screen-1/2': '50vh',
        'screen-3/4': '75vh',
        'screen-9/10': '90vh',
        'modal': 'calc(100vh - 2rem)',
        'modal-mobile': 'calc(100vh - 1rem)',
      },

      maxWidth: {
        'modal': 'calc(100vw - 2rem)',
        'modal-mobile': 'calc(100vw - 1rem)',
      },

      // Colores personalizados para el tema
      colors: {
        // Colores principales
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Grises mejorados
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },

        // Estados de tareas
        task: {
          pending: '#f59e0b',     // amber-500
          progress: '#3b82f6',    // blue-500
          completed: '#10b981',   // emerald-500
          cancelled: '#ef4444',   // red-500
        },

        // Prioridades
        priority: {
          low: '#6b7280',      // gray-500
          medium: '#f59e0b',   // amber-500
          high: '#f97316',     // orange-500
          urgent: '#ef4444',   // red-500
        },

        // Materias (colores diferenciados)
        subject: {
          math: '#3b82f6',        // blue-500
          science: '#10b981',     // emerald-500
          language: '#f59e0b',    // amber-500
          history: '#8b5cf6',     // violet-500
          art: '#ec4899',         // pink-500
          sports: '#f97316',      // orange-500
          default: '#6b7280',     // gray-500
        }
      },

      // Typography optimizada para móvil
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        
        // Tamaños específicos para móvil
        'mobile-xs': ['0.6875rem', { lineHeight: '0.875rem' }], // 11px
        'mobile-sm': ['0.8125rem', { lineHeight: '1.125rem' }], // 13px
        'mobile-base': ['0.9375rem', { lineHeight: '1.375rem' }], // 15px
      },

      // Sombras optimizadas
      boxShadow: {
        'mobile': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'mobile-lg': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
        'notification': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      },

      // Animaciones personalizadas
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-left': 'slide-left 0.3s ease-out',
        'slide-right': 'slide-right 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        'bounce-gentle': 'bounce-gentle 0.6s ease-out',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.5s ease-in-out',
        'notification-enter': 'notification-enter 0.3s ease-out',
        'notification-exit': 'notification-exit 0.3s ease-in',
      },

      // Keyframes para animaciones
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        'notification-enter': {
          '0%': { transform: 'translateX(100%) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        'notification-exit': {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(100%) scale(0.9)', opacity: '0' },
        },
      },

      // Transiciones personalizadas
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // Z-index específicos
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'notification': '1080',
        'max': '9999',
      },

      // Bordes redondeados
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Aspectos ratio para componentes
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Solo aplicar estilos con clase .form-*
    }),
    require('@tailwindcss/typography'),
    
    // Plugin personalizado para utilidades móviles
    function({ addUtilities, addComponents, theme }) {
      // Utilidades para elementos táctiles
      addUtilities({
        '.touch-target': {
          minHeight: theme('minHeight.touch'),
          minWidth: theme('minWidth.touch'),
        },
        '.touch-target-lg': {
          minHeight: theme('minHeight.touch-lg'),
          minWidth: theme('minWidth.touch-lg'),
        },
        
        // Safe areas
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-all': {
          padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        },

        // Scroll optimizado para móvil
        '.scroll-touch': {
          '-webkit-overflow-scrolling': 'touch',
          'overscroll-behavior': 'contain',
        },
        
        // Ocultar scrollbar pero mantener funcionalidad
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },

        // Prevenir zoom en inputs (iOS)
        '.prevent-zoom': {
          fontSize: '16px',
          '@media (max-width: 767px)': {
            fontSize: '16px',
          },
        },

        // Momentum scrolling
        '.momentum-scroll': {
          '-webkit-overflow-scrolling': 'touch',
          'overscroll-behavior-y': 'contain',
        },

        // Tap highlight removal
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          'user-select': 'none',
        },

        // Text rendering optimization
        '.text-optimize': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
        },
      });

      // Componentes para layouts móviles
      addComponents({
        // Layout principal
        '.mobile-layout': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme('colors.gray.50'),
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.gray.900'),
          },
        },

        // Header móvil
        '.mobile-header': {
          position: 'sticky',
          top: '0',
          zIndex: theme('zIndex.sticky'),
          backgroundColor: theme('colors.white'),
          borderBottomWidth: '1px',
          borderBottomColor: theme('colors.gray.200'),
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            borderBottomColor: theme('colors.gray.700'),
          },
        },

        // Contenido principal
        '.mobile-main': {
          flex: '1',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },

        // Footer móvil
        '.mobile-footer': {
          padding: theme('spacing.4'),
          backgroundColor: theme('colors.white'),
          borderTopWidth: '1px',
          borderTopColor: theme('colors.gray.200'),
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.gray.800'),
            borderTopColor: theme('colors.gray.700'),
          },
        },

        // Navegación inferior (bottom navigation)
        '.bottom-nav': {
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: theme('zIndex.fixed'),
          backgroundColor: theme('colors.white'),
          borderTopWidth: '1px',
          borderTopColor: theme('colors.gray.200'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          paddingBottom: `calc(${theme('spacing.2')} + env(safe-area-inset-bottom))`,
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.gray.800'),
            borderTopColor: theme('colors.gray.700'),
          },
        },

        // Contenedor de formulario móvil
        '.mobile-form': {
          padding: theme('spacing.4'),
          '& .form-group': {
            marginBottom: theme('spacing.4'),
          },
          '& .form-label': {
            display: 'block',
            fontSize: theme('fontSize.sm[0]'),
            fontWeight: theme('fontWeight.medium'),
            color: theme('colors.gray.700'),
            marginBottom: theme('spacing.1'),
            '@media (prefers-color-scheme: dark)': {
              color: theme('colors.gray.300'),
            },
          },
          '& .form-input': {
            width: '100%',
            minHeight: theme('minHeight.touch'),
            padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
            borderWidth: '1px',
            borderColor: theme('colors.gray.300'),
            borderRadius: theme('borderRadius.lg'),
            fontSize: '16px', // Previene zoom en iOS
            '&:focus': {
              outline: 'none',
              borderColor: theme('colors.primary.500'),
              boxShadow: `0 0 0 3px ${theme('colors.primary.100')}`,
            },
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: theme('colors.gray.700'),
              borderColor: theme('colors.gray.600'),
              color: theme('colors.gray.100'),
            },
          },
        },

        // Cards optimizadas para móvil
        '.mobile-card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.card'),
          padding: theme('spacing.4'),
          marginBottom: theme('spacing.4'),
          '&:hover': {
            boxShadow: theme('boxShadow.card-hover'),
          },
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.gray.800'),
            borderWidth: '1px',
            borderColor: theme('colors.gray.700'),
          },
        },

        // Lista optimizada para móvil
        '.mobile-list': {
          '& .list-item': {
            display: 'flex',
            alignItems: 'center',
            padding: theme('spacing.4'),
            borderBottomWidth: '1px',
            borderBottomColor: theme('colors.gray.100'),
            minHeight: theme('minHeight.touch'),
            '&:last-child': {
              borderBottomWidth: '0',
            },
            '&:active': {
              backgroundColor: theme('colors.gray.50'),
            },
            '@media (prefers-color-scheme: dark)': {
              borderBottomColor: theme('colors.gray.700'),
              '&:active': {
                backgroundColor: theme('colors.gray.700'),
              },
            },
          },
        },

        // Modal optimizado para móvil
        '.mobile-modal': {
          position: 'fixed',
          inset: '0',
          zIndex: theme('zIndex.modal'),
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          padding: theme('spacing.4'),
          '@media (min-width: 640px)': {
            alignItems: 'center',
          },
          '& .modal-content': {
            width: '100%',
            maxWidth: theme('maxWidth.lg'),
            maxHeight: theme('maxHeight.modal-mobile'),
            backgroundColor: theme('colors.white'),
            borderRadius: theme('borderRadius.2xl'),
            boxShadow: theme('boxShadow.modal'),
            overflow: 'hidden',
            '@media (min-width: 640px)': {
              maxHeight: theme('maxHeight.modal'),
              borderRadius: theme('borderRadius.xl'),
            },
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: theme('colors.gray.800'),
              borderWidth: '1px',
              borderColor: theme('colors.gray.700'),
            },
          },
        },

        // Botones optimizados para móvil
        '.mobile-btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme('minHeight.touch'),
          minWidth: theme('minWidth.touch'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          fontSize: theme('fontSize.base[0]'),
          fontWeight: theme('fontWeight.medium'),
          borderRadius: theme('borderRadius.lg'),
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },

        // Variantes de botones
        '.btn-primary': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.primary.700'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${theme('colors.primary.100')}`,
          },
        },

        '.btn-secondary': {
          backgroundColor: theme('colors.gray.200'),
          color: theme('colors.gray.900'),
          '&:hover': {
            backgroundColor: theme('colors.gray.300'),
          },
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.gray.700'),
            color: theme('colors.gray.100'),
            '&:hover': {
              backgroundColor: theme('colors.gray.600'),
            },
          },
        },

        '.btn-danger': {
          backgroundColor: theme('colors.red.600'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.red.700'),
          },
        },

        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.gray.700'),
          '&:hover': {
            backgroundColor: theme('colors.gray.100'),
          },
          '@media (prefers-color-scheme: dark)': {
            color: theme('colors.gray.300'),
            '&:hover': {
              backgroundColor: theme('colors.gray.700'),
            },
          },
        },
      });
    },
  ],
  
  // Configuración para purgar CSS no utilizado
  content: {
    files: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    options: {
      safelist: [
        // Clases dinámicas que pueden no ser detectadas
        'translate-x-0',
        'translate-x-full',
        '-translate-x-full',
        'opacity-0',
        'opacity-100',
        'scale-95',
        'scale-100',
        // Estados de tareas
        'bg-task-pending',
        'bg-task-progress',
        'bg-task-completed',
        'bg-task-cancelled',
        // Prioridades
        'text-priority-low',
        'text-priority-medium',
        'text-priority-high',
        'text-priority-urgent',
        // Materias
        'bg-subject-math',
        'bg-subject-science',
        'bg-subject-language',
        'bg-subject-history',
        'bg-subject-art',
        'bg-subject-sports',
        'bg-subject-default',
      ],
    },
  },
};