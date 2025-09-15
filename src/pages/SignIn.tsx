import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/TranslationContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export default function SignIn() {
  const { dispatch } = useApp()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isFocused, setIsFocused] = useState('')

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleDemoLogin = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    dispatch({ 
      type: 'LOGIN', 
      payload: { 
        user: { 
          id: 'u1', 
          name: 'Alex Doe', 
          email: 'alex@example.com' 
        } 
      } 
    })
    dispatch({ type: 'LOAD_EXAMPLE_DATA' })
    navigate('/')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    dispatch({ 
      type: 'LOGIN', 
      payload: { 
        user: { 
          id: 'u1', 
          name: 'User', 
          email: email 
        } 
      } 
    })
    dispatch({ type: 'LOAD_EXAMPLE_DATA' })
    navigate('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-primary/35">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-pulse delay-500"></div>
      </div>
      
      {/* Advanced Floating Elements with Mouse Interaction */}
      <div 
        className="absolute w-40 h-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl animate-pulse transition-all duration-1000"
        style={{
          left: `${mousePosition.x * 0.02}px`,
          top: `${mousePosition.y * 0.02}px`,
        }}
      ></div>
      <div 
        className="absolute w-60 h-60 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1500"
        style={{
          right: `${mousePosition.x * 0.01}px`,
          bottom: `${mousePosition.y * 0.01}px`,
        }}
      ></div>
      <div 
        className="absolute w-32 h-32 bg-gradient-to-r from-primary/15 to-primary/8 rounded-full blur-xl animate-pulse delay-500 transition-all duration-2000"
        style={{
          left: `${mousePosition.x * 0.015}px`,
          top: `${mousePosition.y * 0.03}px`,
        }}
      ></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(235, 100%, 60%) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Ultra Modern Logo/Brand */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-3 tracking-tight">
              {t('signIn.title')}
            </h1>
            <p className="text-muted-foreground text-xl font-medium">{t('signIn.subtitle')}</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          {/* Ultra Modern Login Card */}
          <Card className="backdrop-blur-xl bg-card/70 border-border/30 shadow-2xl relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
            
            <CardHeader className="text-center pb-8 relative z-10">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {t('signIn.welcomeBack')}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground/80 font-medium">
                {t('signIn.signInToContinue')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8 relative z-10">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-bold text-foreground tracking-wide">
                    {t('signIn.emailAddress')}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
                      <svg className={`h-5 w-5 transition-colors duration-200 ${isFocused === 'email' ? 'text-primary' : 'text-muted-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused('email')}
                      onBlur={() => setIsFocused('')}
                      className="w-full pl-12 pr-4 py-4 border-2 border-border/40 rounded-2xl bg-input/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/60 transition-all duration-300 transform focus:scale-[1.02] group-hover:border-primary/40"
                      placeholder={t('signIn.enterEmail')}
                      required
                    />
                    {email && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="password" className="block text-sm font-bold text-foreground tracking-wide">
                    {t('common.password')}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
                      <svg className={`h-5 w-5 transition-colors duration-200 ${isFocused === 'password' ? 'text-primary' : 'text-muted-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsFocused('password')}
                      onBlur={() => setIsFocused('')}
                      className="w-full pl-12 pr-14 py-4 border-2 border-border/40 rounded-2xl bg-input/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/60 transition-all duration-300 transform focus:scale-[1.02] group-hover:border-primary/40"
                      placeholder={t('signIn.enterPassword')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-all duration-200 transform hover:scale-110"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    {password && (
                      <div className="absolute inset-y-0 right-12 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t('signIn.signingIn')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{t('signIn.signInButton')}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gradient-to-r from-transparent via-border/60 to-transparent"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 bg-card text-muted-foreground font-semibold tracking-wide">{t('signIn.orContinueWith')}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleDemoLogin} 
                variant="outline" 
                className="w-full py-4 text-lg font-bold border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden group"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <span>{t('signIn.loadingDemo')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{t('signIn.tryDemoAccount')}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Ultra Modern Footer */}
          <div className="text-center mt-10 space-y-4">
            <div className="flex justify-center space-x-6 text-sm font-medium">
              <span className="text-primary/80 hover:text-primary transition-colors duration-200 cursor-pointer">{t('signIn.secureFastReliable').split(' • ')[0]}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary/80 hover:text-primary transition-colors duration-200 cursor-pointer">{t('signIn.secureFastReliable').split(' • ')[1]}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary/80 hover:text-primary transition-colors duration-200 cursor-pointer">{t('signIn.secureFastReliable').split(' • ')[2]}</span>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-100"></div>
              <div className="w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}