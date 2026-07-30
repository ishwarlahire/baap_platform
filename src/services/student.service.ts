import Student from "../models/student.model";
import StudentMark from "../models/studentMark.model";
import sequelize from "../config/db";
import { Op } from "sequelize";


export const createStudent = async (data: any) => {
  const t = await sequelize.transaction();

  try {
    const {
      first_name,
      last_name,
      roll_number,
      standard,
      division,
      dob,
    } = data;

    if (
      !first_name ||
      !last_name ||
      !roll_number ||
      !standard ||
      !division ||
      !dob
    ) {
      throw new Error("All fields are required");
    }

    const existingStudent = await Student.findOne({
      where: {
        roll_number,
      },
      transaction: t,
    });

    if (existingStudent) {
      throw new Error("Roll Number already exists");
    }

    const student = await Student.create(
      {
        first_name,
        last_name,
        roll_number,
        standard,
        division,
        dob,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return student;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getAllStudents = async (
  page?: number,
  limit?: number
) => {

  // Old functionality
  if (!page || !limit) {
    return await Student.findAll({
      order: [["roll_number", "ASC"]],
    });
  }

  // Pagination
  const offset = (page - 1) * limit;

  const { rows, count } = await Student.findAndCountAll({
    limit,
    offset,
    order: [["roll_number", "ASC"]],
  });

  return {
    totalStudents: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    students: rows,
  };
};

export const getStudentById = async (id: string) => {
  const student = await Student.findOne({
    where: {
      id,
    },
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

export const addStudentMarks = async (
  studentId: string,
  body: any
) => {
  const t = await sequelize.transaction();

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    if (!Array.isArray(body)) {
      throw new Error("Marks should be an array");
    }

    for (const item of body) {
      if (!item.subject) {
        throw new Error("Subject is required");
      }

      if (item.marks < 0 || item.marks > 100) {
        throw new Error(
          `${item.subject} marks should be between 0 to 100`
        );
      }

      const existingSubject = await StudentMark.findOne({
        where: {
          student_id: studentId,
          subject: item.subject,
        },
        transaction: t,
      });

      if (existingSubject) {
        throw new Error(
          `${item.subject} already exists for this student`
        );
      }
    }

    const marks = body.map((item: any) => ({
      student_id: studentId,
      subject: item.subject,
      marks: item.marks,
    }));

    const savedMarks = await StudentMark.bulkCreate(marks, {
      transaction: t,
    });

    await t.commit();

    return {
      message: "Student Marks Added Successfully",
      data: savedMarks,
    };

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const calculateGrade = (percentage: number) => {
  if (percentage >= 90) return "A";

  if (percentage >= 75) return "B";

  if (percentage >= 60) return "C";

  if (percentage >= 35) return "D";

  return "F";
};

const calculatePercentage = (
  total: number,
  totalSubjects: number
) => {
  return Number(
    ((total / (totalSubjects * 100)) * 100).toFixed(2)
  );
};

const calculateStatus = (subjects: any[]) => {
  const failed = subjects.some(
    (item) => item.marks < 35
  );

  return failed ? "FAIL" : "PASS";
};


export const getStudentResult = async (id: string) => {
  const student = await Student.findOne({
    where: { id },
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const marks = (student as any).marks;

  if (!marks || marks.length === 0) {
    throw new Error("Marks not found");
  }

  const totalMarks = marks.reduce(
    (sum: number, item: any) => sum + item.marks,
    0
  );

  const percentage = calculatePercentage(totalMarks, marks.length);

  const grade = calculateGrade(percentage);

  const status = calculateStatus(marks);

  return {
    student: {
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      roll_number: student.roll_number,
      standard: student.standard,
      division: student.division,
    },
    subjects: marks,
    totalMarks,
    percentage,
    grade,
    status,
  };
};

export const getTopperStudents = async () => {
  const students = await Student.findAll({
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  if (!students.length) {
    return [];
  }

  const result = students.map((student: any) => {
    const total = student.marks.reduce(
      (sum: number, m: any) => sum + m.marks,
      0
    );

    const percentage = calculatePercentage(total, student.marks.length);

    return {
      student,
      total,
      percentage,
    };
  });

  const highest = Math.max(...result.map((x) => x.percentage));

  return result.filter((x) => x.percentage === highest);
};

// export const getTopperStudents = async () => {
//   const students = await Student.findAll({
//     include: [
//       {
//         model: StudentMark,
//         as: "marks",
//       },
//     ],
//   });

//   if (!students.length) {
//     return [];
//   }

//   const result = students.map((student: any) => {
//     const total = student.marks.reduce(
//       (sum: number, m: any) => sum + m.marks,
//       0
//     );

//     const percentage = calculatePercentage(total, student.marks.length);

//     return {
//       student,
//       total,
//       percentage,
//     };
//   });

//   const highest = Math.max(...result.map((x) => x.percentage));

//   return result.filter((x) => x.percentage === highest);
// };

export const getFailedStudents = async () => {
  const students = await Student.findAll({
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  return students
    .map((student: any) => {
      const failedSubjects = student.marks.filter(
        (m: any) => m.marks < 35
      );

      if (!failedSubjects.length) {
        return null;
      }

      const total = student.marks.reduce(
        (sum: number, m: any) => sum + m.marks,
        0
      );

      return {
        student,
        failedSubjects,
        percentage: calculatePercentage(total, student.marks.length),
      };
    })
    .filter(Boolean);
};

export const getStudentRank = async (id: string) => {
  const students = await Student.findAll({
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  const ranking = students
    .map((student: any) => {
      const total = student.marks.reduce(
        (sum: number, m: any) => sum + m.marks,
        0
      );

      return {
        id: student.id,
        percentage: calculatePercentage(total, student.marks.length),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const index = ranking.findIndex((x) => x.id === id);

  if (index === -1) {
    throw new Error("Student not found");
  }

  return {
    rank: index + 1,
    percentage: ranking[index].percentage,
  };
};

export const getClassStatistics = async () => {
  const students = await Student.findAll({
    include: [
      {
        model: StudentMark,
        as: "marks",
      },
    ],
  });

  const percentages: number[] = [];

  let passed = 0;
  let failed = 0;

  for (const student of students as any[]) {
    const total = student.marks.reduce(
      (sum: number, m: any) => sum + m.marks,
      0
    );

    const percentage = calculatePercentage(total, student.marks.length);

    percentages.push(percentage);

    const status = calculateStatus(student.marks);

    if (status === "PASS") {
      passed++;
    } else {
      failed++;
    }
  }

  return {
    totalStudents: students.length,
    studentsPassed: passed,
    studentsFailed: failed,
    highestPercentage: percentages.length ? Math.max(...percentages) : 0,
    lowestPercentage: percentages.length ? Math.min(...percentages) : 0,
    classAveragePercentage: percentages.length
      ? Number(
          (
            percentages.reduce((a, b) => a + b, 0) / percentages.length
          ).toFixed(2)
        )
      : 0,
  };
};


export const updateStudent = async (
  id: string,
  body: any
) => {
  const t = await sequelize.transaction();

  try {
    const student = await Student.findByPk(id, {
      transaction: t,
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const {
      first_name,
      last_name,
      roll_number,
      standard,
      division,
      dob,
    } = body;

    if (
      !first_name ||
      !last_name ||
      !roll_number ||
      !standard ||
      !division ||
      !dob
    ) {
      throw new Error("All fields are required");
    }

    const existingStudent = await Student.findOne({
      where: {
        roll_number,
      },
      transaction: t,
    });

    if (
      existingStudent &&
      existingStudent.id !== id
    ) {
      throw new Error("Roll Number already exists");
    }

    await student.update(
      {
        first_name,
        last_name,
        roll_number,
        standard,
        division,
        dob,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return student;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


export const searchStudents = async (search: string) => {
  if (!search) {
    throw new Error("Search is required");
  }

  const conditions: any[] = [
    {
      first_name: {
        [Op.like]: `%${search}%`,
      },
    },
    {
      last_name: {
        [Op.like]: `%${search}%`,
      },
    },
  ];

  if (!isNaN(Number(search))) {
    conditions.push({
      roll_number: Number(search),
    });
  }

  const students = await Student.findAll({
    where: {
      [Op.or]: conditions,
    },
    order: [["roll_number", "ASC"]],
  });

  return students;
};