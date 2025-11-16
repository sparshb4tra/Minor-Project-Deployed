'use client'

export default function MetricsChart() {
  const metrics = [
    { label: 'Privacy Score', local: 100, industry: 15 },
    { label: 'Data Control', local: 100, industry: 20 },
    { label: 'Speed', local: 95, industry: 15 },
    { label: 'Cost Efficiency', local: 100, industry: 35 },
    { label: 'Offline', local: 100, industry: 0 },
    { label: 'User Trust', local: 95, industry: 45 },
  ]

  const maxValue = 100

  return (
    <div className="w-full p-4 md:p-6 select-none" style={{ 
      borderRadius: '0px',
      background: 'linear-gradient(to bottom, rgba(10, 30, 94, 0.3), rgba(10, 30, 94, 0.1))'
    }}>
      <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6 text-center text-[rgb(237,254,193)]">
        Performance Metrics
      </h3>
      <div className="w-full border-2 border-[rgb(237,254,193)] p-4 md:p-6 rounded-none">
  <div className="space-y-4 md:space-y-6">

    {metrics.map((metric, index) => {
      const localWidth = (metric.local / maxValue) * 100
      const industryWidth = (metric.industry / maxValue) * 100
      
      return (
        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
          <div className="w-full md:w-40 text-[rgb(237,254,193)] text-sm md:text-base font-ios font-semibold">
            {metric.label}
          </div>

          <div className="flex items-center gap-3 md:gap-4 w-full">
            <div className="relative w-full h-8 md:h-10 bg-transparent border border-[rgb(237,254,193)] overflow-hidden">
              <div 
                className="h-full bg-[rgb(237,254,193)] flex items-center justify-end pr-2 md:pr-3 transition-all duration-700 rounded-none"
                style={{ width: `${localWidth}%`, minWidth: '30px' }}
              >
                <span className="text-[#0A1E5E] text-xs md:text-sm font-bold">
                  {metric.local}
                </span>
              </div>
            </div>

            <div className="relative w-20 md:w-28 h-8 md:h-10 bg-transparent border border-[rgb(237,254,193)]/70 overflow-hidden">
              <div 
                className="h-full bg-[rgb(237,254,193)]/60 flex items-center justify-end pr-2 md:pr-3 transition-all duration-700 rounded-none"
                style={{ width: `${industryWidth}%`, minWidth: '30px' }}
              >
                <span className="text-[#0A1E5E] text-xs md:text-sm font-bold">
                  {metric.industry}
                </span>
              </div>
            </div>

          </div>

        </div>
      )
    })}

  </div>

  <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-10 justify-center text-xs md:text-sm">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[rgb(237,254,193)] border border-[rgb(237,254,193)] rounded-none" />
      <span className="text-[rgb(237,254,193)] font-semibold">Local AI Chat</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[rgb(237,254,193)]/60 border border-[rgb(237,254,193)]/70 rounded-none" />
      <span className="text-[rgb(237,254,193)] font-semibold">Industry Average</span>
    </div>
  </div>
</div>
</div>    
  
  )
}
