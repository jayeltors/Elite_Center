  'use client';

  import { useState } from "react"
  import { Bell, ChevronLeft, ChevronRight, Cog, Mail, Search } from "lucide-react"
  import Image from "next/image"

  // Define types for our data
  interface AnalyticsData {
    totalResponses: number
    totalTeachers: number
    totalStaff: number
    campusDistribution: any[]
    proficiencyLevels: any[]
    usageFrequency: any[]
    studentData: any[]
    departmentDistribution: any[]
    deviceUsage: any[]
    yearsExperience: any[]
    userRatings: Record<string, { display: string; data: Record<string, number> }>
  }

  export default function Dashboard({ initialData }: { initialData: AnalyticsData }) {
    const data = initialData


  // If data is not loaded or incomplete, show a loading fallback
  if (!data || !data.campusDistribution) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <div>Loading dashboard data...</div>
      </div>
    );
  }
    // State for tracking current view indices
    const [usageDataIndex, setUsageDataIndex] = useState(0)
    const [userRatingIndex, setUserRatingIndex] = useState(0)

    // Define the usage data categories
    const usageDataCategories = [
      { key: "usageFrequency", title: "How frequent users use canvas on a weekly basis" },
      { key: "yearsExperience", title: "Years in using Canvas LMS" },
      { key: "deviceUsage", title: "What device do you use to access CANVAS" },
    ]

    // Extract user rating categories from the data
    const userRatingCategories = data.userRatings ? Object.keys(data.userRatings) : [];
    const userRatingDisplayNames: Record<string, string> = {};

    if (data.userRatings) {
      Object.keys(data.userRatings).forEach((category) => {
        userRatingDisplayNames[category] = data.userRatings[category].display || "";
      });
    }

    // Process campus distribution for the bar chart
    const campusData = data.campusDistribution || []
    const maxCampusCount = Math.max(...campusData.map((item: any) => item.count), 1)

    // Process proficiency levels for the donut chart
    const proficiencyData = data.proficiencyLevels || []
    const totalProficiency = proficiencyData.reduce((sum: number, item: any) => sum + item.count, 0)

    // Calculate percentages for each proficiency level
    const proficiencyPercentages: Record<string, number> = {
      Beginner: 0,
      Average: 0,
      Proficient: 0,
      Expert: 0,
    }

    proficiencyData.forEach((item: any) => {
      const percentage = Math.round((item.count / totalProficiency) * 100)
      proficiencyPercentages[item.level] = (proficiencyPercentages[item.level] || 0) + percentage
    })

    // Get current usage data category
    const currentUsageCategory = usageDataCategories[usageDataIndex]
    const currentUsageData = data[currentUsageCategory.key as keyof AnalyticsData] || []

    // Process current usage data
    const totalUsage = Array.isArray(currentUsageData)
      ? currentUsageData.reduce((sum: number, item: any) => sum + (item.count || 0), 0)
      : 0

    const usagePercentages = Array.isArray(currentUsageData)
      ? currentUsageData.map((item: any) => {
          const key = item.frequency || item.years || item.device || ""
          return {
            label: key,
            percentage: Math.round(((item.count || 0) / totalUsage) * 100),
          }
        })
      : []

    // Get current user rating category
    const currentRatingKey = userRatingCategories[userRatingIndex] || ""
    const currentRatingData =
      data.userRatings && currentRatingKey
        ? data.userRatings[currentRatingKey]
        : { display: "", data: { Beginner: 0, Average: 0, Proficient: 0, Expert: 0 } }

    // Student data for the table
    const studentData = data.studentData || []

    // Calculate total responses
    const totalResponses = data.totalResponses || 0
    const totalTeachers = data.totalTeachers || 0
    const totalStaff = data.totalStaff || 0

    // Handle navigation for usage data
    const handlePrevUsage = () => {
      setUsageDataIndex((prev) => (prev === 0 ? usageDataCategories.length - 1 : prev - 1))
    }

    const handleNextUsage = () => {
      setUsageDataIndex((prev) => (prev === usageDataCategories.length - 1 ? 0 : prev + 1))
    }

    // Handle navigation for user ratings
    const handlePrevRating = () => {
      setUserRatingIndex((prev) => (prev === 0 ? userRatingCategories.length - 1 : prev - 1))
    }

    const handleNextRating = () => {
      setUserRatingIndex((prev) => (prev === userRatingCategories.length - 1 ? 0 : prev + 1))
    }

    return (
      <div className="flex h-screen bg-[#151515] text-white">
        {/* Sidebar */}
        <div className="w-64 bg-[#1b1b1b] flex flex-col items-center pt-16 border-r border-[#262626]">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 mb-2">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Admin profile"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <span className="text-xs text-gray-400">ADMIN</span>
            <h3 className="font-bold mt-1">JOHN LLOYD TORRE</h3>
          </div>

          <div className="w-full">
            <div className="flex items-center px-8 py-3 bg-[#262626] border-l-4 border-[#ff00ee]">
              <div className="w-6 h-6 mr-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21H3V3H12V5H5V19H19V12H21V21Z" fill="white" />
                  <path d="M21 7H19V5H17V3H19V5H21V7Z" fill="white" />
                  <path d="M17 9H15V7H13V5H15V7H17V9Z" fill="white" />
                  <path d="M21 3H19V1H21V3Z" fill="white" />
                </svg>
              </div>
              <span className="font-medium">Analytics</span>
            </div>

            <div className="flex items-center px-8 py-3 mt-4">
              <Cog className="w-6 h-6 mr-3" />
              <span className="font-medium">Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="h-16 bg-[#1b1b1b] flex items-center justify-between px-6 border-b border-[#262626]">
            <div className="flex items-center">
              <button className="p-2 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" fill="white" />
                  <rect x="14" y="3" width="7" height="7" fill="white" />
                  <rect x="3" y="14" width="7" height="7" fill="white" />
                  <rect x="14" y="14" width="7" height="7" fill="white" />
                </svg>
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#262626] border border-[#515151] rounded-md pl-10 pr-4 py-2 w-64 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <button className="p-2 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 mx-2">
                <Mail className="w-5 h-5" />
              </button>
              <div className="flex items-center ml-2">
                <div className="w-8 h-8 rounded-full bg-[#f7a92b] flex items-center justify-center text-black font-bold text-xs mr-2">
                  JA
                </div>
                <span className="text-sm mr-1">John/Admin</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {/* Analytics Header */}
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <svg
                className="ml-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Top Charts Section */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              {/* Total Students */}
              <div className="col-span-3">
                <div className="mb-1">Total Student</div>
                <div className="text-5xl font-bold">{totalResponses.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Evaluated</div>
              </div>

              {/* Bar Chart */}
              <div className="col-span-5 bg-[#1b1b1b] rounded-lg p-4">
                <div className="mb-2">Number of Students Evaluated</div>
                <div className="h-48 relative">
                  {/* Chart grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-[#262626] w-full h-0"></div>
                    ))}
                  </div>

                  {/* Chart bars */}
                  <div className="absolute inset-0 flex items-end justify-around pt-6">
                    {campusData.slice(0, 5).map((campus: any, index: number) => {
                      const height = (campus.count / maxCampusCount) * 100
                      const color = index === 0 ? "#ff00ee" : "#d9d9d9"

                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-12 rounded-t-sm"
                            style={{
                              height: `${height}%`,
                              backgroundColor: color,
                              minHeight: "8px",
                            }}
                          ></div>
                          <div className="text-xs mt-2 text-gray-400">{campus.CAMPUS}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute -left-10 inset-y-0 flex flex-col justify-between text-xs text-gray-400">
                    <div>{Math.ceil(maxCampusCount * 1.1)}</div>
                    <div>{Math.ceil(maxCampusCount * 0.8)}</div>
                    <div>{Math.ceil(maxCampusCount * 0.6)}</div>
                    <div>{Math.ceil(maxCampusCount * 0.4)}</div>
                    <div>{Math.ceil(maxCampusCount * 0.2)}</div>
                    <div>0</div>
                  </div>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="col-span-4 bg-[#1b1b1b] rounded-lg p-4">
                <div className="mb-2">Student Proficiency Level</div>
                <div className="flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Donut chart segments */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="#151515" />

                      {(() => {
                        // Starting angle is at the top (270 degrees or -90 degrees in radians)
                        let startAngle = -Math.PI / 2
                        const segments = []

                        // Colors for each proficiency level
                        const colors = {
                          Beginner: "#d9d9d9",
                          Average: "#009dff",
                          Proficient: "#ff00ee",
                          Expert: "#f7a92b",
                        }

                        // Add segments in order
                        const segmentData = [
                          { level: "Average", percentage: proficiencyPercentages["Average"] },
                          { level: "Beginner", percentage: proficiencyPercentages["Beginner"] },
                          { level: "Expert", percentage: proficiencyPercentages["Expert"] },
                          { level: "Proficient", percentage: proficiencyPercentages["Proficient"] },
                        ]

                        segmentData.forEach((segment, index) => {
                          if (segment.percentage > 0) {
                            // Convert percentage to radians
                            const angle = (segment.percentage / 100) * Math.PI * 2
                            const endAngle = startAngle + angle

                            // Calculate the SVG arc path
                            const x1 = 50 + 40 * Math.cos(startAngle)
                            const y1 = 50 + 40 * Math.sin(startAngle)
                            const x2 = 50 + 40 * Math.cos(endAngle)
                            const y2 = 50 + 40 * Math.sin(endAngle)

                            // Determine if the arc should be drawn the long way around
                            const largeArcFlag = angle > Math.PI ? 1 : 0

                            // Create the path
                            const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                            segments.push(<path key={index} d={path} fill={colors[segment.level]} />)

                            // Update the starting angle for the next segment
                            startAngle = endAngle
                          }
                        })

                        return segments
                      })()}

                      <circle cx="50" cy="50" r="20" fill="#151515" />
                    </svg>

                    {/* Percentage labels */}
                    <div className="absolute top-0 right-4 text-sm font-bold text-[#ff00ee]">
                      {proficiencyPercentages["Proficient"]}%
                    </div>
                    <div className="absolute top-1/4 left-0 text-sm font-bold text-[#009dff]">
                      {proficiencyPercentages["Average"]}%
                    </div>
                    <div className="absolute bottom-1/4 left-8 text-sm font-bold text-[#d9d9d9]">
                      {proficiencyPercentages["Beginner"]}%
                    </div>
                    <div className="absolute bottom-0 right-8 text-sm font-bold text-[#f7a92b]">
                      {proficiencyPercentages["Expert"]}%
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#d9d9d9] mr-1"></div>
                    <span className="text-xs">Beginner</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#009dff] mr-1"></div>
                    <span className="text-xs">Average</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#ff00ee] mr-1"></div>
                    <span className="text-xs">Proficient</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#f7a92b] mr-1"></div>
                    <span className="text-xs">Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Rating Section */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-8">
                <div className="border-b border-[#262626] pb-2 mb-6">
                  <div className="text-lg flex justify-between items-center">
                    <span>{currentRatingData.display || "LMS Understanding"}</span>
                    <div className="flex">
                      <button className="p-2 border border-[#262626] rounded-l-md" onClick={handlePrevRating}>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-[#262626] rounded-r-md border-l-0" onClick={handleNextRating}>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {/* Beginner */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="#262626" strokeWidth="12" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#ff00ee"
                          strokeWidth="12"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * (currentRatingData.data?.Beginner || 0)) / 100}
                          fill="none"
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
                          {currentRatingData.data?.Beginner || 0}%
                        </text>
                      </svg>
                    </div>
                    <div className="mt-2">Beginner</div>
                  </div>

                  {/* Average */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="#262626" strokeWidth="12" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#009dff"
                          strokeWidth="12"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * (currentRatingData.data?.Average || 0)) / 100}
                          fill="none"
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
                          {currentRatingData.data?.Average || 0}%
                        </text>
                      </svg>
                    </div>
                    <div className="mt-2">Average</div>
                  </div>

                  {/* Proficient */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="#262626" strokeWidth="12" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#d9d9d9"
                          strokeWidth="12"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * (currentRatingData.data?.Proficient || 0)) / 100}
                          fill="none"
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
                          {currentRatingData.data?.Proficient || 0}%
                        </text>
                      </svg>
                    </div>
                    <div className="mt-2">Proficient</div>
                  </div>

                  {/* Expert */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="#262626" strokeWidth="12" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#f7a92b"
                          strokeWidth="12"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * (currentRatingData.data?.Expert || 0)) / 100}
                          fill="none"
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
                          {currentRatingData.data?.Expert || 0}%
                        </text>
                      </svg>
                    </div>
                    <div className="mt-2">Expert</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div>Total Response: {totalResponses.toLocaleString()}</div>
                  <div className="flex">
                    <button className="p-2 border border-[#262626] rounded-l-md" onClick={handlePrevRating}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-[#262626] rounded-r-md border-l-0" onClick={handleNextRating}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Usage Frequency */}
              <div className="col-span-4 bg-[#1b1b1b] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">{currentUsageCategory.title}</div>
                  <div className="flex">
                    <button className="p-1 border border-[#262626] rounded-l-md" onClick={handlePrevUsage}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1 border border-[#262626] rounded-r-md border-l-0" onClick={handleNextUsage}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  {usagePercentages.slice(0, 6).map((item: any, index: number) => {
                    // Map colors based on index for variety
                    const colors = ["#13d875", "#009dff", "white", "#ff1717", "#ff00ee", "#f7a92b"]
                    const color = colors[index % colors.length]

                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-28 text-sm truncate" title={item.label}>
                          {item.label}
                        </div>
                        <div className="flex-1 h-2 bg-[#262626] rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              backgroundColor: color,
                              width: `${item.percentage}%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-8 text-xs text-right">{item.percentage}%</div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div>Total Response: {totalResponses.toLocaleString()}</div>
                  <button className="px-3 py-1 bg-[#262626] rounded text-xs" onClick={handleNextUsage}>
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-12 gap-6">
              {/* Cards */}
              <div className="col-span-3">
                <div className="space-y-4">
                  {/* Total Students Card */}
                  <div className="bg-[#ff00ee] rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm">Total Student</div>
                      <div className="text-3xl font-bold">{totalResponses.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Total Teachers Card */}
                  <div className="bg-[#b107ff] rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm">Total Teachers</div>
                      <div className="text-3xl font-bold">{totalTeachers.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 17V15H18V17H16V19H18V21H20V19H22V17H20ZM9 12C11.21 12 13 10.21 13 8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8C5 10.21 6.79 12 9 12ZM9 6C10.1 6 11 6.9 11 8C11 9.1 10.1 10 9 10C7.9 10 7 9.1 7 8C7 6.9 7.9 6 9 6ZM15 16.59C15 14.09 11.03 13 9 13C6.97 13 3 14.09 3 16.59V18H15V16.59ZM5.5 16C6.22 15.5 7.7 15 9 15C10.3 15 11.77 15.5 12.5 16H5.5Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Total Staff Card */}
                  <div className="bg-[#009dff] rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm">Total Staff</div>
                      <div className="text-3xl font-bold">{totalStaff.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="col-span-9 bg-[#1b1b1b] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-[#262626] border border-[#515151] rounded-md pl-10 pr-4 py-2 w-64 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="py-2 px-4 text-left"></th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Age</th>
                      <th className="py-2 px-4 text-left">Gender</th>
                      <th className="py-2 px-4 text-left">Campus</th>
                      <th className="py-2 px-4 text-left">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.slice(0, 10).map((student: any, index: number) => (
                      <tr key={index} className="border-b border-[#262626]">
                        <td className="py-2 px-4">
                          <div className="w-8 h-8 rounded-full bg-[#009dff] flex items-center justify-center">
                            {index % 2 === 0 ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                                  fill="white"
                                />
                                <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white" />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                                  fill="white"
                                />
                                <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white" />
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          {student.GIVEN_NAME} {student.SURNAME}
                        </td>
                        <td className="py-2 px-4">{student.age}</td>
                        <td className="py-2 px-4">{student.GENDER}</td>
                        <td className="py-2 px-4">{student.CAMPUS}</td>
                        <td className="py-2 px-4">{student.DEPARTMENT}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
