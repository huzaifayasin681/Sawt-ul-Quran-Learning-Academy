import fs from "fs";
import path from "path";

// Initialize data directory
const dataDir = path.join(process.cwd(), "data");

// Helper to ensure data directory and files exist
const initFile = (filename: string, defaultData: any) => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    }
    return filePath;
};

// Paths
const BLOGS_FILE = initFile("blogs.json", []);
const COURSES_FILE = initFile("courses.json", []);
const LEADS_FILE = initFile("leads.json", []);
const TEACHERS_FILE = initFile("teachers.json", []);

// --- BLOGS ---
export interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Markdown
    date: string;
    readTime: string;
    tag: string;
    published: boolean;
}

export const getBlogs = (): Blog[] => {
    return JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));
};

export const getBlogBySlug = (slug: string): Blog | undefined => {
    const blogs = getBlogs();
    return blogs.find((b) => b.slug === slug);
};

export const saveBlog = (blog: Blog) => {
    const blogs = getBlogs();
    const index = blogs.findIndex((b) => b.id === blog.id);
    if (index >= 0) {
        blogs[index] = blog; // Update
    } else {
        blogs.push(blog); // Insert
    }
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
};

export const deleteBlog = (id: string) => {
    const blogs = getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered, null, 2));
};

// --- COURSES ---
export interface Course {
    id: string;
    title: string;
    subtitle: string;
    iconName: string; // Lucide icon name, e.g. "BookOpen"
    features: string[];
    color: string;
    iconColor: string;
    isActive: boolean;
}

export const getCourses = (): Course[] => {
    return JSON.parse(fs.readFileSync(COURSES_FILE, "utf-8"));
};

export const saveCourse = (course: Course) => {
    const courses = getCourses();
    const index = courses.findIndex((c) => c.id === course.id);
    if (index >= 0) {
        courses[index] = course;
    } else {
        courses.push(course);
    }
    fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2));
};

export const deleteCourse = (id: string) => {
    const courses = getCourses();
    const filtered = courses.filter((c) => c.id !== id);
    fs.writeFileSync(COURSES_FILE, JSON.stringify(filtered, null, 2));
};

// --- LEADS (Contact Form & Quiz Submissions) ---
export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    source: string; // "contact_form" | "quiz"
    details: any; // Course interested, quiz score, message
    date: string;
    status: "new" | "contacted" | "enrolled";
}

export const getLeads = (): Lead[] => {
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
};

export const addLead = (lead: Lead) => {
    const leads = getLeads();
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

export const updateLeadStatus = (id: string, status: Lead["status"]) => {
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index >= 0) {
        leads[index].status = status;
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    }
};

// --- TEACHERS ---
export interface Teacher {
    id: string;
    name: string;
    role: string;
    bio: string;
    imagePath?: string; // Path to local uploaded image
    videoPath?: string; // Path to local uploaded video or youtube URL
    isActive: boolean;
    qualifications?: string[]; // E.g. ["Ijazah from Masjid Nabawi", "BA Islamic Studies"]
    experience?: string; // E.g. "10+ Years"
    languages?: string[]; // E.g. ["English", "Arabic", "Urdu"]
    featuredQuote?: string; // E.g. "Learning the Quran should never feel heavy."
}

export const getTeachers = (): Teacher[] => {
    return JSON.parse(fs.readFileSync(TEACHERS_FILE, "utf-8"));
};

export const saveTeacher = (teacher: Teacher) => {
    const teachers = getTeachers();
    const index = teachers.findIndex((t) => t.id === teacher.id);
    if (index >= 0) {
        teachers[index] = teacher;
    } else {
        teachers.push(teacher);
    }
    fs.writeFileSync(TEACHERS_FILE, JSON.stringify(teachers, null, 2));
};

export const deleteTeacher = (id: string) => {
    const teachers = getTeachers();
    const filtered = teachers.filter((t) => t.id !== id);
    fs.writeFileSync(TEACHERS_FILE, JSON.stringify(filtered, null, 2));
};
