'use client'

import DownloadSection from '@/components/DownloadSection'
import Footer from '@/components/Footer'
import ComparisonSection from '@/components/ComparisonSection'
import DownloadButton from '@/components/DownloadButton'
import PatternLibrary from '@/components/PatternLibrary'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative bg-[#0A1E5E] text-[rgb(237,254,193)]" style={{ 
      background: 'color(display-p3 0.012 0.003 0.408)',
      color: 'color(display-p3 0.931 0.996 0.755)'
    }}>
      <DownloadButton />

      <div className="fixed left-1 md:left-16 top-0 bottom-0 w-[50px] md:w-[80px] flex items-center justify-center z-30">
        <p 
          className="text-4xl md:text-4xl lg:text-5xl tracking-wide text-[rgb(237,254,193)]/90 font-script italic select-none whitespace-nowrap"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        >
          powered by ollama • works offline • free forever
        </p>
      </div>

      <div className="hidden md:block fixed right-[60px] top-0 bottom-0 w-[400px] border-l border-r border-[rgb(237,254,193)] z-30" style={{ 
        borderColor: 'color(display-p3 0.931 0.996 0.755)',
        borderWidth: '1px',
        borderTop: 'none',
        borderBottom: 'none'
      }}>
        <div className="w-full h-full grid gap-0" style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(200, 1fr)',
        }}>
          {Array.from({ length: 2400 }).map((_, index) => (
            <div 
              key={index} 
              className="flex justify-center items-center pointer-events-auto"
            >
              <p 
                className="particle-plus text-2xl font-bold text-white/20 cursor-default pointer-events-auto"
              >
                +
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="relative w-full flex items-start justify-center overflow-hidden z-10 select-none" style={{ marginTop: 0, paddingTop: '80px' }}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-32 md:pr-[480px] md:pl-12">
          <div className="space-y-10 md:space-y-24 text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight select-none">
              Hey,
            </h1>
            
            <div className="space-y-6 md:space-y-8 max-w-2xl w-full mx-auto md:mx-0">
              <p className="text-xl md:text-3xl lg:text-4xl tracking-tight font-ios leading-tight select-none">
                <span className="block mb-2">Tired of your</span>
                <span 
                  className="text-yellow-300 font-semibold block mt-2 transition-transform duration-500 ease-in-out cursor-default"
                  style={{ 
                    transformOrigin: 'left center',
                    willChange: 'transform'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  data being stolen?
                </span>
                <span 
                  className="text-green-300 font-semibold block mt-2 transition-transform duration-500 ease-in-out cursor-default"
                  style={{ 
                    transformOrigin: 'left center',
                    willChange: 'transform'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  Spied on?
                </span>
                <span 
                  className="text-pink-300 font-semibold block mt-2 transition-transform duration-500 ease-in-out cursor-default"
                  style={{ 
                    transformOrigin: 'left center',
                    willChange: 'transform'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
                >
                  Tracked?
                </span>
              </p>
              <p className="text-base md:text-xl lg:text-2xl tracking-tight font-ios text-[rgb(237,254,193)]/90 mt-8 md:mt-12 select-none">
                Chat with AI that runs on your machine.
              </p>
              <div className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tight text-[rgb(237,254,193)] mt-6 md:mt-10 leading-tight select-none space-y-3">
                <p className="text-3xl md:text-5xl lg:text-7xl"><span className="text-3xl md:text-5xl lg:text-7xl">NO</span> cloud.</p>
                <p className="text-3xl md:text-5xl lg:text-7xl"><span className="text-3xl md:text-5xl lg:text-7xl">NO</span> accounts.</p>
                <p className="text-3xl md:text-5xl lg:text-7xl"><span className="text-3xl md:text-5xl lg:text-7xl">NO</span> tracking.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-[#0A1E5E] py-12 md:py-20" style={{ background: 'color(display-p3 0.012 0.003 0.408)' }}>
        <PatternLibrary />
      </div>

      <section className="relative z-10 py-12 md:py-16 px-4 md:px-6 bg-[#0A1E5E]" style={{ background: 'color(display-p3 0.012 0.003 0.408)' }}>
        <ComparisonSection />
      </section>

      <div className="relative z-10 bg-[#0A1E5E]" style={{ background: 'color(display-p3 0.012 0.003 0.408)' }}>
        <PatternLibrary randomize={true} seed={12345} />
      </div>

      <section className="relative z-10 py-12 md:py-20 px-4 md:px-6 md:pr-[480px] bg-[#0A1E5E] flex flex-col items-center md:items-start" style={{ background: 'color(display-p3 0.012 0.003 0.408)' }}>
        <DownloadSection />
      </section>

      <Footer />
    </main>
  )
}
