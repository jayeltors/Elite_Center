// app/api/analytics/route.ts
import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ This is the correct way: named export for GET
export async function GET() {
  try {
    const totalResponsesResult = await executeQuery<any[]>({
      query: "SELECT COUNT(*) as count FROM tna_responses WHERE role = 'Student'",
    });
    const totalTeachersResult = await executeQuery<any[]>({
      query: "SELECT COUNT(*) as count FROM tna_responses WHERE role = 'Teacher'",
    });
    const totalStaffResult = await executeQuery<any[]>({
      query: "SELECT COUNT(*) as count FROM tna_responses WHERE role = 'Staff'",
    });

    const campusDistribution = await executeQuery<any[]>({
      query: `SELECT campus as CAMPUS, COUNT(*) as count FROM tna_responses GROUP BY campus ORDER BY count DESC`,
    });

    const proficiencyLevelsRaw = await executeQuery<any[]>({
      query: `SELECT lms_understanding as level, COUNT(*) as count FROM tna_responses GROUP BY lms_understanding`,
    });

    const usageFrequency = await executeQuery<any[]>({
      query: `
        SELECT usage_frequency as frequency, COUNT(*) as count
        FROM tna_responses
        GROUP BY usage_frequency
        ORDER BY 
          CASE 
            WHEN usage_frequency = 'None at all' THEN 1
            WHEN usage_frequency = 'Once a week' THEN 2
            WHEN usage_frequency = 'Twice a week' THEN 3
            WHEN usage_frequency = '3 times a week' THEN 4
            WHEN usage_frequency = '4 times a week' THEN 5
            WHEN usage_frequency = '5 times a week' THEN 6
            WHEN usage_frequency = 'Everyday' THEN 7
            ELSE 8
          END
      `,
    });

    const yearsExperience = await executeQuery<any[]>({
      query: `SELECT years_experience as years, COUNT(*) as count FROM tna_responses GROUP BY years_experience`,
    });

    const deviceUsage = await executeQuery<any[]>({
      query: `SELECT device_usage as device, COUNT(*) as count FROM tna_responses GROUP BY device_usage`,
    });

    const studentData = await executeQuery<any[]>({
      query: `SELECT given_name as GIVEN_NAME, surname as SURNAME, gender as GENDER, age_bracket as age, campus as CAMPUS, department as DEPARTMENT FROM tna_responses WHERE role = 'Student' LIMIT 100`,
    });

    const departmentDistribution = await executeQuery<any[]>({
      query: `SELECT department as DEPARTMENT, COUNT(*) as count FROM tna_responses GROUP BY department ORDER BY count DESC`,
    });

    // 🧠 Map LMS levels
    const mappedProficiencyLevels = proficiencyLevelsRaw.map((item) => {
      let level: string;
      switch (item.level) {
        case "Beginner":
        case "No experience at all":
          level = "Beginner";
          break;
        case "Average":
          level = "Average";
          break;
        case "Proficient":
          level = "Proficient";
          break;
        case "Expert":
          level = "Expert";
          break;
        default:
          level = "Beginner";
      }
      return { level, count: item.count };
    });

    // 🧪 Generate demo userRatings
    const ratingCategories = [
      'Dashboard', 'Courses', 'StudentView', 'CanvasMobile', 'ModuleNavigation',
      'AssignmentSetup', 'DiscussionsSetup', 'FileNavigation', 'AnnouncementsSetup',
      'QuizzesSetup', 'PagesSetup', 'Attendance', 'GradesSetup', 'Analytics',
      'Outcomes', 'Rubrics', 'Settings'
    ];

    const userRatings = {};
    for (const field of ratingCategories) {
      const data = {
        Beginner: Math.floor(Math.random() * 30) + 10,
        Average: Math.floor(Math.random() * 30) + 10,
        Proficient: Math.floor(Math.random() * 30) + 10,
        Expert: Math.floor(Math.random() * 30) + 10,
      };
      const total = Object.values(data).reduce((sum: number, n: number) => sum + n, 0);
      Object.keys(data).forEach(k => {
        data[k] = Math.round((data[k] / total) * 100);
      });
      userRatings[field] = { display: field, data };
    }

    return NextResponse.json({
      totalResponses: totalResponsesResult[0]?.count || 0,
      totalTeachers: totalTeachersResult[0]?.count || 0,
      totalStaff: totalStaffResult[0]?.count || 0,
      campusDistribution,
      proficiencyLevels: mappedProficiencyLevels,
      usageFrequency,
      yearsExperience,
      deviceUsage,
      studentData,
      departmentDistribution,
      userRatings,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 });
  }
}
